# ADR-0003: Cross-Platform Student Environment Architecture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-30
- **Feature:** 001-book-platform (Core Book Platform)
- **Context:** Target audience is complete beginners with varying OS preferences (Windows, macOS, Linux). ROS2 and Gazebo have different levels of support across platforms. Must balance accessibility (easy setup) with technical capability (native performance). FR-036 requires cross-platform compatibility; FR-037 requires installation instructions for all three major OSes.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? ✅ YES - Determines who can use the book and how
     2) Alternatives: Multiple viable options considered with tradeoffs? ✅ YES - Linux-only, cloud IDE, vendor-locked solutions
     3) Scope: Cross-cutting concern (not an isolated detail)? ✅ YES - Affects all code examples, documentation, support
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

**Support three distinct environment strategies optimized per platform:**

**Linux (Native Installation) - Recommended**
- **Approach:** Official ROS2 binary packages via apt (Ubuntu/Debian)
- **Target OS:** Ubuntu 22.04 LTS (most common student OS)
- **Installation:** ROS2 Humble → Gazebo Sim → ros_gz bridge
- **Estimated Setup Time:** 30-45 minutes
- **Performance:** Native, optimal
- **Rationale:** Best student experience; ROS2/Gazebo designed for Linux; most documentation assumes Linux

**Windows (WSL2 + Docker Options)**
- **Option A (Intermediate Users):** WSL2 Ubuntu + native ROS2
  - WSL2 provides Linux environment inside Windows
  - Follow Linux instructions inside WSL2
  - X11 forwarding for GUI (Gazebo visualization)
  - Estimated setup time: 60-90 minutes (includes WSL2 setup)
  - Performance: Near-native, some GUI overhead

- **Option B (Beginners):** Docker Desktop + ROS2 container
  - Pre-built ROS2 + Gazebo Docker image
  - No WSL2 complexity
  - Trade-off: Less native performance, Docker learning curve
  - Estimated setup time: 30 minutes
  - Performance: Good for learning, not production

**macOS (Docker Only)**
- **Approach:** Docker Desktop + ROS2 container
- **Rationale:** ROS2 macOS support is limited and fragile; Docker most reliable
- **Installation:** Docker Desktop → Pre-built ROS2/Gazebo image → XQuartz for GUI
- **Estimated Setup Time:** 45 minutes
- **Performance:** Acceptable for educational purposes
- **Documentation Note:** "macOS native support is experimental; Docker is most reliable"

**Documentation Structure (Docusaurus Tabs):**
```markdown
<Tabs groupId="operating-systems">
  <TabItem value="linux" label="Linux (Ubuntu)" default>
    [Native installation steps]
  </TabItem>
  <TabItem value="windows-wsl" label="Windows (WSL2)">
    [WSL2 + native ROS2 steps]
  </TabItem>
  <TabItem value="windows-docker" label="Windows (Docker)">
    [Docker Desktop + container steps]
  </TabItem>
  <TabItem value="macos" label="macOS">
    [Docker + XQuartz steps]
  </TabItem>
</Tabs>
```

**Troubleshooting:** Platform-specific troubleshooting section per FR-037

## Consequences

### Positive

- **Maximum Accessibility:** Students on any major OS can participate (Windows ~70% market share, macOS ~15%, Linux ~15% of developers)
- **Honest Platform Guidance:** Explicitly recommends best path per platform; avoids "one size fits all" that frustrates students
- **Docker Fallback:** Provides consistent environment for Windows/macOS when native support is problematic
- **Performance Where It Matters:** Linux users get optimal performance for serious development
- **Beginner-Friendly:** Docker option lowers barrier for complete beginners intimidated by WSL2
- **Reduces Support Burden:** Clear instructions per platform reduce "it doesn't work" issues
- **Industry Alignment:** Prepares students for real robotics development (mostly Linux-based)
- **Explicit Limitations:** Documents macOS experimental status upfront; sets expectations

### Negative

- **Increased Documentation Complexity:** Must maintain 4 separate installation guides (Linux, WSL2, Docker-Windows, Docker-macOS)
- **Testing Overhead:** Must test all code examples across all platforms/options (5 total environments)
- **Fragmented Student Experience:** Students on different platforms may have different issues
- **Windows WSL2 Complexity:** WSL2 setup can be confusing for complete beginners; two-OS mental model
- **Docker Performance:** macOS/Windows Docker users get slower simulation performance (acceptable for learning, limiting for large projects)
- **Maintenance Risk:** Platform-specific bugs may require platform-specific fixes
- **Support Complexity:** Instructors must understand all platforms to help students troubleshoot
- **macOS Second-Class:** macOS users explicitly told native support is fragile (may discourage some students)

## Alternatives Considered

**Alternative A: Linux-Only Requirement**
- **Approach:** Require all students use Linux (dual-boot, VM, or native)
- **Pros:** Simplest documentation, best performance, industry-standard, single testing environment
- **Cons:** Excludes most students (Windows dominant on consumer PCs); high barrier to entry; violates FR-036 cross-platform requirement
- **Why Rejected:** Accessibility is core requirement; can't require students buy new machine or risk dual-boot

**Alternative B: Cloud-Based IDE (ROS Development Studio, AWS RoboMaker)**
- **Approach:** All students use browser-based cloud IDE with ROS2/Gazebo pre-installed
- **Pros:** Zero local setup, consistent environment, works on any OS/browser, no performance differences
- **Cons:** Requires stable internet; cloud costs (RDS free tier limited, AWS expensive); data privacy concerns; vendor lock-in; no offline learning
- **Why Rejected:** Violates cost-consciousness principle; internet dependency unacceptable for FR-040; doesn't teach real-world local setup

**Alternative C: macOS Native Support**
- **Approach:** Support ROS2 native installation on macOS
- **Pros:** Best macOS student experience, no Docker overhead, consistent with Linux approach
- **Cons:** ROS2 macOS support is fragile and experimental; many packages don't compile; frequent breakage; high maintenance burden
- **Why Rejected:** Unreliable; would frustrate students with broken installs; Docker more stable for macOS reality

**Alternative D: Windows Native (No WSL2)**
- **Approach:** ROS2 for Windows (experimental Windows packages)
- **Pros:** Native Windows performance, no WSL2 learning curve, simpler for Windows users
- **Cons:** ROS2 Windows support is experimental and incomplete; many packages not available; not industry-standard; limited community support
- **Why Rejected:** Too fragile; students would hit unsupported packages; doesn't prepare for industry (Linux-based)

**Alternative E: Single Docker Approach for All Platforms**
- **Approach:** Everyone uses Docker (Linux, Windows, macOS)
- **Pros:** Consistent environment everywhere, simplified documentation, easy testing
- **Cons:** Linux users get worse performance unnecessarily; doesn't teach native Linux setup (industry standard); Docker adds abstraction layer
- **Why Rejected:** Penalizes Linux users; doesn't align with industry practices (Linux native is standard)

## References

- Feature Spec: [specs/001-book-platform/spec.md](../../specs/001-book-platform/spec.md) (FR-036, FR-037)
- Implementation Plan: [specs/001-book-platform/plan.md](../../specs/001-book-platform/plan.md)
- Research Document: [specs/001-book-platform/research.md](../../specs/001-book-platform/research.md) (Section 9: Cross-Platform ROS2 Setup Strategy)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) (Section 6.5: Internationalization Standards - extensibility principle applies to platform support)
- Related ADRs: ADR-0001 (Content Platform) - both emphasize accessibility
- Evaluator Evidence: [history/prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md](../prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md) (OS/environment clarification)
