---
description: "Task list for Core Book Platform feature implementation - Sequential Chapter Development Model"
---

# Tasks: Core Book Platform

**Input**: Design documents from `/specs/001-book-platform/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Execution Model**: Three-phase sequential development
- **Phase Group A**: Architecture & Planning (NO CONTENT)
- **Phase Group B**: Writing & Research (FIRST 3 CHAPTERS ONLY)
- **Phase Group C**: Intelligence & Interactivity (AFTER 3 CHAPTERS)

**Critical Constraints**:
- NO writing during Phase Group A
- Chapters are SEQUENTIAL, not parallel
- Content phase limited to 3 chapters only
- RAG/chatbot systems AFTER content, not before

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

# PHASE GROUP A — ARCHITECTURE & PLANNING (NO CONTENT)

**Purpose**: Define book structure, rules, and architecture WITHOUT writing any content

**⚠️ CRITICAL**: NO research, NO writing, NO citations during this phase
**✅ ALLOWED**: Structure, planning, tooling, architecture

---

## Phase A1: Book Architecture Definition

**Purpose**: Lock book structure and learning design BEFORE any content creation

### Chapter Index & Topic Mapping (BLOCKING TASK)

- [ ] T001 **[BLOCKING]** Create comprehensive chapter index in specs/001-book-platform/chapter-index.md with chapter numbers, names, topics (NO sub-topics, NO content, NO explanations - structure only)

**Required output format**:
```markdown
Chapter 1: Introduction to Physical AI
- Robotics vs Physical AI
- Embodied Intelligence
- Simulation-first philosophy

Chapter 2: ROS2 Fundamentals
- Nodes & topics
- Message passing
- Launch systems

[...12-15 total chapters]
```

### Book Scope & Audience Definition

- [ ] T002 Define target audience profile and prerequisite knowledge in specs/001-book-platform/audience.md
- [ ] T003 [P] Define learning objectives per chapter tier (foundational, robotics, advanced) in specs/001-book-platform/learning-objectives.md
- [ ] T004 [P] Lock style system (tone, voice, humor level, formality) in specs/001-book-platform/style-guide.md
- [ ] T005 Document simulation-first pedagogical strategy in specs/001-book-platform/pedagogy.md
- [ ] T006 Lock toolchain decisions (ROS2 only, Gazebo only, Python 3.10+) in specs/001-book-platform/toolchain.md

### Educational Flow Design

- [ ] T007 Design chapter dependency graph (which chapters require which prerequisites) in specs/001-book-platform/chapter-dependencies.md
- [ ] T008 [P] Define hands-on project distribution across chapters (which chapter gets which project type) in specs/001-book-platform/project-mapping.md
- [ ] T009 [P] Create difficulty progression curve (beginner → intermediate pacing strategy) in specs/001-book-platform/difficulty-curve.md

**Checkpoint**: Book architecture locked - NO CONTENT EXISTS YET

---

## Phase A2: Platform Infrastructure Setup

**Purpose**: Build technical infrastructure WITHOUT content

### Docusaurus Project Initialization

- [ ] T010 Create Docusaurus 3.6.x project with Node 18.x LTS dependencies in project root
- [ ] T011 [P] Configure package.json with required scripts (start, build, serve, test, deploy)
- [ ] T012 [P] Initialize Git repository and create .gitignore for node_modules and build artifacts
- [ ] T013 [P] Create initial project structure (docs/, src/, static/, tests/ directories)
- [ ] T014 Configure ESLint and Prettier for code quality in .eslintrc.js and .prettierrc

### Docusaurus Configuration

- [ ] T015 Configure docusaurus.config.js with site metadata, theme, plugins (PWA, Mermaid, search)
- [ ] T016 [P] Configure sidebars.js based on chapter-index.md structure (foundational, robotics, advanced categories)
- [ ] T017 [P] Setup PWA plugin for offline reading capability in docusaurus.config.js
- [ ] T018 [P] Configure Mermaid plugin for code-based diagrams in docusaurus.config.js
- [ ] T019 Setup GitHub Pages deployment configuration in docusaurus.config.js

### React Components (12-Element Structure)

- [ ] T020 [P] Create CuriosityHook component in src/components/CuriosityHook.tsx
- [ ] T021 [P] Create DrivingQuestion component in src/components/DrivingQuestion.tsx
- [ ] T022 [P] Create AIPromptCard component in src/components/AIPromptCard.tsx
- [ ] T023 [P] Create AssignmentCard component in src/components/AssignmentCard.tsx
- [ ] T024 [P] Create SelfEvalQuestion component in src/components/SelfEvalQuestion.tsx
- [ ] T025 Create component exports index file in src/components/index.ts

### Templates and Contracts

- [ ] T026 Create chapter-template.mdx with all 12 structural elements in .specify/templates/
- [ ] T027 [P] Create validation-checklist.md template for three-source validation in .specify/templates/
- [ ] T028 [P] Copy chapter-structure.contract.md to .specify/templates/
- [ ] T029 [P] Copy project-structure.contract.md to .specify/templates/
- [ ] T030 Create multi-persona workflow guide (professor → editor) in .specify/workflows/chapter-creation-workflow.md

### Examples Repository Setup

- [ ] T031 Create robotics-book-examples repository on GitHub (separate from main content repo)
- [ ] T032 [P] Initialize ROS2 workspace structure in examples repo (src/, launch/, worlds/, models/, config/)
- [ ] T033 [P] Create examples repo README.md with setup instructions per ADR-0005
- [ ] T034 [P] Setup colcon build infrastructure in examples repo with package.xml
- [ ] T035 Create .gitignore for ROS2 build artifacts (build/, install/, log/) in examples repo

### Test Infrastructure

- [ ] T036 Install Playwright testing framework dependencies via npm
- [ ] T037 [P] Create Playwright config file (playwright.config.ts) with browser and device targets
- [ ] T038 [P] Create chapter-structure.spec.ts test for 12-element validation in tests/content-quality/
- [ ] T039 [P] Create links.spec.ts test for broken link detection in tests/content-quality/
- [ ] T040 [P] Create search.spec.ts test for <30s topic discovery (SC-014) in tests/navigation/
- [ ] T041 [P] Create load-time.spec.ts test for <2s page load (SC-012) in tests/performance/
- [ ] T042 [P] Create devices.spec.ts test for responsive design (SC-013) in tests/responsive/
- [ ] T043 Setup Lighthouse CI configuration file (lighthouserc.js) with performance budgets

### CI/CD Pipeline

- [ ] T044 Create GitHub Actions workflow for CI in .github/workflows/ci.yml (run tests on PR)
- [ ] T045 [P] Create GitHub Actions workflow for deployment in .github/workflows/deploy.yml (deploy to GitHub Pages on main push)
- [ ] T046 Create README.md with project overview and setup instructions in project root

**Checkpoint**: Phase Group A Complete - Architecture and infrastructure ready, NO CONTENT WRITTEN

---

# PHASE GROUP B — WRITING & RESEARCH (CONTENT STARTS HERE)

**Purpose**: Write FIRST 3 CHAPTERS ONLY using sequential chapter pipeline

**⚠️ CRITICAL**: Chapters are SEQUENTIAL (one completes before next starts), NOT parallel
**⚠️ SCOPE LIMIT**: Only chapters 1-3 in this phase - remaining chapters BLOCKED

**Chapter Pipeline (Applied to Each Chapter)**:
1. Research (Professor Persona)
2. Outline (Professor Persona)
3. Write (Editor Persona)
4. Review (Human + Automated)
5. Correct (Editor Persona)
6. Validate (Quality Gates)

---

## Phase B1: Chapter 1 - Introduction to Physical AI

**Goal**: Complete Chapter 1 using full 6-step pipeline before starting Chapter 2

**Chapter Type**: Foundational (no ROS2 required)

### Step 1: Research (Professor Persona)

- [ ] T047 [CH1] Research Chapter 1 topics from 3+ authoritative sources (professor persona) - document in specs/001-book-platform/research-docs/chapter-1-research.md
- [ ] T048 [CH1] Create validation checklist for Chapter 1 with source citations in specs/001-book-platform/validation-checklists/chapter-1-validation.md

### Step 2: Outline (Professor Persona)

- [ ] T049 [CH1] Create detailed Chapter 1 outline mapping 12 structural elements to validated research in specs/001-book-platform/outlines/chapter-1-outline.md

### Step 3: Write (Editor Persona)

- [ ] T050 [CH1] Write Chapter 1 introduction (elements 1-2: curiosity hook, driving question) in docs/foundations/intro-physical-ai.md
- [ ] T051 [CH1] Write Chapter 1 teaching content (elements 3-7: example, use case, teaching, diagrams, expert insights) in docs/foundations/intro-physical-ai.md
- [ ] T052 [CH1] Write Chapter 1 learning activities (elements 8-9: AI prompts, practice) in docs/foundations/intro-physical-ai.md
- [ ] T053 [CH1] Write Chapter 1 assessment (elements 10-11: self-eval, assignment) in docs/foundations/intro-physical-ai.md
- [ ] T054 [CH1] Write Chapter 1 closing (element 12: next chapter hook) in docs/foundations/intro-physical-ai.md
- [ ] T055 [CH1] Add Chapter 1 references section with 3+ citations in docs/foundations/intro-physical-ai.md

### Step 4: Review (Automated + Human)

- [ ] T056 [CH1] Run Playwright tests on Chapter 1 to validate 12-element structure compliance
- [ ] T057 [CH1] Verify Chapter 1 has 3+ authoritative sources cited in References section
- [ ] T058 [CH1] Human review: Verify tone is soft, polite, lightly humorous per FR-010
- [ ] T059 [CH1] Human review: Manually verify 70/30 practical/theory balance

### Step 5: Correct (Editor Persona)

- [ ] T060 [CH1] Apply corrections from review feedback to Chapter 1 in docs/foundations/intro-physical-ai.md

### Step 6: Validate (Quality Gates)

- [ ] T061 [CH1] Final validation: Test Chapter 1 jargon is defined before use (FR-005)
- [ ] T062 [CH1] Final validation: Verify Chapter 1 passes all Playwright structure tests
- [ ] T063 [CH1] Mark Chapter 1 as COMPLETE - ready for students

**Checkpoint**: Chapter 1 COMPLETE - Proceed to Chapter 2

---

## Phase B2: Chapter 2 - Electronics Basics

**Goal**: Complete Chapter 2 using full 6-step pipeline before starting Chapter 3

**Chapter Type**: Foundational (no ROS2 required)

### Step 1: Research (Professor Persona)

- [ ] T064 [CH2] Research Chapter 2 topics from 3+ authoritative sources (professor persona) - document in specs/001-book-platform/research-docs/chapter-2-research.md
- [ ] T065 [CH2] Create validation checklist for Chapter 2 with source citations in specs/001-book-platform/validation-checklists/chapter-2-validation.md

### Step 2: Outline (Professor Persona)

- [ ] T066 [CH2] Create detailed Chapter 2 outline mapping 12 structural elements to validated research in specs/001-book-platform/outlines/chapter-2-outline.md

### Step 3: Write (Editor Persona)

- [ ] T067 [CH2] Write Chapter 2 introduction (elements 1-2) in docs/foundations/electronics-basics.md
- [ ] T068 [CH2] Write Chapter 2 teaching content (elements 3-7) in docs/foundations/electronics-basics.md
- [ ] T069 [CH2] Write Chapter 2 learning activities (elements 8-9) in docs/foundations/electronics-basics.md
- [ ] T070 [CH2] Write Chapter 2 assessment (elements 10-11) in docs/foundations/electronics-basics.md
- [ ] T071 [CH2] Write Chapter 2 closing (element 12) in docs/foundations/electronics-basics.md
- [ ] T072 [CH2] Add Chapter 2 references section with 3+ citations in docs/foundations/electronics-basics.md

### Step 4: Review (Automated + Human)

- [ ] T073 [CH2] Run Playwright tests on Chapter 2 to validate 12-element structure compliance
- [ ] T074 [CH2] Verify Chapter 2 has 3+ authoritative sources cited
- [ ] T075 [CH2] Human review: Verify tone compliance (FR-010)
- [ ] T076 [CH2] Human review: Verify 70/30 practical/theory balance

### Step 5: Correct (Editor Persona)

- [ ] T077 [CH2] Apply corrections from review feedback to Chapter 2 in docs/foundations/electronics-basics.md

### Step 6: Validate (Quality Gates)

- [ ] T078 [CH2] Final validation: Test jargon definitions (FR-005)
- [ ] T079 [CH2] Final validation: Verify Chapter 2 passes all Playwright tests
- [ ] T080 [CH2] Mark Chapter 2 as COMPLETE

**Checkpoint**: Chapter 2 COMPLETE - Proceed to Chapter 3

---

## Phase B3: Chapter 3 - Programming Basics

**Goal**: Complete Chapter 3 using full 6-step pipeline - FINAL chapter in content phase

**Chapter Type**: Foundational (no ROS2 required)

### Step 1: Research (Professor Persona)

- [ ] T081 [CH3] Research Chapter 3 topics from 3+ authoritative sources (professor persona) - document in specs/001-book-platform/research-docs/chapter-3-research.md
- [ ] T082 [CH3] Create validation checklist for Chapter 3 with source citations in specs/001-book-platform/validation-checklists/chapter-3-validation.md

### Step 2: Outline (Professor Persona)

- [ ] T083 [CH3] Create detailed Chapter 3 outline mapping 12 structural elements to validated research in specs/001-book-platform/outlines/chapter-3-outline.md

### Step 3: Write (Editor Persona)

- [ ] T084 [CH3] Write Chapter 3 introduction (elements 1-2) in docs/foundations/programming-basics.md
- [ ] T085 [CH3] Write Chapter 3 teaching content (elements 3-7) in docs/foundations/programming-basics.md
- [ ] T086 [CH3] Write Chapter 3 learning activities (elements 8-9) in docs/foundations/programming-basics.md
- [ ] T087 [CH3] Write Chapter 3 assessment (elements 10-11) in docs/foundations/programming-basics.md
- [ ] T088 [CH3] Write Chapter 3 closing (element 12) in docs/foundations/programming-basics.md
- [ ] T089 [CH3] Add Chapter 3 references section with 3+ citations in docs/foundations/programming-basics.md

### Step 4: Review (Automated + Human)

- [ ] T090 [CH3] Run Playwright tests on Chapter 3 to validate 12-element structure compliance
- [ ] T091 [CH3] Verify Chapter 3 has 3+ authoritative sources cited
- [ ] T092 [CH3] Human review: Verify tone compliance (FR-010)
- [ ] T093 [CH3] Human review: Verify 70/30 practical/theory balance

### Step 5: Correct (Editor Persona)

- [ ] T094 [CH3] Apply corrections from review feedback to Chapter 3 in docs/foundations/programming-basics.md

### Step 6: Validate (Quality Gates)

- [ ] T095 [CH3] Final validation: Test jargon definitions (FR-005)
- [ ] T096 [CH3] Final validation: Verify Chapter 3 passes all Playwright tests
- [ ] T097 [CH3] Mark Chapter 3 as COMPLETE

**Checkpoint**: Chapters 1-3 COMPLETE - Phase Group B finished - Ready for Phase Group C

---

## Phase B4: Diagrams and Assets for Chapters 1-3

**Purpose**: Create visual assets for first 3 chapters

- [ ] T098 [P] Create Chapter 1 diagrams (Physical AI concepts, embodiment) in static/img/foundations/
- [ ] T099 [P] Create Chapter 2 diagrams (circuit diagrams, sensors, actuators) in static/img/foundations/
- [ ] T100 [P] Create Chapter 3 diagrams (programming flowcharts, Python basics) in static/img/foundations/

---

## Phase B5: Assignments and Starter Code for Chapters 1-3

**Purpose**: Create hands-on assignments for first 3 chapters

- [ ] T101 [P] Create starter code for Chapter 1 assignment (simulation intro exercise) in robotics-book-examples/assignments/chapter-1/
- [ ] T102 [P] Create starter code for Chapter 2 assignment (basic circuit simulation) in robotics-book-examples/assignments/chapter-2/
- [ ] T103 [P] Create starter code for Chapter 3 assignment (Python basics with ROS2 prep) in robotics-book-examples/assignments/chapter-3/

---

## Phase B6: Deployment and Initial Launch

**Purpose**: Deploy first 3 chapters to GitHub Pages

- [ ] T104 Configure GitHub Pages deployment URL in docusaurus.config.js
- [ ] T105 [P] Test manual deployment with `npm run deploy` command
- [ ] T106 Verify automatic deployment via GitHub Actions on push to main branch
- [ ] T107 Run full Playwright test suite on deployed site
- [ ] T108 Run Lighthouse CI performance tests (target: <2s load time per SC-012)

**Checkpoint**: Phase Group B COMPLETE - First 3 chapters deployed and accessible

---

# PHASE GROUP C — INTELLIGENCE & INTERACTIVITY (AFTER 3 CHAPTERS)

**Purpose**: Add intelligent systems AFTER foundational content exists

**⚠️ CRITICAL**: This phase ONLY activates AFTER chapters 1-3 are complete and deployed
**Rationale**: RAG and chatbots need content to index - can't build intelligence before content exists

---

## Phase C1: Content Embeddings and Semantic Search

**Purpose**: Create semantic search infrastructure over existing chapters

- [ ] T109 Generate embeddings for chapters 1-3 using OpenAI/Anthropic embedding models
- [ ] T110 [P] Setup vector database (Pinecone, Weaviate, or Upstash Vector) for chapter embeddings
- [ ] T111 [P] Create embedding indexing pipeline for future chapters in .specify/scripts/generate-embeddings.ts
- [ ] T112 Test semantic search across chapters 1-3 (verify retrieval quality)

---

## Phase C2: RAG Chatbot System

**Purpose**: Build AI assistant for student questions using RAG over chapter content

- [ ] T113 Design RAG chatbot architecture (Context7 integration per ADR on MCP services) in specs/001-book-platform/rag-architecture.md
- [ ] T114 [P] Implement retrieval system (query → embeddings → top-k chapters) in src/rag/retrieval.ts
- [ ] T115 [P] Implement prompt template for RAG responses (use chapter context + user question) in src/rag/prompts.ts
- [ ] T116 Create chatbot UI component in src/components/RAGChatbot.tsx
- [ ] T117 Integrate Context7 MCP service for user conversation history tracking
- [ ] T118 Test chatbot responses against 10 sample student questions per chapter

---

## Phase C3: Claude Code Subagents and Skills

**Purpose**: Create reusable AI agents for content generation and quality

- [ ] T119 Create professor-researcher skill in .claude/skills/professor-researcher.md for chapter research workflow
- [ ] T120 [P] Create editor-writer skill in .claude/skills/editor-writer.md for chapter writing workflow
- [ ] T121 [P] Create quality-auditor skill in .claude/skills/quality-auditor.md for validation checks
- [ ] T122 Test multi-persona workflow on sample Chapter 4 (dry run, don't publish)
- [ ] T123 Document agent workflow in .specify/workflows/multi-agent-content-creation.md

---

## Phase C4: Intelligent Chapter Navigation

**Purpose**: Add semantic navigation beyond linear chapter order

- [ ] T124 Create prerequisite recommendation system (student at Chapter X → what to review?) in src/features/prereq-navigator.ts
- [ ] T125 [P] Create concept graph linking related topics across chapters in src/features/concept-graph.ts
- [ ] T126 [P] Add "Related Topics" section to each chapter using concept graph
- [ ] T127 Test navigation recommendations with 5 user journeys

---

## Phase C5: Docker Testing Environment (Deferred from Phase B)

**Purpose**: Setup ROS2 Docker testing for assignment validation

### Docker Environment Setup

- [ ] T128 Create Dockerfile with ROS2 Humble base image in robotics-book-examples/docker/
- [ ] T129 [P] Add Gazebo Sim to Docker image and configure X11 forwarding in Dockerfile
- [ ] T130 [P] Create docker-compose.yml for local testing in robotics-book-examples/
- [ ] T131 Test Docker environment on Linux/Windows/macOS (verify ROS2 + Gazebo launch)
- [ ] T132 Integrate Docker tests into GitHub Actions CI for examples repo in robotics-book-examples/.github/workflows/test-examples.yml

---

## Phase C6: Polish and Documentation

**Purpose**: Final quality improvements across all systems

- [ ] T133 [P] Update README.md with RAG chatbot usage instructions
- [ ] T134 [P] Create CONTRIBUTING.md with content creation workflow (multi-persona, RAG integration)
- [ ] T135 [P] Update quickstart.md with Docker setup for ROS2 assignments
- [ ] T136 Add JSDoc comments to all React components and TypeScript files
- [ ] T137 [P] Create example validation checklist for completed chapter in specs/001-book-platform/validation-checklists/example.md
- [ ] T138 Code cleanup: Remove TODO comments, unused imports, dead code
- [ ] T139 Final Playwright test suite run (100% pass rate required)
- [ ] T140 Final Lighthouse CI run (verify <2s load time maintained with chatbot)
- [ ] T141 Create developer documentation for RAG system maintenance in docs/DEVELOPMENT.md

**Checkpoint**: Phase Group C COMPLETE - Intelligent book platform with 3 chapters, RAG chatbot, semantic search, and agent workflows

---

# EXECUTION STRATEGY

## Phase Group Sequencing (STRICT ORDER)

1. **Phase Group A** (T001-T046): Architecture & Planning
   - **Duration**: 1-2 weeks
   - **Outcome**: Structure locked, infrastructure ready, NO CONTENT
   - **Gate**: Cannot proceed to Phase B until complete

2. **Phase Group B** (T047-T108): Writing & Research (3 CHAPTERS ONLY)
   - **Duration**: 4-6 weeks (sequential chapters)
   - **Outcome**: Chapters 1-3 deployed and accessible
   - **Gate**: Cannot proceed to Phase C until deployed

3. **Phase Group C** (T109-T141): Intelligence & Interactivity
   - **Duration**: 2-3 weeks
   - **Outcome**: RAG chatbot, semantic search, agent workflows
   - **Final State**: Intelligent platform ready for Chapter 4+ expansion

---

## Critical Execution Rules

### ⚠️ HARD CONSTRAINTS

1. **NO WRITING IN PHASE A** - Architecture only, zero content
2. **CHAPTER INDEX FIRST** - T001 blocks everything
3. **SEQUENTIAL CHAPTERS** - Chapter 2 starts AFTER Chapter 1 complete
4. **3 CHAPTER LIMIT** - Chapters 4-15 BLOCKED in this iteration
5. **RAG AFTER CONTENT** - Phase C activates AFTER Phase B complete
6. **ROS2 ONLY** - No ROS1, no vendor-specific frameworks
7. **SIMULATION ONLY** - No hardware scope in Phase Groups A-C
8. **ONE CHAPTER PIPELINE** - Research → Outline → Write → Review → Correct → Validate

### ✅ EXECUTION ORDER

**Phase A: Architecture (T001-T046)**
- T001 is BLOCKING for all other tasks
- Infrastructure tasks (T010-T046) can parallelize after T001 complete
- Phase A has NO dependencies on Phase B or C

**Phase B: Content (T047-T108)**
- Chapter 1 (T047-T063) → Chapter 2 (T064-T080) → Chapter 3 (T081-T097) SEQUENTIAL
- Diagrams (T098-T100) and starter code (T101-T103) can parallelize AFTER all chapters drafted
- Deployment (T104-T108) happens AFTER chapters 1-3 validated

**Phase C: Intelligence (T109-T141)**
- ALL tasks depend on Phase B deployment (T108)
- Embeddings (T109-T112) BEFORE chatbot (T113-T118)
- Docker (T128-T132) can parallelize with navigation (T124-T127)

---

## Parallel Opportunities (Within Constraints)

**Phase A Infrastructure** (After T001 complete):
- Docusaurus config: T015-T019 (5 tasks)
- React components: T020-T024 (5 tasks)
- Templates: T026-T030 (5 tasks)
- Examples repo: T031-T035 (5 tasks)
- Test files: T036-T043 (8 tasks)

**Phase B Assets** (After chapters drafted):
- Diagrams: T098-T100 (3 tasks)
- Starter code: T101-T103 (3 tasks)

**Phase C Intelligence** (After T108 deployment):
- Vector DB setup: T110 (parallel with T109 embeddings)
- RAG components: T114-T115 (parallel after T113)
- Agent skills: T120-T121 (parallel after T119)
- Docker setup: T129-T130 (parallel after T128)

---

## MVP Definition (Minimum Viable Product)

**Scope**: Phase Groups A + B only
**Tasks**: T001-T108 (108 tasks)
**Duration**: 5-8 weeks
**Deliverable**:
- ✅ Docusaurus platform deployed
- ✅ 3 foundational chapters live
- ✅ All quality gates passing
- ✅ Students can start learning
- ❌ No RAG chatbot yet (Phase C)
- ❌ No ROS2 chapters yet (future)

---

## Notes

- **[CH1]**, **[CH2]**, **[CH3]** labels indicate chapter-specific tasks
- **[P]** marker indicates parallelizable within phase constraints
- Each chapter follows strict 6-step pipeline: Research → Outline → Write → Review → Correct → Validate
- Phase Group C (Intelligence) is OPTIONAL for MVP but REQUIRED before adding chapters 4-15
- **CRITICAL**: Chapters 4-15 are OUT OF SCOPE for this iteration - require separate planning
- Multi-persona workflow: Professor (research, outline) → Editor (write, correct) → Human (review, validate)
- Three-source validation: Every technical claim must cite 3+ authoritative sources
- 12-element structure: Enforced via Playwright tests for every chapter
- No solution keys: Assignments and self-eval have NO answers (FR-013a, FR-016a)
