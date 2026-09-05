# Hidden Sections & Links

Some home-page sections and navigation items are temporarily hidden while content or URLs are not ready. Toggle them back on in one place: `src/constants/featureFlags.ts`.

## Feature flags

| Flag | Default | What it controls |
| --- | --- | --- |
| `showDigitalMasterpieces` | `false` | Home page "Our Digital Masterpieces" (`Projects`) section |
| `showOurWork` | `false` | `/our-work` + `/es/nuestro-trabajo` pages and header nav link |
| `showFooterSocials` | `false` | Footer "Socials" column |

Set any flag to `true` to restore that item.

## Restore: Our Digital Masterpieces (home page)

**Flag:** `showDigitalMasterpieces`

**Original position** (between Driven By and Great Solution Banner):

```astro
<!-- src/pages/index.astro and src/pages/es/index.astro -->
<DrivenBy locale="en" />
<Projects locale="en" />
<GreatSolutionBanner locale="en" />
```

**Files involved:**

- `src/pages/index.astro`
- `src/pages/es/index.astro`
- `src/features/Projects/Projects.astro`

## Restore: Our Work page + navigation

**Flag:** `showOurWork`

**Pages** (redirect to home while hidden):

- `src/pages/our-work.astro` → `/our-work` (redirects to `/`)
- `src/pages/es/nuestro-trabajo.astro` → `/es/nuestro-trabajo` (redirects to `/es`)
- Backup redirect: `src/middleware.ts`

**Nav links:**

- Desktop: `src/features/Header/Header.tsx` (after "Who We Are")
- Mobile: `src/features/Header/NavigationMenu.tsx` (after "Who We Are")

## Restore: Footer socials

**Flag:** `showFooterSocials`

**Original location:** `src/features/Footer/Footer.astro` — last column in the footer grid, after Company and Careers.

**URLs:** Update `footer.social.linkedin.href` and `footer.social.instagram.href` in:

- `src/i18n/translations/en/footer.ts`
- `src/i18n/translations/es/footer.ts`
