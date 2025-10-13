import service1IMG from "@/images/service-1.png";
import service2IMG from "@/images/service-2.jpeg";
import service3IMG from "@/images/service-3.jpeg";
import service4IMG from "@/images/service-4.png";
import { t, type Locale } from "@/i18n";

const servicesKeys = [
  "project-management",
  "web-development",
  "ux-ui",
  "qa",
  "chatbot",
];

const servicesImages = {
  "project-management": service1IMG,
  "web-development": service2IMG,
  "ux-ui": service4IMG,
  qa: service3IMG,
  chatbot: service4IMG,
};

export const getSolutionsByLocale = (locale: Locale) => {
  return servicesKeys.map((key, index) => ({
    id: `service-${index + 1}`,
    href: `/solutions/${key}`,
    image: servicesImages[key as keyof typeof servicesImages],
    // @ts-expect-error - dynamic key access
    title: t(locale, `solutions.${key}.hero.title`),
    // @ts-expect-error - dynamic key access
    description: t(locale, `solutions.${key}.hero.caption-1`),
  }));
};
