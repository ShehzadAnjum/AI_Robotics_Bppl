# Chapter 3 Outline: Programming Basics (Python & ROS2)

**Chapter**: Chapter 3 - Programming Basics
**Persona**: Professor (Outline and Structure)
**Date**: 2025-11-30
**Status**: Ready for Writing

---

## Learning Objectives

By the end of this chapter, students will be able to:

1. **Write Python code** using variables, functions, loops, and classes for robotics applications
2. **Explain ROS2 architecture** including nodes, topics, services, and actions
3. **Create publisher and subscriber nodes** in Python using rclpy
4. **Implement services and actions** for request/response and long-running tasks
5. **Process sensor data** from lidar, cameras, and other sensors in ROS2
6. **Control robot motors** using ros2_control framework basics

---

## 12-Element Structure Mapping

### Element 1: Curiosity Hook (Opening)

**Hook**: "Your first robot program is just 10 lines of Python code. In this chapter, you'll write code that makes a simulated robot move, sense obstacles, and navigate autonomously. No CS degree required—just curiosity and willingness to experiment."

### Element 2: Driving Question

**Central Question**: "How do you write code that transforms sensor data into intelligent robot behavior?"

### Element 3: Context Setting

**Prerequisites**: Chapters 1-2 (Physical AI concepts, electronics basics)
**Scope**: Python fundamentals + ROS2 basics (not advanced algorithms)

### Element 4: Learning Objectives

(Listed above)

### Element 5: Teaching Sections (Main Content)

#### Section 5.1: Python Fundamentals for Robotics
- Variables, data types, operators
- Functions and modules
- Loops and conditionals
- Object-Oriented Programming (classes essential for ROS2)
- Key libraries: rclpy, NumPy basics

#### Section 5.2: ROS2 Architecture
- Nodes (individual processes)
- Topics (pub/sub streaming data)
- Services (request/response)
- Actions (goal/feedback/result for long tasks)
- When to use each communication pattern

#### Section 5.3: Writing Your First ROS2 Publisher/Subscriber
- Package setup (ros2 pkg create)
- Publisher node (talker)
- Subscriber node (listener)
- Running and testing nodes
- Message types (std_msgs, sensor_msgs)

#### Section 5.4: ROS2 Services and Actions
- Creating service server/client
- Defining custom service types
- Action servers for long tasks
- Providing feedback during execution
- Comparison: Topic vs Service vs Action

#### Section 5.5: Processing Sensor Data
- LaserScan messages (lidar)
- Image messages (cameras)
- Range messages (ultrasonic)
- IMU messages
- Callback patterns for data processing

#### Section 5.6: Robot Control Basics
- ros2_control framework intro
- Motor command interfaces
- Reading joint states
- Simple velocity commands
- Connecting to simulated hardware

### Element 6: Real-World Example

**Example**: "Building a Wall-Following Robot"
- Use LaserScan data to detect walls
- Calculate distance to nearest obstacle
- Publish velocity commands to follow wall
- Complete working example with code

### Element 7: Visualization/Diagrams

**Diagram 1**: Python OOP for ROS2 (class inheritance)
**Diagram 2**: ROS2 Node Communication (pub/sub)
**Diagram 3**: Topic vs Service vs Action comparison
**Diagram 4**: Sensor data processing pipeline

### Element 8: AI Learning Prompts

**Prompt 1**: Code debugging assistant
**Prompt 2**: ROS2 architecture helper
**Prompt 3**: Node design consultant

### Element 9: Practical Exercise

**Exercise**: Create temperature monitoring node
- Publisher publishes simulated temperature
- Subscriber logs warnings if too hot
- Service to query current temperature

### Element 10: Self-Evaluation Questions

- 6 questions covering Python, ROS2 architecture, nodes, services, sensors, control

### Element 11: Assignment

**Assignment**: Build obstacle avoidance node
- Read LaserScan data
- Detect obstacles
- Publish velocity commands to avoid
- Test in Gazebo simulation

### Element 12: Curiosity Hook (Closing)

**Hook**: "You can now write code that reads sensors and controls motors. In Chapter 4, you'll integrate these skills to build complete robotic behaviors. Your autonomous robot is taking shape!"

---

## Content Balance

- **Practical**: ~70% (code examples, hands-on exercises)
- **Theory**: ~30% (concepts, architecture)
- **Target**: Meets 70/30 Constitution requirement

---

## Sources Organization

**Python**: 5 sources (The Construct, RoboDK, Visual Components, etc.)
**ROS2 Architecture**: 5 sources (Official docs, ThinkRobotics, Robotisim)
**Publisher/Subscriber**: 5 sources (Official docs, workshops, tutorials)
**Services/Actions**: 6 sources (Official docs, community tutorials)
**Sensors**: 5 sources (NVIDIA, Nav2, The Construct, Stack Exchange)
**Control**: 5 sources (ros2_control docs, Medium, Hadabot)

**Total**: 31+ sources

---

## Writing Guidelines

- Start each code example with clear objective
- Show complete working code, not fragments
- Explain each line for beginners
- Use analogies (mail delivery = pub/sub, phone call = service)
- Encourage experimentation in simulation
- Test all code examples before including

---

**Outline Complete** ✅ Ready for Editor Persona writing phase
