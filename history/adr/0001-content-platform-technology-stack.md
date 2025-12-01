# ADR-0001: Content Platform Technology Stack

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2025-11-30
- **Feature:** 001-book-platform (Core Book Platform)
- **Context:** Building an interactive educational book platform for Physical AI & Humanoid Robotics targeting complete beginners with 12-15 chapters. Required: fast page loads (<2s), offline reading capability, responsive design, GitHub-based deployment, minimal infrastructure complexity, support for interactive MDX components.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security? ✅ YES - Defines entire platform foundation
     2) Alternatives: Multiple viable options considered with tradeoffs? ✅ YES - Next.js, VuePress, GitBook, custom solution
     3) Scope: Cross-cutting concern (not an isolated detail)? ✅ YES - Affects all development, deployment, content creation
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

**Adopt Docusaurus 3.6.x as the integrated content platform stack with the following components:**

- **Static Site Generator:** Docusaurus 3.6.x (React-based, MDX support)
- **Runtime:** Node.js 18.x LTS or 20.x LTS
- **Content Format:** MDX (Markdown + JSX for interactive components)
- **Deployment:** GitHub Pages (free, version-controlled, automatic CI/CD)
- **Offline Support:** Docusaurus PWA plugin with service workers
- **Search:** Built-in local search (offline-capable) or optional Algolia DocSearch
- **Diagrams:** Mermaid.js (code-based) + Excalidraw (hand-drawn) integrated via plugins
- **Testing:** Playwright (content quality) + Lighthouse CI (performance)

**Integrated as a cohesive stack** - these technologies were chosen together because they work seamlessly and would likely change together if requirements shift.

## Consequences

### Positive

- **Built-in Educational Features:** Docusaurus designed for documentation/education with sidebar navigation, versioning, blog, MDX support out-of-box
- **Zero Infrastructure Cost:** GitHub Pages free hosting, no servers to manage, automatic SSL
- **Offline Capability:** PWA plugin enables offline reading (FR-040 compliance) with minimal configuration
- **Fast Performance:** Static generation achieves <2s load time (SC-012) easily; incremental builds keep CI/CD under 5 minutes
- **Interactive Content:** MDX allows custom React components (CuriosityHook, AIPromptCard, etc.) while keeping content in Markdown
- **Version Control:** Content in Git repository enables collaborative editing, review workflows, change tracking
- **Responsive by Default:** Docusaurus themes are mobile-first and WCAG AA compliant
- **Large Ecosystem:** Active community, extensive plugin ecosystem, frequent updates
- **Low Learning Curve:** Maintainers only need Markdown knowledge; React optional for custom components
- **Search:** Local search works offline; Algolia option available for enhanced search without cost
- **Deployment Automation:** GitHub Actions integration trivial; push to main → automatic deploy

### Negative

- **Static Site Limitation:** No user accounts, no backend logic, no server-side personalization (Phase 1 only - acceptable tradeoff)
- **React Coupling:** Custom components require React knowledge; harder for non-developers to extend
- **Build Time Scaling:** Large sites (100+ pages) may exceed 5-minute build target; mitigation: incremental builds, caching
- **Framework Lock-in:** Migrating away from Docusaurus requires significant rework (content in MDX, components in React)
- **Limited Customization:** Some advanced UX patterns require workarounds or Docusaurus core modifications
- **GitHub Pages Constraints:** 1GB site size limit, 100GB/month bandwidth (unlikely to hit, but exists)
- **No Native A/B Testing:** Static sites can't do server-side experimentation (client-side workarounds possible)

## Alternatives Considered

**Alternative A: Next.js 14 + Vercel + Contentlayer**
- **Components:** Next.js (App Router), Tailwind CSS, MDX via Contentlayer, Vercel deployment
- **Pros:** More flexibility for future backend features, excellent performance, modern DX
- **Cons:** More setup complexity, Vercel vendor lock-in, overkill for static content, higher learning curve
- **Why Rejected:** Over-engineered for Phase 1 static site; Docusaurus better optimized for documentation/education

**Alternative B: VuePress + Netlify**
- **Components:** VuePress static site generator, Vue.js, Netlify deployment
- **Pros:** Vue-based (simpler than React for some), good performance, Netlify free tier
- **Cons:** Smaller ecosystem than Docusaurus, less active development, fewer educational-specific features
- **Why Rejected:** Docusaurus has better educational content tooling (versioning, blog, sidebar) and larger community

**Alternative C: GitBook (SaaS)**
- **Components:** GitBook hosted platform, Markdown content, integrated editor
- **Pros:** Non-technical friendly editor, beautiful default themes, integrated search
- **Cons:** Proprietary platform, limited customization, monthly cost for features, vendor lock-in, no custom React components
- **Why Rejected:** No interactive components support, limited customization, cost, vendor lock-in violates Constitution principle of cost-consciousness

**Alternative D: Custom Solution (React + Gatsby/Astro)**
- **Components:** Gatsby or Astro static generator, custom React components, self-hosted or Cloudflare Pages
- **Pros:** Maximum control, optimized for specific use case, no framework opinions
- **Cons:** Significant development time, reinventing documentation features, maintenance burden, no ecosystem
- **Why Rejected:** Violates "smallest viable change" principle; Docusaurus provides 80% of features we need out-of-box

## References

- Feature Spec: [specs/001-book-platform/spec.md](../../specs/001-book-platform/spec.md)
- Implementation Plan: [specs/001-book-platform/plan.md](../../specs/001-book-platform/plan.md) (Technical Context section)
- Research Document: [specs/001-book-platform/research.md](../../specs/001-book-platform/research.md) (Section 1: Docusaurus Configuration & Version)
- Related ADRs: None (first ADR)
- Evaluator Evidence: [history/prompts/001-book-platform/0001-core-book-platform-specification.spec.prompt.md](../prompts/001-book-platform/0001-core-book-platform-specification.spec.prompt.md)
