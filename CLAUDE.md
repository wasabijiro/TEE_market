# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Start development server with Turbopack (fast refresh)
npm run dev

# Build the project for production with Turbopack
npm run build

# Start production server
npm run start

# Run linting checks with Biome
npm run lint

# Format code with Biome
npm run format
```

### Additional Development Commands
```bash
# Type checking (runs through build process)
npm run build

# Install dependencies
npm install

# Clean build cache
rm -rf .next
```

## Architecture Overview

This is a **TEE Edge Platform** - a marketplace for borrowing and lending TEE (Trusted Execution Environment) nodes for secure trading bot execution.

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router
- **React**: 19.1.0 (latest React version)
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4
- **Linting/Formatting**: Biome (replaces ESLint and Prettier)
- **Build Tool**: Turbopack (faster development builds)

### Project Structure
```
src/
└── app/           # App Router pages and layouts
    ├── layout.tsx # Root layout with metadata
    └── page.tsx   # Home page component

Key files:
- biome.json: Linting and formatting rules
- tsconfig.json: TypeScript configuration with @ path alias
- tailwind.config.js: Tailwind CSS configuration
```

### Code Conventions

1. **Import Paths**: Use `@/` alias for imports from src directory
   ```typescript
   import { Component } from '@/app/components/Component'
   ```

2. **Styling**: Use Tailwind CSS utility classes
   - Responsive design with Tailwind breakpoints
   - Dark mode support via Tailwind classes

3. **Type Safety**: TypeScript strict mode is enabled
   - Always define proper types for props and state
   - Avoid using `any` type

4. **File Organization**: 
   - Components go in the app directory following Next.js App Router conventions
   - Use `.tsx` for React components, `.ts` for utilities

### Platform-Specific Context

From SPEC.md, this platform will implement:
- **Node Registry**: Track available TEE nodes with capacity and pricing
- **Job Queue**: Manage bot execution requests
- **Payment System**: Handle transactions between providers and users
- **Security**: TEE attestation and encrypted bot storage

Key considerations:
- Low-latency requirements for trading operations
- High security standards for handling trading strategies
- Verifiable execution through TEE attestation