# Toolchain Decisions

**Feature**: 001-book-platform
**Document**: T006 - Toolchain Specification
**Created**: 2025-11-30
**Status**: Locked

---

## Overview

This document locks the technology stack and tooling decisions for the Physical AI & Humanoid Robotics educational book platform. These decisions are based on technical requirements, educational goals, and Constitution principles.

---

## 1. Content Platform: Docusaurus

### Selected Technology
**Docusaurus 3.6.x** - React-based static site generator

### Rationale

**✅ Meets Requirements:**
- **FR-023**: Web-based, no installation required
- **FR-024**: Responsive (mobile, tablet, desktop)
- **FR-025**: Built-in search and navigation
- **FR-026**: Deploys to GitHub Pages
- **SC-012**: Fast load times (<2s with static site generation)

**✅ Educational Value:**
- Markdown/MDX is industry-standard for technical documentation
- React components teach modern web development
- Open-source with large community (Constitution 4.1: Community criterion)

**✅ Cost-Conscious:**
- Free and open-source
- GitHub Pages hosting is free
- No server costs (static site)

**✅ Maintainability:**
- Version-controlled content (Git)
- Incremental builds (fast CI/CD)
- Excellent documentation

### Alternatives Considered

| Tool | Pros | Cons | Decision |
|------|------|------|----------|
| **MkDocs** | Python-based, simple | Less interactive, limited React integration | ❌ Rejected |
| **GitBook** | Beautiful UI | Proprietary, paid for advanced features | ❌ Rejected |
| **Next.js** | Full control, React | Requires more setup, overkill for static content | ❌ Rejected |
| **Docusaurus** | Best balance of features, community, simplicity | Learning curve for React components | ✅ **Selected** |

---

## 2. Content Language: Markdown + MDX

### Selected Technology
**MDX** (Markdown + JSX) for all chapter content

### Rationale

**✅ Readable and Writable:**
- Markdown is accessible for non-developers
- Plain text enables version control (Git)
- Easy to review and edit

**✅ Extensible:**
- MDX allows React components for interactive content
- Embed simulations, code examples, diagrams
- Custom learning components (AI prompts, callouts)

**✅ Tooling:**
- Editor support (VS Code, IntelliJ)
- Linters (markdownlint, eslint)
- Preview during writing

### Example Interactive Components

```mdx
import SimulationEmbed from '@site/src/components/SimulationEmbed';
import AIPromptCard from '@site/src/components/AIPromptCard';

# Chapter Title

Regular markdown content here...

<SimulationEmbed
  worldFile="obstacle_avoidance.world"
  description="Watch the robot navigate around obstacles"
/>

<AIPromptCard>
**Ask AI:** "Explain how LiDAR sensor fusion works using a self-driving car analogy."
</AIPromptCard>
```

---

## 3. Programming Language for Examples: Python

### Selected Technology
**Python 3.10+** for all primary code examples

### Rationale

**✅ Beginner-Friendly (Constitution 2.1):**
- Readable syntax (looks like pseudocode)
- Widely taught in introductory CS courses
- Large learning community (StackOverflow, tutorials)

**✅ ROS2 Support:**
- Official ROS2 client library (`rclpy`)
- Well-documented for robotics use cases
- Active community

**✅ Educational Ecosystem:**
- NumPy, Matplotlib for visualizations
- Extensive documentation and books
- Industry-standard for ML/AI (PyTorch, TensorFlow optional for advanced chapters)

**✅ Cross-Platform (FR-036):**
- Works on Linux, Windows, macOS
- Easy installation (via pip, conda)

### Alternatives Considered

| Language | Pros | Cons | Decision |
|----------|------|------|----------|
| **Python** | Beginner-friendly, ROS2 support, large community | Slower than C++ (acceptable for learning) | ✅ **Primary Language** |
| **C++** | ROS2 native, performance | Steep learning curve, complex syntax | ⚠️ **Optional for Advanced Sections** |
| **JavaScript** | Web-native | Limited ROS2 support, not robotics-standard | ❌ Rejected for examples |

---

## 4. Robotics Framework: ROS2

### Selected Technology
**ROS2 Humble Hawksbill** (LTS) or **Iron Irwini**

### Rationale

**✅ Industry Standard:**
- Most widely used framework in professional robotics
- Career-ready skill (Constitution 4.1: Educational value)
- Extensive documentation and community

**✅ Simulation Integration:**
- Native Gazebo integration
- Rich ecosystem (nav2, MoveIt2, perception packages)

**✅ Cross-Platform (FR-037):**
- Runs on Linux, Windows (WSL2), macOS (limited)
- Installation guides for all platforms

**✅ Mandatory for Robotics Chapters (FR-007a):**
- Chapters 4+ require ROS2
- Foundational chapters 1-3 are ROS2-agnostic

### Version Decision

**Humble Hawksbill (LTS):**
- Long-term support (5 years)
- More stable, better for learning
- **Recommended for students**

**Iron Irwini:**
- Newer features
- Shorter support window
- Optional for advanced learners

**Fallback Plan:**
- If student cannot install ROS2, provide Docker containers with pre-configured environments

---

## 5. Primary Simulator: Gazebo

### Selected Technology
**Gazebo Sim (Harmonic)** - formerly Ignition Gazebo

### Rationale

**✅ Primary Simulator (FR-007d):**
- 90% of examples use Gazebo
- CPU-friendly (FR-038: GPU optional)
- Free and open-source

**✅ ROS2 Integration:**
- Native support via `ros_gz_bridge`
- Official ROS2 tutorials use Gazebo

**✅ Educational Features:**
- Visualize invisible concepts (coordinate frames, sensor rays)
- Safe experimentation (no hardware damage)
- Rapid iteration (reset simulation instantly)

**✅ Cross-Platform (FR-036):**
- Linux (native), Windows (WSL2), macOS (limited)

### Secondary Simulator (Optional)

**Isaac Sim** (GPU-accelerated physics):
- FR-007e: One optional advanced chapter only
- Requires GPU (clearly marked as optional)
- For students interested in high-fidelity simulation

### Vendor-Neutral Pedagogy (FR-007f, FR-007g)

**Teaching Approach:**
- Teach concepts first: "Physics engines simulate dynamics"
- Then tool: "Gazebo implements this using ODE/Bullet/DART"
- Emphasize transferable knowledge (works in MuJoCo, PyBullet, Isaac Sim)

---

## 6. Visualization: RViz2

### Selected Technology
**RViz2** - ROS2's 3D visualization tool

### Rationale

**✅ ROS2 Native:**
- Visualize topics, transforms, sensor data
- Essential debugging tool for robotics

**✅ Educational Value:**
- Makes invisible concepts visible (LiDAR rays, coordinate frames, paths)
- Industry-standard tool

**✅ Integration:**
- Works with Gazebo and real hardware
- Plugins for custom visualizations

---

## 7. Diagram Tools

### Selected Technologies

**Mermaid.js** (text-based diagrams)
- Built into Docusaurus
- Version-controllable (plain text)
- Flow charts, sequence diagrams, graphs

**Excalidraw** (hand-drawn style)
- Accessible, friendly aesthetic
- Good for conceptual diagrams
- Export to SVG (scalable, accessible)

**Annotated Screenshots**
- Gazebo interface tutorials
- RViz visualizations
- Use arrows, labels, highlights

### Accessibility Standards (FR-009)

**All diagrams must:**
- High contrast (WCAG AA: 4.5:1 for text, 3:1 for graphics)
- Color-blind friendly palettes
- Clear labels and legends
- Descriptive alt text
- Descriptive captions (not just "Figure 1")

---

## 8. Testing Framework

### Selected Technologies

**Playwright** (end-to-end testing)
- Test content quality (12-element structure)
- Test navigation and search (SC-014: <30s topic discovery)
- Test responsive design (SC-013: mobile/tablet/desktop)
- Cross-browser testing

**Lighthouse CI** (performance testing)
- Validate page load times (SC-012: <2s for 95%)
- Accessibility audits (WCAG compliance)
- Best practices checks

**pytest** (ROS2 code examples)
- Unit tests for example code
- Ensure code examples work correctly
- Run in CI/CD

**Custom Content Validators**
- Playwright scripts to validate 12-element structure
- Check for broken links
- Validate code block syntax

### CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/ci.yml
name: Content Quality CI

on: [push, pull_request]

jobs:
  test-content:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install Playwright
      - Run content structure tests
      - Run link checker
      - Run Lighthouse CI

  test-code-examples:
    runs-on: ubuntu-latest
    container: ros:humble
    steps:
      - Checkout code examples
      - Run pytest on example code
      - Build ROS2 packages
```

---

## 9. Deployment: GitHub Pages

### Selected Technology
**GitHub Pages** - Free static site hosting

### Rationale

**✅ Meets Requirements:**
- FR-026: Publicly accessible web platform
- SC-012: Fast load times (CDN-backed)
- SC-013: Works on all devices

**✅ Cost-Conscious:**
- Free for public repositories
- Built-in CDN
- Automatic HTTPS

**✅ Integration:**
- Native GitHub Actions support
- Automatic deployment on push to main
- Version control built-in

**✅ Limitations Acceptable:**
- 1GB site size limit (text content unlikely to exceed)
- 100GB/month bandwidth (sufficient for educational content)
- No backend (Phase 1 is static site only)

### Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Install Node.js 18
      - npm install
      - npm run build
      - Deploy to gh-pages branch
```

---

## 10. Version Control: Git + GitHub

### Selected Technology
**Git** for version control, **GitHub** for hosting

### Rationale

**✅ Industry Standard:**
- Git is essential career skill
- GitHub has largest open-source community

**✅ Collaboration:**
- Pull request workflow for content review
- Issue tracking for feedback
- Discussions for Q&A

**✅ Versioning:**
- Track content changes over time
- Rollback if needed
- Blame/history for accountability

---

## 11. Node.js Version

### Selected Technology
**Node.js 18.x LTS** or **20.x LTS**

### Rationale

**✅ Docusaurus Requirement:**
- Docusaurus 3.x requires Node 18+
- LTS versions ensure stability

**✅ Cross-Platform:**
- Runs on Linux, Windows, macOS
- Easy installation (via nvm, official installers)

---

## 12. Development Environment

### Recommended Setup for Students

**Required:**
- **OS**: Linux (Ubuntu 22.04), Windows 10+ with WSL2, or macOS (limited ROS2 support)
- **Text Editor**: VS Code (free, beginner-friendly)
- **Terminal**: Bash (Linux/macOS native, WSL2 for Windows)

**Optional:**
- **GPU**: Recommended for faster Gazebo rendering (not required per FR-038)
- **Docker**: For pre-configured ROS2 environments (fallback for installation issues)

### VS Code Extensions

**For Students:**
- ROS (Microsoft) - ROS2 syntax highlighting
- Python - IntelliSense, linting
- Markdown All in One - Markdown editing
- Docker (if using containers)

---

## 13. Code Examples Repository

### Structure Decision
**Separate Repository for ROS2/Gazebo Examples**

**Repository**: `robotics-book-examples` (linked from main book)

### Rationale

**✅ Separation of Concerns:**
- Main repo: Docusaurus content (text, diagrams)
- Examples repo: ROS2 packages, Gazebo worlds

**✅ Avoid Monorepo Complexity:**
- Different CI/CD needs (content vs. code)
- Different contribution workflows

**✅ Reusability:**
- Students can clone examples separately
- Examples can be used independently of book

### Example Repository Structure

```
robotics-book-examples/
├── foundations/              # Ch 1-3 (ROS2-agnostic)
│   ├── simple-circuit-sim/
│   └── basic-python-exercises/
├── small-projects/           # Ch 4-8
│   ├── sensor-visualization/
│   ├── basic-motion-control/
│   └── obstacle-detection/
├── mid-projects/             # Ch 9-12
│   ├── autonomous-navigation/
│   └── pick-and-place-vision/
└── integrated-project/       # Ch 13+
    └── warehouse-robot/
```

---

## 14. Future Considerations (Phase 2+)

**Deferred to Phase 2:**
- **Context7** (Upstash MCP service): For AI-assisted features (deferred per plan.md)
- **User Accounts**: No backend in Phase 1 (static site only)
- **Personalization**: Static content only in Phase 1
- **Analytics**: Optional Google Analytics or privacy-friendly alternative

**Deferred to Phase 3:**
- **Urdu Translation**: Docusaurus i18n plugin (Phase 3 requirement per user)

---

## 15. Toolchain Validation Checklist

Before implementation, validate:

**Requirements Alignment:**
- [ ] Cross-platform compatible (Linux/Windows/macOS) - FR-036
- [ ] GPU optional, CPU-only functional - FR-038
- [ ] Offline-readable content, online for simulations - FR-040
- [ ] Responsive design (mobile/tablet/desktop) - FR-024
- [ ] Fast load times (<2s) - SC-012
- [ ] Free and open-source (cost-conscious) - Constitution 4.1

**Educational Value:**
- [ ] Transferable skills (not vendor-locked) - Constitution 4.1
- [ ] Beginner-friendly tools - Constitution 2.1
- [ ] Industry-standard technologies - Constitution 4.1

**Constitution Compliance:**
- [ ] Smallest viable change (no over-engineering) - Principle VIII
- [ ] Incremental validation (testing at each phase) - Constitution 4.1
- [ ] Documentation for all tools - Constitution 5.4

---

## 16. Installation and Setup Documentation

### Critical for Success Criteria SC-001

**Must Provide:**
- Step-by-step ROS2 installation for Linux, Windows (WSL2), macOS
- Gazebo installation linked to ROS2 setup
- Troubleshooting guides for common issues
- Docker fallback for installation failures
- Video walkthroughs (optional, text-first per scope)

**Example Chapter 4 Content:**
> **Chapter 4: ROS2 and Gazebo Setup**
> - Section 4.1: Installing ROS2 on Ubuntu 22.04
> - Section 4.2: Installing ROS2 on Windows (WSL2)
> - Section 4.3: Installing ROS2 on macOS (limitations noted)
> - Section 4.4: Installing Gazebo Sim
> - Section 4.5: Verifying Installation (hello world example)
> - Section 4.6: Troubleshooting Common Issues
> - Section 4.7: Docker Alternative (if installation fails)

---

## 17. References

- **Plan**: Technical Context (dependencies, testing, deployment)
- **Spec**: FR-036 through FR-040 (environment requirements)
- **Constitution**: Section 4 (Technical Architecture Principles)

---

**Approval**: This toolchain is locked for Phase A implementation. All decisions are final unless critical issues arise. Changes require ADR and spec revision.
