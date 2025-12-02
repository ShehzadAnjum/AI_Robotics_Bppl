# Quickstart Guide: Authentication Development

**Feature**: User Authentication & Authorization
**Date**: 2025-12-02
**Estimated Setup Time**: 30-45 minutes

---

## Prerequisites

### Required Software

- **Node.js**: v20+ ([Download](https://nodejs.org/))
  ```bash
  node -v  # Should show v20.x.x or higher
  ```

- **PostgreSQL Client**: For database access
  ```bash
  psql --version  # Should show psql 14+ or higher
  ```

- **Git**: For version control
  ```bash
  git --version
  ```

### Required API Keys

1. **Database URL** (existing PostgreSQL):
   - Get `DATABASE_URL` from existing chatbot configuration
   - Format: `postgresql://user:password@host:5432/dbname`

2. **better-auth Secret** (generate new):
   ```bash
   openssl rand -base64 32
   ```

3. **Resend API Key** (sign up at [resend.com](https://resend.com)):
   - Free tier: 3,000 emails/month
   - Navigate to: Dashboard → API Keys → Create API Key

4. **Google OAuth** (optional for MVP, but recommended):
   - Go to: [Google Cloud Console](https://console.cloud.google.com/)
   - Create project → Enable Google+ API → Create OAuth 2.0 Client ID
   - Save `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

5. **GitHub OAuth** (optional for MVP, but recommended):
   - Go to: [GitHub Settings](https://github.com/settings/developers)
   - New OAuth App → Save `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

---

## Quick Start (5 Steps)

### Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/ShehzadAnjum/AI_Robotics_Bppl.git
cd AI_Robotics_Bppl

# Checkout authentication branch
git checkout 001-authentication

# Install dependencies (backend)
cd backend
npm install

# Install dependencies (frontend)
cd ../frontend
npm install
```

**Expected Output**:
```
✓ Installed better-auth, @prisma/client, resend
✓ Installed better-auth-react (frontend)
```

---

### Step 2: Configure Environment Variables

**Create** `backend/.env.local`:
```bash
# Database (existing PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# better-auth Secret (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-secret-key-here-32-chars-minimum"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (get from GitHub Settings)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Resend Email (get from resend.com)
RESEND_API_KEY="re_your_api_key_here"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3001"

# API URL (for frontend)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**Create** `frontend/.env.local`:
```bash
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

### Step 3: Initialize Database

```bash
cd backend

# Generate Prisma client from schema
npx prisma generate

# Run better-auth migration (creates auth tables)
npx better-auth migrate

# Run Prisma migration (creates custom tables)
npx prisma migrate dev --name init_user_features

# Verify tables created
npx prisma studio  # Opens GUI to view database
```

**Expected Tables**:
- ✓ `auth_user`
- ✓ `auth_session`
- ✓ `auth_account`
- ✓ `auth_verification`
- ✓ `user_progress`
- ✓ `user_bookmarks`
- ✓ `security_events`

---

### Step 4: Start Development Servers

**Terminal 1 (Backend)**:
```bash
cd backend
vercel dev  # Runs on http://localhost:3000
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm start   # Runs on http://localhost:3001
```

**Expected Output**:
```
Backend:  ✓ Ready on http://localhost:3000
Frontend: ✓ Ready on http://localhost:3001
```

---

### Step 5: Verify Setup

1. **Open Browser**: Navigate to `http://localhost:3001`

2. **Test Signup**:
   - Click "Sign Up"
   - Enter email: `test@example.com`
   - Enter password: `password123`
   - Click "Create Account"
   - **Expected**: "Check your email" message

3. **Test Email** (check Resend dashboard):
   - Log in to [resend.com](https://resend.com/emails)
   - Verify email was sent to `test@example.com`
   - Copy verification link

4. **Test Verification**:
   - Paste verification link in browser
   - **Expected**: "Email verified! You're signed in."

5. **Test Session**:
   - Refresh page
   - **Expected**: Still signed in (session persisted)

6. **Test Signout**:
   - Click "Sign Out"
   - **Expected**: Redirected to homepage, no longer signed in

---

## Development Workflow

### Running Tests

**Unit Tests** (Vitest):
```bash
cd backend
npm test

# Watch mode
npm run test:watch
```

**Integration Tests**:
```bash
cd backend
npm run test:integration
```

**E2E Tests** (Playwright):
```bash
cd frontend
npm run test:e2e

# UI mode (recommended)
npm run test:e2e:ui
```

---

### Database Management

**View Database**:
```bash
npx prisma studio  # Opens GUI on http://localhost:5555
```

**Create Migration**:
```bash
npx prisma migrate dev --name your_migration_name
```

**Reset Database** (development only):
```bash
npx prisma migrate reset  # Drops all tables and re-runs migrations
```

**Seed Data** (create test users):
```bash
npx prisma db seed  # Runs prisma/seed.ts
```

---

### Debugging

**View Logs**:
```bash
# Backend logs (Vercel dev)
# Already visible in terminal running vercel dev

# Frontend logs
# Check browser console (F12)

# Database logs
# Enable in .env.local:
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public&connection_limit=10&pool_timeout=20&socket_timeout=20&statement_timeout=30000&idle_timeout=30000&query_timeout=30000&log_statement=all"
```

**Common Issues**:

1. **"Port 3000 already in use"**:
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **"Database connection failed"**:
   - Verify `DATABASE_URL` is correct
   - Check database is running: `psql $DATABASE_URL`
   - Verify firewall allows connection

3. **"better-auth migration failed"**:
   - Drop auth tables manually:
   ```bash
   psql $DATABASE_URL -c "DROP TABLE auth_user CASCADE;"
   ```
   - Re-run: `npx better-auth migrate`

4. **"CORS error"**:
   - Verify `FRONTEND_URL` in backend `.env.local`
   - Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
   - Restart both servers

---

## Project Structure

```
backend/
├── api/
│   └── auth/
│       └── [...auth].ts        # better-auth catch-all route
├── lib/
│   ├── auth.ts                 # better-auth configuration
│   ├── prisma.ts               # Prisma client singleton
│   └── email.ts                # Resend email service
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration history
└── tests/                      # Unit & integration tests

frontend/
├── src/
│   ├── components/Auth/        # Auth UI components
│   ├── hooks/                  # React hooks (useAuth, etc.)
│   └── lib/auth-client.ts      # better-auth React client
└── tests/e2e/                  # Playwright tests
```

---

## API Endpoints Reference

### Authentication (better-auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/sign-up/email` | Create account with email/password |
| POST | `/api/auth/sign-in/email` | Sign in with email/password |
| POST | `/api/auth/sign-out` | End current session |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/reset-password` | Request password reset |
| POST | `/api/auth/update-password` | Update password |
| GET | `/api/auth/callback/google` | Google OAuth callback |
| GET | `/api/auth/callback/github` | GitHub OAuth callback |

### User Features (custom)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PATCH | `/api/user/profile` | Update profile |
| GET | `/api/user/progress` | Get reading progress |
| POST | `/api/user/progress/:chapterId` | Mark chapter complete |
| GET | `/api/user/bookmarks` | Get all bookmarks |
| POST | `/api/user/bookmarks/:chapterId` | Add bookmark |
| DELETE | `/api/user/bookmarks/:chapterId` | Remove bookmark |

**Full API Documentation**: See `contracts/auth-api.openapi.yaml`

---

## Next Steps

### For New Contributors

1. **Read Documentation**:
   - [Feature Specification](./spec.md) - User stories & requirements
   - [Implementation Plan](./plan.md) - Architecture & roadmap
   - [Data Model](./data-model.md) - Database schema

2. **Pick a Task**:
   - Run `/sp.tasks` to generate task breakdown
   - Look for tasks tagged `good-first-issue`
   - Start with P1 user stories (core authentication)

3. **Development Cycle**:
   - Create feature branch: `git checkout -b feature/your-feature`
   - Write test first (TDD)
   - Implement feature
   - Run tests: `npm test`
   - Commit: `git commit -m "feat: your feature"`
   - Push & create PR

### For MVP Delivery

**Week 1 Priority**:
- [ ] better-auth integration
- [ ] Email/password authentication
- [ ] Email verification
- [ ] Password reset

**Week 2 Priority**:
- [ ] React client integration
- [ ] Google OAuth
- [ ] GitHub OAuth

**Week 3 Priority**:
- [ ] Progress tracking
- [ ] Bookmarks
- [ ] Security hardening
- [ ] Deployment

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Node.js v20+ installed (`node -v`)
- [ ] PostgreSQL accessible (`psql $DATABASE_URL`)
- [ ] All environment variables set in `.env.local`
- [ ] Dependencies installed (`npm install` in both backend & frontend)
- [ ] Migrations run (`npx better-auth migrate` + `npx prisma migrate dev`)
- [ ] Both servers running (backend on :3000, frontend on :3001)
- [ ] No CORS errors in browser console (F12)
- [ ] Database tables exist (`npx prisma studio`)

**Still stuck?** Check:
- [better-auth docs](https://www.better-auth.com/docs)
- [Prisma docs](https://www.prisma.io/docs)
- [Project issues](https://github.com/ShehzadAnjum/AI_Robotics_Bppl/issues)

---

## Estimated Timeline

**Setup Time**: 30-45 minutes (first time)
**Daily Development**: 10 minutes to start servers
**Full MVP**: 3 weeks (15 working days)

**You're ready to start building!** 🚀
