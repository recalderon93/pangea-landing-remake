import EN from "@i18n/translations/en";
import ES from "@i18n/translations/es";
import type { DeepTranslationsKeys, NestedKeys } from "@/types/i18n";

export type Locale = "en" | "es";

const translations = {
  en: EN,
  es: ES,
} as const;

// 4. Extract keys from ONE locale (assume en/es have the same structure)
type TranslationKey =
  | NestedKeys<(typeof translations)["en"]>
  | DeepTranslationsKeys;

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function t(
  locale: Locale = "en",
  key: TranslationKey, // ej: "messages.unread"
  vars?: Record<string, string | number>,
): string {
  let text = getNested(translations[locale], key);

  if (typeof text === "object" && vars?.count !== undefined) {
    const pluralForm = Number(vars.count) === 1 ? "one" : "other";
    text = text[pluralForm];
  }

  if (typeof text !== "string") return key;

  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }

  return text;
}
