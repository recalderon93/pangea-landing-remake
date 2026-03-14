import service1IMG from "@/images/service-1.png";
import service2IMG from "@/images/service-2.png";
import service3IMG from "@/images/service-3.png";
import service4IMG from "@/images/service-4.png";
import service5IMG from "@/images/service-5.png";
import { t, type Locale } from "@/i18n";
import { Routes } from "./routes";

const servicesKeys = [
  "project-management",
  "web-development",
  "ux-ui",
  "qa",
  "chatbot",
];
type ServiceKey = (typeof servicesKeys)[number];

const serviceRouteKeys: Record<ServiceKey, keyof (typeof Routes)["en"]> = {
  "project-management": "projectManagement",
  "web-development": "webDevelopment",
  "ux-ui": "uxUi",
  qa: "qa",
  chatbot: "chatbot",
};

const servicesImages = {
  "project-management": service1IMG,
  "web-development": service2IMG,
  "ux-ui": service3IMG,
  qa: service4IMG,
  chatbot: service5IMG,
};

export const getSolutionsByLocale = (locale: Locale) => {
  return servicesKeys.map((key, index) => ({
    id: `service-${index + 1}`,
    href: Routes[locale][serviceRouteKeys[key]],
    image: servicesImages[key as keyof typeof servicesImages],
    // @ts-expect-error - dynamic key access
    title: t(locale, `solutions.${key}.hero.title`),
    // @ts-expect-error - dynamic key access
    description: t(locale, `solutions.${key}.hero.caption-1`),
  }));
};
