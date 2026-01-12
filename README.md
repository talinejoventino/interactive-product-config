# Interactive Product Configurator

A premium 3D sneaker configurator built with Next.js, Three.js, and GSAP. Features real-time 3D rendering, smooth animations, and an immersive user experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Features

- **Real 3D Model Rendering** - GLB model with PBR materials
- **Interactive Controls** - Drag to rotate, scroll to zoom
- **Dynamic Color Variants** - 4 colorways with smooth transitions
- **Premium Animations** - GSAP-powered micro-interactions
- **Responsive Design** - Single-screen layout, no scrolling needed
- **Accessibility First** - Keyboard navigation, reduced motion support
- **Performance Optimized** - GPU-accelerated rendering, lazy loading

##  Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd interactive-product-configurator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Tech Stack

| Technology | Purpose |

|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety and better DX |
| **Tailwind CSS v4** | Utility-first styling |
| **Three.js** | 3D rendering engine |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful helpers for R3F |
| **GSAP** | Professional-grade animations |


### 3D Rendering

- Uses **React Three Fiber** for declarative 3D
- **Studio lighting setup** with key, fill, and rim lights
- **Environment reflections** for realistic materials
- **Contact shadows** for grounded appearance
- **Auto-rotation** with manual override

### Animations

- **GSAP** for smooth, professional transitions
- **Power3 easing** for natural motion feel
- **Staggered reveals** on component mount
- **Respects `prefers-reduced-motion`**

### Performance

- **Lazy loading** with React Suspense
- **Model preloading** for instant display
- **GPU-accelerated** transforms (transform + opacity)
- **Optimized re-renders** (minimal state updates)

## 🎮 User Interactions

| Action | Result |
|--------|--------|
| **Drag** | Rotate the 3D model |
| **Scroll** | Zoom in/out |
| **Click variant** | Change colorway |
| **Keyboard (Tab)** | Navigate between variants |
| **Keyboard (Enter/Space)** | Select variant |


```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Motion Design Philosophy

- **Luxury slowness**: 0.6-0.8s transitions (premium feel)
- **Power3 easing**: Natural acceleration/deceleration
- **Subtle movements**: No over-animation
- **Purposeful delays**: Stagger for visual rhythm
---

Built with ❤️ using Next.js, Three.js, and GSAP
