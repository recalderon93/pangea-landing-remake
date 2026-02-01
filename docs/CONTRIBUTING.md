# Contributing Guidelines

Thank you for contributing to this project! This document provides guidelines and standards for contributing.

## Getting Started

### Prerequisites

- Node.js 20.x (check `.nvmrc`)
- npm (comes with Node.js)
- Git

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd pangea-landing-remake

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development Workflow

### 1. Create a Branch

```bash
# Create feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

### Branch Naming

- **Features**: `feature/description`
- **Bug fixes**: `fix/description`
- **Documentation**: `docs/description`
- **Refactoring**: `refactor/description`

Examples:

- `feature/add-blog-section`
- `fix/contact-form-validation`
- `docs/update-readme`
- `refactor/simplify-header-logic`

### 2. Make Changes

Follow the coding standards below.

### 3. Test Your Changes

```bash
# Run all checks
npm run validate

# Or run individually
npm run format:fix
npm run lint:fix
npm run typecheck
npm test
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "Clear, descriptive commit message"
```

**Commit message format**:

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:

```
feat: add dark mode toggle to header

fix: resolve contact form validation error

docs: update testing guide with new patterns

refactor: simplify header state management
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- **Use TypeScript for all files** (except config files)
- **Define explicit types** for function parameters and return values
- **Avoid `any`** - use `unknown` if type is truly unknown
- **Use interfaces for objects**, types for unions/intersections

```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User | null {
  // ...
}

// ❌ Bad
function getUser(id: any): any {
  // ...
}
```

### React Components

- **Use functional components** with hooks
- **Define prop types explicitly**
- **Use default exports** for components
- **Co-locate related files** (component, styles, tests)

```typescript
// ✅ Good
type Props = {
  title: string;
  onClose: () => void;
};

export default function Modal({ title, onClose }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

### Astro Components

- **Use `.astro` extension** for Astro components
- **Define props with TypeScript**
- **Use `---` frontmatter** for logic

```astro
---
import { t, type Locale } from "@/i18n";

type Props = {
  lang: Locale;
  title: string;
};

const { lang, title } = Astro.props;
---

<header>
  <h1>{title}</h1>
  <p>{t(lang, "header.subtitle")}</p>
</header>
```

### Styling

- **Use Tailwind CSS** for styling
- **Use CVA** for component variants
- **Use `cn()` utility** for conditional classes
- **Follow mobile-first** approach

```typescript
import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

const buttonStyles = cva("base-classes", {
  variants: {
    variant: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
    },
  },
});

<button className={cn(buttonStyles({ variant: "primary" }), "extra-class")}>
  Click me
</button>
```

### File Naming

- **Components**: PascalCase
  - `Header.tsx`, `ContactUsForm.tsx`
- **Utilities**: camelCase
  - `formatDate.ts`, `classNameMerge.ts`
- **Hooks**: camelCase with `use` prefix
  - `useCarousel.tsx`, `useIsScrolled.tsx`
- **Tests**: Same name with `.test` or `.spec`
  - `Header.test.tsx`, `formatDate.test.ts`

### Imports

Organize imports in this order:

```typescript
// 1. External dependencies
import { useState } from "react";
import { z } from "zod";

// 2. Internal modules (path aliases)
import { t } from "@/i18n";
import Button from "@components/Button";
import { useHeaderStore } from "@store/header/store";

// 3. Relative imports
import { helper } from "./helpers";
import type { Props } from "./types";

// 4. Styles (if any)
import "./styles.css";
```

### Accessibility

- **Use semantic HTML** (`button`, `nav`, `main`, etc.)
- **Add `aria-label`** to icon-only buttons
- **Ensure keyboard navigation** works
- **Add `alt` text** to images
- **Use proper heading hierarchy** (h1, h2, h3)
- **Associate labels** with form inputs

```typescript
// ✅ Good
<button type="button" aria-label="Close menu">
  <CloseIcon />
</button>

<img src="logo.png" alt="Company logo" />

<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ❌ Bad
<div onClick={handleClick}>
  <CloseIcon />
</div>

<img src="logo.png" />

<input type="email" placeholder="Email" />
```

### Internationalization

- **Use `t()` function** for all user-facing text
- **Add translations** to both `en/` and `es/`
- **Keep translation structures** identical

```typescript
// ✅ Good
<button>{t(locale, "header.cta")}</button>

// ❌ Bad
<button>Contact Us</button>
```

### State Management

- **Use `useState`** for local component state
- **Use React Hook Form** for form state
- **Use Zustand** for shared client state
- **Use Astro props** for server-side data

```typescript
// Local state
const [isOpen, setIsOpen] = useState(false);

// Form state
const form = useForm();

// Shared state
const { showMenu } = useHeaderStore();
```

### Testing

- **Write tests** for utilities, hooks, and components
- **Co-locate tests** with source files
- **Use descriptive test names**
- **Follow AAA pattern** (Arrange, Act, Assert)

```typescript
describe("formatDate", () => {
  test("should format date to YYYY-MM-DD", () => {
    // Arrange
    const date = new Date("2024-01-15");

    // Act
    const result = formatDate(date);

    // Assert
    expect(result).toBe("2024-01-15");
  });
});
```

## Git Hooks

### Pre-commit

Runs automatically on `git commit`:

- Formats staged files
- Lints staged files

**Fast** (~2-5 seconds)

### Pre-push

Runs automatically on `git push`:

- Checks formatting (all files)
- Lints code (all files)
- Runs type check
- Runs all tests

**Slower** (~30-60 seconds)

### Bypassing Hooks

**Not recommended**, but sometimes necessary:

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

Only bypass when:

- Emergency hotfix (fix in next commit)
- Known issue (fix in next commit)
- CI will catch issues

## Pull Request Guidelines

### Before Creating PR

1. **Run validation**: `npm run validate`
2. **Update tests** if needed
3. **Update documentation** if needed
4. **Rebase on latest dev**: `git rebase dev`

### PR Title

Use the same format as commit messages:

```
feat: add dark mode toggle
fix: resolve contact form validation
docs: update contributing guide
```

### PR Description

Include:

1. **What**: What does this PR do?
2. **Why**: Why is this change needed?
3. **How**: How does it work?
4. **Testing**: How was it tested?
5. **Screenshots**: If UI changes

**Template**:

```markdown
## What

Brief description of changes.

## Why

Explanation of why this change is needed.

## How

Technical details of implementation.

## Testing

- [ ] Unit tests added/updated
- [ ] Component tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility tested

## Screenshots

(if applicable)
```

### PR Checklist

Before requesting review:

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log or debug code
- [ ] Accessibility checked
- [ ] i18n translations added (if applicable)
- [ ] TypeScript types defined
- [ ] All checks pass (`npm run validate`)

## Code Review

### As a Reviewer

- **Be constructive** and respectful
- **Explain why** when suggesting changes
- **Approve** when satisfied
- **Test locally** if possible

### As an Author

- **Respond to feedback** promptly
- **Ask questions** if unclear
- **Make requested changes** or explain why not
- **Thank reviewers** for their time

## Common Issues

### "Pre-commit hook is slow"

The pre-commit hook should be fast (2-5 seconds). If it's slow:

1. Check if `lint-staged` is configured correctly
2. Ensure you're only committing necessary files

### "Pre-push hook is failing"

Run checks locally:

```bash
npm run validate
```

Fix issues before pushing.

### "TypeScript errors"

```bash
npm run typecheck
```

Fix type errors based on output.

### "Tests failing"

```bash
npm run test:watch
```

Fix tests in watch mode.

### "Merge conflicts"

```bash
# Update your branch
git checkout dev
git pull origin dev
git checkout your-branch
git rebase dev

# Resolve conflicts
# Then continue
git rebase --continue
```

## Resources

- [Architecture Guide](./ARCHITECTURE.md)
- [Testing Guide](./TESTING.md)
- [i18n Guide](./I18N.md)
- [State Management Guide](./STATE_MANAGEMENT.md)
- [Scripts Reference](./SCRIPTS.md)

## Questions?

- Check the [documentation](./README.md)
- Ask in team chat
- Create an issue

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
