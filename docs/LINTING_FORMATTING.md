# Linting & Formatting

This document explains the linting and formatting setup, including ESLint, Prettier, and Husky git hooks.

## Overview

This project uses:

- **Prettier** for code formatting
- **ESLint** for code quality and best practices
- **Husky** for git hooks (pre-commit, pre-push)
- **lint-staged** for fast pre-commit checks

## Prettier (Formatting)

### Configuration

File: `.prettierrc`

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": true,
  "arrowParens": "always",
  "printWidth": 80
}
```

### Key Settings

| Setting           | Value  | Meaning                        |
| ----------------- | ------ | ------------------------------ |
| `tabWidth`        | 2      | Use 2 spaces for indentation   |
| `useTabs`         | false  | Use spaces, not tabs           |
| `semi`            | true   | Add semicolons                 |
| `singleQuote`     | false  | Use double quotes              |
| `trailingComma`   | all    | Add trailing commas everywhere |
| `bracketSameLine` | true   | Put `>` on same line as props  |
| `arrowParens`     | always | Always use parens: `(x) => x`  |
| `printWidth`      | 80     | Wrap lines at 80 characters    |

### Plugins

- `prettier-plugin-astro` - Format `.astro` files
- `prettier-plugin-tailwindcss` - Sort Tailwind classes

### Commands

```bash
# Check formatting (no changes)
npm run format

# Fix formatting
npm run format:fix

# Format specific file
npx prettier --write src/components/Button.tsx

# Check specific folder
npx prettier --check src/features/
```

### Ignored Files

File: `.prettierignore`

```
.astro/
node_modules/
dist/
.vscode/
```

### Editor Integration

**VS Code**: Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## ESLint (Code Quality)

### Configuration

File: `eslint.config.js` (Flat Config)

```javascript
export default [
  // JavaScript & TypeScript
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      prettier,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "prettier/prettier": "error",
      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      // ... more rules
    },
  },
  // Astro files
  {
    files: ["**/*.astro"],
    plugins: { astro, prettier },
    rules: {
      ...astro.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
];
```

### Plugins

1. **eslint-plugin-prettier**: Runs Prettier as ESLint rule
2. **eslint-plugin-jsx-a11y**: Accessibility rules for JSX
3. **eslint-plugin-astro**: Astro-specific rules
4. **@typescript-eslint/parser**: TypeScript parsing

### Accessibility Rules

The following jsx-a11y rules are enabled:

| Rule                             | Level | Description                            |
| -------------------------------- | ----- | -------------------------------------- |
| `alt-text`                       | warn  | Images must have alt text              |
| `aria-props`                     | warn  | Valid ARIA properties                  |
| `aria-proptypes`                 | warn  | Valid ARIA property values             |
| `aria-unsupported-elements`      | warn  | ARIA on supported elements             |
| `role-has-required-aria-props`   | warn  | Required ARIA props for roles          |
| `role-supports-aria-props`       | warn  | Valid ARIA props for roles             |
| `anchor-is-valid`                | warn  | Valid anchor elements                  |
| `click-events-have-key-events`   | warn  | Keyboard events for click handlers     |
| `no-static-element-interactions` | warn  | Interactive elements use semantic HTML |
| `label-has-associated-control`   | warn  | Labels associated with controls        |

### Commands

```bash
# Check linting (no changes)
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Lint specific file
npx eslint src/components/Button.tsx

# Lint specific folder
npx eslint src/features/

# Show rule names in output
npx eslint --format=stylish src/
```

### Ignored Files

Configured in `eslint.config.js`:

```javascript
{
  ignores: ["**/.astro/**", "dist/**", "node_modules/**"];
}
```

### Editor Integration

**VS Code**: Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

`.vscode/settings.json`:

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "astro"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Husky (Git Hooks)

### Setup

Husky is automatically installed after `npm install` via the `prepare` script.

```bash
# Manual setup (if needed)
npm run prepare
```

### Pre-commit Hook

File: `.husky/pre-commit`

**What it does**:

- Runs lint-staged on staged files only
- Fast (2-5 seconds)

**Checks**:

1. Format check (Prettier)
2. Lint check (ESLint)

**How it works**:

```bash
npx lint-staged
```

**Configuration** (in `package.json`):

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,astro}": ["prettier --write", "eslint --fix"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### Pre-push Hook

File: `.husky/pre-push`

**What it does**:

- Runs comprehensive validation before push
- Slower (~30-60 seconds)

**Checks**:

1. Format check (all files)
2. Lint check (all files)
3. Type check (TypeScript)
4. Tests (all tests)

**How it works**:

```bash
npm run validate
```

Which runs:

```bash
npm run format && npm run lint && npm run typecheck && npm test
```

### Bypassing Hooks

**Not recommended**, but sometimes necessary:

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**When to bypass**:

- Emergency hotfix (fix in next commit)
- Known failing test (fix in next commit)
- CI will catch issues anyway

**Never bypass**:

- To avoid fixing your code
- Regularly (indicates a problem with hooks)

## lint-staged

### What is lint-staged?

Runs linters only on staged files (files you're about to commit). This makes pre-commit hooks fast.

### Configuration

File: `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,astro}": ["prettier --write", "eslint --fix"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### How It Works

1. You stage files: `git add src/components/Button.tsx`
2. You commit: `git commit -m "message"`
3. Pre-commit hook runs: `npx lint-staged`
4. lint-staged:
   - Finds staged files matching patterns
   - Runs commands on those files only
   - Auto-stages fixed files
   - Commits if all checks pass

### Benefits

- **Fast**: Only checks changed files
- **Automatic fixes**: Auto-formats and fixes linting issues
- **No manual work**: Happens automatically on commit

## Common Workflows

### Starting Development

```bash
# Install dependencies (sets up Husky)
npm install

# Verify hooks are installed
ls -la .husky/
```

### Before Committing

```bash
# Option 1: Let git hooks handle it
git add .
git commit -m "message"
# Hooks run automatically

# Option 2: Fix manually first
npm run format:fix
npm run lint:fix
git add .
git commit -m "message"
```

### Before Pushing

```bash
# Option 1: Let git hooks handle it
git push
# Pre-push hook runs automatically

# Option 2: Run validation manually
npm run validate
git push
```

### Fixing Issues

```bash
# Format issues
npm run format:fix

# Lint issues
npm run lint:fix

# Type issues (manual fix required)
npm run typecheck
# Fix based on error messages

# Test failures
npm run test:watch
# Fix tests in watch mode
```

## Troubleshooting

### "Prettier found errors"

```bash
# See what's wrong
npm run format

# Fix automatically
npm run format:fix
```

### "ESLint found errors"

```bash
# See errors
npm run lint

# Fix auto-fixable errors
npm run lint:fix

# Fix remaining errors manually
```

### "Husky hooks not running"

```bash
# Reinstall hooks
rm -rf .husky
npm run prepare

# Check permissions
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### "lint-staged not working"

```bash
# Check if files are staged
git status

# Check lint-staged config
cat package.json | grep -A 10 "lint-staged"

# Run manually
npx lint-staged
```

### "Pre-push is too slow"

This is expected. Pre-push runs all checks. To speed up:

1. **Run validation before pushing**:

   ```bash
   npm run validate
   git push
   ```

2. **Optimize tests**:

   - Mock external calls
   - Use `test.skip()` for slow tests during development

3. **Push more frequently**:
   - Smaller pushes = faster validation

### "Format and lint conflict"

This shouldn't happen. If it does:

1. **Check ESLint config**:

   - Ensure `prettier/prettier` rule is enabled
   - Ensure no conflicting rules

2. **Run in order**:
   ```bash
   npm run format:fix
   npm run lint:fix
   ```

## Best Practices

### 1. Format on Save

Enable in your editor:

- **VS Code**: `"editor.formatOnSave": true`
- **WebStorm**: Settings → Tools → Actions on Save → Reformat code

### 2. Run Validation Before Push

```bash
npm run validate
```

Catches issues before the pre-push hook.

### 3. Fix Issues Immediately

Don't accumulate linting errors. Fix them as you go.

### 4. Use Auto-fix

```bash
npm run format:fix && npm run lint:fix
```

Fixes most issues automatically.

### 5. Understand the Rules

If a rule keeps triggering:

- Read the rule documentation
- Understand why it exists
- Follow the pattern

### 6. Don't Disable Rules Lightly

```typescript
// ❌ Bad: Disabling without understanding
// eslint-disable-next-line
const x = any;

// ✅ Good: Fix the issue
const x: string = "value";
```

## Customizing Rules

### Changing Prettier Settings

Edit `.prettierrc`:

```json
{
  "printWidth": 100, // Changed from 80
  "singleQuote": true // Changed from false
}
```

Run `npm run format:fix` to reformat all files.

### Changing ESLint Rules

Edit `eslint.config.js`:

```javascript
rules: {
  "jsx-a11y/alt-text": "error", // Changed from "warn"
  "jsx-a11y/click-events-have-key-events": "off", // Disabled
}
```

### Adding New Rules

```bash
# Install plugin
npm install -D eslint-plugin-react-hooks

# Add to config
// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
```

## CI Integration

### GitHub Actions

```yaml
# .github/workflows/ci.yml
- name: Check formatting
  run: npm run format

- name: Lint code
  run: npm run lint

- name: Type check
  run: npm run typecheck

- name: Run tests
  run: npm test
```

### Pre-merge Checks

Ensure CI runs the same checks as pre-push:

```bash
npm run validate
```

## Further Reading

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [jsx-a11y Rules](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
