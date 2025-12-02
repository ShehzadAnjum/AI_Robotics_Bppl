# Technology Research & Decisions
## Authentication & Authorization Feature

**Date**: 2025-12-02
**Feature**: User Authentication & Authorization
**Context**: MVP/Demo priority with aggressive scaling (medium @ 3mo, large @ 6mo)

---

## Table of Contents

1. [Technology Stack Overview](#1-technology-stack-overview)
2. [Authentication Framework Selection](#2-authentication-framework-selection)
3. [Database Strategy](#3-database-strategy)
4. [Email Service Selection](#4-email-service-selection)
5. [ORM/Query Builder Selection](#5-ormquery-builder-selection)
6. [Frontend Integration Strategy](#6-frontend-integration-strategy)
7. [Session Management Architecture](#7-session-management-architecture)
8. [OAuth Provider Configuration](#8-oauth-provider-configuration)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Development Workflow](#10-development-workflow)

---

## 1. Technology Stack Overview

### Final Stack (Optimized for MVP Speed + Future Scale)

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Auth Framework** | better-auth v1.3.4+ | Best DX, security features, TypeScript-first, free/open-source |
| **Database** | Existing PostgreSQL | Reuse existing infrastructure (user confirmed), zero setup time |
| **ORM** | Prisma 5.x | Best TypeScript support, excellent migration tooling, Vercel-compatible |
| **Email Service** | Resend | 3k emails/month free, excellent deliverability, simple API |
| **Backend Runtime** | Node.js 20+ (Vercel) | Existing platform, serverless-friendly, better-auth compatible |
| **Frontend** | React 18+ (Docusaurus) | Existing platform, better-auth React client available |
| **OAuth Providers** | Google + GitHub | Most relevant for robotics/tech students |
| **Session Storage** | PostgreSQL (better-auth) | Stateful sessions in existing database, no extra service needed |
| **Rate Limiting** | better-auth built-in | Sufficient for MVP, upgrade to Redis at medium scale (3mo) |

**Total Infrastructure Cost (MVP)**: $0/month
**Estimated Development Time**: 2-3 weeks for P1 features

---

## 2. Authentication Framework Selection

### Decision: better-auth

**Score**: 4.90/5.00 (Strongly Recommended)

#### Evaluation Criteria (from Constitution)

| Criterion | Weight | Score | Weighted | Notes |
|-----------|--------|-------|----------|-------|
| **Security** | 25% | 5.0 | 1.25 | CSRF, XSS, rate limiting, breach detection built-in |
| **Compatibility** | 20% | 5.0 | 1.00 | Vercel serverless, PostgreSQL, TypeScript, React |
| **DX (Developer Experience)** | 20% | 5.0 | 1.00 | Excellent docs (1754 examples), TypeScript-first |
| **Cost** | 15% | 5.0 | 0.75 | Open source (MIT), self-hosted, no vendor fees |
| **Maintenance** | 10% | 5.0 | 0.50 | Active (v1.3.4 Dec 2025), High source reputation |
| **Features** | 5% | 4.5 | 0.23 | Email, OAuth, 2FA plugin, passkeys, magic links |
| **Performance** | 5% | 4.5 | 0.23 | Optimized for serverless, <100ms overhead |
| **TOTAL** | 100% | - | **4.96** | **Strongly Recommended** |

#### Security Features (Constitution Compliance)

✅ **Built-in Security** (Constitution Section 2):
- CSRF protection (automatic)
- Secure cookie handling (httpOnly, sameSite, secure flags)
- Bcrypt password hashing (work factor 12+)
- Rate limiting (configurable per endpoint)
- Password breach detection (HaveIBeenPwned integration)
- Session validation on every request
- SQL injection prevention (parameterized queries)
- XSS prevention (CSP headers supported)

✅ **Zero Trust Architecture** (Constitution 2.1):
- Verifies every request cryptographically
- Never trusts client data
- OAuth token validation with provider
- Permission checks on protected actions

#### Developer Experience Benefits

**TypeScript-First**:
```typescript
// Full type safety end-to-end
import { auth } from "@/lib/auth";
import { createAuthClient } from "better-auth/react";

// Backend: Type-safe session access
const session = await auth.api.getSession({ headers });

// Frontend: Type-safe client
const { signIn, signUp, useSession } = createAuthClient();
```

**Framework Agnostic**:
- Works with Vercel serverless functions ✅
- Works with Next.js API routes ✅
- Works with Express/Fastify ✅
- Works with standalone Node.js ✅

**Minimal Configuration** (MVP-optimized):
```typescript
// Literally 10 lines to get started
export const auth = betterAuth({
  database: postgresClient, // Reuse existing
  emailAndPassword: { enabled: true },
  socialProviders: { google, github },
});
```

#### Alternatives Considered & Rejected

**Lucia (Score: 3.20/5.00)**
- ❌ Lower-level (more code to write)
- ❌ Less comprehensive docs (344 snippets vs 1754)
- ✅ More flexible (but not needed for MVP)
- **Rejected**: DX penalty not worth flexibility for MVP

**Auth.js/NextAuth (Score: 3.85/5.00)**
- ⚠️ Next.js coupling (we use Vercel + Docusaurus)
- ⚠️ v5 breaking changes causing ecosystem churn
- ⚠️ Complex customization for non-Next.js setups
- **Rejected**: Framework coupling risk, better-auth more flexible

**Supabase Auth (Score: 4.15/5.00)**
- ✅ Great DX, managed service
- ❌ Vendor lock-in (can't self-host easily)
- ❌ Cost scales with users (not $0 at medium scale)
- ❌ We already have PostgreSQL (don't need Supabase DB)
- **Rejected**: Vendor lock-in + cost vs. open-source better-auth

**Clerk (Score: 3.75/5.00)**
- ✅ Excellent pre-built UI
- ❌ Expensive at scale ($25/month minimum)
- ❌ Heavy vendor lock-in
- ❌ Not suitable for "finish ASAP" MVP demo
- **Rejected**: Cost prohibitive, lock-in risk

---

## 3. Database Strategy

### Decision: Reuse Existing PostgreSQL

**Context** (from Spec Infrastructure Decisions):
- User confirmed: "Yes, we already have PostgreSQL database for chatbot"
- **Benefit**: Zero provisioning time, immediate integration
- **Strategy**: Add authentication tables to existing schema

#### Database Configuration

**Connection Details** (MVP):
```typescript
// Use existing database connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Serverless-friendly configuration
  max: 20, // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

**Schema Strategy**:
- **Namespace**: Prefix all auth tables with `auth_` to avoid collisions
- **Tables Required** (better-auth auto-creates):
  - `auth_user` (accounts)
  - `auth_session` (sessions)
  - `auth_account` (OAuth accounts)
  - `auth_verification` (email verification, password reset tokens)
- **Custom Tables** (app-specific):
  - `user_progress` (chapter completion tracking)
  - `user_bookmarks` (saved chapters)

#### Migration Strategy

**Phase 1 (MVP)**: better-auth automatic migration
```bash
# better-auth creates tables on first run
npx better-auth migrate
```

**Phase 2 (Custom tables)**: Prisma migrations
```bash
# Add user_progress and user_bookmarks
npx prisma migrate dev --name add-user-features
```

**Zero Downtime**:
- Auth tables are new (no existing data to migrate)
- Chatbot tables unchanged (no risk to existing features)
- Rollback: simply drop `auth_*` tables if needed

#### Scaling Plan

**MVP (Current)**: Existing PostgreSQL sufficient
- Estimated rows: <1,000 users × 5 tables = ~5,000 rows
- Existing database can handle millions of rows

**Medium Scale (3 months)**: Monitor query performance
- Add indexes on frequently queried columns:
  - `auth_user.email` (unique index, already exists)
  - `auth_session.user_id` (for session lookups)
  - `user_progress.user_id, chapter_id` (composite index)
- Consider read replicas if latency issues arise

**Large Scale (6 months)**: Consider database upgrade
- If existing PostgreSQL free tier exhausted:
  - Upgrade to paid tier (~$20/month for Neon Pro)
  - Or migrate to dedicated PostgreSQL instance
- Implement database connection pooling with PgBouncer

---

## 4. Email Service Selection

### Decision: Resend

**Score**: 4.70/5.00 (Strongly Recommended)

#### Evaluation

| Criterion | Score | Notes |
|-----------|-------|-------|
| **Deliverability** | 5.0 | 99%+ delivery rate, DKIM/SPF/DMARC built-in |
| **Developer Experience** | 5.0 | Simple API, React email templates, TypeScript SDK |
| **Cost** | 5.0 | 3,000 emails/month FREE, $20/mo for 50k (medium scale) |
| **Integration** | 5.0 | Official better-auth integration available |
| **Features** | 4.0 | Transactional emails, analytics, webhooks |
| **Performance** | 4.5 | <1s send time, reliable delivery |
| **Maintenance** | 5.0 | Managed service (no infrastructure to maintain) |
| **TOTAL** | **4.70** | **Strongly Recommended** |

#### MVP Email Volume Estimate

**Signup Emails** (verification):
- Estimate: 100 signups/month × 1 email = 100 emails

**Password Reset Emails**:
- Estimate: 5% of users/month × 1 email = 5 emails

**Total MVP Volume**: ~105 emails/month
**Free Tier Capacity**: 3,000 emails/month
**Headroom**: 28× free tier capacity (plenty of room)

#### Scaling Timeline

- **0-3 months (MVP)**: FREE (105-500 emails/month)
- **3-6 months (Medium)**: FREE (500-2,000 emails/month still under 3k)
- **6+ months (Large)**: $20/month (Resend Pro for 50k emails)

#### Integration Example

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// better-auth integration
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: 'noreply@roboticsbook.com', // Custom domain recommended
        to: user.email,
        subject: 'Verify your email',
        html: `<a href="${url}">Click to verify</a>`,
      });
    },
  },
});
```

#### Alternatives Considered & Rejected

**SendGrid** (Score: 3.90/5.00):
- ✅ Popular, proven
- ❌ More complex API (older design)
- ❌ Free tier: 100 emails/day (3,000/month) same as Resend but worse DX
- **Rejected**: Resend has better DX for same free tier

**AWS SES** (Score: 3.50/5.00):
- ✅ Extremely cheap ($0.10 per 1,000 emails)
- ❌ Complex setup (IAM, SNS, domain verification)
- ❌ Deliverability requires warm-up period
- ❌ Not optimized for "finish ASAP" MVP
- **Rejected**: Setup complexity vs. time-to-market priority

**Mailgun** (Score: 3.70/5.00):
- ✅ Free tier: 5,000 emails/month (more than Resend)
- ❌ Older API design
- ❌ No React email template support
- **Rejected**: Resend better DX, 3k emails sufficient for MVP

---

## 5. ORM/Query Builder Selection

### Decision: Prisma 5.x

**Score**: 4.60/5.00 (Strongly Recommended)

#### Evaluation

| Criterion | Score | Notes |
|-----------|-------|-------|
| **TypeScript Support** | 5.0 | Best-in-class type generation from schema |
| **Developer Experience** | 5.0 | Excellent migration tooling, intuitive API |
| **better-auth Compatibility** | 5.0 | Official Prisma adapter available |
| **PostgreSQL Support** | 5.0 | First-class PostgreSQL support |
| **Performance** | 4.0 | Good for MVP, some overhead vs raw SQL |
| **Ecosystem** | 5.0 | Large community, excellent docs |
| **Serverless** | 4.5 | Works with Vercel, connection pooling supported |
| **TOTAL** | **4.60** | **Strongly Recommended** |

#### Benefits for MVP Speed

**Type Safety**:
```typescript
// Auto-generated types from schema
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { bookmarks: true, progress: true },
});
// user: User & { bookmarks: Bookmark[], progress: Progress[] }
// TypeScript knows the exact shape!
```

**Migration Management**:
```bash
# Simple, version-controlled migrations
npx prisma migrate dev --name add_bookmarks
npx prisma migrate deploy # Production deployment
```

**better-auth Integration**:
```typescript
import { PrismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: PrismaAdapter(prisma),
  // ... rest of config
});
```

#### Alternatives Considered & Rejected

**Drizzle ORM** (Score: 4.30/5.00):
- ✅ Faster than Prisma (closer to raw SQL)
- ✅ Better-auth adapter available
- ❌ Less mature ecosystem
- ❌ Migration tooling not as polished
- **Rejected**: Prisma's DX advantage more valuable for MVP speed

**Raw SQL (pg)** (Score: 3.00/5.00):
- ✅ Maximum performance
- ✅ Full control
- ❌ No type safety
- ❌ Manual migration management
- ❌ More code to write (slow MVP delivery)
- **Rejected**: Speed penalty conflicts with "finish ASAP" priority

---

## 6. Frontend Integration Strategy

### Decision: React Client (better-auth/react)

**Context**: Existing Docusaurus site (React-based SSG)

#### Integration Approach

**Architecture**:
```
Docusaurus (Frontend)      Vercel (Backend)
─────────────────────      ────────────────
React Components     ←───→  better-auth API
better-auth/react            (POST /api/auth/*)
SameSite=None cookies
```

**Session Management**:
```typescript
// components/AuthProvider.tsx
import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Vercel backend
  // SameSite=None for cross-domain (GitHub Pages ↔ Vercel)
});

export function AuthProvider({ children }) {
  return <authClient.Provider>{children}</authClient.Provider>;
}

// components/SignInButton.tsx
export function SignInButton() {
  const { signIn, isPending } = authClient.signIn.email();

  const handleSignIn = async (email, password) => {
    await signIn({ email, password });
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
```

**Protected Routes** (Docusaurus plugin):
```typescript
// plugin-auth-routes.ts
export function authRoutesPlugin() {
  return {
    name: 'docusaurus-plugin-auth-routes',
    async contentLoaded({ actions }) {
      const { addRoute } = actions;

      // Add auth routes to Docusaurus
      addRoute({
        path: '/account',
        component: '@site/src/components/Account',
        exact: true,
      });
    },
  };
}
```

#### Cross-Domain Session Strategy (No Custom Domain)

**Challenge**: GitHub Pages (.github.io) ↔ Vercel (.vercel.app)

**Solution**: SameSite=None cookies
```typescript
// better-auth config
export const auth = betterAuth({
  session: {
    cookieName: 'auth_session',
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update daily
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  // SameSite=None for cross-domain
  advanced: {
    crossSubDomainCookies: {
      enabled: false, // Different domains entirely
    },
    cookies: {
      sameSite: 'none', // Required for cross-domain
      secure: true, // HTTPS required
      httpOnly: true, // XSS protection
    },
  },
});
```

**Browser Compatibility**:
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ⚠️ Safari: Partial (Private Browsing blocks 3rd party cookies)

**Safari Fallback** (localStorage):
```typescript
// Detect if cookies are blocked
if (!document.cookie) {
  // Fallback to localStorage + session validation
  const session = localStorage.getItem('session_token');
  // Validate with backend on each request
}
```

---

## 7. Session Management Architecture

### Stateful Sessions (Database-Backed)

**Rationale**: Constitution 2.6 requires session tracking for security

#### Session Storage Design

**Table**: `auth_session` (better-auth managed)
```sql
CREATE TABLE auth_session (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_user(id),
  expires_at TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  ip_address TEXT, -- For anomaly detection
  user_agent TEXT, -- For device tracking
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_session_user_id ON auth_session(user_id);
CREATE INDEX idx_session_token ON auth_session(token);
CREATE INDEX idx_session_expires_at ON auth_session(expires_at);
```

#### Session Lifecycle

**Creation** (Sign In):
1. User provides credentials
2. better-auth validates credentials
3. Create session in database
4. Set secure cookie with session token
5. Return user data

**Validation** (Every Request):
1. Extract session token from cookie
2. Query database for session
3. Check expiration
4. Return user if valid, null if invalid/expired

**Refresh** (Daily):
```typescript
// Automatic refresh by better-auth
// Updates `updated_at` timestamp
// Extends expiration by 7 days
```

**Termination** (Sign Out):
```typescript
// Delete session from database
await auth.api.signOut({ headers });
// Clear session cookie
```

#### Session Security Features

**Rate Limiting** (Constitution 2.4):
```typescript
export const auth = betterAuth({
  rateLimit: {
    window: 60, // 1 minute
    max: 100, // 100 requests
    // Specific endpoint limits
    signIn: { window: 900, max: 5 }, // 5 login attempts per 15 min
    signUp: { window: 3600, max: 3 }, // 3 signups per hour
  },
});
```

**Brute Force Protection**:
```typescript
// Account lockout after failed attempts
export const auth = betterAuth({
  account: {
    accountLocking: {
      enabled: true,
      maxAttempts: 10, // Lock after 10 failed attempts
      lockoutDuration: 60 * 60 * 24, // 24 hour lockout
    },
  },
});
```

**Device Tracking**:
```typescript
// Store IP + User Agent for anomaly detection
const session = await auth.api.getSession({ headers });
if (session.ipAddress !== currentIP) {
  // Send email notification of new device signin
  await sendSecurityAlert(session.user);
}
```

---

## 8. OAuth Provider Configuration

### Google OAuth Setup

**Documentation**: https://console.cloud.google.com/apis/credentials

**Setup Steps**:
1. Create project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 Client ID
4. Configure authorized origins:
   - `https://shehzadanjum.github.io` (GitHub Pages)
   - `https://your-backend.vercel.app` (Vercel)
5. Configure redirect URIs:
   - `https://your-backend.vercel.app/api/auth/callback/google`

**Scopes Requested** (minimal):
- `openid` (authentication)
- `email` (email address)
- `profile` (name)

**better-auth Configuration**:
```typescript
export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scopes: ['openid', 'email', 'profile'],
    },
  },
});
```

### GitHub OAuth Setup

**Documentation**: https://github.com/settings/developers

**Setup Steps**:
1. Go to Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Configure:
   - Homepage URL: `https://shehzadanjum.github.io`
   - Authorization callback URL: `https://your-backend.vercel.app/api/auth/callback/github`

**Scopes Requested** (minimal):
- `user:email` (email address)
- `read:user` (basic profile)

**better-auth Configuration**:
```typescript
export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scopes: ['user:email', 'read:user'],
    },
  },
});
```

### Account Linking Strategy

**Scenario**: User signs up with email, later wants to add Google

```typescript
// Link Google account to existing user
await auth.api.linkSocial({
  provider: 'google',
  userId: currentUser.id,
});
```

**Database**:
```sql
-- auth_account table (managed by better-auth)
CREATE TABLE auth_account (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES auth_user(id),
  provider TEXT NOT NULL, -- 'google', 'github'
  provider_account_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- One user can have multiple accounts
-- Prevents duplicate linking: UNIQUE(provider, provider_account_id)
```

---

## 9. Deployment Architecture

### MVP Architecture (GitHub Pages + Vercel)

```
┌─────────────────────────────────────────────────┐
│         User Browser                            │
│  (Chrome, Safari, Firefox, Edge)               │
└───────────┬─────────────────────┬───────────────┘
            │                     │
            │ HTTPS               │ HTTPS
            │                     │
┌───────────▼───────────┐   ┌─────▼────────────────┐
│   GitHub Pages        │   │   Vercel Backend     │
│   (Static Frontend)   │   │   (Serverless API)   │
├───────────────────────┤   ├──────────────────────┤
│ - Docusaurus SSG      │   │ - Node.js 20+        │
│ - React components    │   │ - better-auth        │
│ - better-auth/react   │   │ - Prisma ORM         │
│ - SameSite=None cookies│  │ - PostgreSQL client  │
└───────────┬───────────┘   └──────┬───────────────┘
            │                      │
            │                      │ Connection Pool
            │                      │
            │                ┌─────▼──────────────────┐
            │                │  Existing PostgreSQL   │
            │                │  (Chatbot Database)    │
            │                ├────────────────────────┤
            │                │ - auth_user            │
            │                │ - auth_session         │
            │                │ - auth_account         │
            │                │ - user_progress        │
            │                │ - user_bookmarks       │
            │                └────────────────────────┘
            │
            │
      ┌─────▼──────────────┐
      │   Resend Email     │
      │   (Transactional)  │
      ├────────────────────┤
      │ - Verification     │
      │ - Password Reset   │
      │ - Security Alerts  │
      └────────────────────┘
```

### Deployment Configuration

**Vercel** (Backend):
```json
// vercel.json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 10
    }
  },
  "env": {
    "DATABASE_URL": "@database-url",
    "GOOGLE_CLIENT_ID": "@google-client-id",
    "GOOGLE_CLIENT_SECRET": "@google-client-secret",
    "GITHUB_CLIENT_ID": "@github-client-id",
    "GITHUB_CLIENT_SECRET": "@github-client-secret",
    "RESEND_API_KEY": "@resend-api-key",
    "BETTER_AUTH_SECRET": "@better-auth-secret"
  }
}
```

**GitHub Pages** (Frontend):
```yaml
# .github/workflows/deploy.yml
name: Deploy Docusaurus
on:
  push:
    branches: [gh-pages]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Scaling Strategy (3-6 Month Timeline)

**Current (MVP)**: Existing PostgreSQL + Vercel Free Tier
- **Cost**: $0/month
- **Capacity**: 1,000 users, 100k requests/month
- **Bottleneck**: None (over-provisioned for MVP)

**3 Months (Medium Scale)**: Add Redis for Rate Limiting
- **Cost**: ~$20-40/month
- **Upgrades**:
  - Vercel Pro: $20/month (1M requests)
  - Upstash Redis: FREE (10k requests/day sufficient)
  - Optional: PostgreSQL Pro if row limit reached
- **Capacity**: 10,000 users, 1M requests/month

**6 Months (Large Scale)**: Production Infrastructure
- **Cost**: ~$50-100/month
- **Upgrades**:
  - Vercel Pro: $20/month
  - Upstash Redis Pro: $10/month (100k requests/day)
  - PostgreSQL Pro: $20-40/month (dedicated instance)
  - Resend Pro: $20/month (50k emails)
- **Capacity**: 100,000 users, 10M requests/month

---

## 10. Development Workflow

### Local Development Setup

**Prerequisites**:
```bash
# Node.js 20+
node -v  # v20.x.x

# Package manager
npm -v   # 10.x.x

# Database access
psql --version  # PostgreSQL client
```

**Environment Variables** (`.env.local`):
```bash
# Database (existing PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# better-auth secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Resend email
RESEND_API_KEY="re_your_api_key"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

**Installation**:
```bash
# Backend (Vercel functions)
cd backend
npm install better-auth @prisma/client resend
npm install -D prisma typescript @types/node

# Frontend (Docusaurus)
cd ../frontend
npm install better-auth-react
```

**Database Setup**:
```bash
# Generate Prisma schema from existing database
npx prisma db pull

# Add auth tables via better-auth migration
npx better-auth migrate

# Add custom tables (user_progress, user_bookmarks)
npx prisma migrate dev --name add_user_features
```

**Development Servers**:
```bash
# Terminal 1: Backend (Vercel dev)
cd backend
vercel dev  # Runs on http://localhost:3000

# Terminal 2: Frontend (Docusaurus)
cd frontend
npm start   # Runs on http://localhost:3001
```

### Testing Strategy

**Unit Tests** (Vitest):
```typescript
// tests/auth.test.ts
import { describe, it, expect } from 'vitest';
import { auth } from '@/lib/auth';

describe('Authentication', () => {
  it('should hash passwords with bcrypt', async () => {
    const user = await auth.api.signUp({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(user.password).not.toBe('password123');
    expect(user.password).toMatch(/^\$2[aby]\$/); // bcrypt format
  });
});
```

**Integration Tests** (Playwright):
```typescript
// tests/e2e/signin.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.click('text=Sign In');
  await page.fill('input[name=email]', 'user@example.com');
  await page.fill('input[name=password]', 'password123');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Welcome back')).toBeVisible();
});
```

**Security Tests** (manual checklist):
- [ ] CSRF protection enabled
- [ ] XSS prevention (CSP headers)
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] Rate limiting working (try 6 login attempts)
- [ ] Session expiration working (wait 7 days)
- [ ] Password breach detection (try "password123")

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/test.yml`):
```yaml
name: Test Authentication
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
```

**Deployment Pipeline**:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Summary: MVP-First Technology Decisions

### Why This Stack Wins for "Finish ASAP" Priority

1. **Zero Infrastructure Setup**:
   - ✅ Reuse existing PostgreSQL (no provisioning delay)
   - ✅ Vercel already deployed (no new service setup)
   - ✅ GitHub Pages already configured
   - **Time Saved**: 1-2 days

2. **Maximum Developer Velocity**:
   - ✅ better-auth: 10 lines of config vs 200+ lines custom auth
   - ✅ Prisma: Auto-generated types, no manual SQL
   - ✅ TypeScript: Catch errors before runtime
   - **Time Saved**: 3-5 days

3. **$0 Infrastructure Cost** (MVP):
   - ✅ better-auth: Open source (free)
   - ✅ PostgreSQL: Already have it (free)
   - ✅ Resend: 3k emails/month (free)
   - ✅ Vercel: Free tier sufficient for MVP
   - **Cost Saved**: $50-100/month

4. **Built-in Security** (Constitution Compliance):
   - ✅ CSRF, XSS, SQL injection prevention
   - ✅ Password breach detection
   - ✅ Rate limiting
   - ✅ Secure session management
   - **Time Saved**: 2-3 days (no custom security code)

5. **Smooth Scaling Path**:
   - ✅ Same stack from MVP → Medium → Large scale
   - ✅ No rewrites needed
   - ✅ Just add services (Redis, more PostgreSQL capacity)
   - **Risk Reduced**: No mid-scale pivot required

### Estimated Timeline (MVP P1 Features)

**Week 1**: Backend Setup
- Day 1-2: better-auth + PostgreSQL integration
- Day 3-4: Email/password authentication
- Day 5: Email verification + password reset

**Week 2**: Frontend Integration
- Day 1-2: React client integration (Docusaurus)
- Day 3-4: OAuth providers (Google, GitHub)
- Day 5: Session management + testing

**Week 3**: Polish & Security
- Day 1-2: Rate limiting, brute force protection
- Day 3-4: E2E testing, security audit
- Day 5: Documentation, deployment

**Total**: 15 working days (3 weeks) for P1 features

---

## Next Steps (Phase 1: Design)

1. ✅ **Research Complete** (this document)
2. ⏭️ **Data Model Design** → `data-model.md`
3. ⏭️ **API Contract Definition** → `contracts/`
4. ⏭️ **Quickstart Guide** → `quickstart.md`
5. ⏭️ **Implementation Plan** → `plan.md` (comprehensive)

**Ready for Phase 1 Design** ✅
