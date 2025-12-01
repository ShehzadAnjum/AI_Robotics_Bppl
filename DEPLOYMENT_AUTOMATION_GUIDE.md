# Deployment Automation Guide

**Last Updated**: 2025-12-01
**Status**: Ready for automated deployment setup

---

## Quick Start (First-Time Setup)

### Current Status

✅ **Already Complete**:
- Production build ready in `build/` directory (174 files)
- `gh-pages` branch created with commit `02deb51`
- GitHub repository: `ShehzadAnjum/AI_Robotics_Bppl`
- Deployment URL: `https://ShehzadAnjum.github.io/AI_Robotics_Bppl/`

⏳ **Needs Manual Push** (one-time):
```bash
git push -u origin gh-pages
git checkout 001-book-platform
```

After this push, you can set up automated deployments for all future updates.

---

## Part 1: Manual Push (Required First)

### Step 1: Push the gh-pages Branch

You're currently on the `gh-pages` branch with all build files committed. Push it to GitHub:

```bash
# Push the gh-pages branch to GitHub
git push -u origin gh-pages

# Switch back to your working branch
git checkout 001-book-platform
```

**What happens**: GitHub will receive your deployment branch, but it's not live yet.

### Step 2: Enable GitHub Pages

1. Go to your repository settings:
   https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages

2. Under **"Source"**:
   - Branch: Select `gh-pages`
   - Folder: Select `/ (root)`
   - Click **"Save"**

3. Wait 1-2 minutes for GitHub to deploy

4. Your site will be live at:
   **https://ShehzadAnjum.github.io/AI_Robotics_Bppl/**

---

## Part 2: Automated Deployment (Recommended)

Once the manual push is complete, set up automation so every future commit triggers automatic deployment.

### Option A: GitHub Actions (Fully Automated) ⭐ RECOMMENDED

This is the modern, secure approach. No tokens needed in your local environment.

#### Step 1: Verify GitHub Actions Workflow Exists

Check if this file exists: `.github/workflows/deploy.yml`

If it doesn't exist, I'll create it for you (see next section).

#### Step 2: Enable GitHub Actions

1. Go to repository settings:
   https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/actions

2. Under **"Actions permissions"**, select:
   - ✅ "Allow all actions and reusable workflows"
   - Click **"Save"**

3. Under **"Workflow permissions"**, select:
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"
   - Click **"Save"**

#### Step 3: Test Automated Deployment

```bash
# Make a small change (e.g., update README)
echo "# Robotics Book - Live!" > README.md

# Commit and push to main branch
git add README.md
git commit -m "Test automated deployment"
git push origin 001-book-platform
```

**What happens**:
1. GitHub Actions detects the push
2. Automatically runs `npm run build`
3. Deploys build files to `gh-pages` branch
4. Your site updates in 2-3 minutes

**Monitor progress**:
https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions

---

### Option B: Personal Access Token (Local Automation)

Use this if you want to run `npm run deploy` locally without entering credentials.

#### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens/new

2. Configure token:
   - **Note**: "Robotics Book Deployment"
   - **Expiration**: 90 days (or "No expiration" if you trust your security)
   - **Scopes**: Check ✅ `repo` (full control of private repositories)

3. Click **"Generate token"**

4. **IMPORTANT**: Copy the token immediately (shown only once)
   - Example: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Step 2: Store Token Securely

**Option 2A: Environment Variable (Session-based)**

```bash
# Add to your current terminal session
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Test deployment
npm run deploy
```

**Limitation**: Token expires when you close the terminal.

**Option 2B: Git Credential Manager (Persistent)**

```bash
# Configure git to store credentials
git config --global credential.helper store

# Update remote URL to use token
git remote set-url origin https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/ShehzadAnjum/AI_Robotics_Bppl.git

# Test deployment
npm run deploy
```

**Limitation**: Token stored in plain text at `~/.git-credentials`

**Option 2C: .env File (Project-specific)**

1. Create `.env` file in project root:
   ```bash
   echo "GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" > .env
   ```

2. Add to `.gitignore` (if not already):
   ```bash
   echo ".env" >> .gitignore
   ```

3. Update deployment script in `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "GITHUB_TOKEN=$GITHUB_TOKEN docusaurus deploy"
     }
   }
   ```

4. Load and deploy:
   ```bash
   source .env && npm run deploy
   ```

---

## Part 3: GitHub Actions Workflow (Automated CI/CD)

### What is GitHub Actions?

GitHub Actions automatically builds and deploys your site whenever you push changes. No manual `npm run deploy` needed.

### Create Workflow File

The workflow file already exists at `.github/workflows/deploy.yml`. Here's what it does:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - 001-book-platform  # Deploy when pushing to this branch
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          publish_branch: gh-pages
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
```

### How It Works

1. **Trigger**: Push to `001-book-platform`, `main`, or `master` branch
2. **Build**: Runs `npm ci && npm run build` on GitHub's servers
3. **Deploy**: Automatically pushes `build/` directory to `gh-pages` branch
4. **Publish**: GitHub Pages automatically serves the updated site

### Advantages

✅ **No local setup needed** - works on any computer
✅ **No tokens to manage** - GitHub provides automatic `GITHUB_TOKEN`
✅ **Build verification** - ensures build succeeds before deployment
✅ **Deployment history** - audit log of all deployments
✅ **Rollback capability** - revert to previous commits if needed

---

## Part 4: Future Workflow (Writing New Chapters)

### Scenario: You Write Chapter 4

#### Step 1: Write Chapter Locally

```bash
# Create Chapter 4
# (Claude will write the content)

# Test locally
npm start
# Open http://localhost:3000/AI_Robotics_Bppl/
# Verify Chapter 4 renders correctly
```

#### Step 2: Commit Changes

```bash
# Add new chapter
git add docs/foundations/sensors-actuators.md

# Commit with descriptive message
git commit -m "feat: add Chapter 4 - Sensors and Actuators

- 7,500 words of content
- 4 Mermaid diagrams
- 15 code examples
- 100% three-source validation
- Zero errors in build"

# Commit co-authored by Claude
git commit --amend -m "$(git log -1 --format=%B)

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### Step 3: Push to GitHub

```bash
# Push to your working branch
git push origin 001-book-platform
```

#### Step 4: Automated Deployment (If GitHub Actions Enabled)

**What happens automatically**:
1. GitHub Actions detects your push
2. Runs `npm run build` (takes ~30 seconds)
3. Deploys to `gh-pages` branch
4. Site updates in 2-3 minutes

**Monitor progress**:
- Actions tab: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
- Pages tab: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/deployments

#### Step 5: Verify Live Site

```bash
# Open in browser
open https://ShehzadAnjum.github.io/AI_Robotics_Bppl/docs/foundations/sensors-actuators

# Or check from command line
curl -I https://ShehzadAnjum.github.io/AI_Robotics_Bppl/
```

---

## Part 5: Manual Deployment (When Needed)

### When to Use Manual Deployment

- Testing deployment process
- GitHub Actions is down
- Need immediate deployment (skip CI/CD queue)
- Deploying from local machine without pushing to GitHub

### Commands

```bash
# Build production site
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Requirements**:
- Must have GitHub credentials configured (see Part 2)
- Build must succeed (0 errors)

### Alternative: Deploy with gh-pages CLI

```bash
# Build first
npm run build

# Deploy build/ directory to gh-pages branch
npx gh-pages -d build -b gh-pages
```

---

## Part 6: Troubleshooting

### Error: "Could not read Username/Password"

**Problem**: Git needs authentication but can't prompt for credentials.

**Solution**: Use GitHub Actions (Option A) or set up Personal Access Token (Option B).

### Error: "Permission denied (publickey)"

**Problem**: SSH key not configured for GitHub.

**Solution 1**: Use HTTPS instead of SSH
```bash
git remote set-url origin https://github.com/ShehzadAnjum/AI_Robotics_Bppl.git
```

**Solution 2**: Set up SSH key (one-time)
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "sanjum77@gmail.com"

# Add to GitHub: https://github.com/settings/keys
cat ~/.ssh/id_ed25519.pub
```

### Error: "Build failed"

**Problem**: Production build has errors.

**Solution**: Fix errors locally first
```bash
# Test build locally
npm run build

# Check for errors in output
# Fix any errors in source files
# Re-run build until it succeeds
```

### Error: "gh-pages branch not found"

**Problem**: Initial `gh-pages` branch push failed.

**Solution**: Push manually
```bash
git checkout gh-pages
git push -u origin gh-pages
git checkout 001-book-platform
```

### Site Not Updating

**Problem**: Deployed but site shows old content.

**Solutions**:
1. **Wait 2-5 minutes** - GitHub Pages caching
2. **Hard refresh browser**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. **Check deployment status**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/deployments
4. **Clear browser cache**
5. **Verify correct branch in settings**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages

### GitHub Actions Failing

**Problem**: Workflow runs but fails.

**Debug steps**:
1. Check Actions tab: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
2. Click on failed workflow run
3. Expand failed step to see error logs
4. Common causes:
   - Build errors (fix in code)
   - Missing dependencies (update `package.json`)
   - Permissions issue (check repository settings)

---

## Part 7: Deployment Checklist

### Before Every Deployment

- [ ] **Build succeeds locally**: `npm run build` → 0 errors
- [ ] **Test locally**: `npm run serve` → site works correctly
- [ ] **All chapters render**: No console errors in browser
- [ ] **Frontmatter correct**: No visible metadata in content
- [ ] **Diagrams work**: All Mermaid diagrams rendering
- [ ] **Links valid**: Internal links not broken

### First-Time Deployment

- [ ] **Push gh-pages branch**: `git push origin gh-pages`
- [ ] **Enable GitHub Pages** in repository settings
- [ ] **Select gh-pages branch** as source
- [ ] **Wait 2-5 minutes** for initial deployment
- [ ] **Verify live URL**: https://ShehzadAnjum.github.io/AI_Robotics_Bppl/

### Automated Deployment Setup

- [ ] **Enable GitHub Actions** in repository settings
- [ ] **Verify workflow file exists**: `.github/workflows/deploy.yml`
- [ ] **Set workflow permissions**: Read and write
- [ ] **Test with dummy commit**
- [ ] **Monitor Actions tab** for successful deployment

### After Every Deployment

- [ ] **Check Actions tab**: Workflow succeeded
- [ ] **Check Deployments tab**: New deployment visible
- [ ] **Test live site**: Open URL and verify changes
- [ ] **Check browser console**: 0 errors
- [ ] **Test on mobile**: Responsive design works

---

## Part 8: Deployment Metrics

### Current Deployment

**Date**: 2025-12-01
**Commit**: `02deb51`
**Branch**: `gh-pages`
**Files**: 174 files
**Size**: ~50,000 lines of code
**Build Time**: ~23 seconds (client) + ~17 seconds (server) = ~40 seconds total

### Content Deployed

| Chapter | Words | Code Examples | Diagrams | Status |
|---------|-------|---------------|----------|--------|
| Chapter 1 | 5,230 | 8 | 2 | ✅ Ready |
| Chapter 2 | 8,290 | 21 | 5 | ✅ Ready |
| Chapter 3 | 6,433 | 29 | 3 | ✅ Ready |
| **Total** | **19,953** | **58** | **10** | **✅ Production-Ready** |

### Performance

- **Build Time**: ~40 seconds
- **Deployment Time**: ~2-3 minutes (GitHub Pages)
- **Total Time**: ~3-4 minutes (commit to live)
- **Page Load**: <2 seconds (static files)

---

## Part 9: Security Best Practices

### DO ✅

- ✅ Use GitHub Actions for automated deployment (no tokens needed)
- ✅ Use Personal Access Tokens with minimal scopes (`repo` only)
- ✅ Set token expiration (90 days recommended)
- ✅ Store tokens in `.env` (add to `.gitignore`)
- ✅ Revoke tokens when no longer needed
- ✅ Use different tokens for different projects

### DON'T ❌

- ❌ Commit tokens to git
- ❌ Share tokens in documentation
- ❌ Use tokens with excessive permissions
- ❌ Store tokens in plain text without `.gitignore`
- ❌ Use "No expiration" tokens (unless absolutely necessary)

### Token Revocation

If a token is compromised:

1. Go to: https://github.com/settings/tokens
2. Find the token
3. Click **"Delete"**
4. Generate a new token
5. Update your local configuration

---

## Part 10: Advanced Deployment

### Custom Domain

Want to use your own domain (e.g., `roboticsbook.com`)?

#### Step 1: Buy Domain

Buy domain from:
- Namecheap ($12/year)
- Google Domains ($12/year)
- Cloudflare ($10/year)

#### Step 2: Configure DNS

Add DNS records:
```
Type: CNAME
Name: www
Value: ShehzadAnjum.github.io
```

#### Step 3: Configure GitHub Pages

1. Go to: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages
2. Under **"Custom domain"**, enter: `www.roboticsbook.com`
3. Check ✅ **"Enforce HTTPS"**
4. Wait 24 hours for DNS propagation

#### Step 4: Update Docusaurus Config

```typescript
// docusaurus.config.ts
const config: Config = {
  url: 'https://www.roboticsbook.com',
  baseUrl: '/',  // Change from /AI_Robotics_Bppl/
  // ...
};
```

### Preview Deployments (Advanced)

Want to preview changes before going live?

Use Vercel or Netlify for preview deployments:
- Every pull request gets a unique preview URL
- Test changes before merging
- Share previews with reviewers

**Setup**: See `DEPLOYMENT_PLAN.md` Part 2 for Vercel integration.

---

## Part 11: Monitoring & Analytics

### GitHub Insights

Monitor your deployment:
- **Traffic**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/graphs/traffic
- **Actions**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
- **Deployments**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/deployments

### Add Google Analytics (Optional)

1. Create Google Analytics account
2. Get tracking ID (e.g., `G-XXXXXXXXXX`)
3. Add to `docusaurus.config.ts`:

```typescript
themeConfig: {
  // ... existing config
  gtag: {
    trackingID: 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

### Uptime Monitoring (Optional)

Use free services to monitor site availability:
- **UptimeRobot** (free, 50 monitors)
- **StatusCake** (free, 10 monitors)
- **Pingdom** (free trial)

---

## Quick Reference

### Essential Commands

```bash
# Local development
npm start                    # Start dev server (localhost:3000)
npm run build               # Build production site
npm run serve               # Test production build locally

# Deployment
npm run deploy              # Deploy to GitHub Pages (needs auth)
git push origin gh-pages    # Manual push of gh-pages branch

# Troubleshooting
npm run clear               # Clear cache
npm run typecheck          # Check TypeScript errors
git status                  # Check current state
```

### Essential URLs

- **Live Site**: https://ShehzadAnjum.github.io/AI_Robotics_Bppl/
- **Repository**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl
- **Pages Settings**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages
- **Actions**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
- **Deployments**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/deployments

---

## Next Steps

1. **Complete first deployment** (see Part 1):
   ```bash
   git push origin gh-pages
   git checkout 001-book-platform
   ```

2. **Enable GitHub Pages** (see Part 1, Step 2)

3. **Set up GitHub Actions** (see Part 2, Option A)

4. **Write next chapter** (see Part 4)

5. **Monitor deployment** (see Part 11)

---

## Support

**Documentation**:
- This guide: `DEPLOYMENT_AUTOMATION_GUIDE.md`
- Deployment plan: `DEPLOYMENT_PLAN.md`
- Deployment summary: `DEPLOYMENT_SUMMARY.md`

**Troubleshooting**:
- See Part 6 of this guide
- Check GitHub Actions logs
- Review browser console errors

**Questions?**
- Review `.claude/PERSISTENT_MEMORY_ERRORS.md` for common errors
- Check `ERROR_ANALYSIS.md` for documented issues

---

**Last Updated**: 2025-12-01
**Version**: 1.0.0
**Status**: ✅ Ready for production deployment
