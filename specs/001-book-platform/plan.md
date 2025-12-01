# Implementation Plan: Core Book Platform

**Branch**: `001-book-platform` | **Date**: 2025-11-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-book-platform/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build an interactive educational book platform for Physical AI & Humanoid Robotics using Docusaurus, deployed to GitHub Pages. The platform delivers 12-15 chapters following a strict 12-element pedagogical structure (hooks, examples, practice, self-evaluation, assignments) with simulation-first learning using ROS2 and Gazebo. Target audience: complete beginners progressing to intermediate practitioners through hands-on projects.

**Key Requirements**: Cross-platform compatibility (Linux/Windows/macOS), 70/30 practical/theory balance, self-directed learning without solutions, three-source validation for all content, offline-readable with simulation exercises requiring online ROS2 access.

## Technical Context

**Language/Version**:
- **Content Platform**: JavaScript/TypeScript with Docusaurus 3.6.x (static site generator)
- **Code Examples**: Python 3.10+ for ROS2 examples (beginner-friendly, widely documented)
- **Alternative Examples**: C++ examples in advanced sections only (optional)
- **Node Version**: Node.js 18.x LTS or 20.x LTS (Docusaurus 3.x requirement)

**Primary Dependencies**:
- **Docusaurus 3.x**: Static site generator, React-based, built-in search, responsive themes
- **ROS2 Humble/Iron**: Robotics framework (examples and student projects)
- **Gazebo Sim (Harmonic)**: Primary simulator (90% of examples)
- **Playwright**: End-to-end testing for content quality and navigation
- **Context7**: Upstash MCP service (deferred to Phase 2 - not needed for static site)
- **MDX**: Markdown + JSX for interactive content components
- **Mermaid/Excalidraw**: Diagram generation tools (embedded in Docusaurus)

**Storage**:
- **Content**: Markdown/MDX files in Git repository
- **Assets**: Images, diagrams stored in static/ directory
- **Code Examples**: Separate Git repository for ROS2/Gazebo simulation projects
- **No Database**: Static site, no user data persistence (Phase 1)

**Testing**:
- **Content Quality**: Custom Playwright tests for 12-element structure validation
- **Navigation**: Playwright tests for <30s topic discovery (SC-014)
- **Performance**: Lighthouse CI for <2s load time (SC-012)
- **Responsive Design**: Playwright cross-device testing (SC-013)
- **Link Checking**: Broken link detection in CI/CD
- **ROS2 Examples**: pytest for unit tests + Docker CI/CD with ROS2 containers for integration tests

**Target Platform**:
- **Deployment**: GitHub Pages (static hosting, free, version-controlled)
- **Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **Devices**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)
- **Student Environment**: Linux, Windows (WSL2 for ROS2), macOS (limited ROS2 support)

**Project Type**: Web application (static site with content management workflow)

**Performance Goals**:
- **Page Load**: <2 seconds for 95th percentile users (SC-012)
- **Search Response**: <1 second for full-text search
- **Navigation**: <30 seconds to find specific topics (SC-014)
- **Build Time**: <5 minutes for full build in GitHub Actions (with caching, incremental builds)

**Constraints**:
- **Offline Reading**: Content readable offline after initial load (FR-040) - requires service worker strategy
- **Cross-Platform**: All setup instructions work on Linux/Windows/macOS (FR-036)
- **CPU-Only**: Core content runs without GPU (FR-038)
- **No Backend**: Static site only in Phase 1 (no user accounts, no server-side logic)
- **GitHub Pages Limits**: 1GB site size, 100GB/month bandwidth (unlikely to exceed with text content)

**Scale/Scope**:
- **Content Volume**: 12-15 chapters, ~1-2 hours reading each = 12-30 hours total content
- **Page Count**: Estimated 50-100 pages (chapters + sub-pages)
- **Code Examples**: 15-25 simulation projects (3-5 small + 1-2 mid + 1 integrated per topic cluster)
- **Diagrams**: Estimated 50-100 visual diagrams across all chapters
- **Concurrent Users**: NEEDS CLARIFICATION (GitHub Pages can handle, but affects CDN strategy)
- **Content Updates**: Chapter-by-chapter release (incremental, not all-at-once)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Content & Pedagogy Principles

- **I. Curiosity-Driven Learning**: ✅ PASS - FR-003 requires hooks (elements 1, 12), driving questions (element 2), and humor in tone (FR-010)
- **II. Example-First Teaching**: ✅ PASS - FR-006 mandates real-world examples before abstract theory
- **III. Practical-First Balance**: ✅ PASS - FR-004 enforces 70% practical / 30% theory ratio
- **IV. Simulation-First Progression**: ✅ PASS - FR-007, FR-007d, FR-007e implement three-tier progression (Gazebo → generic concepts → optional advanced)
- **V. Scaffolded Learning**: ✅ PASS - FR-008 requires incremental complexity; FR-013/FR-014 provide self-evaluation checkpoints
- **VI. Three-Source Validation Rule**: ✅ PASS - FR-034 mandates validation against 3+ authoritative sources for all technical claims

### Automation & Intelligence Principles

- **VII. Chapter-by-Chapter Generation**: ✅ PASS - Scale/Scope documents incremental chapter-by-chapter release, not all-at-once
- **VIII. Smallest Viable Change**: ✅ PASS - Phase 1 scoped to book platform only; no Phase 2/3 features included
- **IX. Multi-Persona Approach**: ⚠️ NEEDS PLANNING - Constitution requires professor (validation) + editor (writing) personas; implementation workflow must be designed in research phase
- **X. Reusable Intelligence Mandate**: ⚠️ NEEDS PLANNING - Must design reusable subagents/skills for content generation, validation, and quality checks

### Process & Collaboration Principles

- **XI. SpecKit Plus Journey**: ✅ PASS - Currently in Plan phase after completing Constitution and Spec phases
- **XII. Human-as-Tool Strategy**: ✅ PASS - Multiple NEEDS CLARIFICATION markers require human input; ADR suggestions will follow for architectural decisions

### Technical Architecture Principles

- **Code Quality**: ✅ PASS - Testing strategy defined (Playwright, Lighthouse, link checking)
- **Readability**: ⚠️ DEFERRED - Code quality gates apply during implementation phase
- **Security**: ✅ PASS - Static site has minimal attack surface; no user data, no secrets required
- **Performance**: ✅ PASS - Performance goals defined (SC-012: <2s load, SC-014: <30s search)

### Non-Functional Requirements Alignment

- **Performance Standards**: ✅ PASS - Aligned with Constitution 6.1 (SC-012: <2s load time for 95th percentile)
- **Reliability Standards**: ✅ PASS - FR-040 ensures graceful degradation (offline reading if online features unavailable)
- **Security Standards**: ✅ PASS - No secrets, no backend, static hosting reduces security risks
- **Accessibility Standards**: ✅ PASS - FR-009 requires WCAG-friendly diagrams; FR-024 requires responsive design
- **Internationalization**: ⚠️ DEFERRED TO PHASE 3 - Phase 1 is English-only; Urdu translation planned for Phase 3 per user

### Quality Gates Validation

**Content Quality Gate Requirements**:
- [ ] 12-element structure (FR-003) - ✅ Spec defines all 12 elements
- [ ] 70/30 balance (FR-004) - ✅ Explicitly required
- [ ] Diagrams (FR-009) - ✅ Mermaid/Excalidraw tooling identified
- [ ] Expert insights (FR-012) - ✅ Required in element 7
- [ ] AI prompts (FR-021, FR-022) - ✅ Required in element 8
- [ ] Self-eval with references (FR-013, FR-014) - ✅ Required in element 10
- [ ] Assignments with criteria (FR-015, FR-016) - ✅ Required in element 11
- [ ] Jargon defined (FR-005) - ✅ Explicitly required
- [ ] Tone standards (FR-010) - ✅ Soft, polite, humorous mandated
- [ ] Three-source validation (FR-034) - ✅ Required for all content
- [ ] Professor review - ⚠️ NEEDS WORKFLOW DESIGN
- [ ] Editor review - ⚠️ NEEDS WORKFLOW DESIGN

**Code Quality Gate** (deferred to implementation):
- Testing, linting, security scans defined in Technical Context

### Risk Assessment

**Constitution Violation Risks**:
1. **Multi-Persona Implementation Undefined**: Risk that content is generated without professor validation and editor polish, violating Constitution 3.2
   - **Mitigation**: Research phase must design persona invocation workflow

2. **Three-Source Validation Tracking**: Risk that sources are not documented, making validation unverifiable
   - **Mitigation**: Research phase must design source tracking system (e.g., citation footnotes, validation checklist template)

3. **Chapter-by-Chapter Automation**: Risk of attempting to generate all chapters at once, violating Constitution 3.1
   - **Mitigation**: Task phase must break into single-chapter increments with validation gates

**Overall Gate Status**: ⚠️ CONDITIONAL PASS
- Proceed to Phase 0 research to resolve multi-persona workflow and validation tracking system
- Re-check after research.md completion to ensure Constitution compliance mechanisms are designed

## Project Structure

### Documentation (this feature)

```text
specs/001-book-platform/
├── spec.md              # Feature specification (completed)
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command - content structure contracts)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

**Structure Decision**: Docusaurus static site generator structure with separate code examples repository

```text
# Main Repository: Book Content & Platform
docs/                                # Markdown/MDX content (book chapters)
├── intro.md                        # Landing page
├── foundations/                     # Foundational chapters (Ch 1-3, ROS2-agnostic)
│   ├── electronics-basics.md
│   ├── mechanics-basics.md
│   └── programming-basics.md
├── robotics/                        # Robotics-specific chapters (Ch 4+, ROS2 mandatory)
│   ├── ros2-introduction.md        # Ch 4: ROS2 setup and basics
│   ├── sensor-integration.md
│   ├── motion-control.md
│   ├── obstacle-avoidance.md
│   ├── autonomous-navigation.md
│   └── ...                         # 9-12 total robotics chapters
└── advanced/                        # Optional advanced content
    └── isaac-sim-gpu-physics.md    # Optional Isaac Sim chapter

src/
├── components/                      # React components for interactive content
│   ├── SimulationEmbed.tsx         # Embed simulation examples
│   ├── CodeExample.tsx             # Syntax-highlighted code blocks
│   ├── DiagramViewer.tsx           # Interactive diagram viewer
│   └── AIPromptCard.tsx            # AI learning prompt display component
├── css/                            # Custom styling
│   └── custom.css
└── pages/                          # Non-doc pages (if needed)
    └── index.tsx                   # Custom homepage (optional)

static/                              # Static assets
├── img/                            # Images and diagrams
│   ├── foundations/                # Organized by chapter
│   ├── robotics/
│   └── advanced/
└── diagrams/                       # Source files for diagrams (Excalidraw, Mermaid)

blog/                               # Optional blog for updates (Docusaurus feature)
└── ...                             # Can be used for announcements, tips

tests/                              # Playwright end-to-end tests
├── content-quality/                # Test 12-element structure
│   ├── chapter-structure.spec.ts  # Validate each chapter has all 12 elements
│   └── links.spec.ts              # Broken link detection
├── navigation/                     # Test navigation and search
│   ├── search.spec.ts             # SC-014: <30s topic discovery
│   └── toc.spec.ts                # Table of contents functionality
├── performance/                    # Performance testing
│   └── load-time.spec.ts          # SC-012: <2s page load
└── responsive/                     # Cross-device testing
    └── devices.spec.ts            # SC-013: mobile/tablet/desktop

docusaurus.config.js                # Docusaurus configuration
package.json                        # Node dependencies
sidebar.js                          # Sidebar navigation structure
.github/
└── workflows/
    ├── ci.yml                      # Run tests on PR
    └── deploy.yml                  # Deploy to GitHub Pages

# Separate Repository: ROS2/Gazebo Code Examples
# Repository: robotics-book-examples (linked from main book)
examples/
├── foundations/                    # Examples for Ch 1-3 (simulator-agnostic)
│   ├── simple-circuit-sim/
│   └── basic-python-exercises/
├── small-projects/                 # 3-5 small projects (single concepts)
│   ├── sensor-visualization/
│   ├── basic-motion-control/
│   └── obstacle-detection/
├── mid-projects/                   # 1-2 mid-size projects (multi-concept)
│   ├── autonomous-navigation/
│   └── pick-and-place-vision/
└── integrated-project/             # 1 final integrated project
    └── warehouse-robot/            # Combines navigation + vision + manipulation

# Each project directory contains:
# ├── README.md                     # Project description, learning objectives, success criteria
# ├── src/                          # ROS2 Python/C++ source code
# ├── launch/                       # ROS2 launch files
# ├── worlds/                       # Gazebo world files
# ├── models/                       # Robot URDF/SDF models
# └── tests/                        # Unit tests for code validation (optional)
```

**Rationale**:
- **Separate content from code examples**: Main repository focuses on documentation; examples in separate repo prevents monorepo complexity
- **Docusaurus-native structure**: Leverages built-in features (search, versioning, responsive themes)
- **Chapter organization**: Mirrors spec structure (foundations → robotics → advanced)
- **Testing co-located**: Tests live with content for validation during CI/CD
- **Static assets organized**: Images/diagrams grouped by chapter for maintainability

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**No Constitution violations detected.** All principles pass or have clear mitigation plans in research phase.

**Complexity Notes**:
- Separate code examples repository adds a second repository, but this is justified to prevent monorepo complexity and separate content concerns from executable code
- Multi-persona workflow and reusable intelligence are not violations - they are Constitution requirements that will be designed in Phase 0 research
