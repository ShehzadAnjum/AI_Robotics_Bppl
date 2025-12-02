#!/bin/bash
# Better Auth Setup Script - Production Ready
# Created: December 2, 2025
# Purpose: Set up better-auth correctly in 5 minutes

set -e

echo "🚀 Better Auth Setup Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BETTER_AUTH_VERSION="1.3.4"

# Functions
error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

info() {
    echo "ℹ️  $1"
}

# Step 1: Check prerequisites
echo "Step 1: Checking prerequisites..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if ! command -v node &> /dev/null; then
    error "Node.js is not installed"
fi
success "Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
    error "npm is not installed"
fi
success "npm found: $(npm --version)"

if [ ! -f "package.json" ]; then
    error "package.json not found. Run this script from your project root."
fi
success "package.json found"

echo ""

# Step 2: Check environment variables
echo "Step 2: Checking environment variables..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    warning "$ENV_FILE not found, creating..."
    touch "$ENV_FILE"
fi

check_env() {
    local var_name=$1
    local var_value=$(grep "^${var_name}=" "$ENV_FILE" 2>/dev/null | cut -d '=' -f2-)

    if [ -z "$var_value" ]; then
        warning "$var_name not set in $ENV_FILE"
        return 1
    else
        success "$var_name is set"
        return 0
    fi
}

ALL_ENV_SET=true

if ! check_env "POSTGRES_URL"; then
    echo "  Add: POSTGRES_URL=postgresql://user:pass@host/db"
    ALL_ENV_SET=false
fi

if ! check_env "BETTER_AUTH_SECRET"; then
    warning "Generating BETTER_AUTH_SECRET..."
    SECRET=$(openssl rand -hex 32)
    echo "BETTER_AUTH_SECRET=$SECRET" >> "$ENV_FILE"
    success "Generated BETTER_AUTH_SECRET"
fi

if ! check_env "BETTER_AUTH_URL"; then
    echo "BETTER_AUTH_URL=http://localhost:3000" >> "$ENV_FILE"
    success "Set BETTER_AUTH_URL to http://localhost:3000"
fi

if [ "$ALL_ENV_SET" = false ]; then
    error "Please set missing environment variables in $ENV_FILE and run again"
fi

echo ""

# Step 3: Install dependencies
echo "Step 3: Installing dependencies..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create .npmrc for Next.js 16 compatibility
if [ ! -f ".npmrc" ]; then
    info "Creating .npmrc for Next.js 16 compatibility..."
    echo "legacy-peer-deps=true" > .npmrc
    success "Created .npmrc"
else
    if ! grep -q "legacy-peer-deps=true" .npmrc; then
        warning "Adding legacy-peer-deps to .npmrc..."
        echo "legacy-peer-deps=true" >> .npmrc
    fi
fi

# Check if dependencies are already installed
if npm list better-auth@$BETTER_AUTH_VERSION &>/dev/null; then
    success "better-auth@$BETTER_AUTH_VERSION already installed"
else
    info "Installing better-auth@$BETTER_AUTH_VERSION..."
    npm install better-auth@$BETTER_AUTH_VERSION pg bcrypt --save
    npm install @types/pg @types/bcrypt --save-dev
    success "Dependencies installed"
fi

echo ""

# Step 4: Create directory structure
echo "Step 4: Creating directory structure..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

mkdir -p lib/auth
mkdir -p app/api/auth/\[...all\]
success "Directories created"

echo ""

# Step 5: Create configuration files
echo "Step 5: Creating configuration files..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# auth.ts (project root)
if [ ! -f "auth.ts" ]; then
    info "Creating auth.ts..."
    cat > auth.ts << 'EOF'
// Better Auth configuration for CLI migration
// This file is required by @better-auth/cli
export { auth } from './lib/auth/config';
EOF
    success "Created auth.ts"
else
    warning "auth.ts already exists, skipping"
fi

# lib/auth/config.ts
if [ ! -f "lib/auth/config.ts" ]; then
    info "Creating lib/auth/config.ts..."
    cat > lib/auth/config.ts << 'EOF'
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
    requireEmailVerification: false, // Set true when email service is configured
    minPasswordLength: 8,
  },

  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  secret: process.env.BETTER_AUTH_SECRET || '',

  // For cross-domain setups (optional)
  trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
});
EOF
    success "Created lib/auth/config.ts"
else
    warning "lib/auth/config.ts already exists, skipping"
fi

# app/api/auth/[...all]/route.ts
if [ ! -f "app/api/auth/[...all]/route.ts" ]; then
    info "Creating app/api/auth/[...all]/route.ts..."
    cat > app/api/auth/\[...all\]/route.ts << 'EOF'
import { auth } from '@/lib/auth/config';

// better-auth catch-all route for Next.js App Router
export const GET = auth.handler;
export const POST = auth.handler;

// Use Node.js runtime (pg requires Node.js APIs)
export const runtime = 'nodejs';
EOF
    success "Created app/api/auth/[...all]/route.ts"
else
    warning "API route already exists, skipping"
fi

echo ""

# Step 6: Run database migration
echo "Step 6: Running database migration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

info "This will create: user, session, account, verification tables"
echo ""

# Check if tables already exist
POSTGRES_URL=$(grep "^POSTGRES_URL=" "$ENV_FILE" | cut -d '=' -f2-)
if command -v psql &> /dev/null && [ -n "$POSTGRES_URL" ]; then
    TABLE_COUNT=$(psql "$POSTGRES_URL" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('user','session','account','verification')" 2>/dev/null || echo "0")
    TABLE_COUNT=$(echo $TABLE_COUNT | xargs) # trim whitespace

    if [ "$TABLE_COUNT" = "4" ]; then
        success "All auth tables already exist"
        info "Skipping migration (tables found: user, session, account, verification)"
    else
        warning "Found $TABLE_COUNT/4 tables, running migration..."
        echo "y" | npx @better-auth/cli@latest migrate || {
            error "Migration failed. Check your POSTGRES_URL and try again."
        }
        success "Migration completed"
    fi
else
    warning "psql not found or POSTGRES_URL not set, attempting migration anyway..."
    echo "y" | npx @better-auth/cli@latest migrate || {
        error "Migration failed. Check your POSTGRES_URL and database connection."
    }
    success "Migration completed"
fi

echo ""

# Step 7: Verify setup
echo "Step 7: Verifying setup..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check files
FILES_OK=true
[ -f "auth.ts" ] && success "auth.ts exists" || { error "auth.ts missing"; FILES_OK=false; }
[ -f "lib/auth/config.ts" ] && success "lib/auth/config.ts exists" || { error "lib/auth/config.ts missing"; FILES_OK=false; }
[ -f "app/api/auth/[...all]/route.ts" ] && success "API route exists" || { error "API route missing"; FILES_OK=false; }

if [ "$FILES_OK" = false ]; then
    error "Setup incomplete - some files are missing"
fi

# Check database tables
if command -v psql &> /dev/null && [ -n "$POSTGRES_URL" ]; then
    info "Checking database tables..."
    TABLES=$(psql "$POSTGRES_URL" -t -c "SELECT table_name FROM information_schema.tables WHERE table_name IN ('user','session','account','verification') ORDER BY table_name" 2>/dev/null)

    if [ -z "$TABLES" ]; then
        warning "Could not verify database tables (connection issue or tables missing)"
    else
        echo "$TABLES" | while read -r table; do
            [ -n "$table" ] && success "Table exists: $(echo $table | xargs)"
        done
    fi
fi

echo ""

# Final message
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Better Auth setup complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "  1. Start development server:"
echo "     npm run dev"
echo ""
echo "  2. Test health endpoint:"
echo "     curl http://localhost:3000/api/auth/ok"
echo ""
echo "  3. Test signup:"
echo "     curl -X POST http://localhost:3000/api/auth/sign-up/email \\"
echo "       -H \"Content-Type: application/json\" \\"
echo "       -d '{\"email\":\"test@example.com\",\"password\":\"Test123456\",\"name\":\"Test User\"}'"
echo ""
echo "Documentation:"
echo "  - Implementation Guide: docs/BETTER_AUTH_IMPLEMENTATION_GUIDE.md"
echo "  - Error Reference: docs/BETTER_AUTH_ERROR_REFERENCE.md"
echo ""
