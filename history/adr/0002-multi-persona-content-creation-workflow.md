# ADR-0002: Multi-Persona Content Creation Workflow

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-30
- **Feature:** 001-book-platform (Core Book Platform)
- **Context:** Constitution mandates multi-persona approach (3.2) separating knowledge validation from content creation. Need systematic workflow ensuring technical accuracy AND engagement quality for educational content. Content must pass three-source validation rule (Constitution 2.4) while maintaining soft, polite, humorous tone (Constitution 2.3).

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? ✅ YES - Defines how ALL content is created
     2) Alternatives: Multiple viable options considered with tradeoffs? ✅ YES - Single persona, three personas, manual-only
     3) Scope: Cross-cutting concern (not an isolated detail)? ✅ YES - Affects every chapter, every workflow
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

**Adopt a two-stage content creation workflow with explicit AI persona invocation:**

**Stage 1: Research & Validation (Professor Persona)**
- **Persona:** Seasoned robotics professor with 20+ years domain knowledge
- **Inputs:** Chapter topic, learning objectives
- **Outputs:** Chapter Research Document with 3+ validated sources
- **Tools:** WebSearch, WebFetch, Read (documentation)
- **Responsibilities:**
  - Research from ≥3 authoritative sources (papers, textbooks, official docs)
  - Cross-validate technical claims
  - Identify common student misconceptions
  - Suggest hands-on exercises demonstrating core concepts
  - Review pedagogical soundness (scaffolding, incremental complexity)
  - Document sources in validation checklist format
  - Create content outline with validated facts
- **Quality Focus:** Accuracy, depth, educational value
- **Prompt Template:** Explicit invocation stored in `.specify/personas/professor-researcher.md`

**Stage 2: Content Creation (Editor Persona)**
- **Persona:** Expert book editor specializing in educational content
- **Inputs:** Chapter Research Document from Stage 1
- **Outputs:** Draft chapter in 12-element MDX format
- **Tools:** Read (research doc), Write (chapter MDX), Edit (revisions)
- **Responsibilities:**
  - Transform technical research into engaging, accessible prose
  - Apply tone standards (soft, polite, lightly humorous, conversational)
  - Create curiosity hooks and driving questions
  - Write real-world examples and analogies
  - Ensure 12-element structure complete
  - Polish for clarity, flow, readability
  - **Preserve all validated technical facts** (no changes to accuracy)
  - Add inline citations referencing validated sources
- **Quality Focus:** Clarity, engagement, flow, accessibility
- **Prompt Template:** Explicit invocation stored in `.specify/personas/editor-writer.md`

**Stage 3: Human Review & Approval (Required)**
- Human validates both accuracy (Stage 1) and engagement (Stage 2)
- Checks three-source validation documentation
- Approves or requests revision
- Quality gate: No chapter published without human approval

**Implementation via Claude Code Skills:**
- **Skill 1:** `professor-researcher` - Implements Stage 1
- **Skill 2:** `editor-writer` - Implements Stage 2
- Skills documented in `.claude/skills/` directory
- Workflow enforced via quality gates checklist

## Consequences

### Positive

- **Separation of Concerns:** Accuracy validation separate from engagement creation prevents "engaging but wrong" or "accurate but boring" content
- **Constitution Compliance:** Operationalizes Constitution 3.2 (multi-persona approach) and 2.4 (three-source validation)
- **Quality Assurance:** Professor persona ensures technical correctness before editor persona creates narrative
- **Clear Handoff:** Structured artifacts (Chapter Research Document) provide unambiguous handoff between stages
- **Traceable Validation:** Three-source validation documented in research phase, reviewable by humans
- **Persona Specialization:** Each persona optimized for specific expertise (accuracy vs engagement)
- **Scalability:** Workflow standardizes content creation, reducing variability across chapters
- **Reusable Prompts:** Persona templates documented and versioned, improving over time
- **Human Control:** Human remains in approval loop, final authority on quality

### Negative

- **Increased Complexity:** Two-stage process adds overhead vs single-pass generation
- **Additional Time:** Research phase + writing phase takes longer than direct content creation
- **Handoff Risk:** Miscommunication between stages possible if research document unclear
- **Prompt Maintenance:** Persona prompts require maintenance as we learn what works best
- **Cognitive Overhead:** Content creators must understand two distinct personas and workflow
- **Potential Redundancy:** Some research work may be repeated by editor persona if not clear in handoff document
- **Not Fully Automated:** Human review required (cannot batch-generate all chapters unattended)

## Alternatives Considered

**Alternative A: Single Generalist AI Persona**
- **Approach:** One AI generates content with both accuracy and engagement goals
- **Pros:** Simpler workflow, faster generation, no handoff overhead
- **Cons:** Risk of "engaging but inaccurate" or "accurate but boring" content; violates Constitution 3.2 explicit requirement
- **Why Rejected:** Constitution mandates separation; single persona can't optimize for both concerns equally

**Alternative B: Three-Persona Model (Researcher + Validator + Writer)**
- **Approach:** Separate researcher (finds info), validator (checks accuracy), writer (creates content)
- **Pros:** Even finer separation of concerns, distributed expertise
- **Cons:** Three handoffs increase complexity without clear benefit; researcher and validator overlap significantly
- **Why Rejected:** Added complexity without proportional quality improvement; two personas sufficient

**Alternative C: Manual-Only (No AI)**
- **Approach:** Human subject matter experts research and write all content
- **Pros:** Maximum human control, no AI risk, traditional approach
- **Cons:** Not scalable (12-15 chapters, 50+ hours each); violates Constitution 3.1 automation strategy; expensive
- **Why Rejected:** Project explicitly designed for AI-assisted content creation per Constitution

**Alternative D: Automated Handoff Without Human Review**
- **Approach:** Stage 1 → Stage 2 automatically, publish without human check
- **Pros:** Fully automated pipeline, maximum efficiency
- **Cons:** Risk of publishing inaccurate content; violates human-as-tool strategy (Constitution 3.3); no quality gate
- **Why Rejected:** Constitution requires human approval before publishing; unattended generation too risky

## References

- Feature Spec: [specs/001-book-platform/spec.md](../../specs/001-book-platform/spec.md)
- Implementation Plan: [specs/001-book-platform/plan.md](../../specs/001-book-platform/plan.md)
- Research Document: [specs/001-book-platform/research.md](../../specs/001-book-platform/research.md) (Section 5: Multi-Persona Workflow Design)
- Constitution: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) (Section 3.2: Multi-Persona Approach)
- Related ADRs: ADR-0004 (Educational Assessment Model) - both enforce self-directed learning principles
- Evaluator Evidence: [history/prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md](../prompts/001-book-platform/0002-specification-clarification-robotics-textbook.misc.prompt.md)
