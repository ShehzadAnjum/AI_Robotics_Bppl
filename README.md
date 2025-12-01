# Physical AI & Humanoid Robotics - Interactive Educational Book

An interactive, project-based educational platform for learning Physical AI and Humanoid Robotics from scratch. Built with Docusaurus, following simulation-first pedagogy.

## 🎯 Target Audience

**Complete beginners** with minimal background in electronics, mechanics, or programming → **Intermediate practitioners** capable of independent system design.

## 📚 Content Structure

**15 Chapters** organized in tiers:

1. **Foundational** (Ch 1-3): Electronics, mechanics, Python basics
2. **ROS2 Fundamentals** (Ch 4-5): ROS2 setup, sensor integration
3. **Motion & Control** (Ch 6-7): Motion control, obstacle avoidance
4. **Navigation** (Ch 8-9): Autonomous navigation, SLAM
5. **Vision & Manipulation** (Ch 10-11): Computer vision, manipulation
6. **Integration** (Ch 12-13): Multi-robot systems, end-to-end project
7. **Advanced** (Ch 14-15): Sim-to-real transfer, Isaac Sim (optional)

## ✨ Features

- **12-Element Chapter Structure**: Hooks, driving questions, examples, practice, assignments
- **Simulation-First**: Learn with Gazebo before hardware (90% of examples)
- **70/30 Practical/Theory Balance**: Hands-on learning prioritized
- **Self-Directed Learning**: No solution keys - validate via simulation
- **Offline Reading**: PWA support for offline content access
- **Responsive**: Works on mobile, tablet, and desktop

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/robotics_book.git
cd robotics_book
npm install
```

### Development

```bash
npm start
```

Opens development server at `http://localhost:3000`

### Build

```bash
npm run build
```

Generates static content in `build/` directory

### Testing

```bash
npm test              # Run Playwright tests
npm run test:ui       # Run tests with UI
npm run lint          # Lint code
npm run format        # Format code with Prettier
```

## 📖 Learning Objectives

By completing this book, students will:

- Understand core Physical AI and robotics terminology
- Complete 3-5 small projects, 1-2 mid-size projects, 1 integrated project
- Master simulation-first workflows (Gazebo + ROS2)
- Select appropriate sensors and design motion control algorithms
- Build autonomous navigation and vision systems
- Integrate multiple concepts into functional robots

## 🏗️ Project Structure

```
robotics_book/
├── docs/                  # MDX content (chapters)
│   ├── foundations/       # Ch 1-3
│   ├── ros2-fundamentals/ # Ch 4-5
│   ├── motion-control/    # Ch 6-7
│   ├── navigation/        # Ch 8-9
│   ├── vision-manipulation/ # Ch 10-11
│   ├── integration/       # Ch 12-13
│   └── advanced/          # Ch 14-15
├── src/
│   └── components/        # React components (12-element structure)
├── static/                # Images, diagrams
├── tests/                 # Playwright tests
│   ├── content-quality/
│   ├── navigation/
│   ├── performance/
│   └── responsive/
├── specs/                 # Feature specifications
└── .specify/              # SpecKit Plus templates

```

## 🧪 Testing

- **Content Quality**: 12-element structure validation
- **Performance**: <2s load time (SC-012)
- **Navigation**: <30s topic discovery (SC-014)
- **Responsive**: Mobile/tablet/desktop compatibility (SC-013)

## 🛠️ Tech Stack

- **Platform**: Docusaurus 3.6.x (React-based static site generator)
- **Language**: TypeScript + Python (for code examples)
- **Testing**: Playwright + Lighthouse CI
- **Linting**: ESLint + Prettier
- **Diagrams**: Mermaid + Excalidraw
- **Deployment**: GitHub Pages

## 📋 Development Phases

- **Phase A** ✅: Architecture & Infrastructure (COMPLETE)
- **Phase B** (Current): Writing & Research (Chapters 1-3 only)
- **Phase C** (Future): Intelligence & Interactivity (RAG chatbot, semantic search)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📜 License

[Add license information]

## 📧 Contact

[Add contact information]

---

Built with ❤️ using [Docusaurus](https://docusaurus.io/)
