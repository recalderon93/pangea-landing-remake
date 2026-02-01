# Architecture Overview

This document describes the architectural patterns and conventions used in this Astro + React + TypeScript project.

## Tech Stack

### Core Framework

- **Astro 5.10**: Static Site Generator with islands architecture
- **React 19.1**: UI library for interactive components (islands)
- **TypeScript 5.8**: Type-safe JavaScript

### Styling

- **Tailwind CSS 4.1**: Utility-first CSS framework
- **CVA (class-variance-authority)**: Component variant management
- **clsx + tailwind-merge**: Conditional class utilities

### State & Forms

- **Zustand 5.0**: Lightweight state management
- **React Hook Form 7.62**: Form state management
- **Zod 3.25**: Schema validation

### Testing

- **Vitest 3.2**: Unit and component testing
- **React Testing Library 16.3**: Component testing utilities
- **jsdom**: DOM environment for tests

## Architecture Patterns

### 1. Astro Islands Architecture

This project uses Astro's islands architecture:

- **Static by default**: Most content is pre-rendered at build time
- **Interactive islands**: React components are hydrated on-demand
- **Partial hydration**: Only interactive parts load JavaScript

**Example**:

```astro
---
// Static Astro component
import Header from "@features/Header/Header";
---

<div>
  <h1>Static Content (No JS)</h1>
  <!-- Interactive island (loads React) -->
  <Header client:load lang="en" />
</div>
```

**Client directives**:

- `client:load` - Load immediately
- `client:idle` - Load when browser is idle
- `client:visible` - Load when component is visible
- `client:only` - Only render on client (no SSR)

### 2. Feature-Based Structure

Code is organized by feature, not by type:

```
src/features/
├── ContactUs/          # Everything related to contact form
│   ├── ContactUsForm.tsx
│   ├── Content/
│   ├── hooks/
│   ├── validations.ts
│   └── formHelpers.ts
├── Header/             # Header feature
│   ├── Header.tsx
│   ├── NavigationMenu.tsx
│   └── NavigationMenuFooter.tsx
└── Hero/               # Hero section
    ├── Hero.astro
    └── HeroTextInput.tsx
```

**Benefits**:

- Easy to find related code
- Clear feature boundaries
- Easier to delete features
- Better code ownership

### 3. Component Hierarchy

```
src/
├── components/         # Shared, reusable components
│   ├── Inputs/        # Form inputs (TextInput, SelectInput, etc.)
│   ├── icons/         # Icon components
│   └── slider/        # Slider components
├── features/          # Feature-specific components
└── layouts/           # Page layouts
```

**Rule**: If a component is used in 2+ features, move it to `components/`. Otherwise, keep it in the feature folder.

### 4. Path Aliases

TypeScript and Vite are configured with path aliases:

```typescript
import { t } from "@/i18n"; // @/ → src/
import TextInput from "@components/Inputs/TextInput";
import { useHeaderStore } from "@store/header/store";
import { Routes } from "@constants/routes";
```

**Available aliases**:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@features/` → `src/features/`
- `@hooks/` → `src/hooks/`
- `@store/` → `src/store/`
- `@constants/` → `src/constants/`
- `@i18n/` → `src/i18n/`
- `@layouts/` → `src/layouts/`
- `@pages/` → `src/pages/`
- `@styles/` → `src/styles/`
- `@utils/` → `src/utils/`

### 5. Component Patterns

#### Variant Components (CVA)

Use CVA for components with multiple visual variants:

```typescript
import { cva } from "class-variance-authority";

const buttonStyles = cva(
  "base classes here",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-800",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        lg: "px-4 py-2 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

// Usage
<button className={buttonStyles({ variant: "secondary", size: "lg" })}>
  Click me
</button>
```

#### Conditional Classes

Use `cn()` utility for conditional classes:

```typescript
import { cn } from "@styles/classNameMerge";

<div className={cn(
  "base-class",
  isActive && "active-class",
  isPending && "pending-class",
  customClassName
)} />
```

### 6. State Management Strategy

**Use Zustand when**:

- State is shared across multiple features
- State needs to persist across route changes
- State is client-side only

**Use React Hook Form when**:

- Managing form state
- Need validation
- Complex form logic

**Use Astro props when**:

- Passing data from server to client
- Static data that doesn't change
- SEO-critical content

**Example Zustand store**:

```typescript
// src/store/header/store.ts
import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Actions = {
  open: () => void;
  close: () => void;
};

export const useStore = create<State & { actions: Actions }>((set) => ({
  isOpen: false,
  actions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  },
}));

// Selector hooks
export const useIsOpen = () => useStore((state) => state.isOpen);
export const useActions = () => useStore((state) => state.actions);
```

### 7. Form Management

Multi-step forms use React Hook Form + Zod:

```typescript
// 1. Define schema
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

// 2. Create form
const form = useForm({
  resolver: zodResolver(schema),
});

// 3. Nested components use context
const NestedInput = () => {
  const { control } = useFormContext();
  const { field } = useController({ name: "email", control });
  return <input {...field} />;
};

// 4. Wrap in provider
<FormProvider {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <NestedInput />
  </form>
</FormProvider>
```

### 8. Internationalization

Custom i18n solution with type-safe keys:

```typescript
import { t, type Locale } from "@/i18n";

// Simple usage
t(locale, "header.cta");

// With variables
t(locale, "greeting", { name: "John" });

// With pluralization
t(locale, "items.count", { count: 5 });
```

**Translation structure**:

```
src/i18n/translations/
├── en/
│   ├── header.ts
│   ├── footer.ts
│   └── index.ts
└── es/
    ├── header.ts
    ├── footer.ts
    └── index.ts
```

### 9. Routing

Astro uses file-based routing:

```
src/pages/
├── index.astro                    # /
├── who-we-are.astro              # /who-we-are
├── solutions/
│   └── web-development.astro     # /solutions/web-development
└── es/                           # Spanish routes
    ├── index.astro               # /es
    └── quienes-somos.astro       # /es/quienes-somos
```

**i18n routing**:

- Default locale (en) has no prefix: `/`
- Other locales have prefix: `/es`
- Configured in `astro.config.mjs`

### 10. Type Safety

**TypeScript strict mode** is enabled via `astro/tsconfigs/strict`.

**Type organization**:

```
src/types/
├── forms.ts       # Form-related types
├── i18n.ts        # i18n utility types
└── solutions.ts   # Domain types
```

**Naming conventions**:

- Interfaces: `UserProfile`, `ApiResponse`
- Types: `Locale`, `RouteKey`
- Props: `Props` or `ComponentNameProps`

## Best Practices

### 1. Component Design

- Keep components small and focused
- Extract complex logic to custom hooks
- Use TypeScript for all props
- Add JSDoc comments for complex components

### 2. Performance

- Use `client:visible` for below-the-fold components
- Lazy load heavy features
- Optimize images with Astro's `<Image>` component
- Minimize JavaScript bundle size

### 3. Accessibility

- Use semantic HTML
- Add `aria-label` to icon-only buttons
- Ensure keyboard navigation works
- Test with screen readers

### 4. Testing

- Test utility functions thoroughly
- Test custom hooks in isolation
- Test component behavior, not implementation
- Use integration tests for critical flows

### 5. Code Organization

- Co-locate related files
- Keep feature folders self-contained
- Share only when necessary
- Delete unused code aggressively

## Common Patterns

### Loading States

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
};
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

try {
  await riskyOperation();
} catch (err) {
  setError(err instanceof Error ? err.message : "Unknown error");
}
```

### Conditional Rendering

```typescript
// Prefer early returns
if (isLoading) return <Spinner />;
if (error) return <Error message={error} />;
return <Content />;

// Over nested ternaries
{isLoading ? <Spinner /> : error ? <Error /> : <Content />}
```

## Anti-Patterns to Avoid

❌ **Don't**: Put business logic in components
✅ **Do**: Extract to hooks or utility functions

❌ **Don't**: Use `any` type
✅ **Do**: Define proper types or use `unknown`

❌ **Don't**: Mutate props
✅ **Do**: Treat props as immutable

❌ **Don't**: Use `div` with `onClick`
✅ **Do**: Use `button` for interactive elements

❌ **Don't**: Hardcode strings
✅ **Do**: Use i18n for all user-facing text

## Further Reading

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
