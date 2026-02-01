# npm Scripts Reference

This document describes all available npm scripts and when to use them.

## Development

### `npm run dev`

Starts the Astro development server.

```bash
npm run dev
```

- **Port**: `http://localhost:4321`
- **Hot reload**: Enabled
- **Use for**: Local development

### `npm run preview`

Preview the production build locally.

```bash
npm run preview
```

- **Requires**: Run `npm run build` first
- **Use for**: Testing production build before deployment

## Building

### `npm run build`

Build the site for production.

```bash
npm run build
```

- **Output**: `dist/` folder
- **Optimizations**: Minification, tree-shaking, image optimization
- **Use for**: Production deployments

## Code Quality

### `npm run format`

Check if files are formatted correctly (no changes made).

```bash
npm run format
```

- **Tool**: Prettier
- **Exit code**: 0 if formatted, 1 if issues found
- **Use for**: CI checks, pre-commit validation

### `npm run format:fix`

Format all files automatically.

```bash
npm run format:fix
```

- **Tool**: Prettier
- **Changes**: Writes formatted files to disk
- **Use for**: Fixing formatting issues

### `npm run lint`

Check for linting errors.

```bash
npm run lint
```

- **Tool**: ESLint
- **Exit code**: 0 if no errors, 1 if errors found
- **Checks**: Code quality, accessibility, best practices
- **Use for**: CI checks, pre-commit validation

### `npm run lint:fix`

Fix auto-fixable linting errors.

```bash
npm run lint:fix
```

- **Tool**: ESLint
- **Changes**: Writes fixes to disk
- **Use for**: Fixing linting issues

### `npm run check`

Run Astro's type checking.

```bash
npm run check
```

- **Tool**: Astro Check (TypeScript)
- **Checks**: Type errors, Astro-specific issues
- **Use for**: Type validation before push

### `npm run typecheck`

Run TypeScript type checking (alias for `check`).

```bash
npm run typecheck
```

- **Tool**: Astro Check
- **Use for**: Pre-push validation

## Testing

### `npm test`

Run all tests once (CI mode).

```bash
npm test
```

- **Tool**: Vitest
- **Mode**: Run once and exit
- **Reporter**: Verbose
- **Use for**: CI, pre-push validation

### `npm run test:watch`

Run tests in watch mode.

```bash
npm run test:watch
```

- **Tool**: Vitest
- **Mode**: Watch for changes and re-run
- **Use for**: Development, TDD

### `npm run test:ci`

Run tests in CI mode with coverage.

```bash
npm run test:ci
```

- **Tool**: Vitest
- **Coverage**: Enabled
- **Reporter**: CI-friendly
- **Use for**: CI pipelines

### `npm run test:coverage`

Run tests and generate coverage report.

```bash
npm run test:coverage
```

- **Tool**: Vitest
- **Output**: `coverage/` folder
- **Reports**: HTML, JSON, text
- **Use for**: Coverage analysis

### `npm run test:unit`

Run only unit tests (\*.test.ts files).

```bash
npm run test:unit
```

- **Tool**: Vitest
- **Pattern**: `**/*.test.ts`
- **Use for**: Quick unit test runs

## Validation

### `npm run validate`

Run all validation checks (format, lint, typecheck, test).

```bash
npm run validate
```

- **Runs**:
  1. `npm run format` (check formatting)
  2. `npm run lint` (check linting)
  3. `npm run typecheck` (check types)
  4. `npm test` (run tests)
- **Exit code**: 0 if all pass, 1 if any fail
- **Use for**: Pre-push validation, CI

## Maintenance

### `npm run prepare`

Set up Husky git hooks (runs automatically after `npm install`).

```bash
npm run prepare
```

- **Tool**: Husky
- **Action**: Installs git hooks
- **Use for**: Automatic (don't run manually)

### `npm run nuke`

Nuclear option: delete node_modules and reinstall.

```bash
npm run nuke
```

- **Actions**:
  1. Delete `node_modules/`
  2. Delete `package-lock.json`
  3. Run `npm install`
- **Use for**: Fixing dependency issues, clean slate

## Astro CLI

### `npm run astro`

Run Astro CLI commands.

```bash
npm run astro -- --help
npm run astro add react
npm run astro check
```

- **Tool**: Astro CLI
- **Use for**: Astro-specific commands

## Git Hooks (Automatic)

These scripts run automatically via Husky:

### Pre-commit Hook

Runs before every commit.

**Checks**:

- Format check (staged files only via lint-staged)
- Lint check (staged files only via lint-staged)

**Speed**: Fast (~2-5 seconds)

**Bypass** (not recommended):

```bash
git commit --no-verify
```

### Pre-push Hook

Runs before every push.

**Checks**:

1. Format check (all files)
2. Lint check (all files)
3. Tests (all tests)
4. Type check (all files)

**Speed**: Moderate (~30-60 seconds depending on test count)

**Bypass** (not recommended):

```bash
git push --no-verify
```

## Common Workflows

### Starting Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server
```

### Before Committing

```bash
npm run format:fix # Fix formatting
npm run lint:fix   # Fix linting
# Git hooks will run automatically on commit
```

### Before Pushing

```bash
npm run validate   # Run all checks
# Or just push (pre-push hook will run automatically)
```

### Fixing Issues

```bash
# Format issues
npm run format:fix

# Lint issues
npm run lint:fix

# Type issues
npm run check
# (Fix manually based on errors)

# Test failures
npm run test:watch
# (Fix tests, watch mode helps)

# Dependency issues
npm run nuke
```

### CI/CD Pipeline

```bash
npm ci             # Install dependencies (clean)
npm run validate   # Run all checks
npm run build      # Build for production
```

## Script Chaining

You can chain scripts using `&&` (sequential) or `&` (parallel):

### Sequential (one after another)

```bash
npm run format:fix && npm run lint:fix && npm test
```

### Parallel (at the same time)

```bash
npm run format & npm run lint & npm test
```

**Note**: The `validate` script already chains checks sequentially.

## Environment Variables

Scripts respect environment variables:

```bash
# Set NODE_ENV
NODE_ENV=production npm run build

# Set custom port
PORT=3000 npm run dev

# Skip tests
SKIP_TESTS=true npm run validate
```

## Troubleshooting

### "Command not found"

```bash
# Make sure dependencies are installed
npm install
```

### "Permission denied"

```bash
# Fix permissions (macOS/Linux)
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### "Husky hooks not running"

```bash
# Reinstall hooks
npm run prepare
```

### "Tests failing in CI but passing locally"

```bash
# Run tests in CI mode locally
npm run test:ci
```

### "Slow pre-push hook"

This is expected. The pre-push hook runs comprehensive checks. If it's too slow:

1. Ensure tests are fast (mock external calls)
2. Consider reducing test count
3. Run `npm run validate` manually before pushing

## Performance Tips

1. **Use watch mode during development**: `npm run test:watch`
2. **Run specific tests**: `npm test -- src/i18n/t.test.ts`
3. **Skip hooks when safe**: `git commit --no-verify` (use sparingly)
4. **Run validate before push**: Catch issues early

## Adding New Scripts

To add a new script, edit `package.json`:

```json
{
  "scripts": {
    "my-script": "command here"
  }
}
```

**Naming conventions**:

- Use kebab-case: `test:coverage`, not `testCoverage`
- Use prefixes for related scripts: `test:*`, `format:*`
- Use descriptive names: `validate`, not `check-all`

## Further Reading

- [npm scripts documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [Astro CLI reference](https://docs.astro.build/en/reference/cli-reference/)
- [Vitest CLI reference](https://vitest.dev/guide/cli.html)
