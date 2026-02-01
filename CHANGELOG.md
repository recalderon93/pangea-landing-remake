# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive documentation in `/docs` folder
- Repository audit report with findings and recommendations
- Cursor rules for AI-assisted development
- Enhanced ESLint configuration with full jsx-a11y rules
- npm scripts: `validate`, `typecheck`, `test:ci`, `test:coverage`, `test:unit`
- lint-staged configuration for fast pre-commit checks
- GitHub Actions CI workflow
- `.gitattributes` for consistent line endings
- Private notes directory (`docs/private/`) for personal notes

### Changed

- Optimized Husky pre-commit hook to use lint-staged (faster)
- Streamlined pre-push hook to run comprehensive validation
- Enhanced accessibility with button types and ARIA labels
- Updated root README with project-specific content
- Improved documentation structure and organization

### Fixed

- Missing `type="button"` attributes on non-submit buttons
- Missing ARIA labels on icon-only buttons
- Accessibility issues in form components

## [0.0.1] - 2024-01-31

### Added

- Initial project setup with Astro + React + TypeScript
- Tailwind CSS styling with CVA for component variants
- Zustand for state management
- React Hook Form + Zod for form validation
- Custom i18n solution (en/es)
- Vitest + React Testing Library for testing
- ESLint + Prettier for code quality
- Husky git hooks for pre-commit and pre-push checks
- Feature-based architecture
- Contact form with multi-step flow
- Header with navigation and solutions menu
- Hero section
- Testimonials section
- Solutions section
- Footer
- Who We Are page
- Our Work page
- Solutions pages (Web Development, UX/UI, QA, Project Management, Chatbot)

[Unreleased]: https://github.com/username/pangea-landing-remake/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/username/pangea-landing-remake/releases/tag/v0.0.1
