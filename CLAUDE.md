# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Personal portfolio site built with Remix, React, and TypeScript.
Deployed on Vercel. Features philosophy/about section and project catalog.

## Development Commands

### Essential Commands
- **Start dev server**: `npm run dev` (runs on localhost:3000)
- **Build for production**: `npm run build`
- **Type checking**: `npm run typecheck` - Run this before committing changes
- **Code formatting**: `npm run format` (Prettier)

### Notes on Testing and Linting
- No test scripts are currently configured in package.json
- ESLint is installed (`@remix-run/eslint-config`) but no lint script is defined
- Always run `npm run typecheck` to verify TypeScript before committing

### TypeScript
- Use strict type checking
- Prefer interfaces over types for object shapes
- Always define return types for functions
- Use const assertions where appropriate
- Avoid `any` - use `unknown` if type is truly unknown

### React/Remix
- Use functional components with TypeScript
- Prefer named exports for components
- Use Remix loaders/actions for data fetching
- Component file structure: `ComponentName.tsx`
- Co-locate component-specific types in the same file

### Component Structure
```typescript
// Imports grouped: React, third-party, local
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { ProjectCard } from "~/components/features/ProjectCard";
import { formatDate } from "~/lib/utils";

// Types defined before component
interface Project {
  id: string;
  title: string;
  description: string;
}

// Component with explicit return type
export default function Projects(): JSX.Element {
  // Implementation
}
```

## Architecture Overview

### Tech Stack
- **Framework**: Remix (full-stack React framework)
- **Styling**: Tailwind CSS v4 with dark mode support (`media` preference)
- **UI Components**: shadcn/ui (New York style, with path aliases)
- **Deployment**: Vercel (with @vercel/remix preset)
- **Analytics**: Vercel Analytics integrated

### Project Structure
- `app/` - Main source directory (Remix convention)
  - `routes/` - File-based routing
  - `lib/` - Utility functions and components
  - `root.tsx` - App shell with dark/light theme support
- `public/` - Static assets
- Components should be placed in `app/components/` (as per shadcn/ui config)

### Key Configuration
- **Vite**: Custom config with Tailwind, Remix, and Vercel presets
- **shadcn/ui**: Configured with path aliases (`~/components`, `~/lib/utils`, etc.)
- **Dark Mode**: Automatic based on system preference (`darkMode: 'media'`)
- **TypeScript**: Strict configuration

### Current State
This is Paolo's personal website, currently showing a construction page with animation. The site includes:
- Welcome page at `/` with construction notice
- Edge route at `/edge`
- Dark/light theme support built into root layout
- Custom construction animation component

### Development Notes
- Use `~` alias for app directory imports (e.g., `~/lib/utils`)
- Follow Remix file-based routing conventions
- Respect existing Tailwind and shadcn/ui component patterns
- The site supports both light and dark themes automatically

## Project-Specific Guidelines

### Project Catalog
- Projects stored as markdown files in `/lab/projects/`
- Each project has frontmatter: title, date, tags, description, link
- Use gray-matter to parse markdown
- Generate slugs from filenames

### Styling Approach
- Mobile-first responsive design
- Prefer composition over prop drilling
- Keep components small and focused
- Use semantic HTML
- Site needs to be modern, minimal and user-catching
- UI shall use purple-ish active color and adapt background color to dark/light mode
- Follow best-practices for coding
- Always verify code changes are not preventing build from succeeding

### Performance
- Use Remix's loader functions for data fetching
- Implement ISR where appropriate for Vercel
- Optimize images with Remix Image component
- Lazy load below-the-fold content

## Dependencies Management
- Keep all dependencies up to date
- Use exact versions in package.json for stability
- Document any version pinning reasons

## Testing
- Use Vitest for component tests
- Use Playwright for E2E/Acceptance tests
- Test user interactions, not implementation details
- Prioritize integration tests over unit tests

## CI/CD
- GitHub Actions for automated testing and deployment
- Dependabot for dependency updates
- Preview deployments on pull requests

## What to Avoid
- No default exports except for route modules (Remix convention)
- No inline styles (use your styling solution)
- No large components (split at ~150 lines)
- No unused imports or variables
- No console.logs in production code

## Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (WCAG AA minimum)

## Git Workflow
- Conventional commits: `feat:`, `fix:`, `chore:`, etc.
- Feature branches from main
- Squash merge to main