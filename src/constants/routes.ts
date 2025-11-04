import type { Locale } from "@/i18n";

export const Routes: Record<Locale, Record<string, string>> = {
  en: {
    home: "/",
    whoWeAre: "/who-we-are",
    ourWork: "/our-work",
    contactUs: "/contact-us",
    success: "/contact-us/thank-you",
    chatbot: "/solutions/chatbot",
    projectManagement: "/solutions/project-management",
    webDevelopment: "/solutions/web-development",
    uxUi: "/solutions/ux-ui",
    qa: "/solutions/qa",
  },
  es: {
    home: "/es",
    whoWeAre: "/es/quienes-somos",
    ourWork: "/es/nuestro-trabajo",
    contactUs: "/es/contactanos",
    success: "/contactanos/gracias",
    chatbot: "/es/servicios/chatbot",
    projectManagement: "/es/servicios/gestion-de-proyectos",
    webDevelopment: "/es/servicios/desarrollo-web",
    uxUi: "/es/servicios/ux-ui",
    qa: "/es/servicios/qa",
  },
};
