# Better Auth Implementation Guide - Complete Reference

**Created**: December 2, 2025
**Purpose**: Step-by-step guide to implement better-auth correctly the FIRST time
**Time Saved**: This guide prevents 6+ hours of debugging

---

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Correct Setup Process](#correct-setup-process)
3. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
4. [Troubleshooting Guide](#troubleshooting-guide)
5. [Verification Checklist](#verification-checklist)

---

## Prerequisites

### Required Dependencies
```json
{
  "dependencies": {
    "better-auth": "1.3.4",      // Pin exact version
    "pg": "^8.16.3",             // PostgreSQL driver
    "bcrypt": "^5.1.1",          // Password hashing
    "resend": "^4.0.1"           // Email service (optional)
  }
}
```

### Environment Variables
```bash
# Database
POSTGRES_URL=postgresql://user:pass@host/db?sslmode=require

# better-auth Configuration
BETTER_AUTH_SECRET=your-64-char-secret  # Generate with: openssl rand -hex 32
BETTER_AUTH_URL=http://localhost:3000   # Production: https://your-app.vercel.app

# CORS (optional for cross-domain)
ALLOWED_ORIGINS=http://localhost:3001,https://your-frontend.com

# Email Service (optional)
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Your App Name
```

---

## Correct Setup Process

### Step 1: Install Dependencies

```bash
npm install better-auth@1.3.4 pg bcrypt --save
npm install @types/pg @types/bcrypt --save-dev

# For Next.js 16 compatibility (if needed)
echo "legacy-peer-deps=true" > .npmrc
```

### Step 2: Create Configuration Files

#### `lib/auth/config.ts`
```typescript
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const auth = betterAuth({
  database: pool,

  // Email/Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set true when email is configured
    minPasswordLength: 8,
  },

  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || '',

  // For cross-domain setups (GitHub Pages + Vercel, etc.)
  trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
});
```

#### `auth.ts` (Project Root - Required for CLI)
```typescript
// Better Auth configuration for CLI migration
// This file MUST be in project root for @better-auth/cli to work
export { auth } from './lib/auth/config';
```

### Step 3: Create API Route

#### Next.js App Router: `app/api/auth/[...all]/route.ts`
```typescript
import { auth } from '@/lib/auth/config';

// better-auth catch-all route
export const GET = auth.handler;
export const POST = auth.handler;

// Use Node.js runtime (not Edge) - pg requires Node.js APIs
export const runtime = 'nodejs';
```

#### Next.js Pages Router: `pages/api/auth/[...all].ts`
```typescript
import { auth } from '@/lib/auth/config';
import { toNextJsHandler } from 'better-auth/next-js';

export default toNextJsHandler(auth);
```

### Step 4: Run Database Migration

**⚠️ CRITICAL: Use better-auth CLI - DO NOT create tables manually**

```bash
# This is THE correct way - it creates the proper schema
npx @better-auth/cli migrate

# When prompted, confirm with 'y'
# The CLI will create:
# - user table (with emailVerified in camelCase)
# - session table
# - account table
# - verification table
```

**Why CLI is required:**
- Creates tables with **camelCase** columns (`emailVerified`, `createdAt`)
- Our manual migration used **snake_case** (`email_verified`, `created_at`)
- This mismatch causes `column "emailVerified" does not exist` errors

### Step 5: Verify Setup

```bash
# Start dev server
npm run dev

# Test health endpoint
curl http://localhost:3000/api/auth/ok
# Expected: {"ok":true}

# Test signup
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456","name":"Test User"}'
# Expected: {"token":"...","user":{...}}
```

---

## Common Pitfalls & Solutions

### ❌ Pitfall 1: Manual Table Creation

**What We Did Wrong:**
```sql
-- DON'T DO THIS
CREATE TABLE auth_user (
  email_verified BOOLEAN,  -- Wrong: snake_case
  created_at TIMESTAMP     -- Wrong: snake_case
);
```

**Why It's Wrong:**
- better-auth expects `emailVerified` (camelCase)
- Results in: `column "emailVerified" does not exist`

**✅ Correct Approach:**
```bash
# Let better-auth CLI create tables
npx @better-auth/cli migrate
```

---

### ❌ Pitfall 2: Missing `auth.ts` File

**Error:**
```
No configuration file found. Add a `auth.ts` file to your project
```

**Solution:**
Create `auth.ts` in project root:
```typescript
export { auth } from './lib/auth/config';
```

---

### ❌ Pitfall 3: Forgetting `emailAndPassword` Configuration

**Error:**
```json
{
  "code": "EMAIL_AND_PASSWORD_SIGN_UP_IS_NOT_ENABLED",
  "message": "Email and password sign up is not enabled"
}
```

**Solution:**
Add to your config:
```typescript
export const auth = betterAuth({
  database: pool,

  // THIS IS REQUIRED FOR EMAIL/PASSWORD AUTH
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  // ... rest of config
});
```

---

### ❌ Pitfall 4: Using `user` as Table Name Without Quotes

**Error:**
```
syntax error at or near "user"
```

**Why:**
- `user` is a reserved keyword in PostgreSQL
- Must be quoted: `"user"`

**Better Solution:**
- Let better-auth CLI handle it (it knows to quote reserved keywords)

---

### ❌ Pitfall 5: Next.js 16 + better-auth Peer Dependency Conflict

**Error:**
```
npm error ERESOLVE could not resolve
peerOptional next@"^14.0.0 || ^15.0.0" from better-auth@1.4.4
```

**Solution:**
Create `.npmrc`:
```
legacy-peer-deps=true
```

---

### ❌ Pitfall 6: TypeScript Errors on Invalid Config Options

**Error:**
```
Type error: 'csrfProtection' does not exist in type 'BetterAuthAdvancedOptions'
```

**Why:**
- better-auth API changes between versions
- Documentation may reference options that don't exist in your version

**Solution:**
- Stick to **minimal configuration** first
- Only add advanced options after core functionality works
- Check version-specific docs

---

## Troubleshooting Guide

### Issue: `relation "user" does not exist`

**Symptoms:**
```
error: relation "user" does not exist
```

**Root Cause:**
- Tables not created yet
- Tables created with different names (`auth_user` instead of `user`)

**Resolution:**
```bash
# 1. Check what tables exist
psql $POSTGRES_URL -c "\dt"

# 2. If no auth tables exist, run migration
npx @better-auth/cli migrate

# 3. If wrong tables exist (auth_user, etc.), drop them first
# Then run migration
```

---

### Issue: `column "emailVerified" does not exist`

**Symptoms:**
```
Failed to create user error: column "emailVerified" of relation "user" does not exist
```

**Root Cause:**
- Manual migration created `email_verified` (snake_case)
- better-auth expects `emailVerified` (camelCase)

**Resolution:**
```bash
# 1. Drop existing auth tables
psql $POSTGRES_URL -c "
DROP TABLE IF EXISTS verification CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TABLE IF EXISTS \"user\" CASCADE;
"

# 2. Run better-auth CLI migration
npx @better-auth/cli migrate
```

---

### Issue: `Bad escaped character in JSON at position X`

**Symptoms:**
```
SyntaxError: Bad escaped character in JSON at position 54
```

**Root Causes (Multiple Possible):**

1. **Schema Mismatch** (Most Common)
   - better-auth tries to parse data but fails due to missing columns
   - The JSON error is a red herring - real issue is database schema
   - **Solution**: Use CLI migration

2. **Malformed Environment Variable**
   - Special characters in `POSTGRES_URL` not properly escaped
   - **Solution**: Ensure URL is properly formatted

3. **JSON Parsing in Custom Code**
   - If you added custom code that parses JSON
   - **Solution**: Review custom code for JSON.parse() calls

**Debugging Steps:**
```bash
# 1. Test without special characters in password
curl -X POST http://localhost:3000/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SimplePass123","name":"Test"}'

# 2. If that fails with "not enabled" - it's a config issue
# 3. If that fails with different error - check database schema
# 4. If that succeeds - issue was with password validation/storage
```

---

### Issue: Build Succeeds But Runtime Fails

**Symptoms:**
- ✅ Vercel build shows "Ready"
- ❌ Endpoints return 500 errors
- No clear error in build logs

**Resolution:**
```bash
# 1. Check Vercel function logs (not build logs)
# Go to: Vercel Dashboard → Deployment → Functions tab

# 2. Look for runtime errors there
# Common issues:
# - Missing environment variables
# - Database connection errors
# - Schema mismatches
```

---

## Verification Checklist

### ✅ Pre-Deployment Checklist

```bash
# 1. Dependencies installed
[ ] better-auth@1.3.4 installed
[ ] pg, bcrypt installed
[ ] @types/pg, @types/bcrypt installed (dev)

# 2. Configuration files created
[ ] lib/auth/config.ts with minimal config
[ ] auth.ts in project root
[ ] app/api/auth/[...all]/route.ts (or pages API route)

# 3. Environment variables set
[ ] POSTGRES_URL
[ ] BETTER_AUTH_SECRET (64 characters)
[ ] BETTER_AUTH_URL

# 4. Database migration completed
[ ] Ran: npx @better-auth/cli migrate
[ ] Confirmed tables created: user, session, account, verification

# 5. Local testing passed
[ ] Health check: curl http://localhost:3000/api/auth/ok
[ ] Signup works: curl -X POST .../api/auth/sign-up/email
[ ] Signin works: curl -X POST .../api/auth/sign-in/email
```

### ✅ Post-Deployment Checklist

```bash
# 1. Vercel environment variables
[ ] All env vars added to Vercel dashboard
[ ] No quotes around values
[ ] Production URLs updated (BETTER_AUTH_URL)

# 2. Production database
[ ] Same database as local (recommended for migration)
[ ] OR ran migration on production database

# 3. Production testing
[ ] Health check: curl https://your-app.vercel.app/api/auth/ok
[ ] Signup works in production
[ ] Signin works in production
```

---

## Quick Reference: Complete Setup Script

```bash
#!/bin/bash
# better-auth-setup.sh - Complete setup in one script

set -e

echo "🚀 Setting up better-auth..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install better-auth@1.3.4 pg bcrypt --save
npm install @types/pg @types/bcrypt --save-dev

# 2. Create .npmrc (for Next.js 16)
echo "⚙️  Creating .npmrc..."
echo "legacy-peer-deps=true" > .npmrc

# 3. Check environment variables
echo "🔍 Checking environment variables..."
if [ -z "$POSTGRES_URL" ]; then
  echo "❌ POSTGRES_URL not set"
  exit 1
fi
if [ -z "$BETTER_AUTH_SECRET" ]; then
  echo "⚠️  Generating BETTER_AUTH_SECRET..."
  SECRET=$(openssl rand -hex 32)
  echo "Add to .env.local: BETTER_AUTH_SECRET=$SECRET"
fi

# 4. Create directory structure
echo "📁 Creating directories..."
mkdir -p lib/auth
mkdir -p app/api/auth/\[...all\]

# 5. Create configuration files (templates)
echo "📝 Creating configuration templates..."
cat > auth.ts << 'EOF'
export { auth } from './lib/auth/config';
EOF

cat > lib/auth/config.ts << 'EOF'
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
  },
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || '',
  trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
});
EOF

cat > app/api/auth/\[...all\]/route.ts << 'EOF'
import { auth } from '@/lib/auth/config';

export const GET = auth.handler;
export const POST = auth.handler;
export const runtime = 'nodejs';
EOF

# 6. Run migration
echo "🗄️  Running database migration..."
echo "y" | npx @better-auth/cli@latest migrate

# 7. Test endpoints
echo "🧪 Testing endpoints..."
npm run dev &
DEV_PID=$!
sleep 5

HEALTH=$(curl -s http://localhost:3000/api/auth/ok)
if [ "$HEALTH" = '{"ok":true}' ]; then
  echo "✅ Health check passed!"
else
  echo "❌ Health check failed!"
  kill $DEV_PID
  exit 1
fi

kill $DEV_PID

echo ""
echo "✅ better-auth setup complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables (if not already set)"
echo "2. npm run dev"
echo "3. Test signup: curl -X POST http://localhost:3000/api/auth/sign-up/email ..."
```

---

## Key Takeaways

### ✅ DO THIS:
1. **Use better-auth CLI** for database migration
2. **Pin exact version** in package.json (`"better-auth": "1.3.4"`)
3. **Create `auth.ts`** in project root
4. **Start with minimal config** - add features incrementally
5. **Test locally first** before deploying
6. **Use Node.js runtime** (not Edge) for Next.js routes

### ❌ DON'T DO THIS:
1. **Don't create tables manually** (schema will be wrong)
2. **Don't use floating version** (`^1.3.4` can break)
3. **Don't skip `auth.ts` file** (CLI needs it)
4. **Don't add advanced options** until core works
5. **Don't assume schema** (let CLI create it)
6. **Don't use Edge runtime** (pg needs Node.js)

---

## Time Investment Comparison

**Without This Guide**: 6-8 hours of debugging
- 2 hours on peer dependencies
- 2 hours on TypeScript errors
- 2-4 hours on schema mismatch

**With This Guide**: 30 minutes setup
- 10 minutes reading guide
- 15 minutes following steps
- 5 minutes testing

**Time Saved**: ~7 hours per implementation

---

## Support & Resources

**Official Docs**: https://better-auth.com/docs
**GitHub**: https://github.com/better-auth/better-auth
**This Guide Created**: December 2, 2025
**Tested With**: better-auth@1.3.4, Next.js 16.0.6, PostgreSQL (Neon)

**Need Help?**
- Check Troubleshooting Guide section above
- Review AUTHENTICATION_SUCCESS.md for working example
- Compare your setup to this guide step-by-step

---

**Last Updated**: December 2, 2025
**Status**: Production-tested and verified ✅
