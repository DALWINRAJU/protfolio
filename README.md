# 🎨 Dalwin's 3D Sketch Portfolio

> **An immersive, hand-drawn 3D interactive portfolio experience for Dalwinraju R — Software Developer, Frontend Developer & UI/UX Designer.** Built with React 19, Three.js, React Three Fiber, and GSAP.

---

[![React 19](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.6-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://docs.pmnd.rs/react-three-fiber)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## ✨ Overview

**Dalwin's 3D Sketch Portfolio** is a unique sketchbook-themed 3D interactive web experience. It blends hand-drawn pencil & paper aesthetics with real-time 3D web graphics, spatial ambient audio, interactive room exploration, and smooth paper-style transitions.

Visitors walk through a hand-sketched architectural corridor, inspect gallery exhibits and certificates, explore project showcases, and interact with 3D rooms.

---

## 🚀 Key Features

- 🎭 **3D Hand-Drawn Interactive World**: Explore 3D sketch rooms and environments rendered via React Three Fiber and Three.js.
- ⚡ **Adaptive Performance Engine**: Dynamic hardware tiering that auto-scales DPR, shadows, antialiasing, and texture resolution based on the user's GPU & CPU capabilities.
- 📜 **Handwritten & GSAP Animations**: Smooth camera movements, custom paper transitions, and animated stroke-drawing effects via Vara.js and GSAP.
- 🎧 **Spatial Audio System**: Custom audio manager providing room ambience, footsteps, interactive sound effects, and volume controls.
- 🖼️ **Interactive Frames & Certificates**: Inspectable gallery frames and certificates with full rotation, zoom, and inspection capabilities.
- 🗺️ **Navigation & Teleportation**: Quick-access map UI and deep-link routing for seamless room switching.
- 📱 **Responsive & Mobile Ready**: Tailored layouts, touch controls, retina DPR scaling, and optimized asset preloading across desktop, tablet, and mobile browsers.

---

## 🏛️ Interactive Rooms

1. **The Corridor**: The entry hall featuring 3D avatar, floating typography, inspectable certificates, and doors leading to each room.
2. **About Me**: Interactive sketchbook highlighting Dalwin's education, journey, technical background, and passion for software engineering.
3. **Projects Gallery**: Curated showcase of software projects with live demo links, source code, and tech tags.
4. **Skills Studio**: 3D interactive terminal and monitors illustrating core competencies across Frontend, Backend, Database, and UI/UX.
5. **Contact Room**: 3D interactive paper letter interface allowing direct communication and inquiries.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Core Framework** | React 19, React Router 7, Vite |
| **3D & Canvas** | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), `@react-three/postprocessing` |
| **Animation & Motion** | GSAP (`@gsap/react`), Vara.js, Custom CSS/SCSS keyframes |
| **Styling** | Sass (SCSS), Modern CSS Custom Properties |
| **State & Context** | React Context API (`AudioManager`, `PerformanceContext`, `SceneContext`, `AchievementsContext`) |
| **Icons & Assets** | Lucide React, Custom Hand-Drawn WebP/SVG Textures |

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/DALWINRAJU/protfolio.git
cd protfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Scripts Overview

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launch local development server via Vite |
| `npm run build` | Bundle and optimize production files into `dist/` |
| `npm run preview` | Serve the local `dist/` production build |
| `npm run lint` | Run Oxlint for fast code quality checks |

---

## ☁️ Deployment Guide

### Deploying on Render (Static Site)

1. Sign in to [Render Dashboard](https://dashboard.render.com/) with your GitHub account (**DALWINRAJU**).
2. Click **New +** → **Static Site**.
3. Select your repository: **`protfolio`**.
4. Configure the build parameters:
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**. Render will build and deploy your site with a free SSL certificate.

---

## 📂 Project Structure

```text
sketch-portfolio/
├── dist/                  # Production build output
├── public/                # Static assets, fonts, sounds, textures & models
├── src/
│   ├── assets/            # Project assets & branding
│   ├── components/
│   │   ├── canvas/        # 3D R3F Experience, lighting & 3D room objects
│   │   ├── dom/           # DOM overlays, preloader & paper transitions
│   │   └── ui/            # Navigation controls, achievements & HUD overlays
│   ├── config/            # Texture preload manifests & device rules
│   ├── context/           # Audio, performance, scene & achievements state
│   ├── hooks/             # Custom React hooks (meta tags, resize, interaction)
│   ├── sections/          # 2D/3D Sections (Hero, About, Projects, Skills, Contact)
│   ├── styles/            # SCSS stylesheets & visual tokens
│   ├── utils/             # Sound manager & math helper functions
│   ├── App.jsx            # Main Application entry & Canvas context provider
│   └── index.css          # Global styling tokens & custom utility classes
├── package.json           # Dependencies and build scripts
└── README.md              # Project documentation
```

---

## 👤 Author

**Dalwinraju R**
- **GitHub**: [@DALWINRAJU](https://github.com/DALWINRAJU)
- **Role**: Software Developer | Frontend Developer | UI/UX Designer
- **Email**: [dalwinraju2006@gmail.com](mailto:dalwinraju2006@gmail.com)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  Crafted with ❤️ and ☕ by Dalwinraju R
</p>
