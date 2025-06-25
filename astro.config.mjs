// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
        "@components": new URL("./src/components", import.meta.url).pathname,
        "@i18n": new URL("./src/i18n", import.meta.url).pathname,
        "@layouts": new URL("./src/layouts", import.meta.url).pathname,
        "@features": new URL("./src/features", import.meta.url).pathname,
        "@pages": new URL("./src/pages", import.meta.url).pathname,
        "@styles": new URL("./src/styles", import.meta.url).pathname,
        "@utils": new URL("./src/utils", import.meta.url).pathname,
      },
    },
  },

  integrations: [react()],
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
