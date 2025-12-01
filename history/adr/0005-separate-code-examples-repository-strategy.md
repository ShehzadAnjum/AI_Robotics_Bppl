# ADR-0005: Separate Code Examples Repository Strategy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-30
- **Feature:** 001-book-platform (Core Book Platform)
- **Context:** Book contains 15-25 ROS2/Gazebo code projects (3-5 small, 1-2 mid-size, 1 integrated). Each project has source code, launch files, world files, URDF models, tests. Must decide: embed in content repository (monorepo) or separate repository. Trade-off: convenience vs separation of concerns.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? ✅ YES - Affects code organization, CI/CD, testing, maintenance
     2) Alternatives: Multiple viable options considered with tradeoffs? ✅ YES - Monorepo, examples embedded in docs, no examples repo
     3) Scope: Cross-cutting concern (not an isolated detail)? ✅ YES - Affects all code examples, testing workflow, content references
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

**Create separate `robotics-book-examples` repository for all ROS2/Gazebo code projects:**

**Repository Structure:**
```
robotics-book-examples/                    # Separate Git repository
├── small-projects/                        # 3-5 projects (1-3 hours each)
│   ├── sensor-visualization/
│   │   ├── README.md                     # Project metadata, success criteria
│   │   ├── src/                          # ROS2 Python source code
│   │   ├── launch/                       # ROS2 launch files
│   │   ├── worlds/                       # Gazebo world files
│   │   ├── models/                       # Robot URDF/SDF models
│   │   ├── config/                       # YAML configuration
│   │   ├── tests/                        # pytest unit tests
│   │   └── package.xml                   # ROS2 package manifest
│   ├── basic-motion-control/
│   └── obstacle-detection/
├── mid-projects/                          # 1-2 projects (5-10 hours each)
│   ├── autonomous-navigation/
│   └── pick-and-place-vision/
└── integrated-project/                    # 1 project (10-15 hours)
    └── warehouse-robot/
```

**Main Content Repository (`AI_Robotics_Bppl`):**
```
AI_Robotics_Bppl/                          # Main repository
├── docs/                                  # Book chapters (MDX)
│   ├── robotics/
│   │   └── sensor-integration.md         # Links to examples repo
├── src/                                   # React components
├── static/                                # Images, diagrams
├── tests/                                 # Playwright content tests
└── docusaurus.config.js
```

**Linking Strategy:**
- Chapters link to examples via GitHub URLs
- Example: `[Starter Code](https://github.com/user/robotics-book-examples/tree/main/small-projects/sensor-visualization)`
- Students clone examples repo separately: `git clone https://github.com/user/robotics-book-examples.git`

**CI/CD Strategy:**
- **Content Repo CI:** Playwright tests, Lighthouse, broken link checks, Docusaurus build
- **Examples Repo CI:** ROS2 Docker containers, pytest, colcon build, launch file smoke tests
- Independent deployment: Content → GitHub Pages, Examples → tested but not deployed

**Versioning:**
- Content repo version tags (v1.0.0, v1.1.0) reference examples repo commits
- Examples repo tagged to match content versions: `v1.0.0-examples`
- Students instructed to checkout matching version

## Consequences

### Positive

- **Separation of Concerns:** Content (documentation) separate from code (executable projects)
- **Independent CI/CD:** Content builds don't wait for slow ROS2 Docker tests; faster feedback loop
- **Clean Content Repo:** Main repo stays focused on documentation; no large binary files (Gazebo models, world files)
- **Easier Testing:** ROS2 code tested in isolated environment with ROS2 dependencies; doesn't pollute content repo
- **Clearer Ownership:** Content writers focus on docs; robotics engineers focus on examples
- **Reduced Monorepo Complexity:** Avoids large monorepo with mixed concerns (docs + executable code)
- **Git History Clarity:** Content changes don't mix with code changes in git log
- **Cloning Flexibility:** Students can clone only what they need (content only for reading, examples for coding)
- **Storage Efficiency:** Content repo smaller without code; faster clones for casual readers
- **Independent Release Cadence:** Examples can be updated/fixed without triggering content re-deploy

### Negative

- **Two Repositories to Maintain:** More overhead; must keep versions synchronized
- **Linking Overhead:** Content must link to external repo; broken links possible if examples moved
- **Student Confusion:** Students must clone two repos; setup instructions more complex
- **Version Synchronization Risk:** Content v1.0 must match examples v1.0; manual coordination required
- **Cross-Repo Issues:** Bug reports may span both repos; harder to trace
- **Search Fragmentation:** Can't search code and docs in single GitHub search
- **Contribution Workflow:** Contributors must understand two-repo structure; PRs may span both
- **Local Development:** Developers must clone both repos; relative paths don't work

## Alternatives Considered

**Alternative A: Monorepo (Content + Examples Together)**
- **Approach:** All content and code in single `AI_Robotics_Bppl` repository
  ```
  AI_Robotics_Bpppl/
  ├── docs/                  # Book chapters
  ├── examples/              # ROS2 code projects
  ├── src/                   # React components
  └── ...
  ```
- **Pros:** Single clone; easier cross-references; unified versioning; simpler contribution workflow
- **Cons:** Large repo size; slow CI/CD (ROS2 tests delay content builds); mixed concerns; git history cluttered
- **Why Rejected:** CI/CD performance critical (SC-012: <2s load time requires fast deploys); ROS2 Docker tests slow (5+ minutes); mixing docs and code violates separation of concerns

**Alternative B: Examples Embedded in Docs (No Separate Directory)**
- **Approach:** Code snippets directly in MDX files; no separate project structure
  ```markdown
  ## Example Code
  ```python
  # Inline code here
  ```
  ```
- **Pros:** Simplest for readers; code visible inline; no cloning required
- **Cons:** Can't run code; not real ROS2 packages; no CI/CD testing; doesn't meet "hands-on practice" requirement (FR-009); can't verify starter code works
- **Why Rejected:** Violates FR-017, FR-018, FR-019 (students must complete actual runnable projects); doesn't support learning-by-doing pedagogy

**Alternative C: No Examples Repository (External Links Only)**
- **Approach:** Link to external ROS2 tutorials, no custom examples
- **Pros:** Zero maintenance; leverage existing ROS2 documentation
- **Cons:** Examples not aligned with book chapters; inconsistent quality; may disappear; no control over pedagogy; violates FR-020 (projects with clear success criteria)
- **Why Rejected:** Custom examples essential for book pedagogy; external tutorials don't match 12-element structure

**Alternative D: Examples as Git Submodule**
- **Approach:** Examples repo embedded as git submodule in main repo
- **Pros:** Single clone appears to student; linked versions automatic
- **Cons:** Submodules notoriously confusing; commit hash updates clutter git log; CI/CD still needs ROS2 in main repo; doesn't solve CI/CD performance issue
- **Why Rejected:** Submodules complex for students unfamiliar with Git; doesn't improve CI/CD performance (main issue)

## References

- Feature Spec: [specs/001-book-platform/spec.md](../../specs/001-book-platform/spec.md) (FR-017, FR-018, FR-019, FR-020)
- Implementation Plan: [specs/001-book-platform/plan.md](../../specs/001-book-platform/plan.md) (Project Structure section)
- Data Model: [specs/001-book-platform/data-model.md](../../specs/001-book-platform/data-model.md) (Project entity definition)
- Contracts: [specs/001-book-platform/contracts/project-structure.contract.md](../../specs/001-book-platform/contracts/project-structure.contract.md)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) (Section 3.1: Smallest Viable Change - separation reduces complexity)
- Related ADRs: ADR-0001 (Content Platform Stack) - both optimize for fast CI/CD
- Evaluator Evidence: [history/prompts/001-book-platform/0001-core-book-platform-specification.spec.prompt.md](../prompts/001-book-platform/0001-core-book-platform-specification.spec.prompt.md)
