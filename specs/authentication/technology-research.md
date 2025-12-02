# Authentication Technology Research
## Collected Research for Specification Phase

---

## Document Information

**Purpose**: Technology evaluation research for authentication feature
**Created**: 2025-12-02
**Status**: Research Collection
**Usage**: Input for Specification phase technology selection
**Source**: Extracted from constitution-authentication.md v1.0.0

**Note**: This document contains technology-specific research that was appropriately removed from the constitution. Use this as **input** for technology evaluation in the Specification phase, not as final decisions.

---

## Table of Contents

1. [Authentication Framework Research](#1-authentication-framework-research)
2. [Database System Research](#2-database-system-research)
3. [Email Service Research](#3-email-service-research)
4. [OAuth Provider Research](#4-oauth-provider-research)
5. [Deployment Platform Research](#5-deployment-platform-research)
6. [Code Examples & Templates](#6-code-examples--templates)
7. [Environment Configuration](#7-environment-configuration)
8. [Architecture Diagrams](#8-architecture-diagrams)

---

## 1. Authentication Framework Research

### 1.1 better-auth (Primary Candidate)

**Official Documentation**: https://www.better-auth.com
**GitHub**: https://github.com/better-auth/better-auth
**Context7 Research**: 1754 code snippets, 85.5 benchmark score

#### Strengths

**Security Features (Built-in):**
- ✅ Automatic CSRF protection
- ✅ Secure cookie handling (httpOnly, sameSite flags)
- ✅ Bcrypt password hashing (configurable work factor)
- ✅ Comprehensive rate limiting
- ✅ Password breach checking (HaveIBeenPwned integration)
- ✅ Session validation on every request

**Technical Features:**
- ✅ Framework-agnostic (works with Vercel serverless, Next.js, Express, Elysia, Nitro)
- ✅ TypeScript-first (full type safety)
- ✅ PostgreSQL support (Neon compatible)
- ✅ Active maintenance (v1.3.4 as of 2025-12)
- ✅ Comprehensive plugin ecosystem (2FA, passkeys, organizations, Stripe)
- ✅ Production-ready (85.5 benchmark score, High source reputation)
- ✅ Prisma adapter available
- ✅ Drizzle adapter available

**Developer Experience:**
- ✅ Excellent documentation (1754 code examples)
- ✅ Modern API design
- ✅ React client library available
- ✅ Easy OAuth integration (Google, GitHub, Microsoft, Apple, Discord)
- ✅ Email/password authentication
- ✅ Magic link support (plugin)
- ✅ Passkey support (plugin)

**Cost:**
- ✅ Open source (MIT license)
- ✅ Self-hosted (no vendor fees)
- ✅ No per-user pricing

**Compatibility:**
- ✅ Works with Vercel serverless functions
- ✅ PostgreSQL/Neon compatible
- ✅ Supports connection pooling (serverless-friendly)
- ✅ CORS-friendly for cross-domain setups

#### Example: Basic Setup with PostgreSQL

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  rateLimit: {
    enabled: true,
    window: 60, // seconds
    max: 10, // requests
  },
});
```

#### Example: Prisma Adapter Setup

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: { enabled: true },
});
```

#### Example: React Client Setup

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Usage in components
import { authClient } from "@/lib/auth-client";

// Sign up
await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Social sign in
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
});

// Get session
const { data: session } = await authClient.useSession();
```

#### Weaknesses/Considerations

- ⚠️ Relatively new (less mature than NextAuth.js or Auth0)
- ⚠️ Smaller community compared to established solutions
- ⚠️ Less third-party integrations than commercial solutions
- ⚠️ Documentation still growing (though already extensive)

---

### 1.2 Alternatives Considered

#### NextAuth.js

**Strengths:**
- ✅ Mature, battle-tested (used by thousands of apps)
- ✅ Excellent Next.js integration
- ✅ Large community and ecosystem
- ✅ Comprehensive OAuth provider support
- ✅ Free and open source

**Weaknesses:**
- ❌ Tightly coupled to Next.js (harder with pure Vercel serverless)
- ❌ Less type-safe than better-auth
- ❌ More complex configuration
- ❌ Session management more complex

**Verdict**: Good for Next.js apps, but current project uses Docusaurus frontend

---

#### Auth0

**Strengths:**
- ✅ Enterprise-grade security
- ✅ Comprehensive features (SSO, MFA, anomaly detection)
- ✅ Excellent documentation
- ✅ Managed service (no infrastructure to maintain)
- ✅ Compliance certifications (SOC2, GDPR)

**Weaknesses:**
- ❌ Expensive ($240+/year for 7500 users)
- ❌ Vendor lock-in
- ❌ Less customizable than self-hosted
- ❌ Overkill for MVP

**Verdict**: Consider for enterprise scale, too expensive for MVP

---

#### Supabase Auth

**Strengths:**
- ✅ Integrated with Supabase database
- ✅ Real-time features
- ✅ Good documentation
- ✅ Free tier generous
- ✅ Row-level security built-in

**Weaknesses:**
- ❌ Requires using Supabase database (want to use Neon)
- ❌ Less flexible than standalone auth solutions
- ❌ Tight coupling to Supabase ecosystem

**Verdict**: Good for Supabase users, but we want database flexibility

---

#### Clerk

**Strengths:**
- ✅ Beautiful pre-built UI components
- ✅ Excellent developer experience
- ✅ Comprehensive features (organizations, RBAC)
- ✅ Modern API design

**Weaknesses:**
- ❌ Expensive at scale ($25/month starts at 5000 MAU)
- ❌ Vendor lock-in
- ❌ Less customizable UI than self-hosted
- ❌ Limited free tier

**Verdict**: Great DX, but costly at scale and less customizable

---

### 1.3 Recommendation Matrix

| Criteria | better-auth | NextAuth.js | Auth0 | Supabase Auth | Clerk |
|----------|------------|-------------|-------|---------------|-------|
| **Security** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Compatibility** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Developer Experience** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Cost (Free/MVP)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Cost (Scale)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Maintenance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Features** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **TypeScript** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Total** | **44/45** | **37/45** | **36/45** | **37/45** | **38/45** |

**Top Recommendation**: **better-auth** for this project

---

## 2. Database System Research

### 2.1 Neon (PostgreSQL Serverless) - Primary Candidate

**Official Site**: https://neon.tech
**Type**: Serverless PostgreSQL

#### Strengths

**Technical Features:**
- ✅ Serverless PostgreSQL (auto-scaling)
- ✅ Built-in connection pooling (serverless-friendly)
- ✅ Branching (database per PR/environment)
- ✅ Instant database provisioning
- ✅ Point-in-time recovery
- ✅ Automated backups
- ✅ Encryption at rest
- ✅ Low latency (global edge)

**Cost:**
- ✅ Generous free tier:
  - 100k rows
  - 3GB storage
  - 1 project
  - Unlimited databases
  - Community support
- ✅ Affordable paid tier ($20/month):
  - Unlimited rows
  - 50GB storage
  - 10 projects
  - Email support

**Developer Experience:**
- ✅ Standard PostgreSQL (no proprietary SQL)
- ✅ Works with Prisma, Drizzle, Sequelize
- ✅ Connection string compatible
- ✅ CLI tools available
- ✅ GitHub integration
- ✅ Vercel integration

**Security:**
- ✅ TLS/SSL encryption
- ✅ IP allowlisting
- ✅ Database credentials rotation
- ✅ SOC2 Type II compliant

#### Example: Connection Setup

```typescript
// Using connection pooling (recommended for serverless)
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  max: 10, // connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
```

#### Example: Prisma Configuration

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  passwordHash  String
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([expiresAt])
}
```

#### Environment Variables

```env
# Neon PostgreSQL connection
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"

# Optional: Direct connection (for migrations)
DATABASE_URL_UNPOOLED="postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"
```

#### Weaknesses/Considerations

- ⚠️ Relatively new service (less mature than AWS RDS)
- ⚠️ Free tier limits (100k rows) - may need upgrade for growth
- ⚠️ US/EU regions only (no Asia-Pacific yet)
- ⚠️ Cold start latency on free tier (first query after idle)

---

### 2.2 Alternatives Considered

#### Supabase (PostgreSQL with extras)

**Strengths:**
- ✅ PostgreSQL + real-time + auth + storage
- ✅ Generous free tier (500MB database, 1GB bandwidth)
- ✅ Built-in auth (Supabase Auth)
- ✅ Row-level security
- ✅ Auto-generated APIs

**Weaknesses:**
- ❌ Couples database with other services
- ❌ Less flexible if we want different auth solution
- ❌ Heavier than just a database

**Verdict**: Great all-in-one, but we want flexibility

---

#### PlanetScale (MySQL serverless)

**Strengths:**
- ✅ Serverless MySQL (Vitess)
- ✅ Excellent branching workflow
- ✅ No downtime schema changes
- ✅ Generous free tier (5GB storage, 1B row reads/month)

**Weaknesses:**
- ❌ MySQL, not PostgreSQL (less compatible with many tools)
- ❌ Prisma foreign key limitations with PlanetScale
- ❌ Better-auth designed for PostgreSQL

**Verdict**: Innovative, but PostgreSQL more compatible

---

#### AWS RDS (PostgreSQL)

**Strengths:**
- ✅ Industry standard, battle-tested
- ✅ Full PostgreSQL feature set
- ✅ High availability options
- ✅ Extensive monitoring and tooling

**Weaknesses:**
- ❌ No free tier (minimum ~$15/month)
- ❌ Manual scaling configuration
- ❌ More complex setup than serverless
- ❌ Connection pooling requires RDS Proxy ($0.015/hour)

**Verdict**: Excellent for production scale, overkill for MVP

---

#### Railway (PostgreSQL)

**Strengths:**
- ✅ Simple setup
- ✅ $5 free credit/month
- ✅ Good developer experience
- ✅ PostgreSQL, Redis, etc.

**Weaknesses:**
- ❌ Less generous free tier than Neon
- ❌ Smaller scale support
- ❌ Less mature than AWS/Neon

**Verdict**: Good alternative, but Neon better for serverless

---

### 2.3 Recommendation Matrix

| Criteria | Neon | Supabase | PlanetScale | AWS RDS | Railway |
|----------|------|----------|-------------|---------|---------|
| **PostgreSQL** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ MySQL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Serverless** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Free Tier** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐ |
| **Compatibility** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **DX** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Scaling** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Total** | **29/30** | **27/30** | **22/30** | **20/30** | **24/30** |

**Top Recommendation**: **Neon** for serverless PostgreSQL

---

## 3. Email Service Research

### 3.1 Resend (Primary Candidate)

**Official Site**: https://resend.com
**Type**: Transactional email API

#### Strengths

**Developer Experience:**
- ✅ Modern, developer-friendly API
- ✅ React Email template integration
- ✅ TypeScript SDK
- ✅ Excellent documentation
- ✅ Webhook support
- ✅ Email testing in development

**Cost:**
- ✅ Free tier: 100 emails/day (3000/month)
- ✅ Paid tier: $20/month for 50,000 emails
- ✅ No pay-per-email until you exceed tier

**Features:**
- ✅ Transactional email focus
- ✅ Domain verification (SPF, DKIM, DMARC)
- ✅ Email analytics (delivery, opens, clicks)
- ✅ Email templates
- ✅ Attachments support
- ✅ Batch sending

**Deliverability:**
- ✅ High deliverability rate
- ✅ Built on AWS SES infrastructure
- ✅ Bounce and complaint handling
- ✅ Reputation monitoring

#### Example: Basic Setup

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  verificationUrl: string
) {
  await resend.emails.send({
    from: 'AI Robotics Book <noreply@yourbook.com>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to AI Robotics Book!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
  });
}
```

#### Example: React Email Template

```tsx
// emails/verification-email.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  verificationUrl: string;
  userName?: string;
}

export default function VerificationEmail({
  verificationUrl,
  userName = 'there',
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to get started</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to AI Robotics Book!</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>
            Thank you for signing up. Please verify your email address to start
            learning robotics and AI.
          </Text>
          <Button style={button} href={verificationUrl}>
            Verify Email
          </Button>
          <Text style={footer}>
            This link expires in 24 hours. If you didn't create an account,
            you can safely ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px' };
const h1 = { fontSize: '24px', fontWeight: 'bold', margin: '40px 0' };
const text = { fontSize: '16px', lineHeight: '26px' };
const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  padding: '12px 24px',
  textDecoration: 'none',
};
const footer = { color: '#8898aa', fontSize: '12px', lineHeight: '16px' };
```

#### Environment Variables

```env
# Resend API
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM_ADDRESS=noreply@yourbook.com
EMAIL_FROM_NAME=AI Robotics Book
```

#### Weaknesses/Considerations

- ⚠️ Relatively new service (founded 2023)
- ⚠️ Smaller than SendGrid/Mailgun (but growing fast)
- ⚠️ Free tier daily limit (100/day) - may need upgrade quickly

---

### 3.2 Alternatives Considered

#### SendGrid

**Strengths:**
- ✅ Established player (by Twilio)
- ✅ Free tier: 100 emails/day
- ✅ Comprehensive features
- ✅ Marketing email support
- ✅ Extensive integrations

**Weaknesses:**
- ❌ More complex API than Resend
- ❌ UI cluttered with marketing features
- ❌ Less modern developer experience
- ❌ Account approval can be slow

**Verdict**: Solid choice, but Resend has better DX

---

#### Amazon SES (Simple Email Service)

**Strengths:**
- ✅ Very cost-effective ($0.10 per 1000 emails)
- ✅ High deliverability
- ✅ Scales infinitely
- ✅ AWS ecosystem integration

**Weaknesses:**
- ❌ More complex setup (IAM, SES verification, etc.)
- ❌ No built-in templates
- ❌ Sandbox mode restrictions initially
- ❌ Less developer-friendly than Resend

**Verdict**: Best for high volume, overkill for MVP

---

#### Mailgun

**Strengths:**
- ✅ Established service (by Sinch)
- ✅ Good deliverability
- ✅ Comprehensive API
- ✅ Free tier: 100 emails/day (first month 5000)

**Weaknesses:**
- ❌ UI less intuitive than Resend
- ❌ Free tier verification required
- ❌ Less modern than Resend

**Verdict**: Reliable, but Resend more developer-friendly

---

#### Postmark

**Strengths:**
- ✅ Excellent deliverability (focus on transactional)
- ✅ Fast delivery times
- ✅ Good documentation
- ✅ Template support

**Weaknesses:**
- ❌ No free tier (starts at $15/month for 10k emails)
- ❌ More expensive than alternatives
- ❌ Smaller feature set

**Verdict**: Premium choice, but paid only

---

#### Gmail SMTP

**Strengths:**
- ✅ Completely free
- ✅ Easy setup
- ✅ Good deliverability (for low volume)

**Weaknesses:**
- ❌ 500 emails/day limit
- ❌ Risk of account suspension if flagged as bulk sender
- ❌ No analytics or webhooks
- ❌ Not designed for transactional email
- ❌ Not professional

**Verdict**: Development only, not for production

---

### 3.3 Recommendation Matrix

| Criteria | Resend | SendGrid | AWS SES | Mailgun | Postmark | Gmail |
|----------|--------|----------|---------|---------|----------|-------|
| **Developer Experience** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Cost (Free/MVP)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Cost (Scale)** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ |
| **Deliverability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Features** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Modern API** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **Template System** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ |
| **Total** | **33/35** | **27/35** | **23/35** | **27/35** | **24/35** | **13/35** |

**Top Recommendation**: **Resend** for modern DX and React Email integration

---

## 4. OAuth Provider Research

### 4.1 Provider Selection Strategy

**Criteria for Selection:**
1. **User Demographics**: Student audience for robotics/AI learning
2. **Signup Conversion**: Reduce friction with familiar providers
3. **Security & Reliability**: Established OAuth implementations
4. **Developer Experience**: Easy integration, good documentation
5. **Cost**: Free OAuth services

### 4.2 Google OAuth (Priority 1)

**Rationale:**
- ✅ Highest adoption among students (Gmail for education)
- ✅ Single Sign-On (SSO) for Google Workspace users
- ✅ High trust and recognition
- ✅ Excellent documentation
- ✅ Free OAuth service

**Setup Process:**
1. Go to Google Cloud Console: https://console.cloud.google.com
2. Create new project or select existing
3. Enable Google+ API (or Google Identity)
4. Navigate to "APIs & Services" > "Credentials"
5. Create OAuth 2.0 Client ID
6. Application type: "Web application"
7. Add authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
8. Copy Client ID and Client Secret

**Scopes Needed:**
- `openid` (required)
- `email` (required for email verification)
- `profile` (optional: name, picture)

**Example Configuration:**

```typescript
// better-auth configuration
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // Optional: request offline access for refresh tokens
    accessType: "offline",
    // Optional: force consent screen every time
    prompt: "consent",
  }
}
```

**User Data Retrieved:**
```json
{
  "id": "1234567890",
  "email": "user@gmail.com",
  "verified_email": true,
  "name": "John Doe",
  "given_name": "John",
  "family_name": "Doe",
  "picture": "https://lh3.googleusercontent.com/...",
  "locale": "en"
}
```

---

### 4.3 GitHub OAuth (Priority 2)

**Rationale:**
- ✅ Developer audience (robotics often involves coding)
- ✅ High trust in tech community
- ✅ Access to GitHub profile (useful for identifying skill level)
- ✅ Simple OAuth flow
- ✅ Free OAuth service

**Setup Process:**
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in application details:
   - Application name: "AI Robotics Book"
   - Homepage URL: `https://yourdomain.com`
   - Authorization callback URL: `https://yourdomain.com/api/auth/callback/github`
4. Click "Register application"
5. Copy Client ID
6. Generate Client Secret

**Scopes Needed:**
- `user:email` (read email addresses)
- `read:user` (read basic profile info)

**Example Configuration:**

```typescript
// better-auth configuration
socialProviders: {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }
}
```

**User Data Retrieved:**
```json
{
  "id": 12345678,
  "login": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "avatar_url": "https://avatars.githubusercontent.com/u/12345678",
  "bio": "Full-stack developer",
  "location": "San Francisco, CA",
  "public_repos": 42,
  "followers": 123
}
```

---

### 4.4 Other Providers (Future Consideration)

#### Microsoft OAuth

**Rationale:**
- ✅ Educational institutions use Microsoft 365
- ✅ Azure AD integration for schools
- ✅ Professional user base

**Consideration**: Add if targeting university/corporate users

---

#### Apple Sign-In

**Rationale:**
- ✅ iOS/macOS users expect it
- ✅ Privacy-focused (email relay)
- ✅ Required for iOS apps with third-party login

**Consideration**: Add if building mobile app

---

#### Discord OAuth

**Rationale:**
- ✅ Gaming/tech community overlap
- ✅ Young demographic

**Consideration**: Lower priority than Google/GitHub

---

### 4.5 Not Recommended

#### Facebook Login
- ❌ Declining trust among students
- ❌ Privacy concerns
- ❌ Complex OAuth setup
- ❌ Frequent API changes

#### Twitter/X Login
- ❌ High platform volatility
- ❌ API access restrictions
- ❌ Uncertain future

---

### 4.6 Recommendation Summary

**Phase 1 (MVP):**
1. ✅ **Google OAuth** (highest priority)
2. ✅ **GitHub OAuth** (secondary priority)

**Phase 2 (Enhancement):**
3. 🔄 Microsoft OAuth (if educational institution demand)
4. 🔄 Apple Sign-In (if mobile app planned)

**Not Recommended:**
- ❌ Facebook, Twitter/X

---

## 5. Deployment Platform Research

### 5.1 Current Architecture

**Frontend**: GitHub Pages (Docusaurus static site)
**Backend**: Vercel (serverless functions)
**Challenge**: Cross-domain authentication (different origins)

### 5.2 Frontend Hosting (GitHub Pages)

**Current Setup:**
- ✅ Free static hosting
- ✅ Global CDN
- ✅ HTTPS enabled (custom domain supported)
- ✅ GitHub Actions integration
- ✅ Zero configuration for Docusaurus

**Domain**: `https://shehzadanjum.github.io/robotics_book/`

**Strengths:**
- ✅ Cost: $0
- ✅ Deployment: Automatic on push
- ✅ Reliability: GitHub's infrastructure
- ✅ No vendor lock-in (can migrate easily)

**Considerations for Auth:**
- ⚠️ Different domain than backend (CORS required)
- ⚠️ No server-side rendering (all client-side)
- ⚠️ No API routes (must use external backend)

---

### 5.3 Backend Hosting (Vercel Serverless)

**Current Setup:**
- ✅ Serverless functions (Node.js 20+)
- ✅ Auto-scaling
- ✅ Global edge network
- ✅ Zero configuration deployments
- ✅ Environment variables support

**Domain**: `https://airobobookmagic.vercel.app`

**Strengths:**
- ✅ Free tier: 100 GB bandwidth, 100k function invocations
- ✅ Fast cold starts
- ✅ Automatic HTTPS
- ✅ Git integration
- ✅ Preview deployments

**Considerations for Auth:**
- ⚠️ Serverless execution (connection pooling essential)
- ⚠️ Different domain than frontend (CORS required)
- ⚠️ Stateless functions (session must be in database/cookies)

---

### 5.4 Cross-Domain Architecture

**Current Setup:**
```
Frontend: https://shehzadanjum.github.io
Backend:  https://airobobookmagic.vercel.app
```

**Challenge**: Different origins = CORS + cookie configuration

**Solutions:**

#### Option 1: SameSite=None Cookies (Recommended for MVP)

**Implementation:**
```typescript
// better-auth cookie configuration
session: {
  cookieOptions: {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'none', // Allow cross-site cookies
    domain: undefined, // Don't share across subdomains
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  }
}
```

**CORS Headers:**
```typescript
res.setHeader('Access-Control-Allow-Credentials', 'true');
res.setHeader('Access-Control-Allow-Origin', 'https://shehzadanjum.github.io');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
```

**Pros:**
- ✅ No infrastructure changes needed
- ✅ Works immediately
- ✅ Standard approach

**Cons:**
- ⚠️ Safari/iOS may block third-party cookies
- ⚠️ Privacy-focused browsers may block
- ⚠️ User must allow cookies

---

#### Option 2: Custom Domain (Recommended for Production)

**Implementation:**
```
Frontend: https://learn.roboticsbook.io (GitHub Pages)
Backend:  https://api.roboticsbook.io (Vercel)
```

**Cookie Configuration:**
```typescript
session: {
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // Can use lax with same root domain
    domain: '.roboticsbook.io', // Share across subdomains
    path: '/',
  }
}
```

**Pros:**
- ✅ Better cookie support (shared domain)
- ✅ Professional appearance
- ✅ Less likely to be blocked by browsers
- ✅ SEO benefits

**Cons:**
- ❌ Cost: ~$12/year for domain
- ❌ DNS configuration required
- ❌ Additional setup complexity

---

#### Option 3: API Proxy (Alternative)

**Implementation:**
```
All requests go through GitHub Pages
GitHub Pages proxies /api/* to Vercel
```

**Setup**: Use GitHub Actions or Cloudflare Workers as proxy

**Pros:**
- ✅ Same origin (no CORS)
- ✅ Simpler cookie handling

**Cons:**
- ❌ Additional complexity
- ❌ Extra latency (double hop)
- ❌ More infrastructure to maintain

---

### 5.5 Recommendation

**MVP (Current):**
- ✅ Keep GitHub Pages + Vercel
- ✅ Use SameSite=None cookies
- ✅ Implement fallback for cookie-blocked browsers

**Production (Future):**
- ✅ Acquire custom domain
- ✅ Configure DNS for subdomain sharing
- ✅ Use SameSite=Lax cookies
- ✅ Better SEO and branding

---

## 6. Code Examples & Templates

### 6.1 Vercel API Route Template (Protected)

```typescript
// api/user/profile.ts
import { auth } from '@/lib/auth';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.FRONTEND_URL || 'https://shehzadanjum.github.io'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authenticate request
  const session = await auth.api.getSession({ headers: req.headers as any });

  if (!session || !session.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'You must be logged in to access this resource'
    });
  }

  // Route logic
  try {
    if (req.method === 'GET') {
      // Get user profile
      const user = session.user;
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
      });
    }

    if (req.method === 'PATCH') {
      // Update user profile
      const { name } = req.body;

      if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid name' });
      }

      // Update user in database
      // ... (implementation depends on ORM)

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    });
  }
}
```

---

### 6.2 React Auth Context Template

```typescript
// contexts/AuthContext.tsx
import { createAuthClient } from 'better-auth/client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://airobobookmagic.vercel.app',
});

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: typeof authClient.signIn;
  signOut: typeof authClient.signOut;
  signUp: typeof authClient.signUp;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load session on mount
    authClient
      .getSession()
      .then((session) => {
        if (session?.user) {
          setUser(session.user as User);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const value = {
    user,
    loading,
    error,
    signIn: authClient.signIn,
    signOut: async () => {
      await authClient.signOut();
      setUser(null);
    },
    signUp: authClient.signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage:
// import { AuthProvider, useAuth } from '@/contexts/AuthContext';
//
// // Wrap app
// <AuthProvider>
//   <App />
// </AuthProvider>
//
// // In components
// const { user, loading, signIn, signOut } = useAuth();
```

---

### 6.3 Sign-In Component Template

```tsx
// components/SignInForm.tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function SignInForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  const handleGitHubSignIn = async () => {
    setError('');
    try {
      await signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with GitHub');
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Social Login */}
      <div className="social-login">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn-social btn-google"
          disabled={loading}
        >
          <svg>{ /* Google icon */ }</svg>
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleGitHubSignIn}
          className="btn-social btn-github"
          disabled={loading}
        >
          <svg>{ /* GitHub icon */ }</svg>
          Continue with GitHub
        </button>
      </div>

      <div className="divider">
        <span>or</span>
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={8}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="form-footer">
        <a href="/reset-password">Forgot password?</a>
        <span> · </span>
        <a href="/signup">Create account</a>
      </div>
    </div>
  );
}
```

---

## 7. Environment Configuration

### 7.1 Complete Environment Variables

```env
# ============================================
# DATABASE
# ============================================
# Neon PostgreSQL connection string (pooled)
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require&pooling=true"

# Direct connection (for migrations, optional)
DATABASE_URL_UNPOOLED="postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require"

# ============================================
# AUTHENTICATION (better-auth)
# ============================================
# Secret for signing sessions (generate with: openssl rand -base64 48)
BETTER_AUTH_SECRET="your-64-character-random-string-here-keep-it-secret"

# Base URL of your authentication API
BETTER_AUTH_URL="https://airobobookmagic.vercel.app"

# Frontend URL (for CORS)
FRONTEND_URL="https://shehzadanjum.github.io"

# ============================================
# OAUTH PROVIDERS
# ============================================
# Google OAuth
GOOGLE_CLIENT_ID="1234567890-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxxxxxxx"

# GitHub OAuth
GITHUB_CLIENT_ID="Iv1.xxxxxxxxxxxxxxxx"
GITHUB_CLIENT_SECRET="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# ============================================
# EMAIL SERVICE (Resend)
# ============================================
RESEND_API_KEY="re_xxxxxxxxxxxxx"
EMAIL_FROM_ADDRESS="noreply@yourbook.com"
EMAIL_FROM_NAME="AI Robotics Book"

# ============================================
# AI SERVICES (existing)
# ============================================
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# ============================================
# OPTIONAL: MONITORING & ANALYTICS
# ============================================
# SENTRY_DSN="https://xxxxx@xxxxx.ingest.sentry.io/xxxxx"
# GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### 7.2 Environment Variable Generation Script

```bash
#!/bin/bash
# scripts/generate-env.sh

echo "Generating .env file..."

# Generate random secret
SECRET=$(openssl rand -base64 48)

cat > .env << EOF
# Auto-generated on $(date)

# DATABASE
DATABASE_URL="postgresql://user:password@host/dbname"

# AUTHENTICATION
BETTER_AUTH_SECRET="$SECRET"
BETTER_AUTH_URL="http://localhost:3000"
FRONTEND_URL="http://localhost:3001"

# OAUTH (fill in after creating apps)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# EMAIL
RESEND_API_KEY=""
EMAIL_FROM_ADDRESS="noreply@localhost"
EMAIL_FROM_NAME="Local Dev"

# AI
GEMINI_API_KEY=""
EOF

echo "✅ .env file created!"
echo "⚠️  Remember to:"
echo "   1. Fill in database credentials"
echo "   2. Add OAuth client IDs and secrets"
echo "   3. Add Resend API key"
echo "   4. Add Gemini API key"
echo "   5. Never commit .env to git!"
```

---

## 8. Architecture Diagrams

### 8.1 Detailed System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND (GitHub Pages)                          │
│                    https://shehzadanjum.github.io                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐    │
│  │  Docusaurus  │  │  Auth Client │  │  Interactive Widgets │    │
│  │  (React SSG) │  │  (better-auth│  │  (Chat, Progress)    │    │
│  │              │  │   /client)   │  │                      │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────────────┘    │
│         │                  │                  │                     │
│         │                  │                  │                     │
│         └──────────────────┴──────────────────┘                     │
│                            │                                        │
│                            │ HTTPS (TLS 1.3)                        │
│                            │ CORS: credentials + origin             │
│                            │ Cookies: SameSite=None; Secure         │
└────────────────────────────┼────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Vercel Serverless)                      │
│                    https://airobobookmagic.vercel.app               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    API ROUTES                                 │  │
│  ├─────────────────────────────────────────────────────────────┤  │
│  │                                                               │  │
│  │  Authentication Endpoints (better-auth)                       │  │
│  │  ├─ POST /api/auth/signup/email                             │  │
│  │  ├─ POST /api/auth/signin/email                             │  │
│  │  ├─ POST /api/auth/signin/social                            │  │
│  │  ├─ POST /api/auth/signout                                  │  │
│  │  ├─ POST /api/auth/reset-password/request                   │  │
│  │  ├─ POST /api/auth/reset-password/reset                     │  │
│  │  ├─ POST /api/auth/verify-email                             │  │
│  │  └─ GET  /api/auth/session                                  │  │
│  │                                                               │  │
│  │  Application Endpoints (custom)                              │  │
│  │  ├─ GET    /api/user/profile          [protected]           │  │
│  │  ├─ PATCH  /api/user/profile          [protected]           │  │
│  │  ├─ DELETE /api/user/account          [protected]           │  │
│  │  ├─ GET    /api/user/progress         [protected]           │  │
│  │  ├─ POST   /api/user/progress/:id     [protected]           │  │
│  │  ├─ GET    /api/user/bookmarks        [protected]           │  │
│  │  ├─ POST   /api/user/bookmarks        [protected]           │  │
│  │  ├─ GET    /api/user/chat-history     [protected]           │  │
│  │  ├─ POST   /api/chat              [optional auth]           │  │
│  │  └─ POST   /api/translate         [optional auth]           │  │
│  │                                                               │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                        │
│  ┌─────────────────────────┴─────────────────────────────────────┐  │
│  │              MIDDLEWARE (Session Validation)                   │  │
│  │  ├─ Check session cookie                                      │  │
│  │  ├─ Validate session in database                              │  │
│  │  ├─ Verify expiration                                         │  │
│  │  └─ Attach user to request                                    │  │
│  └─────────────────────────┬─────────────────────────────────────┘  │
│                            │                                        │
│         ┌──────────────────┴──────────────────┐                    │
│         │                                      │                    │
│         ▼                                      ▼                    │
│  ┌──────────────────┐              ┌──────────────────┐            │
│  │   PostgreSQL     │              │  External APIs   │            │
│  │   (Neon)         │              │                  │            │
│  │                  │              │  ┌────────────┐  │            │
│  │  Tables:         │              │  │ Gemini AI  │  │            │
│  │  - users         │              │  │ (Google)   │  │            │
│  │  - sessions      │              │  └────────────┘  │            │
│  │  - accounts      │              │                  │            │
│  │  - verification  │              │  ┌────────────┐  │            │
│  │  - user_progress │              │  │  Resend    │  │            │
│  │  - bookmarks     │              │  │  (Email)   │  │            │
│  │  - chat_history  │              │  └────────────┘  │            │
│  │                  │              │                  │            │
│  └──────────────────┘              └──────────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    OAUTH PROVIDERS (External)                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐              ┌──────────────────┐            │
│  │  Google OAuth    │              │  GitHub OAuth    │            │
│  │  oauth2.google   │              │  github.com      │            │
│  └──────────────────┘              └──────────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Authentication Flow Diagram

```
┌─────────┐
│  User   │
└────┬────┘
     │
     │ 1. Clicks "Sign In"
     ▼
┌─────────────────┐
│  Frontend (GH)  │
└────────┬────────┘
         │
         │ 2. Opens sign-in modal
         │
         ├─────────────────────┐
         │                     │
         │ Email/Password      │ Social OAuth
         │                     │
         ▼                     ▼
    ┌────────┐           ┌──────────┐
    │ Enter  │           │  Click   │
    │  creds │           │  Google  │
    └───┬────┘           └────┬─────┘
        │                     │
        │ 3. POST /auth/      │ 3. GET /auth/
        │    signin/email     │    signin/social
        ▼                     ▼
   ┌──────────────────────────────┐
   │   Backend (Vercel)            │
   │                               │
   │  ┌────────────┐               │
   │  │ better-auth│               │
   │  └─────┬──────┘               │
   │        │                      │
   │        │ 4. Validate          │
   │        ▼                      │
   │  ┌──────────────┐             │
   │  │  PostgreSQL  │             │
   │  │  (Neon)      │             │
   │  │              │             │
   │  │  - Check user│             │
   │  │  - Verify pw │             │
   │  │  - Create    │             │
   │  │    session   │             │
   │  └──────┬───────┘             │
   │         │                     │
   │         │ 5. Return session   │
   └─────────┼─────────────────────┘
             │
             │ 6. Set cookie (httpOnly, secure, sameSite=none)
             ▼
        ┌─────────┐
        │ Browser │
        │ Stores  │
        │ Cookie  │
        └────┬────┘
             │
             │ 7. Redirect to dashboard
             ▼
    ┌────────────────┐
    │   Dashboard    │
    │   (Authed)     │
    └────────────────┘
```

---

## 9. Next Steps for Specification Phase

### 9.1 Technology Evaluation Tasks

When creating the Specification, use this research to:

1. **Formal Evaluation Matrix**
   - Score each technology against constitution criteria (Section 4.1)
   - Document trade-offs and rationale
   - Get user approval for selections

2. **Proof of Concept**
   - Set up better-auth with Neon (local)
   - Test OAuth flows (Google, GitHub)
   - Verify cross-domain cookies work
   - Test email delivery (Resend)

3. **Cost Analysis**
   - Calculate monthly costs at different user scales
   - Identify upgrade thresholds (when to move from free tier)
   - Budget for first year

4. **Integration Planning**
   - Map exact API endpoints
   - Design database schema
   - Plan migration strategy for existing chatbot data
   - Define email templates

5. **Security Audit**
   - Review each technology for OWASP Top 10
   - Verify GDPR compliance capabilities
   - Check vulnerability disclosure processes
   - Plan penetration testing

### 9.2 Additional Research Needed

- [ ] Verify better-auth works with Docusaurus/React (client-side only)
- [ ] Test Neon connection pooling with Vercel serverless
- [ ] Confirm Resend email deliverability with test sends
- [ ] Test Google/GitHub OAuth flows end-to-end
- [ ] Verify cross-domain cookie behavior in Safari/iOS
- [ ] Research CAPTCHA options (for rate limit fallback)
- [ ] Investigate session storage alternatives (if cookies blocked)

### 9.3 Documentation to Create in Spec Phase

- [ ] Detailed API specification (OpenAPI/Swagger)
- [ ] Database schema with all relationships
- [ ] Email template designs (HTML/React Email)
- [ ] Frontend component specifications
- [ ] Error handling and recovery flows
- [ ] Testing strategy and test cases
- [ ] Deployment procedures and checklists

---

## 10. References & Links

### Documentation

**better-auth:**
- Official: https://www.better-auth.com
- GitHub: https://github.com/better-auth/better-auth
- Prisma Adapter: https://www.better-auth.com/docs/adapters/prisma

**Neon:**
- Official: https://neon.tech
- Docs: https://neon.tech/docs
- Prisma Guide: https://neon.tech/docs/guides/prisma

**Resend:**
- Official: https://resend.com
- Docs: https://resend.com/docs
- React Email: https://react.email

**OAuth Providers:**
- Google Cloud Console: https://console.cloud.google.com
- GitHub OAuth Apps: https://github.com/settings/developers

### Research Sources

- Context7 better-auth analysis: 1754 code snippets, 85.5 benchmark score
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Auth Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- HaveIBeenPwned API: https://haveibeenpwned.com/API/v3
- GDPR Official Text: https://gdpr-info.eu/

---

**Last Updated**: 2025-12-02
**For**: Authentication Feature Specification
**Status**: Research Complete - Ready for Spec Phase
