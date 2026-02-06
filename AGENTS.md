# Agent Guidelines for Amarine Web App

## Build Commands

```bash
# Development server
npm run dev

# Production build (includes TypeScript check)
npm run build

# Preview production build
npm run preview
```

## Lint Commands

```bash
# Run ESLint on all files
npm run lint

# Note: No test framework is currently configured.
# To run a single test (when tests are added), use:
# npm test -- --testNamePattern="test name"
# npm test -- path/to/test.tsx
```

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode enabled**: All strict TypeScript options are active
- **Target**: ES2022 with modern DOM libraries
- **Module**: ESNext with bundler resolution
- **Path alias**: Use `@/` prefix for all imports from `src/`

### Import Conventions

```typescript
// 1. External libraries first
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

// 2. Internal utilities (alphabetical)
import { cn } from "@/lib/utils"

// 3. Internal components (alphabetical)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 4. Types and data
import type { Product, CartItem } from "@/types"
import { products } from "@/data/products"
```

### Component Patterns

Use **function declarations** for components:

```typescript
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

### Styling with Tailwind

- Use `cn()` utility from `@/lib/utils` for class merging
- Use shadcn/ui design system with custom Amarine colors
- Custom colors available: `amarin-pink`, `amarin-peach`, `amarin-cream`, `amarin-gold`, `amarin-terracotta`, `amarin-brown`, `amarin-gray`, `amarin-white`
- Use `data-slot` attributes for component identification
- Follow mobile-first responsive design

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `ProductCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `use-mobile.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types/Interfaces**: PascalCase (e.g., `Product`, `CartItem`)
- **Files**: kebab-case for multi-word files (e.g., `toggle-group.tsx`)

### File Organization

```
src/
  components/ui/       # shadcn/ui components
  components/seo/      # SEO components
  sections/            # Page sections (Header, Footer, Hero, etc.)
  pages/               # Route pages
  contexts/            # React contexts
  hooks/               # Custom hooks
  lib/                 # Utility functions
  types/               # TypeScript types
  data/                # Static data
```

### Error Handling

- Use TypeScript strict types to catch errors at compile time
- No unused locals or parameters allowed
- Handle async errors with try/catch
- Use `noFallthroughCasesInSwitch` for exhaustive switch statements

### ESLint Rules

- React Hooks rules enforced
- React Refresh rules for Vite HMR
- TypeScript ESLint recommended rules
- Ignores `dist/` directory

## Project Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3 + shadcn/ui
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State**: React Context API
- **Notifications**: Sonner
