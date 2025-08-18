# Hakim Abdelcadir - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing professional experience as a Senior Frontend Engineer. Built with Next.js 15, TypeScript, and Mantine UI, featuring a clean design and comprehensive project showcase.

**🌐 [View Live Website](https://hakimabdelcadir.vercel.app/)**

![Portfolio Website](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Mantine](https://img.shields.io/badge/Mantine-8-339af0?style=for-the-badge&logo=mantine)

## 🌟 Features

### **Multi-Page Portfolio**

- **Home Page**: Animated counters, social links, and professional introduction
- **About Page**: Detailed bio with auto-scrolling tech showcase
- **Projects Page**: Separated professional and personal projects with detailed descriptions
- **Project Detail Pages**: Individual pages for each project with comprehensive information

### **Modern Design System**

- **Glass-morphism UI**: Beautiful backdrop-blur effects and gradient backgrounds
- **Dark/Light Mode**: Automatic system detection with manual override
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Custom Animations**: Smooth fade-in effects and interactive hover states

### **Advanced Architecture**

- **Multi-layer Architecture**: Services → Repositories → Presenters → Components pattern
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Performance Optimizations**: React.memo, useMemo, useCallback strategically applied
- **Testing Suite**: Jest + React Testing Library for comprehensive test coverage

## 🚀 Tech Stack

### **Core Technologies**

- **Next.js 15** - App Router with TypeScript
- **React 18** - Latest features and concurrent rendering
- **TypeScript** - Full type safety throughout the application
- **Mantine UI** - Modern React components library
- **SCSS Modules** - Scoped styling with CSS custom properties

### **Development Tools**

- **ESLint** - Code quality and consistency
- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing utilities
- **Zod** - Runtime type validation
- **Result Pattern** - Functional error handling

### **Design & Animation**

- **Glass-morphism** - Modern backdrop-filter effects
- **CSS Animations** - Smooth transitions and hover effects
- **Intersection Observer** - Viewport-triggered animations
- **Auto-scrolling Tech Icons** - Seamless infinite scroll showcase

## 🏗️ Architecture

### **Multi-Layer Frontend Architecture**

```
┌─── Components (UI Layer)
├─── Presenters (Business Logic)
├─── Repositories (Data Access)
└─── Services (External APIs)
```

### **Key Architectural Patterns**

- **Separation of Concerns**: Clear boundaries between layers
- **Dependency Injection**: Testable and maintainable code structure
- **Error Handling**: Comprehensive Result<T> pattern implementation
- **Type Safety**: End-to-end TypeScript with runtime validation

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm/yarn/pnpm
- Modern browser with ES2022 support

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript compiler
npm test             # Run test suite
npm test:watch       # Run test suite in watch mode
npm test:coverage    # Run test suite with coverage report
```

## 🧪 Testing

Comprehensive testing strategy including:

- **Unit Tests**: Individual component and utility testing
- **Integration Tests**: Multi-component interaction testing
- **Type Testing**: Runtime type validation with Zod

```bash
npm test              # Run all tests
npm test:watch  # Run tests in watch mode
npm test:coverage # Generate coverage report
```

## 🌐 Deployment

Optimized for deployment on Vercel, Netlify, or any static hosting platform:

```bash
npm run build    # Generate production build
npm run start    # Preview production build locally
```

### **Performance Features**

- Static generation for optimal loading speeds
- CSS optimization with SCSS modules
- Tree-shaking for minimal bundle size

## 🔧 Configuration

### **ESLint Configuration**

- Strict TypeScript rules
- React best practices
- Accessibility linting
- Import organization

### **TypeScript Configuration**

- Strict mode enabled
- Path aliases for clean imports
- Latest ES features support

## 📁 Project Structure

```
src/
├── app/                 # Next.js 15 app router pages
├── components/          # Reusable UI components
├── repositories/        # Data access layer
├── services/           # External API services
├── utils/              # Shared utilities
├── styles/             # Global styles and variables
└── types/              # TypeScript type definitions
```

## 📄 License

This project is private and proprietary.

---

**Built by Hakim Abdelcadir**  
Senior Frontend Engineer | React & TypeScript Specialist | London, UK

[LinkedIn](https://www.linkedin.com/in/hakim-abdelcadir-31497814a/) • [GitHub](https://github.com/poal98-hakim) • [Stack Overflow](https://stackoverflow.com/users/15471452/hakim-abdelcadir)
