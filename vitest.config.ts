/// <reference types="vitest" />
// vitest.config.ts
import { getViteConfig } from "astro/config";
import react from "@vitejs/plugin-react";

const astroConfig = getViteConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.spec.ts", "src/**/*.test.tsx"],
    environmentMatchGlobs: [
      ["**/*.test.tsx", "jsdom"],
      ["**/*.spec.ts", "node"],
    ],
  },
});

export default astroConfig;
