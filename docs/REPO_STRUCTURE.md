# Repository Structure

This document explains the folder organization and file naming conventions used in this project.

## Root Directory

```
pangea-landing-remake/
├── .github/              # GitHub-specific files (workflows, templates)
├── .husky/               # Git hooks (pre-commit, pre-push)
├── .vscode/              # VS Code settings and extensions
├── docs/                 # Documentation (you are here!)
├── public/               # Static assets (served as-is)
├── src/                  # Source code
├── .gitignore            # Git ignore rules
├── .nvmrc                # Node version specification
├── .prettierignore       # Prettier ignore rules
├── .prettierrc           # Prettier configuration
├── astro.config.mjs      # Astro configuration
├── eslint.config.js      # ESLint configuration (flat config)
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── README.md             # Project overview
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest test configuration
└── vitest.setup.ts       # Vitest setup file
```

## Source Directory (`src/`)

### Overview

```
src/
├── components/           # Shared, reusable components
├── constants/            # Static data and configuration
├── features/             # Feature-based modules
├── hooks/                # Custom React hooks
├── i18n/                 # Internationalization
├── images/               # Image assets
├── layouts/              # Page layouts
├── pages/                # Astro pages (file-based routing)
├── store/                # Global state (Zustand)
├── styles/               # Shared styles and utilities
├── types/                # TypeScript type definitions
└── env.d.ts              # Environment type declarations
```

### Detailed Breakdown

#### `components/` - Shared Components

Reusable components used across multiple features.

```
components/
├── Inputs/               # Form input components
│   ├── TextInput.tsx
│   ├── TextAreaInput.tsx
│   ├── SelectInput.tsx
│   ├── RadioInput.tsx
│   └── FileInput.tsx
├── icons/                # Icon components
│   ├── Logo.tsx
│   ├── Logo.astro
│   ├── ArrowIcon.tsx
│   └── socials/          # Social media icons
│       ├── Instagram.astro
│       ├── LinkedIn.astro
│       └── SocialIcons.astro
├── OptionItem/           # Option/choice components
│   ├── ButtonOptionItem.tsx
│   ├── LinkOptionItem.tsx
│   └── styles.ts
└── slider/               # Slider/carousel components
    ├── Buttons.tsx
    └── StepIndicator.tsx
```

**Rule**: Components here must be used in 2+ features. Feature-specific components stay in `features/`.

#### `constants/` - Static Data

Configuration and static data that doesn't change.

```
constants/
├── drivenBy.ts           # "Driven by" section data
├── FAQ.ts                # FAQ questions and answers
├── routes.ts             # Route definitions (en/es)
├── services.ts           # Services data
└── testimonials.ts       # Testimonial data
```

**Naming**: Use camelCase for files, UPPER_SNAKE_CASE or camelCase for exports.

#### `features/` - Feature Modules

Self-contained feature modules with their own components, hooks, and logic.

```
features/
├── ContactUs/            # Contact form feature
│   ├── ContactUsForm.tsx
│   ├── FormWrapper.tsx
│   ├── StepCounter.tsx
│   ├── HiddenForm.astro
│   ├── Content/          # Step components
│   │   ├── Content.tsx
│   │   ├── Step00.tsx
│   │   ├── Step01.tsx
│   │   └── ...
│   ├── hooks/            # Feature-specific hooks
│   │   ├── useContactUsFormTitle.tsx
│   │   └── useHandleContactUsSubmit.tsx
│   ├── validations.ts    # Zod schemas
│   └── formHelpers.ts    # Helper functions
├── Header/               # Header/navigation
│   ├── Header.tsx
│   ├── NavigationMenu.tsx
│   └── NavigationMenuFooter.tsx
├── Hero/                 # Hero section
├── Footer/               # Footer
├── Solutions/            # Solutions section
├── Testimonials/         # Testimonials
└── ...
```

**Organization principles**:

- Each feature is self-contained
- Feature-specific components stay in the feature folder
- Shared logic goes to `hooks/` or `utils/` at root level
- Complex features have subfolders (Content/, hooks/, etc.)

#### `hooks/` - Custom React Hooks

Reusable React hooks used across features.

```
hooks/
├── useCarousel.tsx       # Carousel/slider logic
├── useFreezeScrollbar.tsx # Scroll lock utility
├── useGetUrl.tsx         # Current URL helper
└── useIsScrolled.tsx     # Scroll position detection
```

**Naming**: Always prefix with `use` (React convention).

#### `i18n/` - Internationalization

Translation system and locale data.

```
i18n/
├── index.ts              # Main i18n exports
├── t.ts                  # Translation function
├── t.test.ts             # Translation tests
└── translations/         # Translation files
    ├── en/               # English translations
    │   ├── index.ts
    │   ├── header.ts
    │   ├── footer.ts
    │   ├── landing.ts
    │   ├── contact-us.ts
    │   └── ...
    └── es/               # Spanish translations
        ├── index.ts
        ├── header.ts
        └── ...
```

**Structure**: Translations are organized by section, not by page.

#### `layouts/` - Page Layouts

Astro layout components for pages.

```
layouts/
└── MainLayout.astro      # Main site layout
```

**Usage**: Wrap pages with layouts for consistent structure.

#### `pages/` - Astro Pages (Routes)

File-based routing. File structure = URL structure.

```
pages/
├── index.astro                    # / (home)
├── who-we-are.astro              # /who-we-are
├── our-work.astro                # /our-work
├── contact-us/
│   ├── index.astro               # /contact-us
│   └── thank-you.astro           # /contact-us/thank-you
├── solutions/
│   ├── web-development.astro     # /solutions/web-development
│   ├── ux-ui.astro               # /solutions/ux-ui
│   ├── qa.astro                  # /solutions/qa
│   ├── project-management.astro  # /solutions/project-management
│   └── chatbot.astro             # /solutions/chatbot
└── es/                           # Spanish routes (/es/*)
    ├── index.astro               # /es
    ├── quienes-somos.astro       # /es/quienes-somos
    ├── nuestro-trabajo.astro     # /es/nuestro-trabajo
    ├── contactanos/
    │   ├── index.astro           # /es/contactanos
    │   └── gracias.astro         # /es/contactanos/gracias
    └── servicios/
        ├── desarrollo-web.astro  # /es/servicios/desarrollo-web
        └── ...
```

**i18n routing**:

- Default locale (en): No prefix (`/`)
- Spanish (es): `/es` prefix
- Configured in `astro.config.mjs`

#### `store/` - Global State

Zustand stores for client-side state.

```
store/
└── header/
    └── store.ts          # Header state (mobile menu, solutions menu)
```

**Pattern**: Each store in its own folder with `store.ts` file.

#### `styles/` - Shared Styles

Shared style utilities and constants.

```
styles/
├── button.ts             # Button variant styles (CVA)
├── classNameMerge.ts     # cn() utility (clsx + tailwind-merge)
├── constants.ts          # Style constants
└── global.css            # Global CSS
```

#### `types/` - TypeScript Types

Shared TypeScript type definitions.

```
types/
├── forms.ts              # Form-related types
├── i18n.ts               # i18n utility types
└── solutions.ts          # Domain-specific types
```

**Rule**: Only shared types go here. Feature-specific types stay in feature folders.

## File Naming Conventions

### Components

- **React components**: PascalCase, `.tsx` extension
  - Examples: `Header.tsx`, `ContactUsForm.tsx`, `TextInput.tsx`
- **Astro components**: PascalCase, `.astro` extension
  - Examples: `Hero.astro`, `MainLayout.astro`, `Footer.astro`

### Utilities & Logic

- **Hooks**: camelCase with `use` prefix, `.tsx` extension
  - Examples: `useCarousel.tsx`, `useIsScrolled.tsx`
- **Utilities**: camelCase, `.ts` extension
  - Examples: `formHelpers.ts`, `classNameMerge.ts`
- **Constants**: camelCase, `.ts` extension
  - Examples: `routes.ts`, `services.ts`
- **Types**: camelCase, `.ts` extension
  - Examples: `forms.ts`, `i18n.ts`

### Tests

- **Unit tests**: `*.test.ts` (Node environment)
- **Component tests**: `*.test.tsx` (jsdom environment)
- **Astro tests**: `*.spec.ts` (custom environment)

**Location**: Co-located with source files.

Examples:

```
src/i18n/t.ts
src/i18n/t.test.ts

src/components/icons/socials/SocialIcons.astro
src/components/icons/socials/SocialIcons.spec.ts
```

## Import Order Convention

Organize imports in this order:

```typescript
// 1. External dependencies
import { useState } from "react";
import { z } from "zod";

// 2. Internal modules (path aliases)
import { t, type Locale } from "@/i18n";
import TextInput from "@components/Inputs/TextInput";
import { useHeaderStore } from "@store/header/store";

// 3. Relative imports
import { formHelpers } from "./formHelpers";
import type { Props } from "./types";

// 4. Styles (if any)
import "./styles.css";
```

## Documentation Location

```
docs/
├── README.md                  # Documentation hub
├── ARCHITECTURE.md            # This file
├── REPO_STRUCTURE.md          # Folder organization
├── SCRIPTS.md                 # npm scripts reference
├── TESTING.md                 # Testing guide
├── LINTING_FORMATTING.md      # Linting/formatting
├── I18N.md                    # i18n guide
├── STATE_MANAGEMENT.md        # State patterns
├── CONTRIBUTING.md            # Contribution guidelines
├── AUDIT_REPORT.md            # Audit findings
├── AI_CHANGELOG.md            # AI changes log
└── private/                   # Personal notes (gitignored)
    ├── notes.md
    └── todos.md
```

## When to Create New Folders

### Create a new feature folder when:

- Building a new major feature (e.g., Blog, Dashboard)
- Feature has 3+ related components
- Feature has its own state/hooks/logic

### Create a new component in `components/` when:

- Component is used in 2+ features
- Component is generic and reusable
- Component has no feature-specific logic

### Create a new hook in `hooks/` when:

- Hook is used in 2+ features
- Hook is generic and reusable
- Hook has no feature-specific logic

### Create a new constant file when:

- Data is static and doesn't change
- Data is used in multiple places
- Data is configuration-like

## Path Aliases Reference

Configured in `tsconfig.json` and `astro.config.mjs`:

| Alias          | Path              | Usage             |
| -------------- | ----------------- | ----------------- |
| `@/`           | `src/`            | Root imports      |
| `@components/` | `src/components/` | Shared components |
| `@constants/`  | `src/constants/`  | Constants         |
| `@i18n/`       | `src/i18n/`       | Translations      |
| `@layouts/`    | `src/layouts/`    | Layouts           |
| `@features/`   | `src/features/`   | Features          |
| `@hooks/`      | `src/hooks/`      | Hooks             |
| `@pages/`      | `src/pages/`      | Pages             |
| `@store/`      | `src/store/`      | State             |
| `@styles/`     | `src/styles/`     | Styles            |
| `@utils/`      | `src/utils/`      | Utils             |

## Best Practices

1. **Co-locate related files**: Keep tests, types, and components together
2. **Feature-first organization**: Start in `features/`, extract to `components/` when needed
3. **Avoid deep nesting**: Max 3-4 levels deep
4. **Delete unused code**: Don't leave commented-out code or unused files
5. **Consistent naming**: Follow the conventions above
6. **Clear boundaries**: Features should be self-contained

## Anti-Patterns to Avoid

❌ **Don't**: Create a `utils/` folder with 50 unrelated files
✅ **Do**: Keep utilities close to where they're used

❌ **Don't**: Put everything in `components/`
✅ **Do**: Use `features/` for feature-specific components

❌ **Don't**: Mix `.ts` and `.tsx` randomly
✅ **Do**: Use `.tsx` only when JSX is present

❌ **Don't**: Create folders with only one file
✅ **Do**: Wait until you have 2-3 related files

❌ **Don't**: Use generic names like `helpers.ts`, `misc.ts`
✅ **Do**: Use descriptive names like `formHelpers.ts`, `dateUtils.ts`
