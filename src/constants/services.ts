import service1IMG from "@/images/service-1.png";
import service2IMG from "@/images/service-2.jpeg";
import service3IMG from "@/images/service-3.jpeg";
import service4IMG from "@/images/service-4.png";

const servicesItems = [
  {
    id: "service-1",
    title: "Agile Project Management",
    description: {
      en: "Transparent, collaborative, and results-driven Agile management for your startup's success.",
      es: "Gestión ágil transparente, colaborativa y orientada a resultados para el éxito de tu startup.",
    },
    image: service1IMG,
    href: "/services/agile-project-management",
  },
  {
    id: "service-2",
    title: "Web Development",
    description: {
      en: "Transparent, collaborative, and results-driven Agile management for your startup's success.",
      es: "Gestión ágil transparente, colaborativa y orientada a resultados para el éxito de tu startup.",
    },
    image: service2IMG,
    href: "/services/web-development",
  },
  {
    id: "service-3",
    title: "Apps Development",
    description: {
      en: "We analyze your business model in detail, and develop the ideal application you need.",
      es: "Analizamos tu modelo de negocio en detalle y desarrollamos la aplicación ideal que necesitas.",
    },
    image: service3IMG,
    href: "/services/apps-development",
  },
  {
    id: "service-4",
    title: "UX & UI Design",
    description: {
      en: "We will create intuitive and engaging digital experiences that will captivate all your users.",
      es: "Crearemos experiencias digitales intuitivas y atractivas que cautivarán a todos tus usuarios.",
    },
    image: service4IMG,
    href: "/services/ux-ui-design",
  },
];

export default servicesItems;
