# ⚡ Circuit Sage: The Smart Way to Learn Digital Electronics

[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-F43F5E?style=for-the-badge&logo=lucide)](https://lucide-react.com/)

**Circuit Sage** is an immersive, AI-powered educational platform designed to bridge the gap between theoretical electronics and hands-on laboratory experience. Built for both students and professors, it transforms the browser into a high-fidelity virtual electronics lab.

---

## 🚀 Key Features

### 🧪 State-of-the-Art Virtual Lab
A high-performance simulation canvas featuring:
- **Orthogonal Manhattan Wiring**: Clean, professional-grade circuit layouts with automatic right-angle routing.
- **Snapping Grid System**: 20px precision grid for pixel-perfect component placement.
- **Dynamic Physics Engine**: Real-time signal propagation through component nets. Wires "glow" when live!
- **Interactive Component Library**: From basic logic gates to complex MCUs (Arduino Uno, ESP32, Pi Pico) and sensors (PIR, Ultrasonic, Potentiometers).

### 🎓 Immersive "Board Exams" (Test Mode)
Don't just build—prove it. Our new **Practical Lab Runner** offers:
- **Mission Briefings**: Challenges start with a formal set of objectives and instructions.
- **Strict Verification**: The system verifies physical electrical connections (nets) and MCU code keywords to ensure true understanding.
- **Real-Time Feedback**: Instant guidance if a circuit is wired incorrectly or code is missing logic.

### 🤖 AI Lab Tutor
A built-in **AI Assistant** that acts as a 24/7 teaching assistant:
- **Context-Aware Assistance**: The AI knows which challenge you are attempting.
- **Guided Hints**: Instead of giving solutions, it provides progressive hints to help students solve problems themselves.

### 📊 Gamified Progress
- **Course Dashboard**: 7 AI-powered learning modules from basic logic to advanced MCU applications.
- **XP & Certification**: Earn rewards and track your journey from Novice to Sage.

---

## 🛠️ Technology Stack

- **Core**: React 19 + Vite (for lightning-fast development)
- **Animation**: Framer Motion (buttery smooth UI transitions and physical feedback)
- **Styling**: Vanilla CSS + TailwindCSS (for the dashboard layout)
- **Icons**: Lucide-React
- **Logic**: Custom Javascript-based Simulation Engine (Manhattan wiring & Net-crawling)

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/circuit-sage.git
   cd circuit-sage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📐 Project Structure

```bash
src/
├── components/          # Reusable UI (Sidebar, AI Assistant, Module Cards)
├── data/                # Database of components, challenges, and lesson modules
├── pages/               # Main VIEWS (Dashboard, Lab, Test Runner)
├── utils/               # The "Brain" (Simulation Logic, Net Crawling, MCU Interpreters)
└── assets/              # Global styles and design tokens
```

---

## 🛡️ Laboratory Safety
*Remember: While this is a virtual lab, the logic follows real-world electronics principles. Short-circuiting your virtual Arduino Pin 13 to ground won't smoke your PC, but the software will definitely let you know it's a bad idea!*

---
*Created by [Antigravity](https://github.com/google-deepmind) for Advanced Agentic Coding*