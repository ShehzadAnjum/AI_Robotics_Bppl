# Learning Objectives per Tier

**Feature**: 001-book-platform
**Document**: T003 - Learning Objectives Definition
**Created**: 2025-11-30
**Status**: Locked

---

## Overview

This document defines learning objectives organized by the simulation-first progression tiers. Each tier builds on the previous, guiding students from zero-cost simulation to real-world hardware application.

---

## Tier Structure: Simulation-First Progression

Per Constitution Principle IV (Simulation-First Progression), learning follows three tiers:

1. **Tier 1**: Simulation environments (zero hardware cost, safe experimentation)
2. **Tier 2**: Generic tech stack (transferable skills, not vendor-locked)
3. **Tier 3**: Specific hardware (real-world application with constraints)

**Rationale**: Removes cost and availability barriers. Allows rapid iteration and mistake-making without consequences. Builds confidence before hardware complexity.

---

## Tier 1: Simulation Environments (Chapters 1-8)

### Goal
Enable students to learn and experiment with robotics concepts in safe, accessible, zero-cost simulation environments without requiring physical hardware.

### Primary Tools
- **Gazebo Sim (Harmonic)**: 90% of examples (FR-007d)
- **ROS2 (Humble/Iron)**: Mandatory for robotics chapters 4+ (FR-007a)
- **Python-based simulators**: For foundational chapters 1-3 (electronics/mechanics concepts)

### Learning Objectives

**After completing Tier 1, students will be able to:**

1. **Foundational Skills (Chapters 1-3)**
   - Explain basic electronic components (resistors, capacitors, sensors, actuators) using real-world analogies
   - Describe mechanical principles (forces, torque, kinematics) relevant to robotics
   - Write basic Python programs for sensor data processing and control logic
   - Understand technical vocabulary without intimidation
   - **Validation**: SC-001 (80%+ accuracy on self-evaluation questions)

2. **Simulation Environment Mastery (Chapter 4)**
   - Install and configure ROS2 on their operating system (Linux/Windows/macOS)
   - Launch Gazebo simulations and navigate the interface
   - Understand simulation concepts: physics engines, sensor models, collision detection
   - Spawn and manipulate simple robot models in Gazebo
   - **Validation**: Successfully launch first Gazebo simulation

3. **Sensor Integration (Chapters 5-6)**
   - Select appropriate sensors for given robotics tasks (cameras, LiDAR, IMU, encoders)
   - Read and visualize sensor data from simulated robots using ROS2 topics
   - Filter noisy sensor data using basic techniques
   - Implement sensor fusion combining multiple sensor inputs
   - **Validation**: Complete 2-3 small sensor visualization projects

4. **Motion Control (Chapter 7)**
   - Design and implement basic motion control algorithms (open-loop, PID control)
   - Command simulated robots to move to target positions
   - Tune controller parameters based on simulation feedback
   - Understand limitations of different control strategies
   - **Validation**: Complete motion control small project with <5cm position error

5. **Obstacle Avoidance (Chapter 8)**
   - Implement reactive obstacle avoidance using sensor feedback
   - Use simulation to test edge cases (tight spaces, moving obstacles)
   - Debug robot behavior through simulation visualization tools
   - **Validation**: Complete obstacle avoidance small project

**Tier 1 Success Metrics:**
- SC-003: 90% of students complete 3-5 small projects independently by mid-book
- SC-009: 90% report real-world examples made concepts understandable
- SC-011: 85% rate visual diagrams as helpful

---

## Tier 2: Generic Tech Stack (Chapters 9-12)

### Goal
Teach vendor-neutral, transferable robotics concepts and tools that apply across different platforms and hardware, preventing tool lock-in.

### Primary Focus
- **ROS2 concepts** (not Gazebo-specific): Nodes, topics, services, actions
- **Classical control methods**: PID, MPC, state machines (FR-031)
- **Generic robotics algorithms**: Path planning, SLAM, inverse kinematics
- **Cross-platform skills**: Software architecture, debugging workflows

### Learning Objectives

**After completing Tier 2, students will be able to:**

1. **Autonomous Navigation (Chapter 9)**
   - Understand path planning algorithms (A*, RRT) conceptually
   - Implement basic navigation stacks using ROS2 nav2
   - Differentiate between localization, mapping, and planning
   - Debug navigation failures using logs and visualization
   - **Validation**: Complete autonomous navigation mid-size project

2. **Vision Systems (Chapter 10)**
   - Understand computer vision concepts (object detection, segmentation, tracking)
   - Use pre-trained ML models for robotics tasks (FR-030)
   - Integrate camera data into robot decision-making
   - Recognize when to use classical vs. learning-based approaches
   - **Validation**: Complete vision-based pick-and-place mid-size project

3. **Multi-Sensor Fusion (Chapter 11)**
   - Combine data from multiple sensors (cameras, LiDAR, IMU) for robust perception
   - Understand sensor uncertainty and probabilistic reasoning
   - Implement Kalman filters or particle filters for state estimation
   - **Validation**: Implement sensor fusion in mid-size project

4. **System Architecture (Chapter 12)**
   - Design modular robotics software architectures
   - Apply ROS2 best practices (separation of concerns, reusable nodes)
   - Understand trade-offs between performance and maintainability
   - **Validation**: Refactor previous project with improved architecture

**Tier 2 Success Metrics:**
- SC-004: 80% of students complete 1-2 mid-size projects independently
- SC-002: 80% can independently perform intermediate-level tasks (sensor selection, motion control, obstacle avoidance, simulation-first workflows, troubleshooting)

---

## Tier 3: Specific Hardware (Chapter 13+ and Integrated Project)

### Goal
Apply simulation-validated skills to real-world hardware, understanding hardware-specific constraints, troubleshooting, and deployment.

### Primary Focus
- **Hardware selection**: Choosing platforms, sensors, actuators for real applications
- **Sim-to-real transfer**: Differences between simulation and reality
- **Hardware debugging**: Sensor calibration, noise, latency, power management
- **Deployment**: Onboard computation, real-time constraints

### Learning Objectives

**After completing Tier 3, students will be able to:**

1. **Hardware Selection and Integration**
   - Evaluate hardware platforms (single-board computers, motor controllers, sensors) for projects
   - Understand cost, performance, and compatibility trade-offs
   - Source components and create bill-of-materials (BOM)
   - Physically assemble simple robotic systems (optional, for those with hardware access)

2. **Sim-to-Real Transfer**
   - Identify differences between simulation and reality (latency, noise, friction, calibration)
   - Adapt simulation-validated algorithms for real hardware
   - Tune parameters based on real-world testing
   - Understand when simulation is sufficient vs. when hardware testing is required

3. **Hardware Debugging and Calibration**
   - Troubleshoot sensor noise and actuator calibration issues (SC-002)
   - Use hardware diagnostic tools (multimeters, oscilloscopes, ROS2 debugging tools)
   - Recognize common hardware failure modes (loose connections, power issues, driver problems)
   - **Validation**: Successfully debug at least one hardware-related issue

4. **Integrated Project**
   - Combine multiple small projects into one functional system
   - Design end-to-end system (perception → planning → control → actuation)
   - Test in simulation before (optionally) deploying to hardware
   - **Validation**: SC-005 - 70% complete integrated project within 2 weeks of finishing final chapter

**Tier 3 Success Metrics:**
- SC-005: 70% complete integrated project combining multiple concepts
- SC-017: 75% feel prepared to continue learning advanced topics

---

## Cross-Tier Skills (All Chapters)

**Throughout all tiers, students develop:**

1. **Critical Thinking**
   - Evaluate trade-offs between different approaches
   - Recognize when to use classical vs. learning-based methods
   - Debug systematically using scientific method (hypothesis → test → iterate)

2. **Self-Directed Learning**
   - Use self-evaluation questions to assess understanding (FR-013, FR-014)
   - Verify correctness through simulation outcomes, not solution keys (FR-016a)
   - Use AI learning prompts to deepen understanding (FR-021, FR-022)
   - Know where to find authoritative sources for further learning

3. **Project Management**
   - Break down complex projects into manageable tasks
   - Set measurable success criteria
   - Iterate based on feedback from simulation or hardware
   - Document design decisions and lessons learned

4. **Communication**
   - Explain robotics concepts to others using examples and analogies
   - **Validation**: SC-016 - 85% confident explaining core concepts to others

---

## Learning Objective Validation

**Content creators must ensure each chapter:**
- [ ] Maps objectives to specific tier(s)
- [ ] Provides hands-on practice for each objective
- [ ] Includes self-evaluation questions aligned with objectives
- [ ] Defines clear, measurable success criteria for assignments
- [ ] References specific skills from SC-002 intermediate-level task list

---

## Alignment with Success Criteria

| Success Criterion | Tier | Chapter Range | Validation Method |
|-------------------|------|---------------|-------------------|
| SC-001: 80%+ self-eval accuracy | Tier 1 | 1-3 | Self-evaluation questions |
| SC-002: Intermediate skills | Tiers 1-2 | 1-12 | Skills assessment + projects |
| SC-003: 3-5 small projects | Tier 1 | 4-8 | Project completion |
| SC-004: 1-2 mid-size projects | Tier 2 | 9-12 | Project completion |
| SC-005: Integrated project | Tier 3 | 13+ | Final project completion |
| SC-016: Explain concepts | All tiers | All | Self-assessment survey |
| SC-017: Prepared for advanced topics | Tier 3 | Final | End-of-book survey |

---

## References

- **Constitution**: Principle IV (Simulation-First Progression)
- **Spec**: FR-007 (simulation-first progression), FR-029-FR-033 (AI/ML approach), Success Criteria SC-001 through SC-017
- **Plan**: Technical Context (tools and platforms)

---

**Approval**: These learning objectives are locked for Phase A implementation. Changes require spec revision and Constitution review.
