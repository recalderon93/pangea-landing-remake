// eslint.config.js
import astro from "eslint-plugin-astro";
import * as astroParser from "astro-eslint-parser";
import prettier from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";

export default [
  // JavaScript & TypeScript (including React)
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "prettier/prettier": "error",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
    },
  },

  // Astro files
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".astro"],
      },
    },
    plugins: {
      astro,
      prettier,
    },
    rules: {
      ...astro.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
];
