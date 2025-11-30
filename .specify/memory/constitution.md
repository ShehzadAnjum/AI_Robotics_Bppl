<!--
Sync Impact Report:
─────────────────────────────────────────────────────────────────────────────
Version Change: INITIAL → 1.0.0
Type: MAJOR (Initial constitution ratification)
Date: 2025-11-30

New Principles Added:
  1. Curiosity-Driven Learning (Section 2.2)
  2. Example-First Teaching (Section 2.2)
  3. Practical-First Balance (Section 2.2)
  4. Simulation-First Progression (Section 2.2)
  5. Scaffolded Learning (Section 2.2)
  6. Three-Source Validation Rule (Section 2.4)
  7. Chapter-by-Chapter Automation (Section 3.1)
  8. Multi-Persona Approach (Section 3.2)
  9. Smallest Viable Change (Section 3.1)
  10. SpecKit Plus Methodology (Section 5.1)

Template Alignment Status:
  ✅ plan-template.md - Constitution Check section ready for validation gates
  ✅ spec-template.md - User stories align with learning outcomes
  ✅ tasks-template.md - Task structure supports incremental content creation
  ⚠️  templates/ - May need custom content templates for book chapters (defer to Spec phase)

Follow-up Actions:
  □ Create chapter content template in Spec phase
  □ Define specific Constitution Check gates for content quality
  □ Establish professor and editor persona prompts/workflows
  □ Set up three-source validation tracking system

─────────────────────────────────────────────────────────────────────────────
-->

# Physical AI & Humanoid Robotics - Project Constitution

## 1. Project Identity

### 1.1 Mission
Empower learners with minimal prerequisites to understand, build, and deploy Physical AI and Humanoid Robotics systems through hands-on, project-based learning that maintains curiosity and prevents loss of interest.

### 1.2 Vision
An interactive educational platform that transforms theoretical robotics concepts into practical skills through simulation-first learning, enabling students to progress from basic terminology to completing functional integrated projects.

**Engagement Commitment:** Content shall maintain student curiosity about what's coming next, prevent loss of interest through varied teaching methods, and use appropriate humor to keep the learning experience light and enjoyable.

### 1.3 Scope Boundaries

**In Scope:**
- Educational content covering Physical AI and Humanoid Robotics
- AI-powered learning assistance
- Personalized content delivery
- Multilingual support (English and Urdu)
- Project-based learning with simulation exercises

**Out of Scope:**
- Hardware sales or distribution
- Real-time robot control interfaces (beyond educational examples)
- Advanced graduate-level research topics
- Custom hardware design specifications
- Video tutorials or live instruction

### 1.4 Success Criteria

**Learning Outcomes:**
Students completing this platform will:
- Understand core Physical AI and Humanoid Robotics terminology
- Complete small projects independently
- Complete mid-size projects independently
- Combine multiple small projects into functional integrated systems
- Evaluate and select appropriate tools for robotics problems

**Platform Outcomes:**
- Content successfully deployed and accessible
- AI assistance accurately answers questions (>85% accuracy target)
- Users successfully personalize content based on background
- Translations maintain technical accuracy and readability

---

## 2. Content & Pedagogy Principles

### 2.1 Target Audience & Entry Requirements

**Entry Requirements:**
- **No Prerequisites Assumed:** Learners may enter with minimal background
- **Foundational Content Included:** All necessary jargons, technical vocabulary, and foundational principles taught in early content
- **Willingness to Learn by Doing:** Hands-on engagement expected

**Knowledge Journey:**
- **Entry:** Complete beginner
- **Early Content:** Build foundational vocabulary (electronics, mechanics, programming basics)
- **Mid Content:** Apply foundations to robotics-specific concepts
- **Exit:** Intermediate practitioner capable of independent system design and debugging

### 2.2 Pedagogical Philosophy

**Core Principles:**

**I. Curiosity-Driven Learning**

Every piece of content MUST create anticipation for what's next. Hooks maintain engagement and prevent interest loss. Humor used appropriately to lighten cognitive load.

*Rationale:* Learning is most effective when learners are intrinsically motivated. Maintaining curiosity prevents dropout and increases retention.

**II. Example-First Teaching**

Real-world scenarios MUST precede abstract theory. Concepts explained by referencing concrete examples. Analogies from everyday life required.

*Rationale:* Abstract concepts become accessible when anchored to familiar experiences. Reduces cognitive load and improves comprehension.

**III. Practical-First Balance**

Content MUST maintain 70% practical/hands-on activities and 30% theory. Theory only when necessary for practice. Doing precedes deep theoretical understanding.

*Rationale:* Adult learners and practical domains require application before abstraction. Immediate utility increases motivation and retention.

**IV. Simulation-First Progression**

Learning MUST follow three-tier progression:
1. **Tier 1:** Simulation environments (zero hardware cost, safe experimentation)
2. **Tier 2:** Generic tech stack (transferable skills, not vendor-locked)
3. **Tier 3:** Specific hardware (real-world application with constraints)

*Rationale:* Removes cost and availability barriers. Allows rapid iteration and mistake-making without consequences. Builds confidence before hardware complexity.

**V. Scaffolded Learning**

Concepts MUST build incrementally from simple to complex. Prerequisites taught before dependent concepts. Self-evaluation checkpoints prevent knowledge gaps.

*Rationale:* Zone of proximal development maximizes learning. Gaps compound; early detection prevents later confusion.

### 2.3 Content Quality Standards

**Structural Requirements:**

Every learning unit MUST include:
1. Attention-seeker hook
2. Driving question the unit answers
3. Real-world example introduced first
4. Use case/test case with knowledge requirements
5. Concept teaching (practical-first, theory-light)
6. Visual diagrams and flows
7. Expert insights, tips, and common pitfalls
8. AI-assisted learning prompts
9. Hands-on practice with clear success criteria
10. Self-evaluation questions with topic references
11. Short assignment
12. Curiosity hook for next unit

**Tone & Voice Standards:**
- **Soft and Polite:** Never condescending
- **Conversational:** Explaining to curious friend
- **Lightly Humorous:** Appropriate, not forced
- **Encouraging:** Normalize mistakes as learning
- **Direct Address:** Use "you" and "we"

**Clarity Standards:**
- Explain technical terms before using them
- Use analogies from everyday life
- One concept per paragraph when complex
- Active voice preferred
- Short sentences for complex ideas
- All jargon defined in context

**Visual Standards:**
- Diagrams required for abstract concepts
- Flow charts for decision trees and algorithms
- Clear labels, legends, and captions
- Consistent color coding
- Accessible (color-blind friendly, high contrast)

### 2.4 Content Authenticity Standard

**VI. Three-Source Validation Rule (NON-NEGOTIABLE)**

Every technical claim, concept explanation, or best practice MUST be validated against at least 3 authoritative sources before publishing.

**Authoritative Sources:**
- Peer-reviewed academic papers
- Industry-standard textbooks
- Official framework/platform documentation
- Reputable research institution publications
- Established practitioners' verified content

**Validation Requirement:**
- Document sources in content review notes
- If sources conflict, present multiple perspectives or consensus view
- Update content if validation reveals inaccuracies
- No content published without validation completed

*Rationale:* Prevents misinformation. Builds trust. Ensures educational quality. Single-source claims may be biased or outdated.

---

## 3. Automation & Intelligence Principles

### 3.1 Automation Strategy

**VII. Chapter-by-Chapter Generation**

Content MUST be generated incrementally, one chapter at a time. Each chapter validated before proceeding to next. Quality gates enforced at chapter boundaries. Human approval required before advancing.

*Rationale:* Large-scale generation risks compounding errors. Incremental validation ensures quality. Allows course-correction before investing in dependent content.

**VIII. Smallest Viable Change Principle (NON-NEGOTIABLE)**

Make minimal necessary changes. No unrelated refactoring or "improvements". Focus on requested functionality only. Avoid premature abstraction or over-engineering.

*Rationale:* Scope creep introduces bugs and delays. Simplicity reduces maintenance burden. YAGNI (You Aren't Gonna Need It) prevents wasted effort.

### 3.2 Persona & Agent Strategy

**IX. Multi-Persona Approach**

Different aspects of content creation MUST utilize specialized personas with domain expertise:

**Knowledge Gathering & Validation Persona:**
- **Profile:** Seasoned professor with 20+ years domain knowledge
- **Responsibilities:** Research and gather authoritative information, validate technical accuracy, ensure pedagogical soundness, review content for completeness and correctness
- **Quality Focus:** Accuracy, depth, educational value

**Content Creation & Editorial Persona:**
- **Profile:** Expert book writer/editor/publisher
- **Responsibilities:** Write engaging clear content, maintain consistent tone and voice, structure content for optimal learning flow, edit for readability and engagement
- **Quality Focus:** Clarity, engagement, flow, accessibility

**Persona Invocation:**
- Explicitly invoke appropriate persona for each task
- Personas may collaborate on same content (professor validates, editor polishes)
- Human validates persona outputs before accepting

*Rationale:* Specialized expertise produces better outcomes than generalist approach. Clear role separation ensures comprehensive coverage (accuracy AND engagement).

### 3.3 Reusable Intelligence Design

**X. Reusable Intelligence Mandate**

Design reusable subagents for recurring tasks. Create skills for domain-specific workflows. Document all reusable intelligence thoroughly. Version and maintain reusable components.

*Rationale:* Automation compounds efficiency. Consistent quality through standardized processes. Knowledge preservation across sessions.

### 3.4 Knowledge Gathering Methodologies

**Research Process:**
1. Identify knowledge gaps and research questions
2. Consult multiple authoritative sources (minimum 3)
3. Cross-validate information across sources
4. Document source references
5. Synthesize into educational content
6. Expert persona reviews for accuracy

**Validation Process:**
1. Technical accuracy check (professor persona)
2. Pedagogical effectiveness check (professor persona)
3. Clarity and engagement check (editor persona)
4. Three-source validation completed
5. Human review and approval

**Tools & Techniques:**
- Web search for current information
- Academic database queries
- Official documentation review
- Expert consultation (human-as-tool)
- Peer review process

---

## 4. Technical Architecture Principles

### 4.1 Development Philosophy

**Core Values:**
- **Incremental & Validated:** Build and validate before proceeding
- **Testable & Maintainable:** Automated tests, clear code
- **Secure & Privacy-Conscious:** User data protection paramount
- **Cost-Conscious:** Optimize resource usage within budget

**Technology Selection Criteria:**

When evaluating technologies (in Spec phase), prioritize:
1. Educational value (transferable skills?)
2. Accessibility (affordable for students?)
3. Reliability (mature, documented, maintained?)
4. Integration (works with other tools?)
5. Community (active support available?)
6. Performance (meets requirements?)

### 4.2 Code Quality Principles

- **Readability:** Code written for humans first
- **Modularity:** Single, clear purpose per function/module
- **Documentation:** Purpose, inputs, outputs, side effects documented
- **Error Handling:** Graceful failures with helpful messages
- **Testing:** Critical paths have automated tests (target: 80% coverage)
- **Consistency:** Style enforced by automated linting

---

## 5. Process & Collaboration Principles

### 5.1 Spec-Kit Plus Methodology

**XI. SpecKit Plus Journey (NON-NEGOTIABLE)**

All work MUST follow this journey:

1. **Constitution Phase:** Establish project principles *(this document)*
2. **Specify Phase:** Write detailed feature requirements with acceptance criteria
3. **Plan Phase:** Create architectural design with options, tradeoffs, ADRs
4. **Tasks Phase:** Break down into dependency-ordered, testable tasks
5. **Implement Phase:** Execute with validation against spec

**Phase Gate:** Each phase MUST be validated before proceeding to next.

*Rationale:* Prevents building wrong thing well. Ensures shared understanding before commitment. Documents decisions for future reference.

### 5.2 Execution Contract (Every Request)

For every user request, AI MUST:

1. **Confirm surface and success criteria** (one sentence)
2. **List constraints, invariants, non-goals**
3. **Produce artifact with acceptance checks** (checkboxes or tests where applicable)
4. **Add follow-ups and risks** (max 3 bullets)
5. **Create PHR** in appropriate subdirectory
6. **Suggest ADR if applicable** (wait for consent, never auto-create)

**Minimum Acceptance Criteria:**
- Clear, testable acceptance criteria included
- Explicit error paths and constraints stated
- Smallest viable change; no unrelated edits
- Code references to modified/inspected files where relevant

*Rationale:* Explicit contract ensures alignment. Documentation prevents knowledge loss. Testability enables validation.

### 5.3 Human–AI Collaboration Protocol

**XII. Human-as-Tool Strategy**

Guiding Principle: AI is long-term collaborator, not autonomous executor.

**Decision-Making:**
- **Transparency:** All decisions documented (PHRs, ADRs)
- **Explanation:** AI explains reasoning before acting
- **Validation:** Human validates understanding before implementation
- **Questions Welcome:** AI asks clarifying questions when uncertain

**Human Invocation Required For:**
1. **Ambiguous Requirements:** 2-3 targeted clarifying questions
2. **Architectural Choices:** Present options with tradeoffs
3. **Unforeseen Dependencies:** Surface and ask for prioritization
4. **Milestone Checkpoints:** Summarize progress, confirm next steps

*Rationale:* Human judgment irreplaceable for ambiguity and values. AI excels at execution within clear constraints. Collaboration leverages both strengths.

### 5.4 Documentation Standards

**Prompt History Records (PHRs):**
- Created after every significant user interaction
- Captures verbatim user input and AI response
- Routes to: `history/prompts/constitution/`, `history/prompts/<feature-name>/`, or `history/prompts/general/`
- No placeholders left unfilled
- Uses PHR template when available

**Architecture Decision Records (ADRs):**
- Created for architecturally significant decisions
- **Three-Part Test (ALL must be true):**
  1. **Impact:** Long-term consequences? (framework, data model, API, security, platform)
  2. **Alternatives:** Multiple viable options considered?
  3. **Scope:** Cross-cutting, influences system design?
- AI suggests ADR creation, human approves
- Never auto-created
- Template: Context, Decision, Consequences

**Reusable Intelligence Documentation:**
- Subagents and Skills: purpose, inputs, outputs, examples
- Templates: usage instructions
- All components versioned

---

## 6. Non-Functional Requirements

### 6.1 Performance Standards

- **Content Load Time:** < 2s for 95th percentile users
- **AI Response Time:** < 5s for typical queries
- **Search Response:** < 1s for full-text search
- **Translation Load:** < 3s to switch content language

### 6.2 Reliability Standards

- **Uptime:** 99% for core content
- **Graceful Degradation:** Core content accessible even if features unavailable
- **Data Integrity:** Zero data loss for user data
- **Error Recovery:** Clear messages with recovery suggestions

### 6.3 Security Standards

- **Authentication:** Industry-standard secure auth
- **Data Protection:** Encryption at rest and in transit
- **API Security:** Rate limiting, input validation, CORS policies
- **Secrets Management:** Environment variables only, never hardcoded
- **Least Privilege:** Minimal required permissions

### 6.4 Accessibility Standards

- **WCAG 2.1 AA Compliance:** Minimum target
- **Keyboard Navigation:** Full functionality without mouse
- **Screen Reader Support:** Semantic HTML, proper ARIA labels
- **Color Contrast:** Meets AA standards
- **Responsive Design:** Works on mobile, tablet, desktop

### 6.5 Internationalization Standards

- **Primary Language:** English
- **Secondary Languages:** Defined in Spec phase
- **Translation Quality:** Native speaker review required
- **Technical Terms:** Maintain source terms with translations where appropriate
- **Cultural Adaptation:** Examples work across cultural contexts

---

## 7. Quality Gates

### 7.1 Content Quality Gate

**Before Publishing Any Content:**
- [ ] All structural requirements met (hook, question, example, etc.)
- [ ] 70% practical / 30% theory balance maintained
- [ ] Diagrams and flows included for key concepts
- [ ] Expert insights, tips, and common pitfalls included
- [ ] AI learning prompts provided
- [ ] Self-evaluation questions with references included
- [ ] Assignment with clear success criteria included
- [ ] All jargon defined before use
- [ ] Tone standards met (soft, polite, lightly humorous)
- [ ] **Three-source validation completed**
- [ ] Technical accuracy verified (professor persona review)
- [ ] Clarity and engagement verified (editor persona review)
- [ ] Readability appropriate for complete beginners

### 7.2 Code Quality Gate

**Before Merging Any Code:**
- [ ] Tests pass (minimum 80% coverage for critical paths)
- [ ] Linting passes (no errors, warnings addressed)
- [ ] Security scan passes (no high/critical vulnerabilities)
- [ ] Documentation complete
- [ ] Code reviewed and validated
- [ ] No hardcoded secrets

### 7.3 Deployment Quality Gate

**Before Production Deployment:**
- [ ] All quality gates passed
- [ ] Staging environment validated
- [ ] Performance benchmarks met
- [ ] Security checklist completed
- [ ] Rollback plan documented
- [ ] Monitoring and alerts configured

---

## 8. Risk Management Principles

### 8.1 Risk Categories

**Learning Experience Risks:**
- Content too advanced for target audience
- Examples not relatable
- Translation quality poor

**Technical Risks:**
- AI assistance inaccurate
- Feature complexity exceeds capacity
- Dependency breaking changes

**Project Risks:**
- Scope creep
- Quality inconsistency
- Technology choice regret

### 8.2 Risk Mitigation Standards

- **Early Validation:** Test with target demographic
- **Incremental Delivery:** Validate each phase before proceeding
- **Monitoring:** Track metrics, adjust based on data
- **Graceful Degradation:** Core value maintained if features fail
- **Rollback Plans:** All major changes have rollback procedures

---

## 9. Governance & Change Management

### 9.1 Constitution Governance

- Constitution changes require explicit human approval
- Changes documented via PHR in `constitution/` directory
- Impact assessment required for major changes
- Version history maintained

### 9.2 Architectural Governance

- Significant architectural changes require ADR
- AI suggests ADR creation; human approves and reviews
- ADRs linked in relevant specs and plans
- Three-part test enforced (Impact + Alternatives + Scope)

### 9.3 Feature Governance

- New features follow full Spec-Kit Plus journey
- Changes to existing features documented via PHRs
- Breaking changes require migration plan
- Backward compatibility preferred when feasible

---

## 10. Appendices

### 10.1 SpecKit Plus Alignment Checklist

This Constitution aligns with SpecKit Plus by:
- [x] Defining clear project principles and values
- [x] Establishing quality standards
- [x] Requiring Constitution → Spec → Plan → Tasks → Implement journey
- [x] Mandating PHR creation for all significant interactions
- [x] Enforcing ADR suggestions for architectural decisions
- [x] Emphasizing smallest viable change
- [x] Implementing human-as-tool strategy
- [x] Requiring execution contract for every request

### 10.2 Claude Code Rules Alignment Checklist

This Constitution aligns with Claude Code rules by:
- [x] PHR creation after every user message
- [x] PHR routing (constitution/, <feature-name>/, general/)
- [x] ADR suggestions (never auto-create)
- [x] MCP tools as first-class for discovery/verification
- [x] CLI interactions preferred over assumptions
- [x] Smallest viable change mandate
- [x] Clarify and plan first
- [x] Human-as-tool for ambiguity/decisions
- [x] No invented APIs, data, or contracts
- [x] No hardcoded secrets
- [x] Code references with precision

### 10.3 Glossary

**Constitution:** Project principles, values, and standards document

**PHR (Prompt History Record):** Documentation of user interactions

**ADR (Architecture Decision Record):** Documentation of significant architectural decisions

**SpecKit Plus:** Methodology for spec-driven development (Constitution → Spec → Plan → Tasks → Implement)

**Persona:** Specialized AI role with domain expertise for specific tasks

**Three-Source Validation:** Requirement to verify claims against 3+ authoritative sources

**Smallest Viable Change:** Make minimal necessary changes, avoid scope creep

**Human-as-Tool:** Strategy where AI invokes human judgment for ambiguity and decisions

---

**Version**: 1.0.0 | **Ratified**: 2025-11-30 | **Last Amended**: 2025-11-30
