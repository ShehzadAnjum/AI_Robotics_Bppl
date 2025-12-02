# Implementation Plan: User Authentication & Authorization

**Branch**: `001-authentication` | **Date**: 2025-12-02 | **Spec**: [spec.md](./spec.md)
**Status**: MVP/Demo Priority - Finish ASAP
**Scaling Timeline**: Medium (3mo) → Large (6mo)

---

## Summary

Implement secure, privacy-respecting authentication for the Interactive Online Book Platform using **better-auth** (modern TypeScript-first framework) integrated with existing PostgreSQL database. Enable personalized learning experiences (progress tracking, bookmarks) while maintaining free public access to educational content.

**MVP Approach**: Deliver P1 features (email/password, social login, password reset) in **3 weeks** with $0 infrastructure cost, then scale at 3-month and 6-month milestones.

**Technical Approach**: Leverage best-of-breed open-source tools (better-auth, Prisma, Resend) with excellent developer experience to maximize velocity. Reuse existing PostgreSQL database to eliminate provisioning delays. Deploy on existing Vercel + GitHub Pages infrastructure with SameSite=None cross-domain session strategy.

---

## Technical Context

**Language/Version**: **TypeScript 5.3+ / Node.js 20+**
- Vercel serverless functions (existing platform)
- Type-safe end-to-end (better-auth + Prisma + React)

**Primary Dependencies**:
- **better-auth v1.3.4+**: Authentication framework (security, OAuth, sessions)
- **Prisma 5.x**: TypeScript ORM for PostgreSQL
- **Resend**: Transactional email service (3k emails/month free)
- **better-auth/react**: React client library for Docusaurus integration

**Storage**:
- **Existing PostgreSQL**: Reuse chatbot database (user confirmed)
- **Tables**: `auth_*` (better-auth managed), `user_progress`, `user_bookmarks` (custom)
- **Session Storage**: PostgreSQL (stateful sessions, no Redis needed for MVP)

**Testing**:
- **Unit**: Vitest (TypeScript test framework)
- **Integration**: Playwright (E2E browser automation)
- **Security**: Manual checklist (CSRF, XSS, SQL injection, rate limiting)

**Target Platform**:
- **Backend**: Vercel Serverless (Node.js 20+, existing deployment)
- **Frontend**: GitHub Pages (Docusaurus SSG, React 18+)
- **Database**: PostgreSQL (existing, add auth tables)
- **Email**: Resend (managed service)

**Project Type**: **Web Application** (separate frontend + backend)
- **Frontend**: Static site (GitHub Pages)
- **Backend**: Serverless API (Vercel)
- **Cross-Domain**: SameSite=None cookies (no custom domain for MVP)

**Performance Goals**:
- **Authentication Latency**: <3s (p95) for signin/signup
- **Session Validation**: <100ms (p95) per request
- **Email Delivery**: <30s for verification emails
- **Uptime**: 99.9% (authentication service availability)

**Constraints**:
- **MVP Timeline**: 3 weeks for P1 features (user confirmed priority)
- **Infrastructure Cost**: $0/month for MVP (free tiers only)
- **No Custom Domain**: Use SameSite=None cookies (Safari limitations accepted)
- **Existing Database**: Must not disrupt chatbot functionality
- **Public Content**: Must remain accessible without authentication

**Scale/Scope**:
- **MVP (Current)**: <1,000 users, ~100 emails/month
- **Medium (3 Months)**: 1,000-10,000 users, upgrade to $20-40/month
- **Large (6 Months)**: 10,000+ users, upgrade to $50-100/month
- **Features**: 10 user stories (4 P1, 4 P2, 2 P3), 65 functional requirements

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Authentication Constitution Compliance (v1.1.0)

#### 2.1 Zero Trust Architecture ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Verify Everything** | better-auth validates all requests cryptographically | ✅ PASS |
| **Never Trust Client Data** | Prisma parameterized queries, input validation | ✅ PASS |
| **Session Verification** | Database-backed sessions, validated on every request | ✅ PASS |
| **OAuth Token Validation** | better-auth validates with Google/GitHub providers | ✅ PASS |

#### 2.2 Privacy by Default ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Minimal Data Collection** | Only email, password (hashed), optional name | ✅ PASS |
| **No Prohibited Data** | No phone, address, payment info, browsing history | ✅ PASS |
| **GDPR Compliance** | Data export (JSON), account deletion (30-day grace) | ✅ PASS |

#### 2.3 Cryptographic Standards ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Password Hashing** | bcrypt work factor 12+ (better-auth default) | ✅ PASS |
| **TLS 1.3** | Vercel + GitHub Pages enforce HTTPS | ✅ PASS |
| **Secure Cookies** | httpOnly, secure, sameSite=none (cross-domain) | ✅ PASS |
| **Database Encryption** | PostgreSQL encryption at rest (existing config) | ✅ PASS |

#### 2.4 Attack Prevention ✅

| Attack Vector | Mitigation | Status |
|---------------|------------|--------|
| **Rate Limiting** | better-auth built-in (5 login/15min, 3 signup/hour) | ✅ PASS |
| **CSRF Protection** | better-auth automatic CSRF tokens | ✅ PASS |
| **XSS Prevention** | React auto-escaping, CSP headers | ✅ PASS |
| **SQL Injection** | Prisma parameterized queries only | ✅ PASS |
| **Brute Force** | Account lockout after 10 failed attempts | ✅ PASS |

#### 2.5 Password Security ✅

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| **Breach Detection** | better-auth HaveIBeenPwned integration | ✅ PASS |
| **Minimum Length** | 8 characters enforced (better-auth config) | ✅ PASS |
| **Strength Indicator** | Frontend password strength UI | ✅ PASS |

#### 2.6 Session Management ✅

| Requirement | Configuration | Status |
|-------------|---------------|--------|
| **Session Expiration** | 7 days default, 30 days max (better-auth) | ✅ PASS |
| **Session Rotation** | Refresh token updated daily | ✅ PASS |
| **Stateful Sessions** | Database-backed (PostgreSQL) | ✅ PASS |
| **Device Tracking** | IP + User-Agent stored for anomaly detection | ✅ PASS |

#### 2.7 Data Retention & Deletion ✅

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| **Data Export** | JSON export of all user data (FR-045) | ✅ PASS |
| **Account Deletion** | 30-day soft delete, then permanent (FR-046-049) | ✅ PASS |
| **Right to be Forgotten** | GDPR Article 17 compliant | ✅ PASS |

### Project Constitution Compliance (v1.0.0)

#### 3.1 Code Quality Principles ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Smallest Viable Change** | Phased delivery (P1 → P2 → P3), no over-engineering | ✅ PASS |
| **Type Safety** | TypeScript end-to-end (better-auth + Prisma + React) | ✅ PASS |
| **Test Coverage** | Unit (Vitest) + Integration (Playwright) + Security checklist | ✅ PASS |

#### 3.2 Architecture Principles ✅

| Principle | Implementation | Status |
|-----------|----------------|--------|
| **Modular Design** | Separate auth service, reusable components | ✅ PASS |
| **Single Responsibility** | auth service handles only authentication/authorization | ✅ PASS |
| **Dependency Injection** | Prisma client injectable, testable | ✅ PASS |

#### 3.3 Security Standards ✅

| Standard | Implementation | Status |
|----------|----------------|--------|
| **OWASP Top 10** | All mitigated (see 2.4 Attack Prevention) | ✅ PASS |
| **Secrets Management** | Environment variables only (never in code) | ✅ PASS |
| **Audit Logging** | Security events logged (signin, failed attempts, deletion) | ✅ PASS |

### Constitution Check Result: ✅ ALL GATES PASSED

No violations. Implementation fully complies with both Authentication Constitution (v1.1.0) and Project Constitution (v1.0.0).

---

## Project Structure

### Documentation (this feature)

```text
specs/001-authentication/
├── spec.md                    # Feature specification (10 user stories, 65 requirements)
├── plan.md                    # This file - Implementation plan
├── research.md                # Phase 0 - Technology research & decisions
├── data-model.md              # Phase 1 - Database schema & entity design
├── quickstart.md              # Phase 1 - Developer onboarding guide
├── contracts/                 # Phase 1 - API contracts
│   ├── auth-api.openapi.yaml  # Authentication API (OpenAPI 3.1)
│   └── types.ts               # Shared TypeScript types
└── tasks.md                   # Phase 2 - Testable implementation tasks (TBD)

checklists/
└── requirements.md            # Specification quality validation (✅ ALL PASSED)
```

### Source Code (repository root)

```text
# Backend (Vercel Serverless Functions)
backend/
├── api/
│   └── auth/
│       ├── [...auth].ts       # better-auth catch-all route
│       ├── session.ts         # Session validation endpoint
│       └── user.ts            # User profile endpoints
├── lib/
│   ├── auth.ts                # better-auth configuration
│   ├── prisma.ts              # Prisma client singleton
│   ├── email.ts               # Resend email service
│   └── utils/
│       ├── validation.ts      # Input validation helpers
│       └── errors.ts          # Custom error types
├── prisma/
│   ├── schema.prisma          # Database schema (auth + user features)
│   └── migrations/            # Prisma migration history
├── tests/
│   ├── unit/
│   │   ├── auth.test.ts       # Authentication unit tests
│   │   └── validation.test.ts # Input validation tests
│   └── integration/
│       ├── signin.test.ts     # E2E signin flow
│       ├── signup.test.ts     # E2E signup flow
│       └── oauth.test.ts      # OAuth provider tests
├── package.json
├── tsconfig.json
├── vercel.json                # Vercel deployment config
└── .env.local.example         # Environment variable template

# Frontend (Docusaurus Static Site)
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── AuthProvider.tsx    # better-auth React provider
│   │   │   ├── SignInForm.tsx      # Email/password signin
│   │   │   ├── SignUpForm.tsx      # Email/password signup
│   │   │   ├── SocialButtons.tsx   # Google/GitHub OAuth buttons
│   │   │   ├── PasswordReset.tsx   # Password reset flow
│   │   │   └── AccountSettings.tsx # Profile management
│   │   ├── Progress/
│   │   │   ├── ProgressTracker.tsx # Chapter completion tracker
│   │   │   └── ProgressBar.tsx     # Visual progress indicator
│   │   └── Bookmarks/
│   │       ├── BookmarkButton.tsx  # Bookmark chapter action
│   │       └── BookmarkList.tsx    # User bookmarks page
│   ├── pages/
│   │   ├── account.tsx             # User account page
│   │   ├── bookmarks.tsx           # User bookmarks page
│   │   └── progress.tsx            # User progress dashboard
│   ├── hooks/
│   │   ├── useAuth.ts              # Authentication state hook
│   │   ├── useProgress.ts          # Progress tracking hook
│   │   └── useBookmarks.ts         # Bookmarks management hook
│   └── lib/
│       ├── auth-client.ts          # better-auth/react client config
│       └── api.ts                  # API client (fetch wrapper)
├── plugins/
│   └── docusaurus-plugin-auth-routes/ # Add auth routes to Docusaurus
├── tests/
│   └── e2e/
│       ├── signin.spec.ts          # Playwright E2E signin
│       ├── signup.spec.ts          # Playwright E2E signup
│       ├── progress.spec.ts        # Playwright E2E progress tracking
│       └── bookmarks.spec.ts       # Playwright E2E bookmarks
├── package.json
├── tsconfig.json
└── docusaurus.config.js            # Docusaurus configuration

# Shared Configuration
.github/
└── workflows/
    ├── test-backend.yml            # Backend CI (unit + integration tests)
    ├── test-frontend.yml           # Frontend CI (E2E Playwright tests)
    ├── deploy-backend.yml          # Deploy to Vercel on merge to main
    └── deploy-frontend.yml         # Deploy to GitHub Pages on merge to gh-pages

# Root-level Configuration
.env.local.example                  # Environment variables template
README.md                           # Project documentation
package.json                        # Root workspace config (monorepo)
```

**Structure Decision**: **Web Application** (separate frontend + backend)

**Rationale**:
- **Frontend**: Static Docusaurus site deployed to GitHub Pages (existing)
- **Backend**: Serverless API deployed to Vercel (existing)
- **Separation**: Allows independent scaling and deployment
- **Cross-Domain**: GitHub Pages (.github.io) ↔ Vercel (.vercel.app) via SameSite=None cookies

---

## Complexity Tracking

> **No Constitution Violations** - This section intentionally left empty.

All architectural decisions comply with Constitution principles:
- ✅ Smallest Viable Change (phased delivery, no over-engineering)
- ✅ Single Responsibility (auth service handles only authentication)
- ✅ Modular Design (reusable components, clear boundaries)
- ✅ Type Safety (TypeScript end-to-end)
- ✅ Security Standards (OWASP Top 10 compliance)

---

## Phase Breakdown

### Phase 0: Research ✅ COMPLETE

**Output**: [research.md](./research.md)

**Key Decisions Made**:
1. **Authentication Framework**: better-auth v1.3.4+ (4.90/5.00 score)
2. **Database**: Reuse existing PostgreSQL (user confirmed)
3. **Email Service**: Resend (4.70/5.00 score, 3k emails/month free)
4. **ORM**: Prisma 5.x (4.60/5.00 score, excellent TypeScript support)
5. **Session Strategy**: SameSite=None cookies (cross-domain, no custom domain)
6. **OAuth Providers**: Google + GitHub (most relevant for robotics students)

**Research Artifacts**:
- Technology evaluations with 7-criteria scoring framework
- Alternatives considered and rejection rationale
- Scaling strategy (MVP → Medium → Large)
- Cost projections ($0 → $20-40 → $50-100/month)
- Development workflow and testing strategy

---

### Phase 1: Design & Contracts ⏭️ IN PROGRESS

#### 1.1 Data Model Design → `data-model.md`

**Entities to Design** (from Spec):
1. **User**: Email, password (hashed), name, verification status, timestamps
2. **Session**: User reference, token, expiration, device metadata
3. **Social Account**: User reference, provider (Google/GitHub), provider ID
4. **Verification Token**: User reference, token type, expiration, used status
5. **User Progress**: User reference, chapter ID, completion status, timestamps
6. **Bookmark**: User reference, chapter ID, personal notes, timestamps
7. **Security Event**: Event type, user reference, IP, user agent, timestamp

**Database Schema** (Prisma):
- Define all entities with relationships
- Add indexes for query optimization
- Specify constraints (unique, foreign keys)
- Document validation rules

**Deliverable**: Complete data model with ERD diagram and Prisma schema

---

#### 1.2 API Contract Definition → `contracts/`

**Endpoints to Define** (from Functional Requirements):

**Authentication Endpoints** (better-auth standard):
- `POST /api/auth/sign-up/email` - Create account with email/password
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-out` - End session
- `GET /api/auth/session` - Get current session
- `POST /api/auth/reset-password` - Request password reset
- `POST /api/auth/update-password` - Update password
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/callback/github` - GitHub OAuth callback

**Profile Endpoints** (custom):
- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/profile` - Update profile (name, email)
- `GET /api/user/progress` - Get reading progress
- `POST /api/user/progress/:chapterId` - Mark chapter complete
- `DELETE /api/user/progress/:chapterId` - Reset chapter progress
- `GET /api/user/bookmarks` - Get all bookmarks
- `POST /api/user/bookmarks/:chapterId` - Add bookmark
- `DELETE /api/user/bookmarks/:chapterId` - Remove bookmark
- `PATCH /api/user/bookmarks/:chapterId` - Update bookmark notes

**Account Management Endpoints** (custom):
- `POST /api/user/export` - Export user data (JSON)
- `POST /api/user/delete` - Request account deletion
- `POST /api/user/restore` - Restore soft-deleted account

**Deliverable**: OpenAPI 3.1 specification with request/response schemas

---

#### 1.3 Quickstart Guide → `quickstart.md`

**Developer Onboarding**:
1. Prerequisites (Node.js, PostgreSQL client, API keys)
2. Environment setup (.env.local template)
3. Database initialization (Prisma migrations)
4. Local development (Vercel dev + Docusaurus)
5. Testing (unit + integration + E2E)
6. Deployment (Vercel + GitHub Pages)

**Deliverable**: Step-by-step guide for new contributors

---

### Phase 2: Task Breakdown → `/sp.tasks` (NOT created by /sp.plan)

**Will be generated after Phase 1 complete**:
- Run `/sp.tasks` command
- Break down implementation into TDD cycles
- Prioritize P1 → P2 → P3 user stories
- Estimate effort for each task

---

## Implementation Roadmap (MVP Priority)

### Week 1: Backend Foundation (P1 Core Auth)

**Days 1-2: better-auth Integration**
- [ ] Set up Vercel project structure
- [ ] Install dependencies (better-auth, Prisma, Resend)
- [ ] Configure better-auth with existing PostgreSQL
- [ ] Run database migrations (auth tables)
- [ ] Test basic auth endpoint (`/api/auth/session`)

**Days 3-4: Email/Password Authentication**
- [ ] Implement signup endpoint with email verification
- [ ] Implement signin endpoint with session creation
- [ ] Configure Resend email service
- [ ] Test email verification flow
- [ ] Implement password reset flow

**Day 5: Session Management**
- [ ] Configure session expiration (7 days default, 30 days max)
- [ ] Implement "Remember me" functionality
- [ ] Test session validation on protected endpoints
- [ ] Implement signout (session deletion)

---

### Week 2: Frontend + OAuth (P1-P2 Social Login)

**Days 1-2: React Client Integration**
- [ ] Set up better-auth/react in Docusaurus
- [ ] Create AuthProvider component
- [ ] Implement SignInForm component
- [ ] Implement SignUpForm component
- [ ] Test SameSite=None cross-domain cookies

**Days 3-4: OAuth Providers**
- [ ] Register Google OAuth application
- [ ] Register GitHub OAuth application
- [ ] Configure OAuth callbacks in better-auth
- [ ] Implement SocialButtons component
- [ ] Test OAuth flows (Google + GitHub)

**Day 5: Account Linking**
- [ ] Implement account linking (add Google to email account)
- [ ] Implement account unlinking
- [ ] Test multiple signin methods for same user
- [ ] Handle OAuth errors gracefully

---

### Week 3: User Features + Security (P2 Progress/Bookmarks)

**Days 1-2: Progress Tracking**
- [ ] Create `user_progress` table (Prisma migration)
- [ ] Implement progress API endpoints
- [ ] Create ProgressTracker component
- [ ] Test chapter completion tracking
- [ ] Test progress sync across devices

**Days 3-4: Bookmarks + Profile**
- [ ] Create `user_bookmarks` table (Prisma migration)
- [ ] Implement bookmarks API endpoints
- [ ] Create BookmarkButton + BookmarkList components
- [ ] Implement profile management (AccountSettings component)
- [ ] Test bookmark CRUD operations

**Day 5: Security + Deployment**
- [ ] Enable rate limiting (better-auth config)
- [ ] Enable account lockout after failed attempts
- [ ] Run security checklist (CSRF, XSS, SQL injection)
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Deploy to production (Vercel + GitHub Pages)

---

## Testing Strategy

### Unit Tests (Vitest)

**Coverage Target**: 80%+

**Test Suites**:
- `auth.test.ts`: Password hashing, session creation, validation
- `validation.test.ts`: Input validation, email format, password strength
- `email.test.ts`: Email sending (mocked), template rendering

**Example**:
```typescript
describe('Password hashing', () => {
  it('should hash passwords with bcrypt', async () => {
    const hashed = await hashPassword('password123');
    expect(hashed).not.toBe('password123');
    expect(hashed).toMatch(/^\$2[aby]\$/);
  });

  it('should verify correct passwords', async () => {
    const hashed = await hashPassword('password123');
    expect(await verifyPassword('password123', hashed)).toBe(true);
  });
});
```

---

### Integration Tests (Vitest)

**Test Flows**:
- Signup → Email verification → Signin
- Signin → Create session → Validate session → Signout
- Password reset → Reset link → Update password → Signin
- OAuth signin (mocked provider responses)

**Example**:
```typescript
describe('Signup flow', () => {
  it('should create account and send verification email', async () => {
    const response = await request(app)
      .post('/api/auth/sign-up/email')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe('test@example.com');
    expect(emailService.send).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: expect.stringContaining('Verify'),
    });
  });
});
```

---

### E2E Tests (Playwright)

**User Story Coverage**: All P1 user stories

**Test Scenarios**:
1. **US-1**: Account creation → Email verification → Signin
2. **US-2**: Returning user signin → See progress
3. **US-3**: Social login (Google) → Account created
4. **US-4**: Social login (GitHub) → Account created
5. **US-5**: Password reset → New password → Signin
6. **US-6**: Email verification reminder → Resend email

**Example**:
```typescript
test('User can sign up and verify email', async ({ page }) => {
  // Navigate to signup page
  await page.goto('http://localhost:3001/signup');

  // Fill signup form
  await page.fill('input[name=email]', 'test@example.com');
  await page.fill('input[name=password]', 'password123');
  await page.click('button[type=submit]');

  // Check success message
  await expect(page.locator('text=Check your email')).toBeVisible();

  // Simulate clicking verification link (get from test email)
  const verifyUrl = await getLastEmailLink('test@example.com');
  await page.goto(verifyUrl);

  // Check account verified
  await expect(page.locator('text=Email verified')).toBeVisible();
});
```

---

### Security Testing (Manual Checklist)

**Pre-Production Audit**:
- [ ] CSRF tokens present on all mutation requests
- [ ] XSS prevention: React escapes all user input
- [ ] SQL injection: Prisma uses parameterized queries only
- [ ] Rate limiting: Try 6 login attempts, verify lockout
- [ ] Session expiration: Create session, wait 7 days, verify expired
- [ ] Password breach: Try "password123", verify rejection
- [ ] HTTPS enforced: HTTP requests redirect to HTTPS
- [ ] Secure cookies: Verify httpOnly, secure, sameSite flags
- [ ] Secrets not in code: Search codebase for hardcoded keys
- [ ] Error messages: Don't reveal implementation details

---

## Deployment Strategy

### MVP Deployment (Vercel + GitHub Pages)

**Backend (Vercel)**:
1. Connect GitHub repo to Vercel
2. Configure environment variables (secrets)
3. Set up automatic deployments (main branch → production)
4. Configure custom domain (if added later)

**Frontend (GitHub Pages)**:
1. Build Docusaurus site (`npm run build`)
2. Deploy to `gh-pages` branch
3. GitHub Actions automatic deployment

**Database Migrations**:
```bash
# Production migration (run once after deploy)
npx prisma migrate deploy
```

---

### Scaling Deployments

**3-Month Milestone (Medium Scale)**:
- Add Upstash Redis for rate limiting
- Upgrade Vercel to Pro ($20/month)
- Add monitoring (Sentry for errors, Vercel Analytics)
- Set up alerting (email on authentication failures)

**6-Month Milestone (Large Scale)**:
- Upgrade PostgreSQL to paid tier ($20-40/month)
- Upgrade Resend to Pro ($20/month for 50k emails)
- Add Redis Pro ($10/month for higher throughput)
- Implement database read replicas (if needed)
- Consider CDN for static assets (Cloudflare)

---

## Risk Mitigation

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Safari cookie blocking** | Medium | Low | Implement localStorage fallback, user guidance |
| **OAuth provider downtime** | Low | Medium | Display clear error, suggest email/password fallback |
| **Database migration failure** | Low | High | Test migrations in staging, maintain rollback scripts |
| **Email deliverability issues** | Medium | Medium | Use Resend (99%+ delivery), monitor bounce rates |
| **Rate limit bypass** | Low | Medium | Multiple layers (better-auth + Vercel edge middleware) |

### Schedule Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **OAuth setup delays** | Medium | Low | Start OAuth registration early (parallel to dev) |
| **Cross-domain cookie issues** | Medium | Medium | Test early with real browsers, document workarounds |
| **Scope creep (P2/P3 features)** | High | Medium | Strict prioritization, defer P3 to post-MVP |
| **Testing delays** | Medium | Low | Write tests alongside implementation (TDD) |

### Security Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Password breach** | Low | High | HaveIBeenPwned integration, force password change on breach |
| **Session hijacking** | Low | High | Secure cookies, device fingerprinting, IP validation |
| **Brute force attack** | Medium | Medium | Account lockout, rate limiting, CAPTCHA (future) |
| **XSS attack** | Low | High | React auto-escaping, CSP headers, input sanitization |
| **SQL injection** | Very Low | High | Prisma parameterized queries, no raw SQL |

---

## Success Metrics (from Spec)

### Launch Criteria (MVP Ready)

**Functional**:
- [ ] All P1 user stories tested and passing
- [ ] Email/password authentication working
- [ ] Google OAuth working
- [ ] GitHub OAuth working
- [ ] Password reset flow working
- [ ] Email verification working
- [ ] Session management working
- [ ] Progress tracking working
- [ ] Bookmarks working

**Security**:
- [ ] All Constitution gates passed (see Constitution Check section)
- [ ] Security audit checklist complete
- [ ] Rate limiting tested and working
- [ ] Account lockout tested and working
- [ ] No hardcoded secrets in codebase

**Performance**:
- [ ] Signin completes in <3s (p95)
- [ ] Session validation in <100ms (p95)
- [ ] Email delivery in <30s

**Documentation**:
- [ ] README with setup instructions
- [ ] API documentation (OpenAPI spec)
- [ ] Developer quickstart guide
- [ ] Environment variable template

---

### Post-Launch Metrics (First 30 Days)

**User Adoption**:
- Target: 100 signups in first month (MVP demo audience)
- Track: Daily signups, email verification rate (>85%)
- Monitor: Social login vs email/password split

**Security**:
- Target: Zero security incidents
- Track: Failed login attempts, account lockouts, breach detections
- Monitor: Unusual activity (multiple device signins, location changes)

**Performance**:
- Target: 99.9% uptime (<43 minutes downtime/month)
- Track: Authentication latency (p50, p95, p99)
- Monitor: Error rates per endpoint

**Business**:
- Target: 70% of users track progress within first week
- Track: Progress tracking adoption rate
- Track: Bookmark usage rate (target: 60% within first month)

---

## Next Steps

### Immediate Actions (This Planning Session)

1. ✅ **Research Complete** → [research.md](./research.md)
2. ⏭️ **Create Data Model** → `data-model.md`
3. ⏭️ **Define API Contracts** → `contracts/auth-api.openapi.yaml`
4. ⏭️ **Write Quickstart Guide** → `quickstart.md`
5. ⏭️ **Update Agent Context** → Run `.specify/scripts/bash/update-agent-context.sh claude`

### Post-Planning Actions

1. **Run `/sp.tasks`** to generate task breakdown
2. **Set up development environment** (follow quickstart.md)
3. **Start Week 1 implementation** (better-auth integration)
4. **Schedule daily standups** (track progress against 3-week timeline)
5. **Set up monitoring** (Sentry for errors, Vercel Analytics)

---

## Appendices

### A. Technology Evaluation Scores

Complete technology evaluation matrix available in [research.md](./research.md):

| Technology | Category | Score | Status |
|------------|----------|-------|--------|
| **better-auth** | Auth Framework | 4.90/5.00 | ✅ Selected |
| Lucia | Auth Framework | 3.20/5.00 | ❌ Rejected |
| Auth.js | Auth Framework | 3.85/5.00 | ❌ Rejected |
| Supabase Auth | Auth Framework | 4.15/5.00 | ❌ Rejected |
| **Resend** | Email Service | 4.70/5.00 | ✅ Selected |
| SendGrid | Email Service | 3.90/5.00 | ❌ Rejected |
| AWS SES | Email Service | 3.50/5.00 | ❌ Rejected |
| **Prisma** | ORM | 4.60/5.00 | ✅ Selected |
| Drizzle | ORM | 4.30/5.00 | ❌ Rejected |

### B. Cost Projections (Detailed)

**MVP (0-3 Months)**: **$0/month**
- PostgreSQL: Existing database (no additional cost)
- Vercel: Free tier (100 GB bandwidth, 100k requests)
- Resend: Free tier (3,000 emails/month)
- GitHub Pages: Free (public repo)

**Medium Scale (3-6 Months)**: **~$20-40/month**
- PostgreSQL: Existing (or upgrade to $20/month if needed)
- Vercel Pro: $20/month (1M requests, 1TB bandwidth)
- Resend: Free tier still sufficient (3k emails > 1k users)
- Upstash Redis: Free tier (10k requests/day)

**Large Scale (6+ Months)**: **~$50-100/month**
- PostgreSQL Pro: $20-40/month (dedicated instance)
- Vercel Pro: $20/month
- Resend Pro: $20/month (50k emails)
- Upstash Redis Pro: $10/month (100k requests/day)

### C. Reference Architecture Diagram

See [research.md Section 9](./research.md#9-deployment-architecture) for detailed architecture diagram showing:
- User browser → GitHub Pages (frontend)
- User browser → Vercel (backend API)
- Vercel → PostgreSQL (existing database)
- Vercel → Resend (email service)
- Cross-domain session flow (SameSite=None cookies)

### D. Related Documents

- **Specification**: [spec.md](./spec.md) - 10 user stories, 65 requirements, 35 success criteria
- **Constitution**: [.specify/memory/constitution-authentication.md](../../.specify/memory/constitution-authentication.md) - Security & privacy principles
- **Technology Research**: [specs/authentication/technology-research.md](../authentication/technology-research.md) - Original technology evaluations (pre-constitution)
- **Requirements Checklist**: [checklists/requirements.md](./checklists/requirements.md) - Quality validation (all passed)

---

**Plan Status**: ✅ READY FOR PHASE 1 DESIGN
**Next Command**: Continue with data model and contracts generation
**Estimated Delivery**: 3 weeks for P1 features (MVP demo priority)
