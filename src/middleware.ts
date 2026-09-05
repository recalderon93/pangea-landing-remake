import { defineMiddleware } from "astro:middleware";
import { featureFlags } from "@constants/featureFlags";
import { Routes } from "@constants/routes";

const ourWorkPaths = new Set([Routes.en.ourWork, Routes.es.ourWork]);

export const onRequest = defineMiddleware((context, next) => {
  if (
    !featureFlags.showOurWork &&
    ourWorkPaths.has(context.url.pathname)
  ) {
    const locale = context.url.pathname.startsWith("/es") ? "es" : "en";
    return context.redirect(Routes[locale].home);
  }

  return next();
});
