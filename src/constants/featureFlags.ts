/**
 * Temporary visibility toggles for sections/links not ready for production.
 * See docs/HIDDEN_SECTIONS.md for restore instructions.
 */
export const featureFlags = {
  /** "Our Digital Masterpieces" section on the home page */
  showDigitalMasterpieces: false,
  /** "Our Work" page + header nav link (desktop + mobile) */
  showOurWork: false,
  /** Social links block in the footer */
  showFooterSocials: false,
} as const;
