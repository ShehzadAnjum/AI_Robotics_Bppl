# Data Model: Authentication & User Features

**Feature**: User Authentication & Authorization
**Date**: 2025-12-02
**Database**: PostgreSQL (existing, adding auth tables)
**ORM**: Prisma 5.x

---

## Table of Contents

1. [Entity Overview](#entity-overview)
2. [Database Schema (Prisma)](#database-schema-prisma)
3. [Entity Relationship Diagram](#entity-relationship-diagram)
4. [Entity Definitions](#entity-definitions)
5. [Indexes & Performance](#indexes--performance)
6. [Validation Rules](#validation-rules)
7. [Migration Strategy](#migration-strategy)

---

## Entity Overview

### better-auth Managed Tables (Auto-Created)

These tables are automatically created and managed by better-auth. **Do not modify manually**.

| Table | Purpose | Primary Key | Foreign Keys |
|-------|---------|-------------|--------------|
| `auth_user` | User accounts | `id` (text) | - |
| `auth_session` | Active sessions | `id` (text) | `user_id` → `auth_user` |
| `auth_account` | OAuth accounts (Google, GitHub) | `id` (text) | `user_id` → `auth_user` |
| `auth_verification` | Email verification & password reset tokens | `id` (text) | `user_id` → `auth_user` |

### Custom Tables (Application-Specific)

| Table | Purpose | Primary Key | Foreign Keys |
|-------|---------|-------------|--------------|
| `user_progress` | Chapter completion tracking | `id` (auto-increment) | `user_id` → `auth_user` |
| `user_bookmarks` | Saved chapter bookmarks | `id` (auto-increment) | `user_id` → `auth_user` |
| `security_events` | Audit log (signin, failures, deletion) | `id` (auto-increment) | `user_id` → `auth_user` (nullable) |

---

## Database Schema (Prisma)

### Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================================================
// better-auth Managed Tables (DO NOT MODIFY - Auto-created by better-auth)
// ============================================================================

model User {
  id                String              @id @default(cuid())
  email             String              @unique
  emailVerified     Boolean             @default(false)
  name              String?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  // Relationships
  sessions          Session[]
  accounts          Account[]
  verifications     Verification[]

  // Custom relationships
  progress          UserProgress[]
  bookmarks         UserBookmark[]
  securityEvents    SecurityEvent[]

  @@map("auth_user")
  @@index([email])
  @@index([createdAt])
}

model Session {
  id                String              @id @default(cuid())
  userId            String
  token             String              @unique
  expiresAt         DateTime
  ipAddress         String?
  userAgent         String?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  // Relationships
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("auth_session")
  @@index([userId])
  @@index([token])
  @@index([expiresAt])
}

model Account {
  id                String              @id @default(cuid())
  userId            String
  provider          String              // "google" | "github"
  providerAccountId String
  accessToken       String?             @db.Text
  refreshToken      String?             @db.Text
  expiresAt         DateTime?
  createdAt         DateTime            @default(now())

  // Relationships
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("auth_account")
  @@index([userId])
  @@index([provider])
}

model Verification {
  id                String              @id @default(cuid())
  userId            String
  token             String              @unique
  type              String              // "email_verification" | "password_reset"
  expiresAt         DateTime
  used              Boolean             @default(false)
  createdAt         DateTime            @default(now())

  // Relationships
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("auth_verification")
  @@index([userId])
  @@index([token])
  @@index([type])
  @@index([expiresAt])
}

// ============================================================================
// Custom Application Tables
// ============================================================================

model UserProgress {
  id                Int                 @id @default(autoincrement())
  userId            String
  chapterId         String              // Chapter slug from Docusaurus
  status            ProgressStatus      @default(NOT_STARTED)
  timeSpentSeconds  Int                 @default(0)
  completedAt       DateTime?
  lastAccessedAt    DateTime            @default(now())
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  // Relationships
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, chapterId])
  @@index([userId])
  @@index([chapterId])
  @@index([status])
  @@index([completedAt])
}

model UserBookmark {
  id                Int                 @id @default(autoincrement())
  userId            String
  chapterId         String              // Chapter slug from Docusaurus
  notes             String?             @db.Text
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt

  // Relationships
  user              User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, chapterId])
  @@index([userId])
  @@index([chapterId])
  @@index([createdAt])
}

model SecurityEvent {
  id                Int                 @id @default(autoincrement())
  userId            String?             // Nullable (failed signin attempts may not have valid user)
  eventType         SecurityEventType
  ipAddress         String?
  userAgent         String?
  success           Boolean             @default(true)
  failureReason     String?
  metadata          Json?               // Additional context (e.g., device info)
  createdAt         DateTime            @default(now())

  // Relationships
  user              User?               @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([eventType])
  @@index([createdAt])
  @@index([success])
}

// ============================================================================
// Enums
// ============================================================================

enum ProgressStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}

enum SecurityEventType {
  SIGNIN
  SIGNIN_FAILED
  SIGNUP
  PASSWORD_RESET_REQUESTED
  PASSWORD_RESET_COMPLETED
  PASSWORD_CHANGED
  EMAIL_VERIFIED
  ACCOUNT_DELETED
  ACCOUNT_RESTORED
  OAUTH_LINKED
  OAUTH_UNLINKED
  SUSPICIOUS_ACTIVITY
}
```

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          auth_user                              │
│─────────────────────────────────────────────────────────────────│
│ id (PK)              │ String (CUID)                            │
│ email                │ String (unique)                          │
│ emailVerified        │ Boolean                                   │
│ name                 │ String? (optional)                        │
│ createdAt            │ DateTime                                  │
│ updatedAt            │ DateTime                                  │
└──────────────┬───────────────────────────────────┬──────────────┘
               │                                   │
               │ 1:N                               │ 1:N
               │                                   │
┌──────────────▼──────────────┐     ┌─────────────▼──────────────┐
│      auth_session           │     │       auth_account         │
│─────────────────────────────│     │────────────────────────────│
│ id (PK)                     │     │ id (PK)                    │
│ userId (FK) → auth_user     │     │ userId (FK) → auth_user    │
│ token (unique)              │     │ provider                   │
│ expiresAt                   │     │ providerAccountId          │
│ ipAddress                   │     │ accessToken                │
│ userAgent                   │     │ refreshToken               │
│ createdAt                   │     │ expiresAt                  │
│ updatedAt                   │     │ createdAt                  │
└─────────────────────────────┘     └────────────────────────────┘

┌──────────────────────────────┐
│     auth_verification        │
│──────────────────────────────│
│ id (PK)                      │
│ userId (FK) → auth_user      │
│ token (unique)               │
│ type (email|password)        │
│ expiresAt                    │
│ used                         │
│ createdAt                    │
└──────────────────────────────┘

        auth_user (continued)
               │
               │ 1:N
               │
┌──────────────▼──────────────┐     ┌──────────────┐
│      user_progress          │     │user_bookmarks│
│─────────────────────────────│     │──────────────│
│ id (PK, auto)               │     │ id (PK)      │
│ userId (FK) → auth_user     │     │ userId (FK)  │
│ chapterId                   │     │ chapterId    │
│ status (enum)               │     │ notes        │
│ timeSpentSeconds            │     │ createdAt    │
│ completedAt                 │     │ updatedAt    │
│ lastAccessedAt              │     └──────────────┘
│ createdAt                   │
│ updatedAt                   │
└─────────────────────────────┘

┌──────────────────────────────┐
│     security_events          │
│──────────────────────────────│
│ id (PK, auto)                │
│ userId (FK, nullable)        │
│ eventType (enum)             │
│ ipAddress                    │
│ userAgent                    │
│ success                      │
│ failureReason                │
│ metadata (JSON)              │
│ createdAt                    │
└──────────────────────────────┘
```

---

## Entity Definitions

### 1. User (better-auth managed)

**Purpose**: Core user account entity

**Attributes**:
- `id` (String, CUID): Primary key, auto-generated unique identifier
- `email` (String, unique): User's email address
- `emailVerified` (Boolean): Whether email has been verified (default: false)
- `name` (String?, optional): Display name (defaults to email username if not provided)
- `createdAt` (DateTime): Account creation timestamp
- `updatedAt` (DateTime): Last modification timestamp

**Relationships**:
- One-to-Many with `Session` (user can have multiple active sessions)
- One-to-Many with `Account` (user can link multiple OAuth providers)
- One-to-Many with `Verification` (user can have multiple verification tokens)
- One-to-Many with `UserProgress` (user has progress for multiple chapters)
- One-to-Many with `UserBookmark` (user can bookmark multiple chapters)
- One-to-Many with `SecurityEvent` (user activity is logged)

**Validation Rules**:
- Email must be valid format (RFC 5322)
- Email must be unique across all users
- Name max length: 100 characters
- Name can contain only alphanumeric + spaces + hyphens

**Business Rules**:
- Email verification is required to access personalized features (progress, bookmarks)
- Account can be soft-deleted (set `deletedAt` timestamp, better-auth handles this)
- After 30-day grace period, hard delete (remove from database)

---

### 2. Session (better-auth managed)

**Purpose**: Stateful user sessions for authentication

**Attributes**:
- `id` (String, CUID): Primary key
- `userId` (String, FK): Reference to User
- `token` (String, unique): Session token (stored in cookie)
- `expiresAt` (DateTime): Session expiration timestamp
- `ipAddress` (String?, optional): IP address when session was created
- `userAgent` (String?, optional): Browser/device info
- `createdAt` (DateTime): Session creation timestamp
- `updatedAt` (DateTime): Last activity timestamp (updated on session refresh)

**Relationships**:
- Many-to-One with `User` (many sessions belong to one user)

**Validation Rules**:
- Token must be cryptographically secure (better-auth handles generation)
- Token length: 32-64 characters
- expiresAt must be in the future

**Business Rules**:
- Default expiration: 7 days from creation
- Maximum expiration: 30 days (even with "Remember me")
- Session refreshes daily (updates `updatedAt` and extends `expiresAt`)
- All sessions invalidated when password changes (security requirement)
- Sessions deleted cascade when user is deleted

---

### 3. Account (better-auth managed)

**Purpose**: Linked OAuth provider accounts (Google, GitHub)

**Attributes**:
- `id` (String, CUID): Primary key
- `userId` (String, FK): Reference to User
- `provider` (String): OAuth provider name ("google" | "github")
- `providerAccountId` (String): User's ID from OAuth provider
- `accessToken` (String?, Text): OAuth access token (encrypted at rest)
- `refreshToken` (String?, Text): OAuth refresh token (encrypted at rest)
- `expiresAt` (DateTime?): Token expiration timestamp
- `createdAt` (DateTime): Link creation timestamp

**Relationships**:
- Many-to-One with `User` (user can have multiple linked accounts)

**Validation Rules**:
- Unique constraint on `(provider, providerAccountId)` - prevents duplicate linking
- Provider must be one of: "google", "github"
- Tokens stored as TEXT (can be > 255 chars)

**Business Rules**:
- User must have at least one authentication method (email/password OR OAuth)
- Cannot unlink last OAuth if no password set
- OAuth accounts cascade delete when user is deleted
- Tokens are refreshed automatically by better-auth when expired

---

### 4. Verification (better-auth managed)

**Purpose**: Email verification and password reset tokens

**Attributes**:
- `id` (String, CUID): Primary key
- `userId` (String, FK): Reference to User
- `token` (String, unique): Verification token (sent in email)
- `type` (String): Token purpose ("email_verification" | "password_reset")
- `expiresAt` (DateTime): Token expiration timestamp
- `used` (Boolean): Whether token has been consumed (default: false)
- `createdAt` (DateTime): Token creation timestamp

**Relationships**:
- Many-to-One with `User` (user can have multiple tokens)

**Validation Rules**:
- Token must be cryptographically secure (better-auth handles)
- Token length: 32-64 characters
- Type must be "email_verification" or "password_reset"
- expiresAt must be in the future

**Business Rules**:
- Email verification tokens: expire after 24 hours
- Password reset tokens: expire after 1 hour
- Tokens are single-use (marked `used=true` after consumption)
- Requesting new token invalidates previous tokens of same type
- Tokens cascade delete when user is deleted

---

### 5. UserProgress (custom table)

**Purpose**: Track user's reading progress through chapters

**Attributes**:
- `id` (Int, auto-increment): Primary key
- `userId` (String, FK): Reference to User
- `chapterId` (String): Chapter slug from Docusaurus (e.g., "intro-physical-ai")
- `status` (ProgressStatus enum): NOT_STARTED | IN_PROGRESS | COMPLETED
- `timeSpentSeconds` (Int): Total time spent on chapter (default: 0)
- `completedAt` (DateTime?, nullable): When chapter was marked complete
- `lastAccessedAt` (DateTime): Last time user opened the chapter
- `createdAt` (DateTime): First access timestamp
- `updatedAt` (DateTime): Last modification timestamp

**Relationships**:
- Many-to-One with `User` (user has progress for many chapters)

**Validation Rules**:
- Unique constraint on `(userId, chapterId)` - one progress record per user per chapter
- chapterId must match existing Docusaurus chapter slug
- timeSpentSeconds must be >= 0
- completedAt must be after createdAt

**Business Rules**:
- Status progression: NOT_STARTED → IN_PROGRESS → COMPLETED
- Cannot skip statuses (e.g., NOT_STARTED → COMPLETED)
- Marking complete sets `status=COMPLETED` and `completedAt=now()`
- Reset progress: clears `completedAt`, sets `status=NOT_STARTED`
- Progress syncs across devices (last write wins)
- Progress deleted cascade when user is deleted

**Auto-Completion Logic** (from spec):
- Mark chapter COMPLETED when:
  - User scrolls to bottom (90% of page height)
  - AND spends at least 30 seconds on page
  - Implemented client-side, saved via API

---

### 6. UserBookmark (custom table)

**Purpose**: User-saved chapter bookmarks with optional notes

**Attributes**:
- `id` (Int, auto-increment): Primary key
- `userId` (String, FK): Reference to User
- `chapterId` (String): Chapter slug from Docusaurus
- `notes` (String?, Text, nullable): User's personal notes about why they bookmarked
- `createdAt` (DateTime): Bookmark creation timestamp
- `updatedAt` (DateTime): Last modification timestamp

**Relationships**:
- Many-to-One with `User` (user can bookmark many chapters)

**Validation Rules**:
- Unique constraint on `(userId, chapterId)` - one bookmark per user per chapter
- chapterId must match existing Docusaurus chapter slug
- Notes max length: 1,000 characters
- Notes can be empty (nullable)

**Business Rules**:
- Clicking bookmark icon: toggle (add if not exists, remove if exists)
- Adding bookmark sets `createdAt=now()`
- Updating notes sets `updatedAt=now()` but preserves `createdAt`
- Bookmarks sync across devices
- Bookmarks deleted cascade when user is deleted

---

### 7. SecurityEvent (custom table)

**Purpose**: Audit log for security-related events

**Attributes**:
- `id` (Int, auto-increment): Primary key
- `userId` (String?, FK, nullable): Reference to User (null for failed signin attempts)
- `eventType` (SecurityEventType enum): Type of event (see enum below)
- `ipAddress` (String?, nullable): IP address of request
- `userAgent` (String?, nullable): Browser/device info
- `success` (Boolean): Whether event succeeded (default: true)
- `failureReason` (String?, nullable): Reason for failure (e.g., "Invalid password")
- `metadata` (JSON?, nullable): Additional context (device fingerprint, location, etc.)
- `createdAt` (DateTime): Event timestamp

**Relationships**:
- Many-to-One with `User` (user has many security events, nullable for failed attempts)

**Validation Rules**:
- eventType must be valid SecurityEventType enum value
- If success=false, failureReason should be provided
- metadata must be valid JSON

**Business Rules**:
- SecurityEvents are immutable (never updated, only created)
- Events retained for 90 days, then auto-deleted (compliance requirement)
- Failed signin attempts: userId is null if email doesn't exist
- On user deletion: userId set to NULL (SetNull), events preserved for audit
- Events used for:
  - Anomaly detection (unusual signin location, new device)
  - Rate limiting (count failed attempts per IP)
  - Compliance reporting (GDPR audit trail)

**SecurityEventType Enum Values**:
- `SIGNIN`: Successful signin
- `SIGNIN_FAILED`: Failed signin attempt
- `SIGNUP`: New account created
- `PASSWORD_RESET_REQUESTED`: User requested password reset
- `PASSWORD_RESET_COMPLETED`: Password reset successfully completed
- `PASSWORD_CHANGED`: User changed password in settings
- `EMAIL_VERIFIED`: Email verification completed
- `ACCOUNT_DELETED`: User requested account deletion
- `ACCOUNT_RESTORED`: User restored soft-deleted account
- `OAUTH_LINKED`: OAuth provider linked to account
- `OAUTH_UNLINKED`: OAuth provider unlinked from account
- `SUSPICIOUS_ACTIVITY`: Detected unusual activity (new device, location change)

---

## Indexes & Performance

### Query Patterns & Index Strategy

**High-Frequency Queries** (require indexes):

1. **Session Validation** (every authenticated request):
   ```sql
   SELECT * FROM auth_session WHERE token = ? AND expiresAt > NOW();
   ```
   **Index**: `auth_session(token)` ✅ Unique index
   **Index**: `auth_session(expiresAt)` ✅ For expiration checks

2. **User Lookup by Email** (signin, signup):
   ```sql
   SELECT * FROM auth_user WHERE email = ?;
   ```
   **Index**: `auth_user(email)` ✅ Unique index

3. **User Progress Lookup**:
   ```sql
   SELECT * FROM user_progress WHERE userId = ?;
   ```
   **Index**: `user_progress(userId)` ✅

4. **Bookmark Lookup**:
   ```sql
   SELECT * FROM user_bookmarks WHERE userId = ?;
   ```
   **Index**: `user_bookmarks(userId)` ✅

5. **Security Event Query** (recent activity):
   ```sql
   SELECT * FROM security_events
   WHERE userId = ? AND createdAt > NOW() - INTERVAL '30 days';
   ```
   **Index**: `security_events(userId, createdAt)` ✅ Composite index

### Composite Indexes

**user_progress**:
- `(userId, chapterId)` ✅ Unique constraint also serves as index

**user_bookmarks**:
- `(userId, chapterId)` ✅ Unique constraint also serves as index

**auth_account**:
- `(provider, providerAccountId)` ✅ Unique constraint

### Performance Targets

| Query | Target Latency | Index Strategy |
|-------|----------------|----------------|
| Session validation | <10ms | Single column index on token (unique) |
| User lookup by email | <10ms | Single column index on email (unique) |
| User progress fetch | <50ms | Index on userId, small table (<1k rows per user) |
| Bookmark fetch | <50ms | Index on userId, small table (<100 rows per user) |
| Security events (30 days) | <100ms | Composite index (userId, createdAt) |

---

## Validation Rules

### Application-Level Validation (Prisma + TypeScript)

**Email Validation**:
```typescript
import { z } from 'zod';

const emailSchema = z.string().email().max(255);

function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}
```

**Password Validation** (better-auth enforces, but also validate client-side):
```typescript
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[0-9]/, "Must contain number");
```

**Chapter ID Validation** (must match Docusaurus slugs):
```typescript
const chapterIdSchema = z.string()
  .regex(/^[a-z0-9-]+$/, "Chapter ID must be lowercase alphanumeric + hyphens")
  .max(100);
```

**Notes Validation** (bookmarks):
```typescript
const notesSchema = z.string().max(1000).optional();
```

---

## Migration Strategy

### Phase 1: better-auth Auto-Migration (MVP)

**Step 1**: Run better-auth migration
```bash
# better-auth creates auth_user, auth_session, auth_account, auth_verification
npx better-auth migrate
```

**Expected Output**:
```
✓ Created table: auth_user
✓ Created table: auth_session
✓ Created table: auth_account
✓ Created table: auth_verification
```

### Phase 2: Custom Tables Migration

**Step 2**: Create Prisma migration for custom tables
```bash
npx prisma migrate dev --name add_user_progress_and_bookmarks
```

**Migration File** (`migrations/XXX_add_user_progress_and_bookmarks/migration.sql`):
```sql
-- Create UserProgress table
CREATE TABLE "user_progress" (
  "id" SERIAL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "chapterId" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
  "completedAt" TIMESTAMP(3),
  "lastAccessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "user_progress_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "user_progress_userId_chapterId_key" ON "user_progress"("userId", "chapterId");
CREATE INDEX "user_progress_userId_idx" ON "user_progress"("userId");
CREATE INDEX "user_progress_chapterId_idx" ON "user_progress"("chapterId");
CREATE INDEX "user_progress_status_idx" ON "user_progress"("status");

-- Create UserBookmark table
CREATE TABLE "user_bookmarks" (
  "id" SERIAL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "chapterId" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "user_bookmarks_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "user_bookmarks_userId_chapterId_key" ON "user_bookmarks"("userId", "chapterId");
CREATE INDEX "user_bookmarks_userId_idx" ON "user_bookmarks"("userId");
CREATE INDEX "user_bookmarks_chapterId_idx" ON "user_bookmarks"("chapterId");

-- Create SecurityEvent table
CREATE TABLE "security_events" (
  "id" SERIAL PRIMARY KEY,
  "userId" TEXT,
  "eventType" TEXT NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "success" BOOLEAN NOT NULL DEFAULT true,
  "failureReason" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "security_events_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES "auth_user"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "security_events_userId_idx" ON "security_events"("userId");
CREATE INDEX "security_events_eventType_idx" ON "security_events"("eventType");
CREATE INDEX "security_events_createdAt_idx" ON "security_events"("createdAt");

-- Create Enums
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');
CREATE TYPE "SecurityEventType" AS ENUM (
  'SIGNIN', 'SIGNIN_FAILED', 'SIGNUP', 'PASSWORD_RESET_REQUESTED',
  'PASSWORD_RESET_COMPLETED', 'PASSWORD_CHANGED', 'EMAIL_VERIFIED',
  'ACCOUNT_DELETED', 'ACCOUNT_RESTORED', 'OAUTH_LINKED', 'OAUTH_UNLINKED',
  'SUSPICIOUS_ACTIVITY'
);

-- Update user_progress status column to use enum
ALTER TABLE "user_progress" ALTER COLUMN "status" TYPE "ProgressStatus" USING "status"::"ProgressStatus";
ALTER TABLE "security_events" ALTER COLUMN "eventType" TYPE "SecurityEventType" USING "eventType"::"SecurityEventType";
```

### Rollback Strategy

**If migration fails**:
```bash
# Rollback Prisma migration
npx prisma migrate reset

# Re-run better-auth migration
npx better-auth migrate

# Retry custom tables migration
npx prisma migrate dev --name add_user_progress_and_bookmarks
```

**For production**:
```bash
# Deploy migration
npx prisma migrate deploy

# If rollback needed (emergency only)
# 1. Create new migration that drops tables
# 2. Deploy rollback migration
```

---

## Data Integrity Constraints

### Foreign Key Constraints

**All custom tables → auth_user**:
- `ON DELETE CASCADE`: When user is deleted, all related data is deleted
- Rationale: GDPR compliance - user data must be fully removable

**SecurityEvent → auth_user**:
- `ON DELETE SET NULL`: When user is deleted, events are preserved for audit
- Rationale: Security audit trail must be maintained even after account deletion

### Unique Constraints

| Table | Constraint | Purpose |
|-------|------------|---------|
| `auth_user` | `email` UNIQUE | Prevent duplicate accounts |
| `auth_session` | `token` UNIQUE | Ensure one session per token |
| `auth_account` | `(provider, providerAccountId)` UNIQUE | Prevent duplicate OAuth links |
| `auth_verification` | `token` UNIQUE | Ensure one-time-use tokens |
| `user_progress` | `(userId, chapterId)` UNIQUE | One progress record per user per chapter |
| `user_bookmarks` | `(userId, chapterId)` UNIQUE | One bookmark per user per chapter |

---

## Summary

**Total Tables**: 7 (4 better-auth managed + 3 custom)
**Total Indexes**: 23 (ensures <100ms query performance)
**Estimated Rows (MVP)**: ~5,000 (1,000 users × 5 tables average)
**Estimated Storage**: <10 MB (text-heavy schema, minimal BLOB data)

**Migration Plan**:
1. ✅ better-auth auto-creates auth tables
2. ⏭️ Prisma migration adds custom tables
3. ⏭️ Verify indexes created correctly
4. ⏭️ Test foreign key cascades
5. ⏭️ Seed test data for development

**Next Steps**:
- ✅ Data model complete
- ⏭️ Generate API contracts (`contracts/auth-api.openapi.yaml`)
- ⏭️ Write quickstart guide (`quickstart.md`)
- ⏭️ Update agent context
