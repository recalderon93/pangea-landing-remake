export type Locale = "en" | "es";

const translations = {
  en: {
    greeting: "Hello, {name}!",
    title: "Welcome to our application",
  },
  es: {
    greeting: "¡Hola, {name}!",
    title: "Welcome to our application",
  },
} as const;

// 3. Type to extract nested keys from translation object
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type NestedKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? Join<K & string, NestedKeys<T[K]>>
    : K & string;
}[keyof T];

// 4. Extract keys from ONE locale (assume en/es have the same structure)
type TranslationKey = NestedKeys<(typeof translations)["en"]>;

function getNested(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function t(
  locale: Locale,
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
