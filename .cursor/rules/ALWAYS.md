# Core Repository Rules (Always Active)

## Critical Rules

### Architecture

- **Feature-based structure**: Code in `src/features/`, extract to `src/components/` only when used in 2+ features
- **Astro islands**: Use Astro for static, React for interactive (`client:load`, `client:idle`, `client:visible`)
- **Path aliases**: Use `@/`, `@components/`, `@features/`, `@hooks/`, `@store/`, `@i18n/`, etc.

### Code Style

- **Prettier**: Auto-formats (2 spaces, semicolons, double quotes)
- **ESLint**: Must pass before commit
- **Naming**: Components=PascalCase, hooks=useCamelCase, utils=camelCase

### Accessibility (CRITICAL)

- **ALWAYS** add `type="button"` to non-submit buttons
- **ALWAYS** add `aria-label` to icon-only buttons
- Use semantic HTML: `<button>`, `<a>`, not `<div onClick>`
- Proper `<label htmlFor>` for form inputs

### TypeScript

- No `any` types (use `unknown` if needed)
- Define explicit types for props and functions
- Use interfaces for objects, types for unions

### State Management

- **Zustand**: Global client state (see `src/store/header/store.ts`)
- **React Hook Form + Zod**: Form state and validation
- **Astro props**: Server-side data

### Internationalization

- **ALWAYS** use `t(locale, "key")` for user-facing text
- Add translations to both `en/` and `es/`
- Keep translation structures identical

### Testing

- Co-locate tests with source files
- `*.test.ts` for utils, `*.test.tsx` for components
- Coverage goals: Utils 90%+, Components 80%+

### Git Workflow

- **Pre-commit**: Formats and lints staged files (fast, ~2-5s)
- **Pre-push**: Runs `validate` (format, lint, typecheck, test)
- Run `npm run validate` before pushing

## Import Order

```typescript
// 1. External dependencies
import { useState } from "react";

// 2. Internal (path aliases)
import { t } from "@/i18n";
import Button from "@components/Button";

// 3. Relative imports
import { helper } from "./helpers";
```

## Anti-Patterns to Avoid

- ❌ Business logic in components → Extract to hooks/utils
- ❌ `any` type → Use proper types
- ❌ `<div onClick>` → Use `<button>`
- ❌ Hardcoded strings → Use `t()` for i18n
- ❌ Missing button types → Always add `type="button"`

## Quick Reference

- **Docs**: `docs/README.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Testing**: `docs/TESTING.md`
- **i18n**: `docs/I18N.md`
- **Contributing**: `docs/CONTRIBUTING.md`
