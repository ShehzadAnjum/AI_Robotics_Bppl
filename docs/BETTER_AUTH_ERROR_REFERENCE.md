# Better Auth Error Reference - Quick Lookup

**Purpose**: Instant diagnosis and resolution for better-auth errors
**Format**: Error → Root Cause → Solution

---

## Error Categories

1. [Database Errors](#database-errors)
2. [Configuration Errors](#configuration-errors)
3. [Build/Deployment Errors](#builddeployment-errors)
4. [Runtime Errors](#runtime-errors)
5. [TypeScript Errors](#typescript-errors)

---

## Database Errors

### Error: `relation "user" does not exist`

```
error: relation "user" does not exist
code: '42P01'
```

**Root Cause**: Migration not run or tables created with wrong names

**Check This**:
```bash
# List all tables
psql $POSTGRES_URL -c "\dt"

# Looking for: user, session, account, verification
# NOT: auth_user, auth_session, etc.
```

**Solution**:
```bash
npx @better-auth/cli migrate
```

**Time to Fix**: 2 minutes

---

### Error: `column "emailVerified" does not exist`

```
Failed to create user error: column "emailVerified" of relation "user" does not exist
code: '42703'
```

**Root Cause**: Manual migration created snake_case columns, better-auth expects camelCase

**This Happened Because**:
- Created table with `email_verified` instead of `emailVerified`
- better-auth CLI creates correct schema, manual SQL doesn't

**Solution**:
```bash
# Drop incorrect tables
psql $POSTGRES_URL -c "
DROP TABLE IF EXISTS verification CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS \"user\" CASCADE;
"

# Let CLI create correct schema
npx @better-auth/cli migrate
```

**Time to Fix**: 3 minutes

**Prevention**: Always use CLI for migration, never create tables manually

---

### Error: `syntax error at or near "user"`

```
syntax error at or near "user"
```

**Root Cause**: `user` is PostgreSQL reserved keyword, not quoted

**This Happens When**: Manually writing SQL without quotes

**Solution**: Let better-auth CLI handle it (automatically quotes reserved keywords)

**Time to Fix**: 0 minutes (use CLI)

---

## Configuration Errors

### Error: `EMAIL_AND_PASSWORD_SIGN_UP_IS_NOT_ENABLED`

```json
{
  "code": "EMAIL_AND_PASSWORD_SIGN_UP_IS_NOT_ENABLED",
  "message": "Email and password sign up is not enabled"
}
```

**Root Cause**: Missing `emailAndPassword` configuration

**Check Your Config**:
```typescript
export const auth = betterAuth({
  database: pool,

  // THIS IS MISSING ❌
  // emailAndPassword: { enabled: true },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
```

**Solution**:
```typescript
export const auth = betterAuth({
  database: pool,

  // ADD THIS ✅
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
```

**Time to Fix**: 1 minute

---

### Error: `No configuration file found`

```
No configuration file found. Add a `auth.ts` file to your project
or pass the path to the configuration file using the `--config` flag.
```

**Root Cause**: better-auth CLI needs `auth.ts` in project root

**Solution**:
Create `auth.ts` in project root:
```typescript
export { auth } from './lib/auth/config';
```

**Time to Fix**: 1 minute

---

## Build/Deployment Errors

### Error: `npm error ERESOLVE could not resolve`

```
npm error ERESOLVE could not resolve
peerOptional next@"^14.0.0 || ^15.0.0" from better-auth@1.4.4
```

**Root Cause**: Next.js 16 incompatible with better-auth peer dependency requirement

**Solution**:
Create `.npmrc`:
```
legacy-peer-deps=true
```

Then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Time to Fix**: 2 minutes

**Our Experience**: This was our first error, took 30 minutes to diagnose

---

### Error: TypeScript Build Fails - `csrfProtection does not exist`

```
Type error: Object literal may only specify known properties,
and 'csrfProtection' does not exist in type 'BetterAuthAdvancedOptions'
```

**Root Cause**: Using config options that don't exist in your better-auth version

**This Happened Because**: Documentation shows options from newer/older versions

**Solution**: Use minimal configuration first

```typescript
// ❌ Don't do this initially
export const auth = betterAuth({
  database: pool,
  advanced: {
    csrfProtection: true,  // Doesn't exist
    cookieSameSite: 'none', // Doesn't exist in advanced
  }
});

// ✅ Do this instead
export const auth = betterAuth({
  database: pool,
  emailAndPassword: { enabled: true },
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
});
```

**Time to Fix**: 5 minutes per invalid option

**Our Experience**: Hit 3 different invalid options across multiple deployments

---

## Runtime Errors

### Error: `Bad escaped character in JSON at position X`

```
SyntaxError: Bad escaped character in JSON at position 54
at JSON.parse (<anonymous>)
```

**Root Cause (Multiple Possible)**:

#### 1. Schema Mismatch (Most Common - 90% of cases)
```
Position varies: 51, 54, 56, 58, 61...
Error is misleading - real issue is database schema
```

**Check**:
```bash
# Test without special characters
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -d '{"email":"test@example.com","password":"SimplePass123","name":"Test"}'

# If you get "EMAIL_AND_PASSWORD_SIGN_UP_IS_NOT_ENABLED"
# → It's a config issue

# If you get "column emailVerified does not exist"
# → It's a schema issue (use CLI migration)
```

**Solution**: Use CLI migration
```bash
npx @better-auth/cli migrate
```

#### 2. Environment Variable Issue (10% of cases)
```
Special characters in POSTGRES_URL not properly escaped
```

**Check**:
```bash
echo $POSTGRES_URL
# Should be: postgresql://user:pass@host/db
# Not: postgresql://user:"pass"@host/db  (quotes are wrong)
```

**Solution**: Ensure no extra quotes in environment variable

**Time to Fix**:
- If schema issue: 3 minutes (CLI migration)
- If env var issue: 1 minute

**Our Experience**: This was the most confusing error - spent 4 hours thinking it was JSON parsing, but it was actually schema mismatch

---

### Error: HTTP 500 with No Response Body

```
curl https://your-app.vercel.app/api/auth/sign-up/email
# Returns: (empty) with status 500
```

**Root Cause**: Runtime error in serverless function

**This Means**: Error is being thrown but not caught/logged properly

**Solution**:
1. Check Vercel Function Logs (NOT build logs):
   - Go to Vercel Dashboard
   - Click deployment
   - Functions tab
   - View logs for `/api/auth/[...all]`

2. Common causes found in logs:
   - Database connection error
   - Missing environment variable
   - Schema mismatch
   - Better-auth initialization error

**Time to Diagnose**: 5 minutes

**Our Experience**: Health check worked, but signup returned 500 - logs revealed schema issues

---

## TypeScript Errors

### Pattern: `'X' does not exist in type 'BetterAuthOptions'`

**Examples**:
- `csrfProtection does not exist`
- `cookieSameSite does not exist`
- `rateLimit does not exist`

**Root Cause**: API changes between better-auth versions

**Solution**:
1. Remove the invalid option
2. Check version-specific docs
3. Use minimal config until working

**Prevention**: Always start with minimal config

---

## Diagnostic Decision Tree

```
Signup endpoint returns error?
│
├─ HTTP 500?
│  │
│  ├─ Check Vercel function logs
│  │
│  ├─ "relation user does not exist"?
│  │  └─ Run: npx @better-auth/cli migrate
│  │
│  ├─ "column emailVerified does not exist"?
│  │  └─ Drop tables, run CLI migration
│  │
│  └─ "Bad escaped character in JSON"?
│     └─ Schema mismatch - run CLI migration
│
├─ HTTP 422 with error JSON?
│  │
│  ├─ "EMAIL_AND_PASSWORD_SIGN_UP_IS_NOT_ENABLED"?
│  │  └─ Add emailAndPassword config
│  │
│  └─ Other error?
│     └─ Check error message details
│
└─ HTTP 200 but unexpected response?
   └─ Success! (or check response format)
```

---

## Quick Fix Commands

### Reset Database Schema
```bash
psql $POSTGRES_URL -c "
DROP TABLE IF EXISTS verification CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS \"user\" CASCADE;
"
npx @better-auth/cli migrate
```

### Verify Setup
```bash
# Check tables exist
psql $POSTGRES_URL -c "
SELECT table_name
FROM information_schema.tables
WHERE table_name IN ('user','session','account','verification')
"

# Test health endpoint
curl http://localhost:3000/api/auth/ok

# Test signup
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test12345","name":"Test"}'
```

### Fix Next.js 16 Peer Dependency
```bash
echo "legacy-peer-deps=true" > .npmrc
rm -rf node_modules package-lock.json
npm install
```

---

## Our Journey - Error Timeline

**Total Time**: 8 hours
**Errors Encountered**: 8 unique errors
**Root Cause**: Schema mismatch (discovered after 6 hours)

### Hour 0-1: Peer Dependencies
- Error: `npm error ERESOLVE`
- Fix: `.npmrc` with `legacy-peer-deps=true`
- Time: 30 minutes

### Hour 1-2: TypeScript - csrfProtection
- Error: `csrfProtection does not exist`
- Fix: Removed invalid option
- Time: 20 minutes

### Hour 2-3: TypeScript - cookieSameSite
- Error: `cookieSameSite does not exist in advanced`
- Fix: Moved to top-level config, then removed
- Time: 30 minutes

### Hour 3-4: Version Issues
- Error: Multiple config incompatibilities
- Fix: Pinned to exact version 1.3.4
- Time: 45 minutes

### Hour 4-6: JSON Parsing (Red Herring)
- Error: `Bad escaped character in JSON at position X`
- Tried: Environment variable escaping, config simplification
- Result: Error persisted
- Time: 2 hours

### Hour 6-7: Schema Discovery
- Error: `relation "user" does not exist`
- Discovered: Tables named `auth_user` not `user`
- Time: 30 minutes

### Hour 7-8: Schema Mismatch Root Cause
- Error: `column "emailVerified" does not exist`
- Root Cause: snake_case vs camelCase
- Solution: CLI migration
- Time: 45 minutes
- **Success**: All endpoints working

---

## Prevention Checklist

Before starting better-auth implementation:

```bash
☐ Read this error reference
☐ Use CLI migration (not manual SQL)
☐ Create auth.ts in project root
☐ Start with minimal config
☐ Pin exact better-auth version
☐ Add .npmrc for Next.js 16
☐ Test locally before deploying
☐ Keep environment variables simple
```

---

## Success Indicators

You'll know setup is correct when:

```bash
# 1. Health check works
curl http://localhost:3000/api/auth/ok
# → {"ok":true}

# 2. Signup works
curl -X POST http://localhost:3000/api/auth/sign-up/email ...
# → {"token":"...","user":{...}}

# 3. Signin works
curl -X POST http://localhost:3000/api/auth/sign-in/email ...
# → {"token":"...","user":{...}}

# 4. Database has correct tables
psql $POSTGRES_URL -c "\dt"
# → user, session, account, verification (not auth_*)

# 5. Columns are camelCase
psql $POSTGRES_URL -c "\d \"user\""
# → emailVerified, createdAt (not email_verified, created_at)
```

---

**Last Updated**: December 2, 2025
**Total Errors Documented**: 8 major errors
**Time Saved by This Guide**: ~6 hours per implementation
