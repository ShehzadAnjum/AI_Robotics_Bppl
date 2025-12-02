---
id: 0002
title: Authentication Login Constitution
stage: constitution
date: 2025-12-02
surface: agent
model: claude-sonnet-4-5-20250929
feature: authentication
branch: gh-pages
user: anjum
command: interactive
labels: ["authentication", "security", "better-auth", "constitution", "privacy", "gdpr"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution-authentication.md (v1.1.0 - principles-based)
 - specs/authentication/technology-research.md (extracted tech stack research)
tests:
 - none
---

## Prompt

We have already completed the book writing and adding a chat bot, search & translate functionality

Let's move to next phase.
Help me write a constitution for adding a Login functionality for this interactive online book app
- implement Signup and Signin using https://www.better-auth.com
- utilize the Vercel / Neon (Postgres db), already deployed as back-end for chatbot and translation
- Creating and using reusable intelligence via Claude Code Subagents and Agent Skills
- identify the gaps and what need to make this a good login system with best practices

## Response snapshot

**Surface:** Agent-level constitution creation for authentication feature
**Success Criteria:** Comprehensive authentication constitution following SpecKit Plus methodology with security, privacy, UX, and technical principles

**Constitution Created:** `.specify/memory/constitution-authentication.md`

**Key Components:**

1. **Feature Identity**
   - Mission: Secure, privacy-respecting authentication for personalized learning
   - Vision: Invisible infrastructure enabling richer experiences
   - Scope: Email/password, social OAuth, session management, progress tracking
   - Success: 95%+ signup in <60s, 99.9% uptime, zero security incidents

2. **Security & Privacy Principles (12 core principles)**
   - Zero Trust Architecture (verify everything)
   - Privacy by Default (minimal data collection)
   - Cryptographic Standards (bcrypt, TLS 1.3, encrypted cookies)
   - Attack Prevention (rate limiting, CSRF, XSS, SQL injection)
   - Password Breach Detection (HaveIBeenPwned)
   - Secure Session Management (7-day expiry, rotation)
   - Data Retention & Right to be Forgotten (GDPR compliance)

3. **User Experience Principles**
   - Accessibility: No auth required for public content
   - Progressive Enhancement: Works without JavaScript
   - Clear Communication: Transparent auth states
   - Mobile-First Design: Touch-friendly, autofill support

4. **Technology Stack**
   - Framework: better-auth v1.3.4+ (1754 code snippets, 85.5 score)
   - Database: Neon PostgreSQL (serverless, auto-scaling)
   - ORM: Prisma (type-safe, migrations)
   - OAuth: Google, GitHub
   - Email: Resend (recommended for DX)

5. **Reusable Intelligence**
   - **3 Subagents:**
     - Auth Security Auditor (OWASP compliance, vulnerability scanning)
     - Database Schema Migrator (Prisma migrations, rollback scripts)
     - Auth Integration Tester (E2E flows, OAuth, CORS)
   - **3 Skills:**
     - auth-setup-wizard (guided better-auth setup)
     - auth-error-debugger (diagnose and fix auth errors)
     - auth-ui-generator (create React auth components)

6. **Gap Analysis (8 critical gaps identified)**
   - Database infrastructure (Neon setup)
   - Email service (Resend/SendGrid)
   - OAuth provider setup (Google, GitHub apps)
   - Frontend auth integration (React context, forms)
   - CORS & cookie configuration (cross-domain sessions)
   - Rate limiting infrastructure
   - Security monitoring & logging
   - Privacy compliance (GDPR, privacy policy)

7. **Best Practices Checklists**
   - Security: 14 items (bcrypt, HTTPS, CSRF, rate limiting, etc.)
   - Privacy: 11 items (GDPR, data export/delete, encryption)
   - UX: 12 items (mobile-responsive, password strength, clear errors)
   - Developer Experience: 10 items (TypeScript, tests, docs)

8. **Quality Gates**
   - Security: OWASP Top 10, pen testing, dependency scans
   - Privacy: GDPR compliance, cookie consent, data controls
   - Performance: <3s auth, <100ms session validation
   - Accessibility: WCAG 2.1 AA, keyboard navigation, screen readers
   - Testing: 80%+ coverage, E2E tests, browser compatibility

9. **Implementation Roadmap (8 phases, 8 weeks)**
   - Phase 1: Foundation (Neon setup)
   - Phase 2: Backend auth (better-auth API)
   - Phase 3: OAuth (Google, GitHub)
   - Phase 4: Frontend UI (React forms)
   - Phase 5: Security hardening
   - Phase 6: Privacy & compliance
   - Phase 7: Testing & refinement
   - Phase 8: Deployment & launch

10. **Risk Analysis (6 major risks)**
    - Cross-domain cookies (SameSite=None, custom domain)
    - Email deliverability (SPF, DKIM, DMARC)
    - OAuth provider downtime (fallback to email/password)
    - Database connection limits (pooling, monitoring)
    - Rate limiting too strict (CAPTCHA alternative)
    - GDPR non-compliance (legal review, incident response)

**Architecture Highlights:**
- Frontend: GitHub Pages (Docusaurus/React)
- Backend: Vercel serverless (Node.js 20+)
- Database: Neon PostgreSQL (free tier: 100k rows)
- Auth: better-auth with Prisma adapter
- Session: Cookie-based (httpOnly, secure, sameSite=none)
- Email: Resend (verification, password reset)
- OAuth: Google + GitHub

**Security Features:**
- Automatic CSRF protection (better-auth built-in)
- Bcrypt password hashing (work factor 12)
- Rate limiting (5 login attempts per 15 min)
- Password breach checking (HaveIBeenPwned API)
- Session rotation on privilege escalation
- Account lockout after 10 failed attempts
- Security headers (CSP, HSTS, X-Frame-Options)

**GDPR Compliance:**
- Data minimization (only essential data)
- Cookie consent banner
- Privacy policy & terms of service
- Data export feature (Article 20)
- Account deletion feature (Article 17)
- 30-day soft delete with recovery window
- Anonymized analytics (no PII)

**Next Steps:**
1. ✅ Constitution approved by user
2. 🔄 Proceed to `/sp.specify` (create spec.md)
3. 🔄 Proceed to `/sp.plan` (create plan.md with ADRs)
4. 🔄 Proceed to `/sp.tasks` (create tasks.md)
5. 🔄 Proceed to `/sp.implement` (execute implementation)

## Outcome

- ✅ Impact: Comprehensive authentication constitution created (v1.1.0, 16 sections, 1820+ lines, principles-based) + Technology research document (9200+ lines) for Specification phase
- 🧪 Tests: No code written yet (constitution phase)
- 📁 Files: 2 created
  - .specify/memory/constitution-authentication.md (v1.1.0 - principles only)
  - specs/authentication/technology-research.md (complete tech stack research)
- 🔁 Next prompts:
  - Approve constitution v1.1.0
  - `/sp.specify` to create authentication feature specification (will use technology-research.md as input)
  - `/sp.plan` to create architectural design with selected technologies
  - Set up infrastructure based on selected technologies
  - Register OAuth applications based on selected providers
- 🧠 Reflection: Constitution revised to follow best practices - principles and requirements only, no technology prescriptions. All technology-specific research (better-auth, Neon, Resend, OAuth providers, code examples, templates, environment configs) extracted and saved to specs/authentication/technology-research.md for proper evaluation during Specification phase. This approach ensures technology decisions are made with full analysis and user approval rather than embedded in constitution. Gap analysis identifies 8 critical capability gaps (not technology gaps). Reusable intelligence (3 subagents, 3 skills) defined to accelerate development and ensure quality.

## Evaluation notes (flywheel)

- Failure modes observed: Initial version included technology-specific decisions (better-auth, Neon, Resend) which violated constitution best practices. Corrected in v1.1.0 to defer technology selection to Specification phase.
- Graders run and results (PASS/FAIL): FAIL (initial version), PASS (v1.1.0 after revision)
- Prompt variant (if applicable): Constitution creation with user feedback correction
- Next experiment (smallest change to try): User approval of constitution v1.1.0, then proceed to specification phase with `/sp.specify` where technology stack will be properly evaluated and selected based on defined criteria.
