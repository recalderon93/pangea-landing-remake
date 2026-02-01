# Source Code Overview

This directory contains all the source code for the Pangea Landing Remake project.

## Directory Structure

```
src/
├── components/       # Shared, reusable components
├── constants/        # Static data and configuration
├── features/         # Feature-based modules
├── hooks/            # Custom React hooks
├── i18n/             # Internationalization
├── images/           # Image assets
├── layouts/          # Page layouts
├── pages/            # Astro pages (file-based routing)
├── store/            # Global state (Zustand)
├── styles/           # Shared styles and utilities
├── types/            # TypeScript type definitions
└── env.d.ts          # Environment type declarations
```

## Key Concepts

### Feature-Based Architecture

Code is organized by feature, not by type. Each feature folder contains everything related to that feature:

```
features/ContactUs/
├── ContactUsForm.tsx      # Main component
├── Content/               # Step components
├── hooks/                 # Feature-specific hooks
├── validations.ts         # Zod schemas
└── formHelpers.ts         # Helper functions
```

**Benefits**:

- Easy to find related code
- Clear feature boundaries
- Easier to delete features
- Better code ownership

### Astro Islands

This project uses Astro's islands architecture:

- Most content is static (pre-rendered at build time)
- Interactive components are React "islands"
- JavaScript is only loaded for interactive parts

**Example**:

```astro
---
import Header from "@features/Header/Header";
---

<div>
  <h1>Static Content</h1>
  <!-- Interactive island -->
  <Header client:load lang="en" />
</div>
```

### Path Aliases

Import using path aliases for cleaner code:

```typescript
import { t } from "@/i18n"; // @/ → src/
import Button from "@components/Button"; // @components/ → src/components/
import { useHeaderStore } from "@store/header/store";
```

See `tsconfig.json` for all available aliases.

## Folder Details

### `components/`

Shared, reusable components used across multiple features.

**Rule**: If a component is used in 2+ features, it goes here. Otherwise, keep it in the feature folder.

**Examples**:

- `Inputs/` - Form input components (TextInput, SelectInput, etc.)
- `icons/` - Icon components
- `slider/` - Slider/carousel components

### `constants/`

Static data that doesn't change:

- `routes.ts` - Route definitions (en/es)
- `services.ts` - Services data
- `testimonials.ts` - Testimonial data
- `FAQ.ts` - FAQ questions and answers

### `features/`

Feature-based modules. Each feature is self-contained:

- `ContactUs/` - Contact form with multi-step flow
- `Header/` - Header and navigation
- `Hero/` - Hero section
- `Footer/` - Footer
- `Solutions/` - Solutions section
- `Testimonials/` - Testimonials section
- And more...

### `hooks/`

Custom React hooks shared across features:

- `useCarousel.tsx` - Carousel/slider logic
- `useIsScrolled.tsx` - Scroll position detection
- `useFreezeScrollbar.tsx` - Scroll lock utility
- `useGetUrl.tsx` - Current URL helper

**Naming**: Always prefix with `use` (React convention).

### `i18n/`

Internationalization system:

- `t.ts` - Translation function
- `translations/en/` - English translations
- `translations/es/` - Spanish translations

**Usage**:

```typescript
import { t } from "@/i18n";
const text = t(locale, "header.cta");
```

### `layouts/`

Astro layout components:

- `MainLayout.astro` - Main site layout

Layouts wrap pages for consistent structure.

### `pages/`

Astro pages (file-based routing):

- `index.astro` → `/`
- `who-we-are.astro` → `/who-we-are`
- `es/index.astro` → `/es`
- `es/quienes-somos.astro` → `/es/quienes-somos`

File structure = URL structure.

### `store/`

Zustand stores for client-side state:

- `header/store.ts` - Header state (mobile menu, solutions menu)

**Pattern**: Each store in its own folder.

### `styles/`

Shared style utilities:

- `button.ts` - Button variant styles (CVA)
- `classNameMerge.ts` - `cn()` utility (clsx + tailwind-merge)
- `constants.ts` - Style constants
- `global.css` - Global CSS

### `types/`

Shared TypeScript type definitions:

- `forms.ts` - Form-related types
- `i18n.ts` - i18n utility types
- `solutions.ts` - Domain-specific types

**Rule**: Only shared types go here. Feature-specific types stay in feature folders.

## File Naming Conventions

- **React components**: PascalCase, `.tsx`
  - `Header.tsx`, `ContactUsForm.tsx`
- **Astro components**: PascalCase, `.astro`
  - `Hero.astro`, `MainLayout.astro`
- **Hooks**: camelCase with `use` prefix, `.tsx`
  - `useCarousel.tsx`, `useIsScrolled.tsx`
- **Utilities**: camelCase, `.ts`
  - `formatDate.ts`, `classNameMerge.ts`
- **Tests**: Same name with `.test` or `.spec`
  - `Header.test.tsx`, `t.test.ts`

## Common Patterns

### Component Structure

```typescript
import type { Props } from "./types";

export default function Component({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Astro Component Structure

```astro
---
// Frontmatter (TypeScript)
import Component from "@components/Component";

type Props = {
  title: string;
};

const { title } = Astro.props;
---

<!-- Template (HTML + components) -->
<div>
  <h1>{title}</h1>
  <Component client:load />
</div>

<style>
  /* Scoped styles */
</style>
```

### Custom Hook Structure

```typescript
export function useCustomHook(initialValue: number) {
  const [value, setValue] = useState(initialValue);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);

  return { value, increment, decrement };
}
```

## Best Practices

1. **Co-locate related files** - Keep tests, types, and components together
2. **Feature-first organization** - Start in `features/`, extract to `components/` when needed
3. **Use path aliases** - Cleaner imports, easier refactoring
4. **Type everything** - Full TypeScript for better DX
5. **Test your code** - Co-locate tests with source files
6. **Follow conventions** - Consistent naming and structure

## Testing

Tests are co-located with source files:

```
src/
├── i18n/
│   ├── t.ts
│   └── t.test.ts
└── components/
    └── Button.tsx
    └── Button.test.tsx
```

**Naming**:

- `*.test.ts` - Unit tests (Node environment)
- `*.test.tsx` - Component tests (jsdom environment)
- `*.spec.ts` - Astro component tests

## Further Reading

- [Architecture Overview](../docs/ARCHITECTURE.md)
- [Repository Structure](../docs/REPO_STRUCTURE.md)
- [Testing Guide](../docs/TESTING.md)
- [Contributing Guidelines](../docs/CONTRIBUTING.md)
