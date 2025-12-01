# Style Guide

**Feature**: 001-book-platform
**Document**: T004 - Style System Specification
**Created**: 2025-11-30
**Status**: Locked

---

## Overview

This document defines the style standards for all content in the Physical AI & Humanoid Robotics educational book. These standards ensure consistency, clarity, engagement, and accessibility across all chapters.

---

## 1. Structural Standards

### 1.1 The 12-Element Chapter Structure

Every chapter MUST include all 12 elements in this order (FR-003):

1. **Attention-Seeker Hook**
   - Opens the chapter with curiosity, humor, or relatable scenario
   - 1-3 sentences maximum
   - Example: "Ever wondered why your vacuum cleaner doesn't crash into furniture, but your friend does? Let's talk about sensors."

2. **Driving Question**
   - The central question the chapter answers
   - Clear, specific, student-focused
   - Example: "How do robots know where they are and what's around them?"

3. **Real-World Example**
   - Concrete scenario introduced BEFORE abstract theory
   - Relatable to everyday life (not robotics-specific initially)
   - Referenced throughout the chapter when teaching concepts
   - Example: "Think about parking your car. You use mirrors (vision), parking sensors (ultrasound), and your memory of car dimensions (internal model)."

4. **Use Case with Knowledge Requirements**
   - Specific robotics application
   - Lists prerequisite knowledge needed
   - Clear success criteria
   - Example: "Build a robot that navigates a warehouse. You'll need: basic Python, sensor concepts (Chapter 5), motion control (Chapter 7)."

5. **Concept Teaching (Practical-First)**
   - 70% practical activities, 30% theory (FR-004)
   - Hands-on exercises before deep explanations
   - Always reference the real-world example from element 3
   - Break complex concepts into digestible chunks

6. **Visual Diagrams and Flows**
   - At least 2-3 diagrams per chapter
   - Flow charts for algorithms and decision trees
   - Clear labels, legends, captions
   - Accessible colors (color-blind friendly, high contrast)
   - Example: Sensor data flow diagram, control loop flowchart

7. **Expert Insights and Tips**
   - Advice from domain experts
   - Common pitfalls and how to avoid them
   - Best practices
   - "Pro tip:" or "Watch out:" callout boxes
   - Example: "Pro tip: Always visualize sensor data before using it in control. You'll catch calibration issues early."

8. **AI-Assisted Learning Prompts**
   - 2-3 specific prompts students can use with AI assistants
   - Contextualized to chapter content
   - Example: "Ask AI: 'Explain the difference between open-loop and closed-loop control using a thermostat analogy.'"

9. **Hands-On Practice with Success Criteria**
   - Simulation exercises with clear objectives
   - Measurable success criteria (e.g., "robot reaches target within 5cm")
   - Step-by-step guidance without prescribing exact solution
   - Example: "Make the robot follow a square path. Success: all corners within 10cm of target."

10. **Self-Evaluation Questions with Topic References**
    - 3-5 questions per major topic section
    - NO answer keys provided
    - Topic references guide students where to review if uncertain
    - Example: "Q: What's the trade-off between PID gains? (Review: Section 7.3 'Tuning Controllers')"

11. **Short Assignment (30-60 min)**
    - Applies chapter concepts in simulation
    - Clear success criteria verifiable through simulation outcomes
    - NO solution code provided
    - Enough guidance to approach problem, not prescriptive
    - Example: "Implement obstacle avoidance. Success: robot navigates 10m without collision in test world."

12. **Curiosity Hook for Next Chapter**
    - Creates anticipation for upcoming content
    - 1-2 sentences
    - Example: "You can avoid obstacles now, but what if you need to remember where you've been? Next: Mapping and Localization."

---

## 2. Tone and Voice Standards

### 2.1 Core Tone Attributes (FR-010, FR-011)

**Soft and Polite**
- Never condescending or dismissive
- Avoid: "Obviously...", "It's simple...", "Everyone knows..."
- Use: "Let's explore...", "You might notice...", "Here's an interesting pattern..."

**Conversational**
- Write as if explaining to a curious friend
- Use "you" and "we" (direct address)
- Contractions acceptable ("let's", "you'll", "we're")
- Example: "We'll start with the basics, then you'll build your first controller."

**Lightly Humorous**
- Appropriate, not forced
- Relatable jokes, no insider jargon humor
- Avoid sarcasm or cultural-specific references
- Example: "If your robot's spinning in circles, it's not doing a victory dance—your sensor values might be inverted."

**Encouraging**
- Normalize mistakes as part of learning
- Celebrate small wins
- Example: "Don't worry if your first PID controller oscillates wildly. Tuning takes practice, and simulation lets you experiment safely."

### 2.2 Voice Consistency Checklist

Every paragraph should:
- [ ] Use active voice (passive voice only when necessary)
- [ ] Address reader directly ("you" or "we")
- [ ] Maintain encouraging, non-intimidating tone
- [ ] Include light humor where appropriate (not every paragraph)

---

## 3. Clarity Standards

### 3.1 Jargon Policy (FR-005)

**Rule: Explain Before Use**
- Define technical terms BEFORE or IMMEDIATELY when first used
- Provide real-world analogy alongside definition
- Bold or italicize first use of key terms

**Example - Good:**
> "Robots use **sensors** to perceive their environment—just like you use your eyes and ears to understand what's around you. A **LiDAR sensor** (Light Detection and Ranging) works like echolocation: it sends out laser pulses and measures how long they take to bounce back."

**Example - Bad:**
> "LiDAR is essential for SLAM. Configure your sensor params in the URDF."

### 3.2 Sentence Structure

**For Complex Ideas:**
- Short sentences (10-15 words)
- One concept per sentence
- Example: "PID controllers have three components. Each component serves a specific purpose. We'll explore them one at a time."

**For Simple Ideas:**
- Longer sentences acceptable (up to 25 words)
- Use commas for natural reading rhythm

**Avoid:**
- Run-on sentences with multiple clauses
- Nested parenthetical statements
- Excessive technical detail in one sentence

### 3.3 Analogies from Everyday Life (FR-011)

**Requirement**: Use relatable analogies for abstract concepts

**Examples:**
- **PID Controller** → Thermostat (P), remembering past temperature (I), anticipating changes (D)
- **Sensor Fusion** → Using multiple senses to navigate a dark room (touch, sound, vision)
- **ROS2 Topics** → Radio stations broadcasting information; robots subscribe to channels they care about

**Analogy Checklist:**
- [ ] Relatable to everyday life (no specialized knowledge required)
- [ ] Maps key concept properties accurately
- [ ] Mentioned before abstract definition
- [ ] Referenced when teaching related concepts

---

## 4. Visual Standards

### 4.1 Diagram Requirements (FR-009)

**Every Chapter Needs:**
- Minimum 2-3 visual diagrams
- At least 1 flow chart for algorithms or decision trees
- At least 1 system diagram showing component relationships

**Diagram Types:**
- **Conceptual Diagrams**: Illustrate abstract ideas (e.g., control loop)
- **System Diagrams**: Show architecture or data flow
- **Flow Charts**: Represent algorithms or decision logic
- **Annotated Screenshots**: Gazebo interface, RViz visualizations

### 4.2 Accessibility Standards

**Color Usage:**
- High contrast (WCAG AA minimum: 4.5:1 for text, 3:1 for graphics)
- Color-blind friendly palettes (avoid red/green only distinctions)
- Use patterns or labels in addition to color coding

**Labels and Legends:**
- All diagram elements clearly labeled
- Legends for color codes, symbols, abbreviations
- Descriptive captions (not just "Figure 1")

**Tools:**
- Mermaid (text-based, version-controllable)
- Excalidraw (hand-drawn style, accessible)
- Annotated screenshots (with arrows and labels)

### 4.3 Diagram Captions

**Format:**
```
Figure X: [Descriptive title]
[1-2 sentence explanation of what the diagram shows and why it matters]
```

**Example:**
```
Figure 3: ROS2 Node Communication via Topics
This diagram shows how three nodes (sensor, controller, actuator) communicate asynchronously by publishing and subscribing to topics. The decoupled design allows each component to be developed and tested independently.
```

---

## 5. Code Examples

### 5.1 Code Style

**Language:**
- Python 3.10+ for all primary examples (beginner-friendly, widely documented)
- C++ only in advanced/optional sections

**Formatting:**
- Follow PEP 8 for Python
- Syntax highlighting in all code blocks
- Comments explain WHY, not just WHAT

**Example - Good:**
```python
# Clamp velocity to prevent motor damage
if velocity > MAX_VELOCITY:
    velocity = MAX_VELOCITY  # Hardware limit from motor spec
```

**Example - Bad:**
```python
# Set velocity
velocity = MAX_VELOCITY  # Set to max
```

### 5.2 Code Block Structure

**Before Code:**
- 1-2 sentences explaining what the code does
- Mention key concepts demonstrated

**After Code:**
- Point out important lines or patterns
- Connect to real-world example from element 3

**Example:**
> "Here's a simple PID controller for position control. Notice how we calculate error, accumulate integral, and compute derivative:"
>
> ```python
> [code block]
> ```
>
> "The `integral += error * dt` line is like remembering past mistakes—just like adjusting your car's speed based on how long you've been off the target speed."

---

## 6. Practical/Theory Balance (FR-004)

### 6.1 The 70/30 Rule

**70% Practical:**
- Hands-on simulation exercises
- Code examples students run and modify
- Assignments and projects
- Interactive diagrams or widgets

**30% Theory:**
- Concept explanations
- Mathematical foundations (keep minimal, explain intuitively)
- Background context

### 6.2 Validation Method

**For each chapter, estimate:**
- Time reading theory: X minutes
- Time doing hands-on activities: Y minutes
- Ratio: Y / (X + Y) should be ≥ 0.70

**Example:**
- Theory reading: 15 minutes
- Hands-on simulation: 35 minutes
- Total: 50 minutes
- Ratio: 35 / 50 = 0.70 ✅ PASS

---

## 7. Markdown and MDX Conventions

### 7.1 Headings

- **H1**: Chapter title only
- **H2**: Major sections (map to 12-element structure)
- **H3**: Subsections within elements
- **H4**: Rarely used, only for deep nesting

### 7.2 Callout Boxes

Use Docusaurus admonitions for special content:

```markdown
:::tip Pro Tip
Always visualize sensor data before using it in control loops.
:::

:::caution Watch Out
Inverting motor directions is a common mistake. Check your signs!
:::

:::info Did You Know?
The first mobile robot, Shakey, was built in 1966 and could only move 2 meters per hour.
:::
```

### 7.3 Interactive Components

Use React components for:
- **SimulationEmbed**: Embed Gazebo examples or recordings
- **CodeExample**: Syntax-highlighted, runnable code snippets
- **AIPromptCard**: Display AI learning prompts (element 8)

**Example:**
```mdx
<AIPromptCard>
**Prompt for AI**: "Explain PID control using a shower temperature analogy. Focus on how each component (P, I, D) helps you reach the right temperature faster."
</AIPromptCard>
```

---

## 8. Engagement and Curiosity Maintenance

### 8.1 Hooks (Elements 1 and 12)

**Opening Hook Formula:**
- Start with question, surprising fact, or relatable frustration
- Connect to reader's experience
- Create curiosity gap

**Closing Hook Formula:**
- Tease next chapter's content
- Build on current chapter's achievement
- Example: "Now you can control position, but what about tracking moving targets? Next: Trajectory Following."

### 8.2 Humor Guidelines

**Appropriate Humor:**
- Self-deprecating (about robots, not students)
- Relatable frustrations (debugging, tuning parameters)
- Wordplay (if universally understandable)

**Avoid:**
- Cultural-specific jokes
- Sarcasm
- Jokes at reader's expense
- Forced humor in serious safety topics

**Example - Good:**
> "Your robot's path looks like a drunken spider drew it? Welcome to PID tuning! Don't worry, we'll straighten it out."

**Example - Bad:**
> "If you don't understand this, you probably shouldn't be here." ❌

---

## 9. Accessibility and Inclusivity

### 9.1 Language

**Use:**
- Gender-neutral language ("they/them" for generic persons)
- Inclusive examples (diverse names, scenarios)
- Universal cultural references (avoid region-specific idioms)

**Avoid:**
- Idioms that don't translate well ("hit a home run")
- Cultural assumptions ("everyone has a car")
- Gendered pronouns for generic roles ("when the engineer... he should...")

### 9.2 Alternative Text

**All images must have:**
- Descriptive alt text (not just "Figure 1")
- Example: `alt="Flow chart showing sensor data processing: raw data → filter → fusion → controller"`

---

## 10. Content Quality Checklist

Before publishing any chapter, validate:

**Structure:**
- [ ] All 12 elements present and in order
- [ ] Real-world example introduced before theory (element 3)
- [ ] 70/30 practical/theory balance maintained

**Tone and Clarity:**
- [ ] Soft, polite, conversational tone throughout
- [ ] All jargon defined before use
- [ ] Analogies from everyday life included
- [ ] Active voice used (passive only when necessary)

**Visuals:**
- [ ] Minimum 2-3 diagrams present
- [ ] All diagrams have clear labels and descriptive captions
- [ ] Accessible color schemes (color-blind friendly)
- [ ] Alt text provided for all images

**Engagement:**
- [ ] Opening hook creates curiosity
- [ ] Closing hook creates anticipation for next chapter
- [ ] Light humor used appropriately (not forced)
- [ ] Expert insights and tips included (element 7)

**Validation:**
- [ ] Self-evaluation questions with topic references (element 10)
- [ ] Assignment has clear, measurable success criteria (element 11)
- [ ] AI learning prompts specific to chapter content (element 8)

---

## 11. References

- **Constitution**: Section 2.3 (Content Quality Standards)
- **Spec**: FR-003 (12-element structure), FR-004 (70/30 balance), FR-005 (jargon policy), FR-009 (visual standards), FR-010 (tone), FR-011 (voice), FR-012 (expert insights)
- **Plan**: Project Structure (Docusaurus components)

---

**Approval**: This style guide is locked for Phase A implementation. All content creators MUST adhere to these standards. Changes require spec revision and Constitution review.
