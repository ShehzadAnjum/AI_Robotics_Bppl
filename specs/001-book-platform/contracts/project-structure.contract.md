# Contract: ROS2 Example Project Structure

**Version**: 1.0.0
**Date**: 2025-11-30
**Purpose**: Define standard structure for ROS2/Gazebo code examples

## Project Directory Structure

Every project in the `robotics-book-examples` repository MUST follow this structure:

```
project-name/
├── README.md                # Required: Project metadata and instructions
├── src/                     # Required: ROS2 Python source code
│   ├── __init__.py
│   └── [module_name].py
├── launch/                  # Required: ROS2 launch files
│   └── [project_name].launch.py
├── worlds/                  # Required for Gazebo projects
│   └── [world_name].world
├── models/                  # Required: Robot URDF/SDF models
│   └── robot.urdf
├── config/                  # Optional: Configuration files (YAML)
│   └── params.yaml
├── tests/                   # Optional but recommended: Unit tests
│   └── test_[module_name].py
└── package.xml              # Required: ROS2 package manifest
```

## README.md Requirements

Every project README MUST include:

### 1. Project Metadata

```markdown
# [Project Title]

**Type**: Small | Mid-Size | Integrated
**Difficulty**: Beginner | Intermediate | Advanced
**Estimated Time**: [X-Y hours]
**Chapter Reference**: [Link to book chapter]
```

### 2. Description

```markdown
## Description

[2-3 sentences explaining what this project does and what concept it demonstrates]
```

### 3. Learning Objectives

```markdown
## What You'll Learn

- [Objective 1]
- [Objective 2]
- [Objective 3]
```

### 4. Prerequisites

```markdown
## Prerequisites

**Knowledge**:
- [Chapter or concept required]

**Software**:
- ROS2 Humble or Iron
- Gazebo Sim
- Python 3.10+

**Installation**: See [Chapter 4: ROS2 Setup](link)
```

### 5. Success Criteria

```markdown
## Success Criteria

Complete this project when you achieve:

- [ ] [Measurable outcome 1 - e.g., "Robot reaches goal within 10cm"]
- [ ] [Measurable outcome 2 - e.g., "No collisions detected"]
- [ ] [Measurable outcome 3 - e.g., "Task completes in under 2 minutes"]
```

### 6. Usage Instructions

```markdown
## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/[repo]/robotics-book-examples.git
   cd robotics-book-examples/[project-type]/[project-name]
   ```

2. Build the project:
   ```bash
   colcon build
   source install/setup.bash
   ```

3. Launch the simulation:
   ```bash
   ros2 launch [project_name] [launch_file].launch.py
   ```

4. Verify success criteria:
   [How to check if success criteria are met]
```

### 7. Troubleshooting (Optional)

```markdown
## Troubleshooting

**Issue**: [Common problem]
**Solution**: [How to fix it]
```

## Code Quality Requirements

### Python Code Standards

- **Style**: PEP 8 compliant (use `black` formatter)
- **Type Hints**: Required for function signatures
- **Docstrings**: Required for all public functions
- **Comments**: Explain WHY, not WHAT (code should be self-documenting)

**Example**:
```python
def calculate_velocity(distance: float, time: float) -> float:
    """Calculate velocity from distance and time.

    Args:
        distance: Distance traveled in meters
        time: Time taken in seconds

    Returns:
        Velocity in meters per second
    """
    return distance / time
```

### ROS2 Standards

- **Node Names**: Lowercase with underscores (e.g., `path_planner_node`)
- **Topic Names**: Follow ROS2 conventions (e.g., `/robot/cmd_vel`)
- **Parameters**: Define in YAML config files, not hardcoded
- **Launch Files**: Use Python launch files (not XML)

## Testing Requirements

### Unit Tests (Optional but Recommended)

- Located in `tests/` directory
- Use `pytest` framework
- Test core logic functions (not ROS2 infrastructure)
- CI/CD runs tests automatically

**Example**:
```python
# tests/test_path_planner.py

def test_a_star_finds_path():
    grid = create_test_grid()
    start = (0, 0)
    goal = (5, 5)

    path = a_star(start, goal, grid)

    assert path is not None
    assert path[0] == start
    assert path[-1] == goal
```

### Integration Tests (Required for CI/CD)

- Launch file must run without errors
- Robot must spawn in Gazebo successfully
- Basic functionality check (e.g., robot moves when commanded)

## Validation Checklist

Before committing a project:

- [ ] README.md has all required sections
- [ ] Code follows Python/ROS2 style standards
- [ ] Launch file runs without errors (`ros2 launch` succeeds)
- [ ] Gazebo simulation starts successfully
- [ ] Success criteria are objective and measurable
- [ ] No hardcoded paths or parameters (use config files)
- [ ] `package.xml` has correct dependencies
- [ ] Unit tests pass (if present)

## Project Type Specifications

### Small Projects (3-5 total)

- **Scope**: Single concept application
- **Estimated Time**: 1-3 hours
- **Examples**: Sensor visualization, basic motion control, obstacle detection
- **Code Size**: 50-200 lines of Python
- **Complexity**: 1-2 ROS2 nodes, simple launch file

### Mid-Size Projects (1-2 total)

- **Scope**: Multi-concept integration
- **Estimated Time**: 5-10 hours
- **Examples**: Autonomous navigation, pick-and-place with vision
- **Code Size**: 200-500 lines of Python
- **Complexity**: 3-5 ROS2 nodes, multiple topics, parameter tuning

### Integrated Project (1 total)

- **Scope**: Combination of 2-3 small projects into functional system
- **Estimated Time**: 10-15 hours
- **Example**: Warehouse robot (navigation + vision + manipulation)
- **Code Size**: 500-1000 lines of Python
- **Complexity**: 5-10 ROS2 nodes, state machine, advanced features
- **README**: Must list which small projects it combines

## CI/CD Integration

Each project is automatically tested in GitHub Actions:

```yaml
# .github/workflows/test-examples.yml

- name: Test Project
  run: |
    source /opt/ros/humble/setup.bash
    cd examples/[project-type]/[project-name]
    colcon build
    colcon test
    ros2 launch [project_name] [launch_file].launch.py --test-mode
```

Tests must pass before merging to main branch.
