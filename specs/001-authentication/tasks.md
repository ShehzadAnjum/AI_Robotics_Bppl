# Tasks: User Authentication & Authorization

**Input**: Design documents from `/specs/001-authentication/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅
**Timeline**: 3-week MVP (P1 features) → Medium scale (3mo) → Large scale (6mo)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app structure** (from plan.md):
  - Backend: `backend/` (Vercel serverless)
  - Frontend: `frontend/` (Docusaurus)
- **Tests**:
  - Backend: `backend/tests/`
  - Frontend E2E: `frontend/tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backend project structure in `backend/` per plan.md
- [ ] T002 Initialize backend TypeScript project with better-auth, Prisma, Resend dependencies in `backend/package.json`
- [ ] T003 [P] Configure ESLint and Prettier for TypeScript in `backend/.eslintrc.js` and `backend/.prettierrc`
- [ ] T004 [P] Create environment variable template in `backend/.env.local.example` with all required keys
- [ ] T005 [P] Configure Vercel deployment in `backend/vercel.json` with CORS and environment variables
- [ ] T006 Create frontend auth components structure in `frontend/src/components/Auth/`
- [ ] T007 Install better-auth React client dependencies in `frontend/package.json`
- [ ] T008 [P] Configure TypeScript for frontend in `frontend/tsconfig.json`
- [ ] T009 [P] Set up GitHub Actions workflows in `.github/workflows/` for backend and frontend CI/CD

**Checkpoint**: Project structure ready - can now proceed to foundational phase

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Database & ORM Setup

- [ ] T010 Create Prisma schema in `backend/prisma/schema.prisma` with all entities from data-model.md
- [ ] T011 Configure Prisma client singleton in `backend/lib/prisma.ts` for serverless compatibility
- [ ] T012 Run Prisma migration to create auth tables in existing PostgreSQL database
- [ ] T013 Verify database tables created correctly (auth_user, auth_session, auth_account, auth_verification)

### better-auth Configuration

- [ ] T014 Configure better-auth instance in `backend/lib/auth.ts` with email/password and OAuth providers
- [ ] T015 Create catch-all auth route in `backend/api/auth/[...auth].ts` for better-auth endpoints
- [ ] T016 Configure session management (7-day default, 30-day max) in better-auth config
- [ ] T017 Enable security features (CSRF, rate limiting, breach detection) in better-auth config
- [ ] T018 [P] Configure SameSite=None cookies for cross-domain sessions in better-auth config

### Email Service Setup

- [ ] T019 Configure Resend email service in `backend/lib/email.ts` with API key from environment
- [ ] T020 [P] Create email templates for verification and password reset in `backend/lib/email-templates/`
- [ ] T021 Test email delivery with Resend (send test email to verify configuration)

### Shared Utilities

- [ ] T022 [P] Create input validation utilities in `backend/lib/utils/validation.ts` using Zod
- [ ] T023 [P] Create custom error types in `backend/lib/utils/errors.ts` for standardized error handling
- [ ] T024 [P] Create security event logger in `backend/lib/utils/security-logger.ts` for audit trail

### Frontend Auth Provider

- [ ] T025 Create better-auth React client config in `frontend/src/lib/auth-client.ts`
- [ ] T026 Create AuthProvider component in `frontend/src/components/Auth/AuthProvider.tsx` wrapping better-auth provider
- [ ] T027 Create useAuth hook in `frontend/src/hooks/useAuth.ts` for accessing auth state
- [ ] T028 Integrate AuthProvider in Docusaurus root layout in `frontend/src/theme/Root.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Quick Account Creation with Email (Priority: P1) 🎯 MVP

**Goal**: Enable users to create accounts with email/password and receive verification emails

**Independent Test**: Create test account via signup form, receive verification email, click link, confirm account is active and can sign in

### Backend Implementation for US1

- [ ] T029 [US1] Implement email validation in `backend/lib/utils/validation.ts` (RFC 5322 format, max 255 chars)
- [ ] T030 [US1] Implement password validation in `backend/lib/utils/validation.ts` (min 8 chars, breach check)
- [ ] T031 [US1] Create signup endpoint handler in `backend/api/auth/signup.ts` calling better-auth
- [ ] T032 [US1] Create email verification endpoint in `backend/api/auth/verify-email.ts`
- [ ] T033 [US1] Implement verification email sending in `backend/lib/email.ts` with token expiration (24 hours)
- [ ] T034 [US1] Add security event logging for SIGNUP events in signup handler

### Frontend Implementation for US1

- [ ] T035 [P] [US1] Create SignUpForm component in `frontend/src/components/Auth/SignUpForm.tsx`
- [ ] T036 [P] [US1] Create password strength indicator in `frontend/src/components/Auth/PasswordStrength.tsx`
- [ ] T037 [US1] Create email verification reminder banner in `frontend/src/components/Auth/VerificationBanner.tsx`
- [ ] T038 [US1] Create email verification success page in `frontend/src/pages/verify-email.tsx`
- [ ] T039 [US1] Add signup page to Docusaurus routes in `frontend/src/pages/signup.tsx`

### Testing for US1

- [ ] T040 [P] [US1] Create unit test for email validation in `backend/tests/unit/validation.test.ts`
- [ ] T041 [P] [US1] Create unit test for password validation in `backend/tests/unit/validation.test.ts`
- [ ] T042 [US1] Create integration test for signup flow in `backend/tests/integration/signup.test.ts`
- [ ] T043 [US1] Create E2E test for signup and verification in `frontend/tests/e2e/signup.spec.ts`

**Checkpoint**: User Story 1 complete - users can create accounts and verify emails

---

## Phase 4: User Story 2 - Quick Sign In for Returning Users (Priority: P1)

**Goal**: Enable returning users to sign in with email/password and access their data

**Independent Test**: Create test account, sign out, sign in with correct credentials, verify session created and user redirected

### Backend Implementation for US2

- [ ] T044 [US2] Create signin endpoint handler in `backend/api/auth/signin.ts` calling better-auth
- [ ] T045 [US2] Implement "Remember me" functionality in signin handler (30-day session vs 7-day)
- [ ] T046 [US2] Implement account lockout logic after 10 failed attempts in `backend/lib/utils/rate-limiter.ts`
- [ ] T047 [US2] Add security event logging for SIGNIN and SIGNIN_FAILED events
- [ ] T048 [US2] Create session validation endpoint in `backend/api/auth/session.ts`

### Frontend Implementation for US2

- [ ] T049 [P] [US2] Create SignInForm component in `frontend/src/components/Auth/SignInForm.tsx`
- [ ] T050 [P] [US2] Create "Remember me" checkbox in SignInForm component
- [ ] T051 [US2] Create signin page in `frontend/src/pages/signin.tsx`
- [ ] T052 [US2] Implement automatic redirect to last visited page after signin
- [ ] T053 [US2] Create account lockout notification in `frontend/src/components/Auth/LockoutNotice.tsx`

### Testing for US2

- [ ] T054 [P] [US2] Create integration test for signin flow in `backend/tests/integration/signin.test.ts`
- [ ] T055 [P] [US2] Create integration test for account lockout in `backend/tests/integration/lockout.test.ts`
- [ ] T056 [US2] Create E2E test for signin with remember me in `frontend/tests/e2e/signin.spec.ts`

**Checkpoint**: User Story 2 complete - returning users can sign in securely

---

## Phase 5: User Story 5 - Password Reset (Priority: P1)

**Goal**: Enable users who forgot passwords to reset them via email

**Independent Test**: Request password reset, receive email with reset link, set new password, confirm signin works with new password

### Backend Implementation for US5

- [ ] T057 [US5] Create password reset request endpoint in `backend/api/auth/reset-password.ts`
- [ ] T058 [US5] Implement password reset email sending with 1-hour expiration token
- [ ] T059 [US5] Create password reset completion endpoint in `backend/api/auth/update-password.ts`
- [ ] T060 [US5] Invalidate all existing sessions when password is reset in reset handler
- [ ] T061 [US5] Add rate limiting (3 reset requests per hour) in reset request handler
- [ ] T062 [US5] Add security event logging for PASSWORD_RESET_REQUESTED and PASSWORD_RESET_COMPLETED

### Frontend Implementation for US5

- [ ] T063 [P] [US5] Create password reset request form in `frontend/src/components/Auth/ForgotPassword.tsx`
- [ ] T064 [P] [US5] Create password reset page in `frontend/src/pages/reset-password.tsx`
- [ ] T065 [US5] Create "Forgot password?" link on signin page
- [ ] T066 [US5] Create password reset success page with auto-signin

### Testing for US5

- [ ] T067 [P] [US5] Create integration test for password reset flow in `backend/tests/integration/password-reset.test.ts`
- [ ] T068 [US5] Create E2E test for password reset in `frontend/tests/e2e/password-reset.spec.ts`

**Checkpoint**: User Story 5 complete - users can recover forgotten passwords

---

## Phase 6: User Story 6 - Email Verification (Priority: P1)

**Goal**: Ensure users verify their email addresses to access personalized features

**Independent Test**: Create account, check for verification email, click link, confirm account marked as verified

### Backend Implementation for US6

- [ ] T069 [US6] Create resend verification email endpoint in `backend/api/auth/resend-verification.ts`
- [ ] T070 [US6] Add rate limiting (3 resends per hour) in resend verification handler
- [ ] T071 [US6] Create middleware to check verification status in `backend/lib/middleware/require-verified.ts`
- [ ] T072 [US6] Add security event logging for EMAIL_VERIFIED events

### Frontend Implementation for US6

- [ ] T073 [P] [US6] Create "Resend verification email" button in verification banner
- [ ] T074 [P] [US6] Create verification reminder modal for unverified users trying to use personalized features
- [ ] T075 [US6] Add verification status indicator in user profile

### Testing for US6

- [ ] T076 [P] [US6] Create integration test for email verification resend in `backend/tests/integration/verification.test.ts`
- [ ] T077 [US6] Create E2E test for verification flow in `frontend/tests/e2e/verification.spec.ts`

**Checkpoint**: P1 MVP COMPLETE - All core authentication flows working

---

## Phase 7: User Story 3 - Social Login with Google (Priority: P2)

**Goal**: Enable users to sign in with Google OAuth for passwordless authentication

**Independent Test**: Click "Sign in with Google", complete OAuth flow, confirm account created with Google profile info

### Backend Implementation for US3

- [ ] T078 [US3] Register Google OAuth application and obtain client ID/secret
- [ ] T079 [US3] Configure Google OAuth provider in better-auth config in `backend/lib/auth.ts`
- [ ] T080 [US3] Create Google OAuth callback handler in `backend/api/auth/callback/google.ts`
- [ ] T081 [US3] Implement account linking logic for existing users in callback handler
- [ ] T082 [US3] Add security event logging for OAUTH_LINKED events

### Frontend Implementation for US3

- [ ] T083 [P] [US3] Create SocialButtons component with Google button in `frontend/src/components/Auth/SocialButtons.tsx`
- [ ] T084 [P] [US3] Add Google OAuth popup handling in social buttons component
- [ ] T085 [US3] Add Google signin button to signup and signin pages
- [ ] T086 [US3] Create account linking UI in account settings

### Testing for US3

- [ ] T087 [P] [US3] Create integration test for Google OAuth flow (mocked) in `backend/tests/integration/oauth-google.test.ts`
- [ ] T088 [US3] Create E2E test for Google signin in `frontend/tests/e2e/oauth-google.spec.ts`

**Checkpoint**: User Story 3 complete - Google authentication working

---

## Phase 8: User Story 4 - Social Login with GitHub (Priority: P2)

**Goal**: Enable developer students to sign in with GitHub OAuth

**Independent Test**: Click "Sign in with GitHub", complete OAuth flow, confirm account created with GitHub profile info

### Backend Implementation for US4

- [ ] T089 [US4] Register GitHub OAuth application and obtain client ID/secret
- [ ] T090 [US4] Configure GitHub OAuth provider in better-auth config in `backend/lib/auth.ts`
- [ ] T091 [US4] Create GitHub OAuth callback handler in `backend/api/auth/callback/github.ts`
- [ ] T092 [US4] Implement account unlinking logic in account settings endpoint
- [ ] T093 [US4] Add security event logging for OAUTH_UNLINKED events

### Frontend Implementation for US4

- [ ] T094 [P] [US4] Add GitHub button to SocialButtons component in `frontend/src/components/Auth/SocialButtons.tsx`
- [ ] T095 [P] [US4] Add GitHub signin button to signup and signin pages
- [ ] T096 [US4] Create account unlinking UI in account settings

### Testing for US4

- [ ] T097 [P] [US4] Create integration test for GitHub OAuth flow (mocked) in `backend/tests/integration/oauth-github.test.ts`
- [ ] T098 [US4] Create E2E test for GitHub signin in `frontend/tests/e2e/oauth-github.spec.ts`

**Checkpoint**: User Story 4 complete - GitHub authentication working

---

## Phase 9: User Story 7 - Progress Tracking (Priority: P2)

**Goal**: Enable authenticated users to automatically track chapter completion and see progress

**Independent Test**: Sign in, read 3 chapters to completion, sign out, sign in again, verify progress persists

### Backend Implementation for US7

- [ ] T099 [US7] Create user_progress table migration in `backend/prisma/migrations/`
- [ ] T100 [US7] Create UserProgress model integration in Prisma schema
- [ ] T101 [US7] Create progress tracking service in `backend/lib/services/progress-service.ts`
- [ ] T102 [P] [US7] Create GET progress endpoint in `backend/api/user/progress.ts`
- [ ] T103 [P] [US7] Create POST mark complete endpoint in `backend/api/user/progress/[chapterId].ts`
- [ ] T104 [P] [US7] Create DELETE reset progress endpoint in `backend/api/user/progress/[chapterId].ts`
- [ ] T105 [US7] Add progress sync logic (last write wins) in progress service

### Frontend Implementation for US7

- [ ] T106 [P] [US7] Create ProgressTracker component in `frontend/src/components/Progress/ProgressTracker.tsx`
- [ ] T107 [P] [US7] Create ProgressBar component in `frontend/src/components/Progress/ProgressBar.tsx`
- [ ] T108 [US7] Create useProgress hook in `frontend/src/hooks/useProgress.ts`
- [ ] T109 [US7] Implement auto-completion logic (scroll to bottom + 30s) in chapter pages
- [ ] T110 [US7] Create progress dashboard page in `frontend/src/pages/progress.tsx`
- [ ] T111 [US7] Add progress indicator to homepage showing completion percentage

### Testing for US7

- [ ] T112 [P] [US7] Create unit test for progress service in `backend/tests/unit/progress-service.test.ts`
- [ ] T113 [P] [US7] Create integration test for progress API in `backend/tests/integration/progress.test.ts`
- [ ] T114 [US7] Create E2E test for progress tracking in `frontend/tests/e2e/progress.spec.ts`

**Checkpoint**: User Story 7 complete - progress tracking working

---

## Phase 10: User Story 8 - Bookmark Chapters (Priority: P2)

**Goal**: Enable authenticated users to bookmark chapters and add personal notes

**Independent Test**: Sign in, bookmark 3 chapters with notes, navigate to bookmarks page, verify all bookmarks appear

### Backend Implementation for US8

- [ ] T115 [US8] Create user_bookmarks table migration in `backend/prisma/migrations/`
- [ ] T116 [US8] Create UserBookmark model integration in Prisma schema
- [ ] T117 [US8] Create bookmarks service in `backend/lib/services/bookmarks-service.ts`
- [ ] T118 [P] [US8] Create GET bookmarks endpoint in `backend/api/user/bookmarks.ts`
- [ ] T119 [P] [US8] Create POST add bookmark endpoint in `backend/api/user/bookmarks/[chapterId].ts`
- [ ] T120 [P] [US8] Create DELETE remove bookmark endpoint in `backend/api/user/bookmarks/[chapterId].ts`
- [ ] T121 [P] [US8] Create PATCH update notes endpoint in `backend/api/user/bookmarks/[chapterId].ts`

### Frontend Implementation for US8

- [ ] T122 [P] [US8] Create BookmarkButton component in `frontend/src/components/Bookmarks/BookmarkButton.tsx`
- [ ] T123 [P] [US8] Create BookmarkList component in `frontend/src/components/Bookmarks/BookmarkList.tsx`
- [ ] T124 [US8] Create useBookmarks hook in `frontend/src/hooks/useBookmarks.ts`
- [ ] T125 [US8] Add bookmark button to all chapter pages
- [ ] T126 [US8] Create bookmarks page in `frontend/src/pages/bookmarks.tsx` with search functionality
- [ ] T127 [US8] Implement bookmark notes editing in bookmarks list

### Testing for US8

- [ ] T128 [P] [US8] Create unit test for bookmarks service in `backend/tests/unit/bookmarks-service.test.ts`
- [ ] T129 [P] [US8] Create integration test for bookmarks API in `backend/tests/integration/bookmarks.test.ts`
- [ ] T130 [US8] Create E2E test for bookmarks in `frontend/tests/e2e/bookmarks.spec.ts`

**Checkpoint**: User Story 8 complete - bookmarks working

---

## Phase 11: User Story 9 - Profile Management (Priority: P3)

**Goal**: Enable users to update their display name, email, and password

**Independent Test**: Sign in, navigate to settings, change display name and password, save, verify changes persisted

### Backend Implementation for US9

- [ ] T131 [P] [US9] Create GET user profile endpoint in `backend/api/user/profile.ts`
- [ ] T132 [P] [US9] Create PATCH update profile endpoint in `backend/api/user/profile.ts`
- [ ] T133 [US9] Implement email change with verification flow in profile update handler
- [ ] T134 [US9] Implement password change (requires current password) in profile update handler
- [ ] T135 [US9] Add security event logging for PASSWORD_CHANGED events

### Frontend Implementation for US9

- [ ] T136 [P] [US9] Create AccountSettings component in `frontend/src/components/Auth/AccountSettings.tsx`
- [ ] T137 [P] [US9] Create account settings page in `frontend/src/pages/account.tsx`
- [ ] T138 [US9] Create profile editing form with validation
- [ ] T139 [US9] Create password change form in account settings
- [ ] T140 [US9] Display linked OAuth providers in account settings

### Testing for US9

- [ ] T141 [P] [US9] Create integration test for profile updates in `backend/tests/integration/profile.test.ts`
- [ ] T142 [US9] Create E2E test for profile management in `frontend/tests/e2e/profile.spec.ts`

**Checkpoint**: User Story 9 complete - profile management working

---

## Phase 12: User Story 10 - Account Deletion (Priority: P3)

**Goal**: Enable users to request account deletion with 30-day grace period (GDPR compliance)

**Independent Test**: Sign in, request account deletion, confirm 30-day grace period message, verify account can be restored within period

### Backend Implementation for US10

- [ ] T143 [US10] Create data export endpoint in `backend/api/user/export.ts` returning JSON
- [ ] T144 [US10] Create account deletion request endpoint in `backend/api/user/delete.ts` (soft delete)
- [ ] T145 [US10] Create account restoration endpoint in `backend/api/user/restore.ts`
- [ ] T146 [US10] Implement 30-day soft deletion logic in deletion handler
- [ ] T147 [US10] Create scheduled job for hard deletion after 30 days in `backend/lib/jobs/cleanup-deleted-accounts.ts`
- [ ] T148 [US10] Add security event logging for ACCOUNT_DELETED and ACCOUNT_RESTORED events

### Frontend Implementation for US10

- [ ] T149 [P] [US10] Create account deletion confirmation modal in `frontend/src/components/Auth/DeleteAccountModal.tsx`
- [ ] T150 [P] [US10] Create data export button in account settings
- [ ] T151 [US10] Add account deletion button to account settings with confirmation
- [ ] T152 [US10] Create account restoration prompt on signin for soft-deleted accounts

### Testing for US10

- [ ] T153 [P] [US10] Create integration test for account deletion in `backend/tests/integration/account-deletion.test.ts`
- [ ] T154 [P] [US10] Create integration test for data export in `backend/tests/integration/data-export.test.ts`
- [ ] T155 [US10] Create E2E test for account deletion in `frontend/tests/e2e/account-deletion.spec.ts`

**Checkpoint**: ALL 10 User Stories complete - full authentication system ready

---

## Phase 13: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and production readiness

### Security Hardening

- [ ] T156 [P] Run security audit checklist (CSRF, XSS, SQL injection, rate limiting)
- [ ] T157 [P] Verify all passwords checked against HaveIBeenPwned database
- [ ] T158 [P] Verify all authentication endpoints have rate limiting enabled
- [ ] T159 [P] Verify HTTPS enforced on all domains (Vercel + GitHub Pages)
- [ ] T160 [P] Verify secure cookies (httpOnly, secure, sameSite flags) configured correctly

### Documentation

- [ ] T161 [P] Create API documentation from OpenAPI spec in `specs/001-authentication/contracts/`
- [ ] T162 [P] Update README.md with setup instructions for authentication
- [ ] T163 [P] Create developer quickstart guide in `specs/001-authentication/quickstart.md`
- [ ] T164 [P] Document environment variables in `.env.local.example`

### Testing & Quality

- [ ] T165 [P] Run all unit tests and ensure 80%+ coverage
- [ ] T166 [P] Run all integration tests and ensure they pass
- [ ] T167 [P] Run all E2E tests and ensure they pass
- [ ] T168 [P] Test cross-domain cookies on Safari, Firefox, Chrome
- [ ] T169 [P] Test authentication flows on mobile devices

### Deployment

- [ ] T170 Configure production environment variables in Vercel dashboard
- [ ] T171 Run database migrations in production PostgreSQL
- [ ] T172 Deploy backend to Vercel production
- [ ] T173 Deploy frontend to GitHub Pages
- [ ] T174 [P] Verify email delivery working in production (send test emails)
- [ ] T175 [P] Verify OAuth callbacks working in production
- [ ] T176 [P] Set up monitoring with Sentry for error tracking
- [ ] T177 [P] Set up Vercel Analytics for performance monitoring

### Performance Optimization

- [ ] T178 [P] Verify session validation completes in <100ms (p95)
- [ ] T179 [P] Verify signin/signup completes in <3s (p95)
- [ ] T180 [P] Verify email delivery within 30s for 99% of requests
- [ ] T181 [P] Run load tests with 100 concurrent users

### Validation

- [ ] T182 Run through quickstart.md step-by-step to validate developer onboarding
- [ ] T183 Test all P1 user stories end-to-end in production
- [ ] T184 Verify all Constitution gates passed (security, privacy, performance)
- [ ] T185 Create launch checklist and confirm all items complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phases 3-12)**: All depend on Foundational phase completion
  - **P1 Stories (US1, US2, US5, US6)**: MVP priority - complete first
  - **P2 Stories (US3, US4, US7, US8)**: Important - complete after P1
  - **P3 Stories (US9, US10)**: Nice-to-have - complete after P2
  - Stories can proceed in parallel if team has capacity
- **Polish (Phase 13)**: Depends on all desired user stories being complete

### User Story Dependencies

**P1 Stories (MVP - 3 weeks)**:
- **US1 (Account Creation)**: Can start after Foundational ✅ Independent
- **US2 (Sign In)**: Can start after Foundational ✅ Independent (integrates with US1 but testable alone)
- **US5 (Password Reset)**: Can start after Foundational ✅ Independent
- **US6 (Email Verification)**: Can start after Foundational ✅ Independent (enhances US1)

**P2 Stories**:
- **US3 (Google OAuth)**: Can start after Foundational ✅ Independent
- **US4 (GitHub OAuth)**: Can start after Foundational ✅ Independent (similar to US3)
- **US7 (Progress Tracking)**: Requires authentication working (US1/US2) ⚠️ Depends on P1
- **US8 (Bookmarks)**: Requires authentication working (US1/US2) ⚠️ Depends on P1

**P3 Stories**:
- **US9 (Profile Management)**: Requires authentication working (US1/US2) ⚠️ Depends on P1
- **US10 (Account Deletion)**: Requires authentication working (US1/US2) ⚠️ Depends on P1

### Within Each User Story

1. Backend implementation before frontend (data models and APIs first)
2. Tests can run in parallel with implementation (TDD approach)
3. Models before services
4. Services before endpoints
5. Endpoints before frontend components
6. Story complete before moving to next priority

### Parallel Opportunities

**Setup Phase (All [P] tasks can run in parallel)**:
- T003, T004, T005 (backend config)
- T008, T009 (frontend config)

**Foundational Phase**:
- T018, T020, T021 (email service)
- T022, T023, T024 (shared utilities)

**User Stories (If team has capacity)**:
- All P1 stories can run in parallel after Foundational (US1, US2, US5, US6)
- All P2 OAuth stories can run in parallel (US3, US4)
- P2 feature stories (US7, US8) can run in parallel after P1 complete

**Within Each User Story**:
- All [P] tasks within same phase can run in parallel
- Tests within a story can run in parallel
- Backend endpoints can run in parallel
- Frontend components can run in parallel

---

## Parallel Example: MVP (P1 Stories)

```bash
# After Foundational phase complete, launch all P1 stories in parallel:

# Team Member A: User Story 1 (Account Creation)
Tasks T029-T043

# Team Member B: User Story 2 (Sign In)
Tasks T044-T056

# Team Member C: User Story 5 (Password Reset)
Tasks T057-T068

# Team Member D: User Story 6 (Email Verification)
Tasks T069-T077

# Result: MVP complete in 1 week instead of 3-4 weeks sequential
```

---

## Implementation Strategy

### MVP First (P1 Stories Only - 3 weeks)

**Week 1: Foundation**
1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T028) **CRITICAL**
3. **CHECKPOINT**: Test better-auth working, database connected, emails sending

**Week 2: Core Auth (P1)**
4. Complete US1: Account Creation (T029-T043)
5. Complete US2: Sign In (T044-T056)
6. **CHECKPOINT**: Test signup + signin flows independently

**Week 3: Recovery & Verification (P1)**
7. Complete US5: Password Reset (T057-T068)
8. Complete US6: Email Verification (T069-T077)
9. **CHECKPOINT**: Test all P1 stories, run security audit
10. Deploy to production (T170-T177)

**MVP READY**: All P1 features working, production deployed

### Incremental Delivery

**Post-MVP (P2 Stories)**:
- Week 4: US3 (Google OAuth) + US4 (GitHub OAuth)
- Week 5: US7 (Progress Tracking)
- Week 6: US8 (Bookmarks)
- Each story adds value without breaking previous stories

**Future Enhancement (P3 Stories)**:
- Week 7: US9 (Profile Management)
- Week 8: US10 (Account Deletion)
- Week 9: Polish & optimization (Phase 13)

### Parallel Team Strategy

**3-4 Developers**:
1. **Week 1**: All team members work on Setup + Foundational together
2. **Week 2-3**: Once Foundational is done:
   - Dev A: US1 (Account Creation)
   - Dev B: US2 (Sign In)
   - Dev C: US5 (Password Reset)
   - Dev D: US6 (Email Verification)
3. **Result**: MVP in 2 weeks instead of 3 weeks

**1-2 Developers (Sequential)**:
1. Complete Setup + Foundational (Week 1)
2. Complete P1 stories sequentially (Weeks 2-3)
3. Complete P2 stories sequentially (Weeks 4-6)
4. Complete P3 stories as needed

---

## Task Summary

**Total Tasks**: 185
**Setup**: 9 tasks
**Foundational**: 19 tasks (BLOCKS all stories)
**User Stories**: 145 tasks
  - **P1 (MVP)**: 49 tasks (US1: 15, US2: 13, US5: 12, US6: 9)
  - **P2**: 66 tasks (US3: 11, US4: 11, US7: 19, US8: 13, US7+US8: 12)
  - **P3**: 30 tasks (US9: 12, US10: 13, both: 5)
**Polish**: 28 tasks

**Parallel Opportunities**: 67 tasks marked [P]

**Independent Test Criteria**:
- ✅ Each user story has clear test criteria
- ✅ Each user story can be tested independently
- ✅ Each user story delivers standalone value

**Suggested MVP Scope**: Phase 1 + Phase 2 + Phases 3-6 (P1 stories only)
- **Total MVP Tasks**: 77 tasks
- **Estimated Timeline**: 3 weeks (1 developer) or 2 weeks (4 developers in parallel)

---

## Notes

- **[P] marker**: Tasks that can run in parallel (different files, no dependencies on incomplete work)
- **[Story] label**: Maps task to specific user story for traceability and independent testing
- **Constitution compliance**: All tasks follow smallest viable change principle
- **Database migrations**: Run sequentially (T012, T099, T115) to avoid conflicts
- **OAuth setup**: Can start early in parallel (T078, T089 while implementing other stories)
- **Testing**: Can follow TDD approach (write tests first, ensure they fail, then implement)
- **Deployment**: Reserve Phase 13 tasks until all desired user stories are complete

**Validation Checkpoints**: Stop at any checkpoint to validate story independently before proceeding
**Commit Strategy**: Commit after each task or logical group of related tasks
**Avoid**: Vague tasks, same file conflicts, cross-story dependencies that break independence
