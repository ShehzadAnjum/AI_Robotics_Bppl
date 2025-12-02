# Authentication & Authorization Constitution
## Interactive Online Book Platform - Login Feature

---

## Document Information

**Feature**: User Authentication & Authorization
**Version**: 1.1.0
**Created**: 2025-12-02
**Last Updated**: 2025-12-02
**Status**: ✅ Approved - Ready for Specification
**Parent Constitution**: `.specify/memory/constitution.md`

**Revision History:**
- **v1.1.0** (2025-12-02): Removed technology-specific decisions. Technology stack selection deferred to Specification phase per constitution best practices.
- **v1.0.0** (2025-12-02): Initial constitution draft

---

## 1. Feature Identity

### 1.1 Mission
Provide secure, privacy-respecting, and user-friendly authentication and authorization for the Interactive Online Book Platform, enabling personalized learning experiences, progress tracking, and community features while maintaining the platform's educational focus and accessibility.

### 1.2 Vision
A seamless authentication system that students barely notice—so simple and secure that it becomes invisible infrastructure enabling richer learning experiences without creating barriers to entry.

### 1.3 Scope Boundaries

**In Scope:**
- User signup and signin (email/password, social OAuth)
- Session management (secure, persistent)
- Email verification
- Password reset flows
- User profile management
- Progress tracking and bookmarking
- Social authentication (Google, GitHub)
- Two-factor authentication (2FA) - optional enhancement
- Account linking/unlinking
- Secure API authentication for chatbot and translation features

**Out of Scope:**
- Payment processing (future phase)
- Subscription management (future phase)
- Multi-tenancy for organizations (future phase)
- Admin dashboard (separate feature)
- User-generated content moderation
- Real-time collaboration features
- Third-party integrations beyond OAuth providers

### 1.4 Success Criteria

**User Experience Success:**
- 95%+ of users can sign up in under 60 seconds
- 98%+ of returning users can sign in on first attempt
- Zero security incidents (data breaches, unauthorized access)
- <3s authentication response time (p95)
- Mobile-friendly authentication flow (100% responsive)

**Technical Success:**
- 99.9% uptime for authentication services
- All auth endpoints protected against common attacks (CSRF, XSS, SQL injection, brute force)
- GDPR/privacy compliance achieved
- All user data encrypted at rest and in transit
- Automated security testing in CI/CD pipeline

**Business Success:**
- Track user learning progress accurately
- Enable personalized recommendations
- Support future paid features infrastructure
- Maintain free tier accessibility (no auth required for public content)

---

## 2. Security & Privacy Principles

### 2.1 Zero Trust Architecture

**I. Verify Everything (NON-NEGOTIABLE)**

Every request MUST be validated, even internal ones. Never trust:
- Client-sent data (validate all inputs)
- Session cookies (verify cryptographic signatures)
- OAuth tokens (validate with provider)
- User roles (check permissions on every protected action)

*Rationale:* Defense in depth prevents catastrophic failures. Single points of trust create single points of failure.

### 2.2 Privacy by Default

**II. Minimal Data Collection (NON-NEGOTIABLE)**

Collect ONLY data essential for core functionality:

**Required Data:**
- Email (authentication, communication)
- Password (hashed with bcrypt, never plaintext)
- Name (optional, for personalization)
- Session metadata (IP, user agent for security)

**Prohibited Data:**
- Phone numbers (unless user explicitly enables 2FA)
- Physical addresses
- Payment information (until payment feature approved)
- Browsing history beyond learning progress
- Personal characteristics (age, gender, location)

*Rationale:* Data not collected cannot be breached. GDPR Article 5 (data minimization) compliance.

### 2.3 Cryptographic Standards

**III. Industry-Standard Encryption**

**Password Storage:**
- Algorithm: bcrypt with work factor ≥12
- Never store plaintext passwords
- Never log passwords (even in error logs)
- Password minimum length: 8 characters

**Data in Transit:**
- TLS 1.3 only (no TLS 1.2 or lower)
- HTTPS everywhere (HSTS headers enabled)
- Secure cookies (httpOnly, sameSite=Lax, secure flags)

**Data at Rest:**
- Database-level encryption (Neon built-in)
- Encrypted backups
- Secrets in environment variables (never in code)

*Rationale:* Cryptography is hard; use proven standards. Custom crypto = security vulnerabilities.

### 2.4 Attack Prevention

**IV. Multi-Layered Defense**

**Rate Limiting:**
- Login attempts: 5 per 15 minutes per IP
- Signup: 3 per hour per IP
- Password reset: 3 per hour per email
- API calls: 100 per minute per authenticated user

**CSRF Protection:**
- Enabled by default (better-auth built-in)
- SameSite cookies
- Origin validation

**XSS Prevention:**
- Content Security Policy (CSP) headers
- Input sanitization on all user-provided data
- Output encoding in React components

**SQL Injection Prevention:**
- Parameterized queries only (via Prisma/ORM)
- Never construct SQL from user input

**Brute Force Prevention:**
- Account lockout after 10 failed attempts (24-hour cooldown)
- CAPTCHA on repeated failures (optional enhancement)
- Email notification on suspicious activity

*Rationale:* Attackers exploit weakest link. Assume determined adversaries; defend at every layer.

### 2.5 Password Security

**V. Password Breach Detection**

Integrate HaveIBeenPwned API:
- Check all new passwords against known breaches
- Reject compromised passwords
- Notify users if existing password appears in new breach

*Rationale:* 60%+ of breaches involve reused credentials. Prevent known-bad passwords proactively.

### 2.6 Session Management

**VI. Secure Session Lifecycle**

**Session Configuration:**
- Expiration: 7 days (default)
- Refresh window: 24 hours (update session daily)
- Fresh session: 10 minutes (for sensitive operations)
- Absolute maximum: 30 days (even with activity)

**Session Security:**
- Stateful sessions (database-backed)
- Session rotation on privilege escalation
- Explicit logout clears all sessions
- Device/location tracking for anomaly detection

*Rationale:* Balance security and convenience. Long sessions reduce friction; rotation limits breach impact.

### 2.7 Data Retention & Deletion

**VII. Right to be Forgotten**

Users MUST be able to:
- Export all personal data (GDPR Article 20)
- Delete account and all associated data
- Opt out of non-essential data collection

**Deletion Process:**
- Soft delete (30-day recovery window)
- Hard delete after 30 days (irreversible)
- Anonymize learning analytics (retain aggregate, delete PII)
- Clear all sessions immediately

**Data Retention:**
- Active accounts: indefinite
- Inactive accounts (no login 2+ years): notify user, delete after 30 days no response
- Deleted accounts: audit logs only (no PII)

*Rationale:* GDPR compliance mandatory. User trust requires control over data.

---

## 3. User Experience Principles

### 3.1 Accessibility & Inclusion

**VIII. Authentication Without Barriers**

**Core Principle: No authentication required for public content**

Free users MUST access:
- All chapters (reading mode)
- Static diagrams and examples
- Search functionality
- Translation features

Authentication ONLY required for:
- Progress tracking
- Bookmarks and notes
- Personalized recommendations
- AI chatbot history
- Community features (future)

*Rationale:* Educational content should be universally accessible. Auth enables personalization, not gatekeeping.

### 3.2 Progressive Enhancement

**IX. Graceful Feature Degradation**

Authentication features MUST work without JavaScript:
- Email/password form submits server-side
- OAuth redirects functional without JS
- Error messages readable without React

Enhanced features with JavaScript:
- Real-time validation
- Password strength indicator
- Social login popups
- Session persistence

*Rationale:* Accessibility for all browsers and assistive technologies. Core functionality never depends on client-side code.

### 3.3 Clear Communication

**X. Transparent Authentication States**

Users MUST always know:
- Whether they're logged in
- What data is being collected
- Why authentication is required (if prompted)
- How to log out

**Error Messages:**
- Clear, actionable, non-technical
- Never expose system internals
- Suggest recovery steps
- Examples:
  - ❌ "Invalid credentials" → ✅ "Email or password incorrect. Try again or reset password."
  - ❌ "500 Server Error" → ✅ "Something went wrong. Please try again in a moment."

*Rationale:* Confused users abandon flows. Clear communication builds trust and reduces support burden.

### 3.4 Mobile-First Design

**XI. Touch-Friendly Authentication**

All authentication UI MUST:
- Use native input types (email, password, url)
- Support autofill/password managers
- Have touch targets ≥44px
- Work in portrait and landscape
- Support swipe-to-dismiss keyboards

*Rationale:* 60%+ of traffic is mobile. Poor mobile UX = high abandonment.

---

## 4. Authentication Requirements

### 4.1 Technology Selection

**Selection Process:** Technology choices MUST be evaluated and documented in the Specification phase based on:

**Evaluation Criteria:**
1. **Security**: Industry-standard cryptography, active security maintenance, vulnerability response time
2. **Compatibility**: Works with existing infrastructure (Vercel backend, current database)
3. **Developer Experience**: Documentation quality, TypeScript support, learning curve
4. **Cost**: Free tier availability, scaling costs, total cost of ownership
5. **Maintenance**: Active development, community support, long-term viability
6. **Features**: Core auth features, plugin ecosystem, extensibility
7. **Performance**: Response times, scalability, resource efficiency

**Technology decisions deferred to Spec phase:**
- Authentication framework selection
- Database system and ORM
- Email service provider
- OAuth provider choices
- Session storage mechanism

*Rationale:* Technology landscape evolves rapidly. Constitution focuses on enduring principles; Spec phase evaluates current best options.

### 4.2 Authentication Methods

**Primary: Email + Password**

**Configuration:**
- Minimum password length: 8 characters
- Password strength indicator (client-side)
- HaveIBeenPwned integration
- Email verification required
- Password reset via secure token

**Secondary: Social OAuth**

**Provider Selection Criteria:**
- User demographic alignment (student preferences)
- Security and reliability track record
- API stability and documentation quality
- Privacy policies and data handling
- Cost and rate limits

**Provider evaluation deferred to Spec phase** based on:
- User research and surveys
- Demographic data analysis
- Technical compatibility assessment
- Cost-benefit analysis

### 4.3 Email Verification

**Strategy: Mandatory but Deferred**

**Flow:**
1. User signs up → account created immediately
2. Verification email sent automatically
3. User can browse content immediately (grace period)
4. Personalized features locked until verified
5. Reminder emails at 24h, 72h, 7d
6. Account suspended after 30 days unverified

**Verification Token:**
- Cryptographically secure random (32 bytes minimum)
- Expires after 24 hours
- Single-use (invalidated after verification)
- Rate-limited resend (3 per hour)

*Rationale:* Mandatory verification prevents spam/abuse. Deferred verification reduces signup friction.

### 4.4 Password Reset

**Flow:**
1. User requests reset → email sent with secure token
2. Token valid for 1 hour
3. User sets new password (must pass strength check)
4. All existing sessions invalidated
5. User auto-logged in with new session

**Security:**
- Rate limit: 3 requests per hour per email
- Token single-use
- Old password not required (user has email access)
- Notification email sent to user (breach alert)

---

## 5. Authorization Strategy

### 5.1 Role-Based Access Control (RBAC)

**Roles (Phase 1):**

**1. Anonymous (No Account)**
- Read public content
- Search
- Translate
- Use chatbot (no history)

**2. Authenticated User**
- All anonymous permissions
- Track progress
- Save bookmarks
- Create notes
- Persist chatbot history
- Personalized recommendations

**3. Verified User**
- All authenticated permissions
- Export certificate of completion
- Access community features (future)

**Future Roles (Out of Scope for Phase 1):**
- Instructor (create assignments, view student progress)
- Admin (user management, content moderation)
- Premium (paid features)

### 5.2 Permission Enforcement

**Principle: Check permissions server-side**

Every protected API endpoint MUST:
1. Validate session (authenticate user)
2. Check user role (authorize action)
3. Validate resource ownership (if applicable)

**Example: Save Bookmark**

```typescript
// ❌ WRONG - Trust client
const saveBookmark = async (chapterId) => {
  await db.bookmarks.create({ userId, chapterId })
}

// ✅ CORRECT - Verify session and ownership
const saveBookmark = async (req) => {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) throw new UnauthorizedError()

  await db.bookmarks.create({
    userId: session.user.id,
    chapterId: req.body.chapterId
  })
}
```

*Rationale:* Client-side checks are UX only. Security happens server-side.

---

## 6. Data Management

### 6.1 Database Schema Requirements

**Core Authentication Entities:**

**Users Entity**
- Unique identifier (UUID recommended)
- Email (unique, indexed, validated)
- Email verification status
- Password hash (never plaintext)
- Display name (optional)
- Profile image (optional)
- Account creation and update timestamps

**Sessions Entity**
- Unique session identifier
- User reference (foreign key)
- Expiration timestamp
- Security metadata (IP address, user agent)
- Session creation and update timestamps

**Social Accounts Entity** (if OAuth enabled)
- Unique account identifier
- User reference (foreign key)
- OAuth provider identifier
- Provider-specific user ID
- Encrypted access tokens
- Encrypted refresh tokens (if applicable)
- Token expiration

**Verification Tokens Entity**
- Unique token identifier
- User reference (foreign key)
- Secure random token (indexed for lookup)
- Token type (email verification, password reset)
- Expiration timestamp

**Application Entities:**

**User Progress Entity**
- Unique progress identifier
- User reference (foreign key)
- Chapter/section identifiers
- Progress status (not_started, in_progress, completed)
- Completion timestamp
- Tracking timestamps

**Bookmarks Entity**
- Unique bookmark identifier
- User reference (foreign key)
- Content reference (chapter, section)
- Optional user notes
- Tracking timestamps

**Chat History Entity**
- Unique message identifier
- User reference (foreign key)
- Session identifier
- Message role (user, assistant)
- Message content
- Metadata (context, parameters)
- Timestamp

**Schema Design Principles:**
- All timestamps in UTC
- UUIDs for all primary keys (distributed-friendly)
- Foreign key constraints enforced
- Indexes on frequently queried columns
- Sensitive data encrypted at rest
- Soft deletes where appropriate (GDPR compliance)

### 6.2 Data Migration Strategy

**Phase 1: Initialize Schema**
- Execute schema migrations to create all required tables
- Seed test data for development environment
- Validate foreign key constraints and relationships
- Test rollback procedures

**Phase 2: Migrate Existing Data** (if applicable)
- Identify existing user data (e.g., chatbot sessions in localStorage)
- Create migration scripts with data validation
- Implement opt-in migration for users
- Preserve anonymous sessions for unauthenticated users
- Maintain backward compatibility during transition

**Phase 3: Backfill and Validation**
- Add missing timestamps to existing records
- Normalize data inconsistencies
- Validate referential integrity
- Perform data quality audit
- Document migration results

---

## 7. Technical Architecture Principles

### 7.1 Architectural Requirements

**System Architecture Pattern:**

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Static Hosting)                 │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Static Site  │  │  Auth Client │  │ Interactive  │     │
│  │  Generator    │  │   Library    │  │  Components  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                            │ HTTPS (TLS 1.3)                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Serverless/API)                   │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  /api/auth/*     │  │  /api/protected  │                │
│  │ (Auth Endpoints) │  │   (Application)  │                │
│  └────────┬─────────┘  └────────┬─────────┘                │
│           │                      │                           │
│  ┌────────┴─────────────────────┴─────────┐                │
│  │      Middleware (Session Validation)    │                │
│  └────────┬─────────────────────┬─────────┘                │
│           │                      │                           │
│           ▼                      ▼                           │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   Database       │  │  External APIs   │                │
│  │   (Relational)   │  │  (AI, Services)  │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 API Endpoint Requirements

**Authentication Endpoints (Required):**

```
POST   /api/auth/signup                    # Create new account
POST   /api/auth/signin                    # Email/password login
POST   /api/auth/signin/social             # OAuth provider login
POST   /api/auth/signout                   # Logout (invalidate session)
POST   /api/auth/password/reset-request    # Request password reset
POST   /api/auth/password/reset-confirm    # Confirm password reset
POST   /api/auth/email/verify              # Verify email address
POST   /api/auth/email/resend              # Resend verification
GET    /api/auth/session                   # Get current session
POST   /api/auth/account/link              # Link social account
DELETE /api/auth/account/unlink/:id        # Unlink social account
GET    /api/auth/accounts                  # List linked accounts
```

**Application Endpoints (Protected):**

```
# User Profile Management
GET    /api/user/profile                   # Get user profile
PATCH  /api/user/profile                   # Update profile
DELETE /api/user/account                   # Delete account (soft)
POST   /api/user/export                    # Export user data (GDPR)

# Learning Progress
GET    /api/user/progress                  # Get all progress
POST   /api/user/progress/:contentId       # Update progress
GET    /api/user/progress/:contentId       # Get specific progress

# Bookmarks & Notes
GET    /api/user/bookmarks                 # Get all bookmarks
POST   /api/user/bookmarks                 # Create bookmark
PATCH  /api/user/bookmarks/:id             # Update bookmark
DELETE /api/user/bookmarks/:id             # Delete bookmark

# Chat History (if authenticated)
GET    /api/user/chat-history              # Get chat history
DELETE /api/user/chat-history              # Clear chat history

# Existing Endpoints (enhanced with auth)
POST   /api/chat                            # Chat (save history if authed)
POST   /api/translate                       # Translate (usage tracking if authed)
```

**Endpoint Design Principles:**
- RESTful conventions (GET, POST, PATCH, DELETE)
- Consistent error responses (standard format)
- Rate limiting on all endpoints
- Input validation and sanitization
- CORS headers configured appropriately
- Idempotent operations where possible

### 7.3 Deployment Requirements

**Frontend Hosting:**
- Static site hosting with CDN support
- HTTPS enforcement (TLS 1.3)
- Global edge distribution (low latency)
- Custom domain support (optional)
- Automated build and deployment pipeline

**Backend Hosting:**
- Serverless or containerized API hosting
- Auto-scaling based on load
- Multi-region deployment (optional for HA)
- Environment variable support
- Zero-downtime deployments

**Database Hosting:**
- Managed relational database service
- Automated backups and point-in-time recovery
- Encryption at rest
- Connection pooling (serverless-compatible)
- Regional deployment for optimal latency
- Free tier availability (for MVP)

**Environment Configuration:**

**Required Environment Variables:**
```
# Database Connection
DATABASE_URL                    # Full database connection string

# Authentication Security
AUTH_SECRET                     # Cryptographically secure secret (≥64 chars)
AUTH_BASE_URL                   # Full base URL of authentication service

# OAuth Providers (if enabled)
OAUTH_<PROVIDER>_CLIENT_ID      # OAuth application client ID
OAUTH_<PROVIDER>_CLIENT_SECRET  # OAuth application client secret

# Email Service (for verification/reset)
EMAIL_SERVICE_HOST              # SMTP host or API endpoint
EMAIL_SERVICE_PORT              # SMTP port (if applicable)
EMAIL_SERVICE_USER              # Service authentication user
EMAIL_SERVICE_PASS              # Service authentication password/key
EMAIL_FROM_ADDRESS              # Sender email address
EMAIL_FROM_NAME                 # Sender display name

# Existing Services
AI_API_KEY                      # AI service API key
```

**Environment Variable Security:**
- Never commit secrets to version control
- Use secret management service
- Rotate secrets regularly
- Different secrets per environment (dev, staging, prod)
- Audit access to secrets

### 7.4 CORS Configuration Requirements

**Cross-Origin Resource Sharing (CORS):**

When frontend and backend are on different domains, CORS headers MUST be configured:

**Required Headers:**
```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: <frontend-domain>
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Cookie
```

**CORS Principles:**
- **Never use wildcard (`*`) with credentials** - specify exact origin
- **Validate origin** against allowed list
- **Handle preflight requests** (OPTIONS method)
- **Set appropriate cache headers** for preflight responses
- **Different origins per environment** (dev, staging, prod)

**Cookie Configuration for Cross-Domain:**
```
SameSite=None
Secure=true
HttpOnly=true
```

*Rationale:* When frontend and backend are on different domains, CORS is required for cookies to work correctly. SameSite=None allows cross-site cookies but requires Secure flag.

---

## 8. Reusable Intelligence Strategy (MANDATORY)

**Requirement:** All authentication work MUST create and utilize reusable intelligence components (subagents and skills) for recurring tasks. This is a core project requirement, not optional.

### 8.1 Claude Code Subagents (MUST CREATE)

**Purpose:** Create specialized, reusable agents for recurring authentication tasks

**Mandatory Creation:** All three subagents defined below MUST be created during the Implementation phase and utilized throughout development and maintenance

**Subagent 1: Auth Security Auditor**

**Responsibility:**
- Review authentication code for security vulnerabilities
- Check OWASP Top 10 compliance
- Validate rate limiting implementation
- Verify CSRF protection
- Test password hashing configuration

**Inputs:**
- Code files (API endpoints, middleware)
- Configuration files (.env, auth.ts)

**Outputs:**
- Security audit report
- List of vulnerabilities (prioritized)
- Remediation suggestions with code examples

**Invocation Pattern:**
```bash
/audit-auth-security --files api/auth/*.ts
```

---

**Subagent 2: Database Schema Migrator**

**Responsibility:**
- Generate Prisma migrations from schema changes
- Validate migration safety (no data loss)
- Create rollback scripts
- Test migrations in development environment

**Inputs:**
- Prisma schema changes
- Current database state

**Outputs:**
- Migration files
- Migration validation report
- Rollback SQL scripts
- Testing checklist

**Invocation Pattern:**
```bash
/migrate-db --schema prisma/schema.prisma --validate
```

---

**Subagent 3: Auth Integration Tester**

**Responsibility:**
- Test authentication flows end-to-end
- Validate OAuth provider configurations
- Test session management
- Verify email delivery
- Check CORS configuration

**Inputs:**
- API endpoints
- OAuth provider credentials
- Test user accounts

**Outputs:**
- Test report (pass/fail)
- Screenshots of flows
- Performance metrics
- Error logs (if failures)

**Invocation Pattern:**
```bash
/test-auth-flow --provider google --environment staging
```

---

### 8.2 Agent Skills (MUST CREATE)

**Mandatory Creation:** All three skills defined below MUST be created during the Plan/Implementation phase and utilized throughout development

**Skill 1: auth-setup-wizard**

**Purpose:** Guided setup for authentication framework integration
**Status:** MUST CREATE - Used during initial setup and onboarding

**Capabilities:**
- Install dependencies
- Generate Prisma schema
- Configure environment variables
- Set up OAuth providers
- Initialize database
- Generate auth client code

**Usage:**
```bash
skill: "auth-setup-wizard"
```

**Workflow:**
1. Ask user for database provider (PostgreSQL/Neon)
2. Ask for OAuth providers (Google, GitHub, both, neither)
3. Ask for email service (SMTP, SendGrid, Resend)
4. Generate configuration files
5. Create .env.example template
6. Run initial migration
7. Generate client-side auth wrapper
8. Create example usage code

---

**Skill 2: auth-error-debugger**

**Purpose:** Diagnose authentication errors and suggest fixes
**Status:** MUST CREATE - Used during development and debugging

**Capabilities:**
- Parse error messages
- Identify root causes
- Suggest fixes with code examples
- Check configuration issues
- Validate environment variables

**Usage:**
```bash
skill: "auth-error-debugger"
```

**Workflow:**
1. User pastes error message/stack trace
2. Skill identifies error category (CORS, session, OAuth, database)
3. Skill checks relevant configuration
4. Skill suggests specific fixes
5. Skill generates test code to verify fix

---

**Skill 3: auth-ui-generator**

**Purpose:** Generate authentication UI components
**Status:** MUST CREATE - Used for UI implementation and consistency

**Capabilities:**
- Create sign-up forms
- Create sign-in forms
- Create password reset flows
- Create email verification UI
- Create account settings pages
- Style components (Tailwind/CSS Modules)

**Usage:**
```bash
skill: "auth-ui-generator"
```

**Workflow:**
1. Ask user for framework (React, Vue, Svelte)
2. Ask for styling (Tailwind, CSS Modules, Styled Components)
3. Ask for components needed
4. Generate component files
5. Generate usage examples
6. Generate Storybook stories (if requested)

---

### 8.3 Reusable Templates

**Template 1: Vercel API Route (Protected)**

```typescript
// templates/api-route-protected.ts
import { auth } from '@/lib/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL!)
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Authenticate request
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // Your protected logic here
  try {
    // ... implementation
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
```

---

**Template 2: React Auth Context**

```typescript
// templates/auth-context.tsx
import { createAuthClient } from 'better-auth/client'
import { createContext, useContext, useEffect, useState } from 'react'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

const AuthContext = createContext<{
  user: any | null
  loading: boolean
  signIn: typeof authClient.signIn
  signOut: typeof authClient.signOut
}>({
  user: null,
  loading: true,
  signIn: authClient.signIn,
  signOut: authClient.signOut
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authClient.getSession().then((session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, signIn: authClient.signIn, signOut: authClient.signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## 9. Gap Analysis & Best Practices

### 9.1 Current State Assessment

**What We Have:**
- ✅ Frontend (Docusaurus on GitHub Pages)
- ✅ Backend (Vercel with `/api/chat`, `/api/translate`)
- ✅ AI integration (Gemini API)
- ✅ Static content deployment workflow

**What We Need:**
- ❌ Database (PostgreSQL/Neon)
- ❌ Authentication system (better-auth)
- ❌ User management
- ❌ Session management
- ❌ Email service (verification, password reset)
- ❌ OAuth provider setup (Google, GitHub)
- ❌ Protected API endpoints
- ❌ Frontend auth UI
- ❌ Frontend auth state management

### 9.2 Critical Gaps

**Gap 1: Database Infrastructure**

**Current:** No persistent storage for user data
**Needed:** Relational database for storing user accounts, sessions, and application data
**Impact:** Cannot store users, sessions, progress, bookmarks
**Priority:** P0 (blocking all auth features)

**Requirements:**
- Relational database system (SQL-compliant)
- Managed service with automated backups
- Connection pooling support (serverless-compatible)
- Encryption at rest
- Free tier or low-cost option for MVP
- Support for migrations and schema versioning

**Action Items (Spec Phase):**
- [ ] Evaluate database providers (cost, features, compatibility)
- [ ] Provision database instance
- [ ] Configure connection pooling
- [ ] Set up environment variables
- [ ] Test connectivity from backend
- [ ] Establish backup and recovery procedures

---

**Gap 2: Email Service**

**Current:** No email sending capability
**Needed:** Transactional email service for verification and password resets
**Impact:** Cannot send verification emails, password resets, security notifications
**Priority:** P0 (required for production)

**Requirements:**
- Reliable email delivery (high deliverability rate)
- Support for transactional emails (not marketing)
- Template support (HTML/text)
- Tracking (delivery, opens, bounces)
- Free tier or low-cost for MVP (<1000 emails/month)
- API or SMTP access
- SPF/DKIM/DMARC support

**Action Items (Spec Phase):**
- [ ] Evaluate email service providers
- [ ] Create account with selected provider
- [ ] Verify sender domain (or use provider subdomain)
- [ ] Set up authentication credentials
- [ ] Create email templates (verification, password reset, notifications)
- [ ] Test email delivery
- [ ] Configure DNS records (SPF, DKIM, DMARC)

---

**Gap 3: OAuth Provider Setup**

**Current:** No OAuth applications registered
**Needed:** OAuth provider applications for social login
**Impact:** Cannot offer social login (reduced signup conversion)
**Priority:** P1 (MVP can launch without, but UX degraded)

**Requirements:**
- Register OAuth applications with selected providers
- Configure callback URLs correctly
- Secure client secrets properly
- Test OAuth flow end-to-end
- Handle OAuth errors gracefully

**Action Items (Spec Phase):**
- [ ] Select OAuth providers based on user demographics
- [ ] Register applications with each provider
- [ ] Configure authorized redirect URIs
- [ ] Securely store client IDs and secrets
- [ ] Test OAuth login flow
- [ ] Implement account linking/unlinking
- [ ] Document provider-specific requirements

---

**Gap 4: Frontend Auth Integration**

**Current:** No auth UI or state management
**Needed:** Frontend auth client, UI components, and state management
**Impact:** Users cannot authenticate
**Priority:** P0 (blocking)

**Requirements:**
- Auth client library/wrapper for API calls
- Global auth state management (context/store)
- Sign-in and sign-up forms
- Password reset flow UI
- Email verification UI
- Session persistence
- Protected route handling
- Loading and error states

**Action Items (Plan/Implement Phase):**
- [ ] Select or create auth client library
- [ ] Implement global auth state management
- [ ] Create authentication forms (sign-in, sign-up)
- [ ] Build password reset flow
- [ ] Build email verification UI
- [ ] Add auth status indicators to header
- [ ] Create user profile menu
- [ ] Implement protected route guards
- [ ] Add loading and error handling
- [ ] Test all authentication flows

---

**Gap 5: CORS & Cookie Configuration**

**Current:** Basic CORS for API endpoints
**Needed:** Secure cross-domain cookie handling
**Impact:** Sessions may not persist correctly across frontend and backend
**Priority:** P0 (auth won't work without)

**Requirements:**
- CORS headers properly configured
- Secure cookie settings for cross-domain scenarios
- Session persistence across domains
- Fallback strategies if cookies blocked

**Possible Solutions:**
1. **SameSite=None with Secure flag** (allow cross-site cookies)
2. **API proxy** (same origin, no CORS needed)
3. **Custom domain** (frontend and backend share root domain)
4. **Alternative session storage** (localStorage with security trade-offs)

**Action Items (Plan Phase):**
- [ ] Evaluate domain architecture (same vs different domains)
- [ ] Configure appropriate CORS headers
- [ ] Set secure cookie flags based on architecture
- [ ] Test cross-domain session persistence
- [ ] Implement fallback for browsers blocking third-party cookies
- [ ] (Optional) Set up custom domain for production

---

**Gap 6: Rate Limiting Infrastructure**

**Current:** No rate limiting
**Needed:** Per-IP and per-user rate limits to prevent abuse
**Impact:** Vulnerable to brute force attacks, credential stuffing, and DoS
**Priority:** P0 (production requirement)

**Requirements:**
- Rate limiting by IP address
- Rate limiting by user account (authenticated requests)
- Different limits for different endpoint types
- Graceful error messages for rate-limited users
- Optional CAPTCHA fallback for suspected abuse

**Recommended Limits:**
- Login attempts: 5-10 per 15 minutes (per IP/email)
- Signup: 3-5 per hour (per IP)
- Password reset requests: 3 per hour (per email)
- Email verification resend: 3 per hour (per user)
- General API calls: 100-1000 per minute (per authenticated user)

**Action Items (Plan/Implement Phase):**
- [ ] Select rate limiting strategy (in-memory, database, external service)
- [ ] Implement rate limits for auth endpoints
- [ ] Implement rate limits for application endpoints
- [ ] Configure appropriate limits based on expected usage
- [ ] Add user-facing error messages
- [ ] Test rate limiting behavior
- [ ] Monitor rate limit violations
- [ ] (Optional) Add CAPTCHA for repeated violations

---

**Gap 7: Security Monitoring**

**Current:** No security logging or alerting
**Needed:** Security event logging, monitoring, and alerting system
**Impact:** Cannot detect, investigate, or respond to security incidents
**Priority:** P1 (production enhancement, P0 for compliance)

**Requirements:**
- Comprehensive audit logging (who, what, when, where)
- Real-time security monitoring
- Alerting for suspicious patterns
- Log retention and analysis
- Compliance with data protection regulations

**Events to Log:**
- Authentication events (signup, login, logout, failures)
- Session events (creation, expiration, revocation)
- Password events (reset requests, changes)
- Email verification events
- Account changes (profile updates, deletions)
- Security violations (rate limits, invalid tokens)
- Administrative actions

**Action Items (Plan/Implement Phase):**
- [ ] Set up logging infrastructure
- [ ] Implement structured logging for auth events
- [ ] Set up log aggregation and retention
- [ ] Create security monitoring dashboard
- [ ] Configure alerts for suspicious patterns
- [ ] Establish incident response procedures
- [ ] (Optional) Integrate with SIEM/APM tools

---

**Gap 8: Data Privacy Compliance**

**Current:** No privacy policy, terms of service, or GDPR compliance features
**Needed:** Legal documents and privacy compliance features
**Impact:** Legal liability, cannot operate in EU/regulated markets, low user trust
**Priority:** P1 (required before collecting user data)

**Requirements:**
- Privacy policy (clear, comprehensive, legally compliant)
- Terms of service / Acceptable use policy
- Cookie consent mechanism (GDPR, CCPA)
- Data export functionality (GDPR Article 20)
- Account deletion functionality (GDPR Article 17)
- Data processing agreements (if applicable)
- Age verification (COPPA compliance if targeting children)

**Action Items (Spec/Plan Phase):**
- [ ] Draft privacy policy (consider templates or legal consultation)
- [ ] Draft terms of service
- [ ] Implement cookie consent banner
- [ ] Build data export feature (JSON format)
- [ ] Build account deletion feature (soft delete with recovery)
- [ ] Add age verification to signup
- [ ] Document data retention policies
- [ ] (Recommended) Review documents with legal counsel
- [ ] Publish legal documents before collecting user data

---

### 9.3 Best Practices Checklist

**Security Best Practices:**
- [ ] All passwords hashed with bcrypt (work factor ≥12)
- [ ] HTTPS everywhere (TLS 1.3)
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (React auto-escaping + CSP headers)
- [ ] Secure session cookies (httpOnly, secure, sameSite)
- [ ] Password breach checking (HaveIBeenPwned)
- [ ] Email verification required
- [ ] Account lockout on brute force
- [ ] Security headers (HSTS, X-Frame-Options, etc.)
- [ ] Secrets in environment variables only
- [ ] Regular dependency updates (Dependabot)
- [ ] Security testing in CI/CD

**Privacy Best Practices:**
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Cookie consent banner (GDPR)
- [ ] Data minimization (collect only what's needed)
- [ ] Data retention policy defined
- [ ] User data export feature
- [ ] User account deletion feature
- [ ] Encryption at rest (database-level)
- [ ] Encryption in transit (TLS)
- [ ] Audit logging for data access
- [ ] Third-party data sharing disclosure

**UX Best Practices:**
- [ ] Mobile-responsive auth forms
- [ ] Password strength indicator
- [ ] Clear error messages
- [ ] Autofill support (email, password inputs)
- [ ] Password manager compatibility
- [ ] "Show password" toggle
- [ ] Social login buttons prominent
- [ ] Loading states during auth
- [ ] Success confirmations
- [ ] Email sent confirmations
- [ ] Session expiration warnings
- [ ] Logout confirmation

**Developer Experience Best Practices:**
- [ ] TypeScript types for all auth code
- [ ] Comprehensive error handling
- [ ] Detailed logging (not passwords!)
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Integration tests for auth flows
- [ ] E2E tests for critical paths
- [ ] Local development environment setup guide
- [ ] Environment variable documentation
- [ ] Deployment checklist
- [ ] Rollback procedure documented

---

## 10. Quality Gates

### 10.1 Security Quality Gate

**Before Production Deployment:**
- [ ] All OWASP Top 10 vulnerabilities addressed
- [ ] Penetration testing completed (automated: OWASP ZAP)
- [ ] Dependency vulnerability scan passed (npm audit, Snyk)
- [ ] Secrets scan passed (no hardcoded credentials)
- [ ] HTTPS enforced on all endpoints
- [ ] CORS configured correctly (no wildcard origins)
- [ ] Rate limiting tested and working
- [ ] Session management tested (expiration, rotation)
- [ ] Password hashing verified (bcrypt work factor ≥12)
- [ ] Email verification flow tested
- [ ] Password reset flow tested
- [ ] OAuth flows tested (Google, GitHub)
- [ ] Account deletion tested (GDPR compliance)

### 10.2 Privacy Quality Gate

**Before Production Deployment:**
- [ ] Privacy policy published and linked
- [ ] Terms of service published and linked
- [ ] Cookie consent banner implemented (GDPR)
- [ ] Data retention policy documented
- [ ] Data export feature tested
- [ ] Account deletion feature tested
- [ ] No PII in logs or error messages
- [ ] Database encryption at rest verified
- [ ] TLS encryption in transit verified
- [ ] Third-party integrations disclosed

### 10.3 Performance Quality Gate

**Before Production Deployment:**
- [ ] Auth API response time <3s (p95)
- [ ] Session validation <100ms (p95)
- [ ] Database queries optimized (indexed columns)
- [ ] No N+1 query problems
- [ ] Connection pooling configured (serverless)
- [ ] Frontend bundle size <50KB (auth code)
- [ ] First login <5s total time
- [ ] Social login redirect <2s

### 10.4 Accessibility Quality Gate

**Before Production Deployment:**
- [ ] WCAG 2.1 AA compliance (auth forms)
- [ ] Keyboard navigation works (tab order logical)
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Form labels properly associated
- [ ] Error messages announced to screen readers
- [ ] Color contrast meets AA standards (4.5:1)
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Touch targets ≥44px (mobile)

### 10.5 Testing Quality Gate

**Before Production Deployment:**
- [ ] Unit tests ≥80% coverage (auth logic)
- [ ] Integration tests for all API endpoints
- [ ] E2E tests for critical flows (signup, login, reset)
- [ ] OAuth flows tested (Google, GitHub)
- [ ] Email delivery tested (verification, reset)
- [ ] Rate limiting tested
- [ ] Session expiration tested
- [ ] CORS tested (cross-domain cookies)
- [ ] Mobile tested (iOS Safari, Android Chrome)
- [ ] Browser compatibility tested (Chrome, Firefox, Safari, Edge)

### 10.6 Reusable Intelligence Quality Gate (MANDATORY)

**Before Proceeding to Implementation Phase:**
- [ ] All 3 Claude Code Subagents created and documented
  - [ ] Auth Security Auditor subagent created
  - [ ] Database Schema Migrator subagent created
  - [ ] Auth Integration Tester subagent created
- [ ] All 3 Agent Skills created and documented
  - [ ] auth-setup-wizard skill created
  - [ ] auth-error-debugger skill created
  - [ ] auth-ui-generator skill created
- [ ] Subagent invocation commands documented
- [ ] Skill usage examples provided
- [ ] Reusable templates created (API endpoints, test suites)

**During Implementation Phase:**
- [ ] Auth Security Auditor utilized for security reviews
- [ ] Database Schema Migrator utilized for all schema changes
- [ ] Auth Integration Tester utilized for E2E testing
- [ ] auth-setup-wizard utilized during initial setup
- [ ] auth-error-debugger utilized when debugging issues
- [ ] auth-ui-generator utilized for UI component creation

**Before Production Deployment:**
- [ ] All subagents and skills tested and working
- [ ] Documentation updated with usage examples
- [ ] Team trained on using reusable intelligence
- [ ] Maintenance procedures documented

---

## 11. Non-Functional Requirements

### 11.1 Performance Standards

**API Response Times (p95):**
- Authentication endpoints: <3s
- Session validation: <100ms
- User profile fetch: <500ms
- OAuth redirect: <2s

**Database Query Limits:**
- Max query time: 1s
- Connection timeout: 10s
- Connection pool size: 10 (Neon free tier)

### 11.2 Reliability Standards

**Uptime:**
- Authentication service: 99.9% (downtime <43 min/month)
- Graceful degradation: public content accessible even if auth down

**Error Recovery:**
- Transient errors: automatic retry (max 3 attempts)
- Session errors: redirect to login with return URL
- Database errors: user-friendly message + fallback behavior

### 11.3 Scalability Standards

**Free Tier Limits (Neon + Vercel):**
- Database: 100k rows (~10k users estimated)
- API calls: 100k/month (Vercel)
- Bandwidth: 100GB/month (Vercel)

**Growth Projections:**
- Year 1: <1000 users (within free tier)
- Year 2: <10k users (upgrade to paid tier ~$20/month)
- Year 3: <100k users (upgrade to pro tier ~$100/month)

### 11.4 Monitoring & Alerting

**Metrics to Track:**
- Signup rate (daily, weekly, monthly)
- Login success/failure rate
- Session duration (average, median)
- API error rate (by endpoint)
- Database connection pool utilization
- OAuth provider success rate
- Email delivery rate
- Password reset completion rate

**Alerts:**
- Auth API error rate >5% (5 minutes)
- Database connection failures
- Email delivery failures
- Unusual login patterns (location, time)
- Rate limit threshold reached

---

## 12. Compliance & Legal

### 12.1 GDPR Compliance

**Article 5 - Data Minimization:**
- ✅ Collect only essential data (email, password, name)
- ✅ No unnecessary tracking or profiling

**Article 6 - Lawful Basis:**
- ✅ Consent: Users accept terms during signup
- ✅ Legitimate interest: Session management for security

**Article 7 - Consent:**
- ✅ Clear privacy policy
- ✅ Cookie consent banner
- ✅ Opt-in for marketing emails (future)

**Article 15 - Right of Access:**
- ✅ Users can view all their data (profile page)

**Article 16 - Right to Rectification:**
- ✅ Users can edit profile information

**Article 17 - Right to Erasure:**
- ✅ Users can delete accounts (30-day soft delete)

**Article 20 - Right to Data Portability:**
- ✅ Users can export data (JSON format)

**Article 32 - Security of Processing:**
- ✅ Encryption at rest and in transit
- ✅ Access controls and authentication
- ✅ Regular security testing

### 12.2 COPPA Compliance

**Age Verification:**
- ⚠️ Platform not intended for children <13
- Add age gate on signup ("I am 13 or older")
- Parental consent flow (future, if targeting younger)

### 12.3 Accessibility Compliance

**Section 508 / WCAG 2.1 AA:**
- ✅ Keyboard accessible
- ✅ Screen reader compatible
- ✅ Color contrast compliant
- ✅ Form labels and ARIA

---

## 13. Implementation Roadmap

### Phase 1: Foundation (Week 1)
**Goal: Set up infrastructure and select technologies**

**Tasks:**
- Evaluate and select authentication framework
- Evaluate and select database provider
- Evaluate and select email service
- Provision database instance
- Set up database schema and migrations
- Set up environment variables
- Test database connectivity
- Configure development environment

**Deliverables:**
- Technology selections documented with rationale
- Database provisioned and accessible
- Schema created and migrated
- Development environment configured
- Connection tested and validated

---

### Phase 2: Backend Authentication (Week 2)
**Goal: Implement authentication API**

**Tasks:**
- Implement authentication server configuration
- Create authentication API endpoints
- Configure email/password authentication
- Set up email service integration
- Create email templates (verification, reset, notifications)
- Implement session management
- Test authentication flows (signup, login, logout, reset)
- Document API endpoints

**Deliverables:**
- Working authentication API
- Email verification functional
- Password reset functional
- Session management working
- API documentation complete

---

### Phase 3: OAuth Integration (Week 3)
**Goal: Add social login**

**Tasks:**
- Register OAuth applications with selected providers
- Configure authentication framework with OAuth providers
- Implement OAuth callback handlers
- Test OAuth login flows for each provider
- Implement account linking functionality
- Implement account unlinking functionality
- Handle OAuth error cases

**Deliverables:**
- Social login functional for selected providers
- Account linking/unlinking working
- OAuth error handling implemented
- User documentation for social login

---

### Phase 4: Frontend Integration (Week 4)
**Goal: Build auth UI**

**Tasks:**
- Create auth client wrapper
- Create AuthProvider context
- Build sign-in form
- Build sign-up form
- Build password reset flow
- Build email verification UI
- Add auth state to header (login/logout)
- Protect chat history features

**Deliverables:**
- Auth UI complete
- Session management working
- Protected features functional

---

### Phase 5: Security Hardening (Week 5)
**Goal: Production-ready security**

**Tasks:**
- Enable rate limiting
- Configure CORS properly
- Add security headers (CSP, HSTS, etc.)
- Implement password breach checking
- Add account lockout
- Set up security monitoring
- Run penetration tests
- Fix security issues

**Deliverables:**
- Security audit passed
- No critical vulnerabilities
- Monitoring configured

---

### Phase 6: Privacy & Compliance (Week 6)
**Goal: Legal compliance**

**Tasks:**
- Draft privacy policy
- Draft terms of service
- Add cookie consent banner
- Implement data export feature
- Implement account deletion feature
- Add age verification
- Legal review (optional)

**Deliverables:**
- Privacy policy published
- Terms of service published
- GDPR compliance achieved
- User data controls functional

---

### Phase 7: Testing & Refinement (Week 7)
**Goal: Production quality**

**Tasks:**
- Write integration tests
- Write E2E tests
- Test on multiple browsers
- Test on mobile devices
- Performance testing
- Load testing
- Bug fixes
- UX improvements

**Deliverables:**
- Test suite complete
- All tests passing
- Performance targets met
- UX polished

---

### Phase 8: Deployment & Launch (Week 8)
**Goal: Go live**

**Tasks:**
- Deploy to production
- Smoke test production
- Monitor errors and performance
- Set up alerting
- Create user documentation
- Announce launch
- Monitor user feedback

**Deliverables:**
- Production deployment successful
- Monitoring active
- Documentation published
- Launch announced

---

## 14. Risk Analysis

### Risk 1: Cross-Domain Cookie Issues

**Description:** GitHub Pages (`.github.io`) and Vercel (`.vercel.app`) are different domains. Cookies may not persist correctly.

**Likelihood:** High
**Impact:** Critical (auth won't work)

**Mitigation:**
- Use `SameSite=None; Secure` cookies
- Test cross-domain session persistence early
- Consider custom domain to share root domain
- Have fallback: localStorage tokens (less secure)

---

### Risk 2: Email Deliverability

**Description:** Verification and reset emails may end up in spam folders.

**Likelihood:** Medium
**Impact:** High (users can't verify accounts)

**Mitigation:**
- Use reputable email service (Resend, SendGrid)
- Configure SPF, DKIM, DMARC records
- Use verified domain (not generic)
- Test with major email providers (Gmail, Outlook)
- Add "Check spam folder" message in UI

---

### Risk 3: OAuth Provider Downtime

**Description:** Google or GitHub OAuth may be unavailable.

**Likelihood:** Low
**Impact:** Medium (social login fails)

**Mitigation:**
- Offer email/password as primary method
- Display clear error message when OAuth fails
- Monitor OAuth provider status pages
- Have fallback: email/password always works

---

### Risk 4: Database Connection Limits

**Description:** Neon free tier has connection limits. Serverless functions may exhaust connections.

**Likelihood:** Medium
**Impact:** High (auth fails)

**Mitigation:**
- Use connection pooling (Prisma)
- Configure max connections appropriately
- Monitor connection pool utilization
- Close connections explicitly after use
- Upgrade to paid tier if needed

---

### Risk 5: Rate Limiting Too Strict

**Description:** Legitimate users may hit rate limits (shared IPs, VPNs).

**Likelihood:** Medium
**Impact:** Medium (user frustration)

**Mitigation:**
- Start with generous limits
- Monitor rate limit hit rate
- Adjust based on real usage patterns
- Add CAPTCHA as alternative to hard blocks
- Whitelist known good IPs (optional)

---

### Risk 6: GDPR Non-Compliance

**Description:** Missing privacy features could violate GDPR.

**Likelihood:** Low (if we follow plan)
**Impact:** Critical (legal liability, fines)

**Mitigation:**
- Implement all GDPR features (export, delete)
- Publish privacy policy before collecting data
- Get legal review
- Monitor GDPR regulatory changes
- Have incident response plan

---

## 15. Success Metrics

### User Adoption
- **Goal:** 100 signups in first month
- **Goal:** 70% of chatbot users create accounts

### User Experience
- **Goal:** <60s average signup time
- **Goal:** >95% first-login success rate
- **Goal:** <5% password reset rate (indicates good UX)

### Security
- **Goal:** Zero security incidents
- **Goal:** <1% login failure rate (non-user-error)
- **Goal:** 100% of passwords pass strength check

### Performance
- **Goal:** <3s p95 auth response time
- **Goal:** 99.9% uptime
- **Goal:** <100ms session validation

### Privacy
- **Goal:** 100% GDPR compliance
- **Goal:** <1% data export requests (indicates trust)
- **Goal:** <5% account deletion rate (indicates satisfaction)

---

## 16. Appendices

### 16.1 Glossary

**Authentication:** Verifying user identity (who you are)
**Authorization:** Verifying user permissions (what you can do)
**Session:** Persistent authenticated state across requests
**OAuth:** Open standard for social login
**CSRF:** Cross-Site Request Forgery attack
**XSS:** Cross-Site Scripting attack
**GDPR:** General Data Protection Regulation (EU privacy law)
**COPPA:** Children's Online Privacy Protection Act (US law)
**2FA:** Two-Factor Authentication
**Bcrypt:** Password hashing algorithm
**JWT:** JSON Web Token (alternative session method)
**RBAC:** Role-Based Access Control
**CORS:** Cross-Origin Resource Sharing
**CSP:** Content Security Policy

### 16.2 References

**better-auth Documentation:**
- Official docs: https://www.better-auth.com
- GitHub: https://github.com/better-auth/better-auth
- PostgreSQL adapter: https://www.better-auth.com/docs/adapters/prisma

**Security Standards:**
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- HaveIBeenPwned API: https://haveibeenpwned.com/API/v3

**Privacy & Compliance:**
- GDPR Official Text: https://gdpr-info.eu/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- COPPA Requirements: https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa

**Deployment:**
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Version**: 1.1.0
**Last Updated**: 2025-12-02
**Next Review**: After Phase 1 implementation

**Approval Status:** ✅ APPROVED
**Approver:** Anjum (User)
**Date:** 2025-12-02

---

**Note:** This constitution establishes principles and requirements without prescribing specific technologies. Technology selection will occur in the Specification phase based on the criteria defined in Section 4.1.

**This constitution MUST be approved before proceeding to Specification (spec.md) phase.**
