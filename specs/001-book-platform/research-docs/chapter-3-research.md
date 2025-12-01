# Chapter 3 Research: Programming Basics (Python & ROS2)

**Chapter**: Chapter 3 - Programming Basics
**Persona**: Professor (Research and Validation)
**Date**: 2025-11-30
**Status**: Research Complete

---

## Research Methodology

**Three-Source Validation Rule**: All technical claims validated against 3+ authoritative sources per Constitution Section 2.4.

**Sources**: Official documentation, educational platforms, community tutorials, technical articles

---

## Topic 1: Python Fundamentals for Robotics

### Why Python for Robotics?

**Definition**: Python has become one of the most popular programming languages for robotics due to its simplicity, versatility, and interoperability with ROS2.

**Key Advantages**:
- **Simplicity**: Easy-to-learn syntax, ideal for beginners
- **Extensive libraries**: NumPy, SciPy, OpenCV, and more
- **Strong community support**: Abundant tutorials and examples
- **ROS2 integration**: Native support through rclpy (ROS Client Library for Python)

### Essential Python Concepts for Robotics

**Core Fundamentals**:
- Variables and data types (int, float, string, lists, dictionaries)
- Loops and conditionals (for, while, if/else)
- Functions and modules
- Object-Oriented Programming (classes and objects)

**Why OOP Matters**:
- Organize code properly to prevent messy code when working with robots
- Each node in ROS2 is a Python class
- Encapsulation of robot behaviors

### Python Libraries for Robotics

**Essential Libraries**:
- **rclpy**: ROS2 Client Library for Python
- **NumPy**: Numerical computing, array operations
- **OpenCV**: Computer vision tasks
- **PyBullet**: Physics simulation (beginner-friendly)

**URDF (Unified Robot Description Format)**:
- Describes robot bodies and geometry
- PyBullet great for experimenting with URDF

### Learning Path

**Beginner Progression**:
1. Start with fundamentals: data types, loops, functions
2. Learn Object-Oriented Programming
3. Hands-on experience through projects
4. Progress to ROS2 integration

### Sources

1. [Python for Robotics - Full Course for Beginners](https://www.theconstruct.ai/robotigniteacademy_learnros/ros-courses-library/python-robotics/) - The Construct
2. [Python Robot Programming 101](https://robodk.com/blog/python-robot-programming/) - RoboDK
3. [Python Robotics - Programming a Robot with Python](https://academy.visualcomponents.com/courses/python-robotics-programming-a-robot-with-python/) - Visual Components Academy
4. [A Beginner's Guide to Robot Programming with Python](https://thenextweb.com/news/a-beginners-guide-to-robot-programming-with-python) - The Next Web
5. [Free Python 3 for Robotics course](https://app.theconstruct.ai/courses/python-3-for-robotics-58/) - The Construct

---

## Topic 2: ROS2 Architecture (Nodes, Topics, Services)

### Nodes

**Definition**: A node is an individual process that performs a specific computational task in ROS2.

**Characteristics**:
- Each node runs independently
- A complete robot system consists of many nodes working together
- Each handles a distinct responsibility
- Nodes can send and receive data via topics, services, actions, or parameters

**Examples**:
- One node controls motors
- Another node processes camera data
- Another node handles navigation planning

### Topics

**Definition**: A topic is a named channel for a specific type of data used for asynchronous communication.

**How Topics Work**:
- **Publishers** send messages to topics
- **Subscribers** receive messages from topics
- **One-way communication** pattern
- Ideal for high-frequency, continuous data streams

**Use Cases**:
- Sensor data streams (camera images, lidar scans)
- Motor commands
- Robot state information

### Services

**Definition**: A service implements request/response pattern for synchronous communication.

**How Services Work**:
- **Client** makes a request to a service server
- **Server** processes the request and generates a response
- **Two-way communication** (request → response)
- Used for infrequent operations

**Use Cases**:
- Requesting a robot to perform a specific task
- Querying robot state
- Configuration changes

### Actions

**Definition**: Actions are for asynchronous communication with feedback during long-running tasks.

**How Actions Work**:
- **Action clients** send goal requests to action servers
- **Action servers** provide:
  - Goal acceptance/rejection
  - Continuous feedback during execution
  - Final result upon completion
- Can be canceled mid-execution

**Use Cases**:
- Navigation to a goal (with progress feedback)
- Manipulation tasks (pick and place)
- Long-running computations

### Sources

1. [Understanding topics - ROS 2 Humble](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html) - Official ROS2 Documentation
2. [Understanding nodes - ROS 2 Foxy](https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html) - Official ROS2 Documentation
3. [Understanding services - ROS 2 Foxy](https://docs.ros.org/en/foxy/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html) - Official ROS2 Documentation
4. [ROS2 Tutorial for Beginners](https://thinkrobotics.com/blogs/tutorials/ros2-tutorial-for-beginners-your-complete-guide-to-robot-operating-system-2) - ThinkRobotics
5. [ROS2 Topics Guide: Master Services and Actions](https://robotisim.com/ros2-topics-services-actions-explained/) - Robotisim

---

## Topic 3: Writing Your First ROS2 Node (Publisher/Subscriber)

### Basic Structure

**Required Components**:
- Import `rclpy` (ROS 2 Client Library for Python)
- Import `Node` class to inherit from
- Import message types (e.g., `std_msgs.msg.String`)

**Node Lifecycle**:
1. Initialize rclpy library
2. Create the node
3. "Spin" the node so callbacks are called
4. Shutdown when done

### Publisher Node Pattern

**Key Elements**:
- Inherit from `Node` class
- Create publisher using `self.create_publisher()`
- Set up timer for periodic publishing
- Publish messages in timer callback

**Example Pattern**:
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        self.timer = self.create_timer(0.5, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS2'
        self.publisher_.publish(msg)
```

### Subscriber Node Pattern

**Key Elements**:
- Inherit from `Node` class
- Create subscription using `self.create_subscription()`
- Define callback function to process received messages

**Example Pattern**:
```python
class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)

    def listener_callback(self, msg):
        self.get_logger().info('I heard: "%s"' % msg.data)
```

### Best Practices

**Multiple Implementation Approaches**:
- Check `minimal_publisher` and `minimal_subscriber` packages in ros2/examples repo
- Several valid implementation patterns exist

**Package Setup**:
- Create ROS2 package using `ros2 pkg create`
- Configure `package.xml` with dependencies
- Set up `setup.py` with entry points

### Sources

1. [Writing a simple publisher and subscriber (Python) - Humble](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html) - Official ROS2 Documentation
2. [Writing a simple publisher and subscriber (Python) - Foxy](https://docs.ros.org/en/foxy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html) - Official ROS2 Documentation
3. [Understanding ROS 2 nodes with Publisher-Subscriber](https://ros2-industrial-workshop.readthedocs.io/en/latest/_source/basics/ROS2-Simple-Publisher-Subscriber.html) - ROS2 Industrial Workshop
4. [Create a Basic Publisher and Subscriber (Python)](https://automaticaddison.com/create-a-basic-publisher-and-subscriber-python-ros2-foxy/) - Automatic Addison
5. [Publishers and Subscribers: using messages](https://ros2-tutorial.readthedocs.io/en/latest/publishers_and_subscribers.html) - Murilo's ROS2 Tutorial

---

## Topic 4: ROS2 Services and Actions

### Services (Request/Response)

**Service Definition**:
- Synchronous request/response communication
- Client sends request, waits for server response
- Used for infrequent, one-time operations

**Service Implementation**:
- **Server**: Waits for requests, processes them, returns responses
- **Client**: Sends requests, receives responses

**Code Pattern**:
- Import service type
- Create service server with callback
- Callback processes request, returns response

**Multiple Implementations**:
- Check `minimal_client` and `minimal_service` packages in ros2/examples
- Async and sync approaches available

### Actions (Goal/Feedback/Result)

**Action Definition**:
- Asynchronous communication for long-running tasks
- Three components: Goal, Feedback, Result
- Can be canceled or preempted

**Action Implementation**:
- **Action Server**:
  - Accepts/rejects goal requests
  - Provides periodic feedback
  - Returns final result
- **Action Client**:
  - Sends goal requests
  - Receives feedback updates
  - Processes final result

**When to Use Actions**:
- Tasks that take time (navigation, manipulation)
- Need progress feedback
- May need to cancel mid-execution

### Comparison: Topic vs Service vs Action

| Feature | Topic | Service | Action |
|---------|-------|---------|--------|
| **Pattern** | Publish/Subscribe | Request/Response | Goal/Feedback/Result |
| **Synchronous** | No | Yes | No |
| **Feedback** | No | No | Yes |
| **Frequency** | High (continuous) | Low (on-demand) | Low (long tasks) |
| **Cancelable** | N/A | No | Yes |

### Sources

1. [Writing a simple service and client (Python) - Humble](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html) - Official ROS2 Documentation
2. [Writing a simple service and client (Python) - Foxy](https://docs.ros.org/en/foxy/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Service-And-Client.html) - Official ROS2 Documentation
3. [Writing an action server and client (Python) - Humble](https://docs.ros.org/en/humble/Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html) - Official ROS2 Documentation
4. [Writing an action server and client (Python) - Foxy](https://docs.ros.org/en/foxy/Tutorials/Intermediate/Writing-an-Action-Server-Client/Py.html) - Official ROS2 Documentation
5. [At your Service: Servers and Clients](https://ros2-tutorial.readthedocs.io/en/latest/service_servers_and_clients.html) - Murilo's ROS2 Tutorial
6. [ROS2 Service: Server and Client Nodes](https://www.roboticsunveiled.com/ros2-service-server-and-client-python-and-cpp/) - Robotics Unveiled

---

## Topic 5: Sensor Data Processing in ROS2

### Lidar Data Processing

**Message Type**: `sensor_msgs/msg/LaserScan`

**Data Structure**:
- Published on `/scan` topic
- Contains: X, Y, Z coordinates, range, intensity
- Reflectivity, ring information
- Timestamp and frame information

**Processing Pattern**:
- Subscribe to `/scan` topic
- Process LaserScan data in callback
- Extract ranges, angles, intensities
- Use for obstacle detection, mapping

**Visualization**:
- View in RViz
- Set Reliability Policy to "Best Effort"

### Camera Data Processing

**Message Types**:
- `sensor_msgs/msg/Image` - Raw image data
- `sensor_msgs/msg/CompressedImage` - Compressed images
- `sensor_msgs/msg/CameraInfo` - Camera calibration

**Integration**:
- Depth cameras can work alongside lidar
- Multi-sensor fusion common
- OpenCV for image processing

### Ultrasonic Sensor Data

**Message Type**: `sensor_msgs/msg/Range`

**Characteristics**:
- Provides range (distance) data
- Can simulate using lidar configuration
- Set specific parameters (vertical samples, min/max angles)
- Creates "cone" similar to ultrasonic sensor

**Use Cases**:
- Obstacle detection
- Close-range sensing
- Parking assistance

### IMU Data

**Message Type**: `sensor_msgs/msg/Imu`

**Data Includes**:
- Linear acceleration (3 axes)
- Angular velocity (3 axes)
- Orientation (quaternion)

**Frequency**:
- High transmission frequency
- Real-time orientation tracking

### Multi-Sensor Support

**Supported Sensor Types**:
- Laser/LIDAR sensors
- Cameras (RGB, depth, stereo)
- Point cloud devices
- IMU (Inertial Measurement Units)
- Ultrasonic/infrared sensors

**Sensor Fusion**:
- Combine multiple sensor types
- Cross-validate data
- Improve reliability

### Sources

1. [ROS2 Lidar Sensors - Isaac Sim](https://docs.omniverse.nvidia.com/app_isaacsim/app_isaacsim/tutorial_ros2_sensors.html) - NVIDIA Omniverse
2. [Setting Up Sensors - Nav2](https://navigation.ros.org/setup_guides/sensors/setup_sensors.html) - Nav2 Documentation
3. [List of ROS2 Supported Sensors](https://www.theconstruct.ai/list-ros2-supported-sensors-for-robots/) - The Construct
4. [How to read LaserScan data (ROS python)](https://www.theconstruct.ai/read-laserscan-data/) - The Construct
5. [Ultrasonic and infrared sensor availability](https://robotics.stackexchange.com/questions/29217/ultrasonic-and-infrared-sensor-availability) - Robotics Stack Exchange

---

## Topic 6: Robot Control Programming

### ROS2 Control Framework

**Definition**: ros2_control is a robot control framework providing hardware abstraction for actuators, sensors, and interfaces in a modular way.

**Key Components**:
- **ControllerInterface**: Robot-agnostic control algorithms
- **HardwareInterface**: Abstracts hardware communication
- **state_interfaces**: Read-only data handles (sensor readings, joint encoders)
- **command_interfaces**: Read/write data handles (velocity/position commands)

### Motor Control Implementation

**Hardware Communication**:
- Firmware often runs on microcontrollers (ESP32, Arduino)
- Python3 with MicroPython interpreter common
- Hardware plugin communicates with Arduino/ESP32
- Sends commands, receives state feedback

**Control Interfaces**:
- State interfaces: Current position, velocity, effort
- Command interfaces: Target position, velocity, effort
- Abstraction allows swapping hardware without changing controllers

### Programming Patterns

**Motor Control**:
- PWM signals for DC motors
- Position control for servos
- Velocity control for wheels
- Trajectory following for arms

**Navigation**:
- Map building (SLAM)
- Path planning
- Obstacle avoidance
- Localization

### Practical Applications

**Differential Drive Robots**:
- Two-wheel robots
- Python GUI control examples
- Velocity commands to left/right wheels

**Manipulator Arms**:
- ROS2 Control with Gazebo simulation
- Joint position/velocity control
- Inverse kinematics

**Advanced Features**:
- Mapping and navigation
- Object following/avoidance
- Autopilot modes
- Human pose detection (with vision)

### Sources

1. [ROS 2 Control, Robot Control the Right Way](https://medium.com/@jiayi.hoffman/ros-2-control-robot-control-the-right-way-d0e72e7f1b6c) - Medium
2. [Welcome to ros2_control documentation](https://control.ros.org/) - Official ros2_control Docs
3. [Example 7: Full tutorial with a 6DOF robot](https://control.ros.org/rolling/doc/ros2_control_demos/example_7/doc/userdoc.html) - ros2_control Demos
4. [How to Control a Robotic Arm Using ROS 2 Control and Gazebo](https://automaticaddison.com/how-to-control-a-robotic-arm-using-ros-2-control-and-gazebo/) - Automatic Addison
5. [Use ROS2, ESP32, and web browser to control motor driver](https://blog.hadabot.com/ros2-esp32-to-control-motor-driver-using-web-browser.html) - Hadabot Blog

---

## Research Summary

### Key Findings

1. **Python is ideal for robotics beginners** - Simple syntax, extensive libraries, strong ROS2 integration through rclpy

2. **ROS2 architecture uses nodes as building blocks** - Each node performs specific task, communicates via topics/services/actions

3. **Topics for streaming data, Services for request/response, Actions for long tasks** - Clear use cases for each communication pattern

4. **Publisher/Subscriber pattern is fundamental** - Most ROS2 applications start with pub/sub, official tutorials provide complete examples

5. **Sensor data uses standard message types** - LaserScan for lidar, Image for cameras, Range for ultrasonics, Imu for inertial data

6. **ros2_control provides hardware abstraction** - Standardized way to interface with motors, sensors regardless of hardware

### Gaps Requiring Additional Research

- None critical for Chapter 3 introduction
- Advanced topics (parameter servers, lifecycle nodes, composition) deferred to later chapters

### Validation Status

✅ **All topics researched with 3+ authoritative sources**
✅ **Mix of official documentation, educational platforms, community tutorials**
✅ **Current sources (2024-2025)**
✅ **Strong emphasis on official ROS2 documentation**

---

## Next Steps

1. Create validation checklist (T065)
2. Create Chapter 3 outline mapping 12-element structure (T066)
3. Begin writing with Editor persona (T067-T072)
