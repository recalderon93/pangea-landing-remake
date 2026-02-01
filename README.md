# Pangea Landing Remake

A modern, multilingual landing page built with Astro, React, and TypeScript.

## Features

- 🚀 **Astro 5** - Fast, modern static site generator with islands architecture
- ⚛️ **React 19** - Interactive components with the latest React features
- 🎨 **Tailwind CSS 4** - Utility-first styling with modern design
- 🌍 **i18n** - English and Spanish support with custom translation system
- 📝 **TypeScript** - Fully typed for better DX and fewer bugs
- ✅ **Testing** - Vitest + React Testing Library
- 🎯 **Accessibility** - WCAG compliant with jsx-a11y linting
- 🔧 **Modern Tooling** - ESLint, Prettier, Husky git hooks

## Quick Start

### Prerequisites

- Node.js 20.x (see `.nvmrc`)
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

## Available Scripts

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start development server                       |
| `npm run build`      | Build for production                           |
| `npm run preview`    | Preview production build                       |
| `npm test`           | Run tests                                      |
| `npm run test:watch` | Run tests in watch mode                        |
| `npm run lint`       | Check for linting errors                       |
| `npm run lint:fix`   | Fix linting errors                             |
| `npm run format`     | Check formatting                               |
| `npm run format:fix` | Fix formatting                                 |
| `npm run typecheck`  | Check TypeScript types                         |
| `npm run validate`   | Run all checks (format, lint, typecheck, test) |

See [Scripts Reference](./docs/SCRIPTS.md) for complete documentation.

## Project Structure

```
pangea-landing-remake/
├── docs/                 # Documentation
├── public/               # Static assets
├── src/
│   ├── components/       # Shared components
│   ├── features/         # Feature modules
│   ├── pages/            # Astro pages (routes)
│   ├── layouts/          # Page layouts
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand state stores
│   ├── i18n/             # Translations (en/es)
│   ├── constants/        # Static data
│   ├── types/            # TypeScript types
│   └── styles/           # Shared styles
├── .husky/               # Git hooks
└── .github/              # GitHub workflows
```

See [Repository Structure](./docs/REPO_STRUCTURE.md) for detailed documentation.

## Tech Stack

### Core

- **Astro 5.10** - Static site generator
- **React 19.1** - UI library
- **TypeScript 5.8** - Type safety

### Styling

- **Tailwind CSS 4.1** - Utility-first CSS
- **CVA** - Component variants
- **clsx + tailwind-merge** - Class utilities

### State & Forms

- **Zustand 5.0** - State management
- **React Hook Form 7.62** - Form handling
- **Zod 3.25** - Schema validation

### Testing & Quality

- **Vitest 3.2** - Test runner
- **React Testing Library 16.3** - Component testing
- **ESLint 9** - Linting
- **Prettier 3.5** - Formatting
- **Husky 9** - Git hooks

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs) folder:

- [Documentation Hub](./docs/README.md) - Start here
- [Architecture Overview](./docs/ARCHITECTURE.md) - Design patterns and conventions
- [Repository Structure](./docs/REPO_STRUCTURE.md) - Folder organization
- [Testing Guide](./docs/TESTING.md) - Testing strategy and examples
- [i18n Guide](./docs/I18N.md) - Internationalization
- [State Management](./docs/STATE_MANAGEMENT.md) - Zustand patterns
- [Contributing Guidelines](./docs/CONTRIBUTING.md) - How to contribute
- [Scripts Reference](./docs/SCRIPTS.md) - All npm commands
- [Linting & Formatting](./docs/LINTING_FORMATTING.md) - Code quality tools

## Development

### Code Quality

This project uses automated checks to maintain code quality:

- **Pre-commit**: Formats and lints staged files (fast, ~2-5s)
- **Pre-push**: Runs full validation (format, lint, typecheck, test)

Run checks manually:

```bash
npm run validate
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

See [Testing Guide](./docs/TESTING.md) for more information.

### Internationalization

This project supports English (default) and Spanish:

- **English**: `/` (no prefix)
- **Spanish**: `/es` prefix

Add translations in `src/i18n/translations/{en,es}/`.

See [i18n Guide](./docs/I18N.md) for more information.

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) before submitting a PR.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run validation: `npm run validate`
5. Commit: `git commit -m "feat: add my feature"`
6. Push: `git push origin feature/my-feature`
7. Create a Pull Request

## Architecture

This project uses a **feature-based architecture**:

- **Features** are self-contained modules in `src/features/`
- **Components** are shared UI elements in `src/components/`
- **Astro islands** for partial hydration
- **Zustand** for minimal client state
- **React Hook Form + Zod** for forms

See [Architecture Overview](./docs/ARCHITECTURE.md) for detailed information.

## Deployment

### Build

```bash
npm run build
```

Output: `dist/` folder

### Preview

```bash
npm run preview
```

### Platforms

This project can be deployed to:

- **Netlify** (recommended)
- **Vercel**
- **Cloudflare Pages**
- **GitHub Pages**
- Any static hosting service

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- No IE11 support

## License

[Your License Here]

## Support

- 📖 [Documentation](./docs/README.md)
- 🐛 [Report a Bug](https://github.com/username/pangea-landing-remake/issues)
- 💡 [Request a Feature](https://github.com/username/pangea-landing-remake/issues)

## Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Tested with [Vitest](https://vitest.dev)
