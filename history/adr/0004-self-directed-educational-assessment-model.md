# ADR-0004: Self-Directed Educational Assessment Model

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-30
- **Feature:** 001-book-platform (Core Book Platform)
- **Context:** Specification clarification revealed controversial decision: no solution keys, no answer keys, no formal graded assessments. Students verify learning through simulation outcomes only. Fundamentally different from traditional textbooks and online courses. Must balance educational effectiveness with self-directed learning philosophy.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? ✅ YES - Shapes entire learning experience and content structure
     2) Alternatives: Multiple viable options considered with tradeoffs? ✅ YES - Traditional answers, automated grading, instructor-led
     3) Scope: Cross-cutting concern (not an isolated detail)? ✅ YES - Affects every assignment, exercise, self-eval question
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

**Adopt a fully self-directed assessment model with simulation-verified outcomes:**

**Self-Evaluation Questions (FR-013, FR-013a, FR-014)**
- **Format:** 3-5 open-ended questions per chapter
- **NO answer keys provided** (FR-013a)
- **Topic references included** (FR-014) - guide students where to review if uncertain
- **Verification:** Students verify understanding by re-reading referenced topics and experimenting in simulation
- **Purpose:** Formative assessment for self-diagnosis, not summative grading

**Assignments (FR-015, FR-016, FR-016a, FR-016b, FR-016c)**
- **Duration:** 30-60 minutes per chapter
- **Starter code provided:** Boilerplate code to reduce setup friction
- **Success criteria:** 2-5 objective, measurable, simulation-verifiable outcomes (e.g., "robot reaches target within 10cm")
- **Hints provided:** 2-5 hints giving guidance without prescribing exact solution (FR-016b)
- **NO solution code provided** (FR-016a)
- **Verification:** Students run simulation and check if success criteria met (objective measurement: position error, completion time, collision count)
- **Learning Model:** Students learn through experimentation, iteration, and simulation feedback

**No Formal Assessments (FR-016c)**
- No quizzes
- No graded evaluations
- No instructor-led assessments
- No certification or badges
- Purely self-directed learning

**Guidance Mechanisms (Without Solutions)**
- **Expert insights throughout chapters** (FR-012): Tips, warnings, common pitfalls
- **Troubleshooting guidance:** "If robot doesn't reach target, check these 3 things..."
- **Debugging strategies:** "Use RViz to visualize sensor data and verify..."
- **Simulation feedback:** Objective metrics (position error, time, collisions) serve as "answer"

**Edge Case Handling:**
- Edge case documented: "How do students verify correctness without solution keys?" (spec.md line 100)
- Solution: Simulation-verifiable success criteria with objective measurements
- Assumption 12: "Students expected to learn through experimentation and simulation feedback"

## Consequences

### Positive

- **Active Learning:** Forces students to think critically and experiment rather than copy solutions
- **Real-World Alignment:** Professional robotics has no "answer key" - engineers verify via testing, just like students here
- **Develops Problem-Solving:** Students build debugging skills by iterating without solutions
- **Prevents Cheating Temptation:** No solutions to copy means students must genuinely learn
- **Encourages Experimentation:** Students free to try creative approaches without fear of "wrong answer"
- **Simulation as Teacher:** Objective feedback (robot behavior) more valuable than correct/incorrect label
- **Scalable:** No instructor grading required; works for any number of students
- **Ownership:** Students take pride in solutions they discovered themselves
- **Transferable Skills:** Debugging and iteration skills apply beyond this book
- **Honest Self-Assessment:** Students can't fool themselves - simulation either works or doesn't

### Negative

- **Frustration Risk:** Some students may struggle without solutions and give up (SC-006 tracks <20% dropout to measure this)
- **Uneven Progress:** Strong students advance quickly; struggling students may stall without instructor intervention
- **No Verification of Understanding:** Students might meet success criteria through trial-and-error without understanding why (mitigated by self-eval questions and conceptual teaching)
- **Support Burden:** Students may demand solutions when frustrated; documentation must set expectations upfront
- **Non-Traditional:** Conflicts with student expectations from traditional education (requires clear communication of philosophy)
- **Quality Variance:** Student solutions may be inefficient or poorly structured (acceptable tradeoff for learning ownership)
- **Motivation Dependency:** Requires intrinsic motivation; students expecting external validation may disengage
- **Accessibility Concern:** Students with learning differences may need more scaffolding than provided
- **Controversial:** Educators and students may question this approach; requires strong pedagogical justification

## Alternatives Considered

**Alternative A: Traditional Answer Keys + Solution Code**
- **Approach:** Provide answers to self-eval questions and full solution code for assignments
- **Pros:** Students can verify correctness instantly; reduces frustration; familiar model; easier for struggling students
- **Cons:** Encourages copy-paste without understanding; no deep learning; doesn't develop problem-solving skills; students shortcut to solutions
- **Why Rejected:** Violates Constitution principle of "doing precedes deep understanding"; user explicitly requested no solutions (clarification session 2025-11-30)

**Alternative B: Automated Grading (LeetCode-Style)**
- **Approach:** Automated test suite checks student code; passes/fails with feedback
- **Pros:** Objective grading, instant feedback, scalable, gamification possible (badges, leaderboards)
- **Cons:** Requires complex autograder infrastructure; discourages creative solutions; may not catch conceptual misunderstandings; test-gaming behavior
- **Why Rejected:** Over-engineered for Phase 1 static site; shifts focus from learning to "passing tests"; not aligned with self-directed philosophy

**Alternative C: Instructor-Led Assessments**
- **Approach:** Assignments graded by instructors; students receive personalized feedback
- **Pros:** Highest quality feedback; catches misconceptions; motivates students; certificates possible
- **Cons:** Not scalable (requires instructors); expensive; incompatible with static site; slow feedback loop; creates dependency
- **Why Rejected:** Violates Phase 1 static site architecture; not scalable; violates cost-consciousness

**Alternative D: Peer Review System**
- **Approach:** Students submit assignments; other students review and provide feedback
- **Pros:** Scalable peer learning; students learn from reviewing others' work; community building
- **Cons:** Requires backend for submission/matching; quality variance in reviews; beginners reviewing beginners (blind leading blind); privacy concerns
- **Why Rejected:** Requires complex backend infrastructure (Phase 2 feature); peer feedback quality questionable for complete beginners

**Alternative E: Hybrid (Solutions After Attempt)**
- **Approach:** Solutions unlocked after student submits attempt or after time delay
- **Pros:** Encourages attempt before looking at solution; students can learn from comparison
- **Cons:** Requires submission infrastructure; still enables shortcut behavior; reduces ownership; complexity
- **Why Rejected:** Requires backend (Phase 1 is static); user explicitly requested no solutions; doesn't fully solve copy-paste problem

## References

- Feature Spec: [specs/001-book-platform/spec.md](../../specs/001-book-platform/spec.md) (FR-013, FR-013a, FR-014, FR-015, FR-016, FR-016a, FR-016b, FR-016c; Edge case lines 100-101; Assumption 12)
- Implementation Plan: [specs/001-book-platform/plan.md](../../specs/001-book-platform/plan.md)
- Research Document: [specs/001-book-platform/research.md](../../specs/001-book-platform/research.md)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) (Section 2.2.III: Practical-First Balance - "Doing precedes deep theoretical understanding")
- Related ADRs: ADR-0002 (Multi-Persona Workflow) - both enforce self-directed learning principles
- Evaluator Evidence: [history/prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md](../prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md) (Clarification 4: Pedagogical Artifacts and Assessment - user selected "Self-evaluation only (no solutions)")
