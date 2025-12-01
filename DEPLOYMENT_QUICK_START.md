# Deployment Quick Start

**⚡ 5-Minute Guide to Deploy Your Robotics Book**

---

## Step 1: Push gh-pages Branch (2 minutes)

```bash
# You're currently on: 001-book-platform
# The gh-pages branch is ready with commit 02deb51

# Push it to GitHub
git push origin gh-pages

# Success message should appear
```

**What this does**: Sends your built website to GitHub

---

## Step 2: Enable GitHub Pages (1 minute)

1. Open: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages

2. Under "Source":
   - **Branch**: Select `gh-pages`
   - **Folder**: Select `/ (root)`
   - Click **"Save"**

3. Wait 1-2 minutes

**What this does**: Tells GitHub to publish your site

---

## Step 3: Verify Deployment (30 seconds)

```bash
# Open your live site
open https://ShehzadAnjum.github.io/AI_Robotics_Bppl/
```

**Expected result**: You should see your robotics book with 3 chapters!

---

## Step 4: Enable Auto-Deploy (Optional, 2 minutes)

### Enable GitHub Actions

1. Open: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/actions

2. Under "Actions permissions":
   - ✅ Select: "Allow all actions and reusable workflows"
   - Click **"Save"**

3. Under "Workflow permissions":
   - ✅ Select: "Read and write permissions"
   - ✅ Check: "Allow GitHub Actions to create and approve pull requests"
   - Click **"Save"**

### Test Auto-Deploy

```bash
# Make a small change
echo "# Robotics Book - Now Auto-Deploying!" > README.md

# Commit and push
git add README.md
git commit -m "test: enable auto-deployment"
git push origin 001-book-platform

# Monitor deployment
# Open: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
```

**What this does**: Every future push automatically deploys

---

## Future Workflow (Adding Chapter 4)

```bash
# 1. Write chapter (Claude helps you)
# File: docs/foundations/sensors-actuators.md

# 2. Test locally
npm start
# Open: http://localhost:3000/AI_Robotics_Bppl/

# 3. Build to verify no errors
npm run build

# 4. Commit
git add docs/foundations/sensors-actuators.md
git commit -m "feat: add Chapter 4 - Sensors and Actuators"

# 5. Push (auto-deploys if GitHub Actions enabled)
git push origin 001-book-platform

# 6. Wait 3-4 minutes

# 7. View live
open https://ShehzadAnjum.github.io/AI_Robotics_Bppl/docs/foundations/sensors-actuators
```

---

## Troubleshooting

### ❌ "Could not read Username/Password"

**Quick Fix**: Use GitHub personal access token

```bash
# Create token: https://github.com/settings/tokens/new
# Scope: Check "repo"
# Copy token: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Configure git
git remote set-url origin https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/ShehzadAnjum/AI_Robotics_Bppl.git

# Try again
git push origin gh-pages
```

### ❌ "Build failed"

**Quick Fix**: Fix errors locally first

```bash
npm run build

# Fix any errors shown
# Re-run until it succeeds
```

### ❌ Site not updating

**Quick Fix**: Wait and hard refresh

1. **Wait 2-5 minutes** (GitHub Pages takes time)
2. **Hard refresh**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. **Clear browser cache**

### ❌ GitHub Actions failing

**Quick Fix**: Check logs

1. Open: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions
2. Click on failed workflow
3. Read error message
4. Fix issue in code
5. Push again

---

## Essential Commands

```bash
# Development
npm start              # Local dev server
npm run build         # Production build
npm run serve         # Test production locally

# Deployment
git push origin gh-pages           # Manual deploy
git push origin 001-book-platform  # Auto-deploy (if Actions enabled)

# Troubleshooting
npm run clear         # Clear cache
npm run typecheck     # Check TypeScript
git status            # Check git state
```

---

## Essential URLs

- **Live Site**: https://ShehzadAnjum.github.io/AI_Robotics_Bppl/
- **GitHub Repo**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl
- **Pages Settings**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/settings/pages
- **Actions**: https://github.com/ShehzadAnjum/AI_Robotics_Bppl/actions

---

## Getting Help

- **Full Guide**: `DEPLOYMENT_AUTOMATION_GUIDE.md` (11 parts, comprehensive)
- **Deployment Plan**: `DEPLOYMENT_PLAN.md` (architecture details)
- **Error Reference**: `.claude/PERSISTENT_MEMORY_ERRORS.md`

---

## What's Deployed

✅ **3 Complete Chapters** (19,953 words total):
- Chapter 1: Introduction to Physical AI (5,230 words)
- Chapter 2: Electronics Basics (8,290 words)
- Chapter 3: Programming Basics (6,433 words)

✅ **Features**:
- 13 interactive components
- 10 Mermaid diagrams
- 58 code examples
- Mobile-responsive
- Search enabled
- Dark mode

✅ **Quality**:
- 0 build errors
- 0 console errors
- 100% source validation
- Production-ready

---

**Ready to deploy? Start with Step 1 above! ⬆️**
