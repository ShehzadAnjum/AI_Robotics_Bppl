---
id: 0001
title: Project constitution initial ratification
stage: constitution
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: anjum
command: /sp.constitution
labels: ["constitution", "initial", "ratification", "pedagogy", "automation", "persona-strategy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

I am starting a brand new project called "Physical AI & Humanoid Robotics"

High-level requirements

1. writing a book using Docusaurus, Playwright, Context7 and deploy it to GitHub Pages.
2. In Second Phase must build and embed a Retrieval-Augmented Generation (RAG) chatbot that can:
   a) Answer questions about the whole book.
   b) Answer questions based only on user-selected text.
   It should use:

   * OpenAI Agents / ChatKit SDKs
   * FastAPI backend
   * Neon Serverless Postgres
   * Qdrant Cloud (free tier)

3. In Thrid Phase
   * Design and use reusable intelligence via Claude Code Subagents and Skills.
   * Implement Signup / Signin using better-auth and ask users about their software and hardware background.
   * Let logged-in users personalize chapter content via a button at the start of each chapter.
   * Let logged-in users translate chapter content to Urdu via a button at the start of each chapter.

Process constraint:
strictly follow a Spec-Kit Plus style journey inside Claude Code from Constitution phase till Implement phase along with Designing and using reusable intelligence throughout

I am treating you as my long-term AI collaborator. I want to build the system step by step through human–AI conversation and with clear understanding of every single piece.

Right now we need to clarify and explain with clarity the Constitution

Start by doing::

1. Restate the product vision including constraints and success criteria.
2. Propose the structure and contents of a "Project Constitution v1" document for this project.

   * It should define:
     a) Project scope and goals.
     b) Quality rules for Quality Book chapters and docs writing
     c) Every chapter and topic shall start with an attentions seeker phrases and with an question that force the user to read further to get answers
     d) The formulation of chapters and topics shall start with a real life example and than teach the topic referring to the earlier given example to have a clear and fair understand about the chapter/topic

[Multiple refinement iterations with user feedback on tone (soft, polite, humorous), target audience (complete beginners), pedagogy (simulation-first → generic → specific hardware), practical-first balance (70% hands-on / 30% theory), multi-persona approach (professor for validation, editor for writing), and three-source validation requirement]

## Response snapshot

Successfully created comprehensive Project Constitution v1.0.0 ratified on 2025-11-30.

**Key Principles Established:**

**Content & Pedagogy (Section 2):**
- I. Curiosity-Driven Learning: Maintain engagement, prevent interest loss through hooks and appropriate humor
- II. Example-First Teaching: Real-world scenarios precede abstract theory
- III. Practical-First Balance: 70% hands-on / 30% theory
- IV. Simulation-First Progression: Simulation → Generic tech → Specific hardware
- V. Scaffolded Learning: Incremental complexity with self-evaluation checkpoints
- VI. Three-Source Validation Rule (NON-NEGOTIABLE): All technical claims validated against 3+ authoritative sources

**Automation & Intelligence (Section 3):**
- VII. Chapter-by-Chapter Generation: Incremental content creation with quality gates
- VIII. Smallest Viable Change (NON-NEGOTIABLE): Minimal necessary changes, no scope creep
- IX. Multi-Persona Approach: Professor persona (validation, accuracy) + Editor persona (writing, engagement)
- X. Reusable Intelligence Mandate: Design subagents, skills, templates for recurring tasks

**Process & Collaboration (Section 5):**
- XI. SpecKit Plus Journey (NON-NEGOTIABLE): Constitution → Spec → Plan → Tasks → Implement
- XII. Human-as-Tool Strategy: AI invokes human for ambiguity, architectural choices, dependencies, checkpoints

**Quality Standards:**
- 12-element structural requirements for every learning unit (hook, question, example, use case, teaching, diagrams, expert insights, AI prompts, practice, self-eval, assignment, next hook)
- Tone: Soft, polite, lightly humorous, conversational, encouraging
- Visuals: Diagrams required for abstract concepts, consistent color coding, accessibility standards
- Target audience: Complete beginners (no prerequisites assumed, foundational content included)

**Governance:**
- Constitution changes require human approval
- ADRs for architectural decisions (three-part test: Impact + Alternatives + Scope)
- PHRs for all significant interactions
- Version 1.0.0 | Ratified 2025-11-30

## Outcome

- ✅ Impact: Constitution v1.0.0 ratified, establishing all project principles, quality standards, and process protocols. Ready to proceed to Specify phase.
- 🧪 Tests: No tests (documentation artifact)
- 📁 Files: Created .specify/memory/constitution.md (569 lines, 12 core principles, 10 sections)
- 🔁 Next prompts: Move to Specify phase - define Phase 1 features (book platform, chapter structure, tech stack selection)
- 🧠 Reflection: Constitution successfully balances pedagogical rigor (example-first, practical-first, simulation-first) with process discipline (SpecKit Plus, smallest viable change, human-as-tool). Multi-persona approach and three-source validation ensure both engagement and accuracy. Clear quality gates enable incremental content generation.

## Evaluation notes (flywheel)

- Failure modes observed: Initial draft too tech-specific (included Phase 1/2/3 details, tech stack choices) - corrected to pure principles. Template structure required significant expansion beyond 6 principles to capture comprehensive educational platform requirements.
- Graders run and results (PASS/FAIL): SpecKit Plus alignment: PASS, Claude Code rules alignment: PASS, Constitution purity (principles not implementation): PASS after revision
- Prompt variant (if applicable): Standard /sp.constitution workflow with iterative human refinement
- Next experiment (smallest change to try): Create chapter content template in Specify phase to operationalize 12-element structural requirements
