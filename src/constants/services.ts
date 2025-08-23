import service1IMG from "@/images/service-1.png";
import service2IMG from "@/images/service-2.jpeg";
import service3IMG from "@/images/service-3.jpeg";
import service4IMG from "@/images/service-4.png";

const servicesItems = [
  {
    id: "service-1",
    title: "Agile Project\nManagement",
    description: {
      en: "Transparent, collaborative, and results-driven Agile management for your startup's success.",
      es: "Gestión ágil transparente, colaborativa y orientada a resultados para el éxito de tu startup.",
    },
    image: service1IMG,
    href: "/solutions/project-management",
  },
  {
    id: "service-2",
    title: "Web\nDevelopment",
    description: {
      en: "Transparent, collaborative, and results-driven Agile management for your startup's success.",
      es: "Gestión ágil transparente, colaborativa y orientada a resultados para el éxito de tu startup.",
    },
    image: service2IMG,
    href: "/solutions/web-development",
  },
  {
    id: "service-3",
    title: "Apps\n Development",
    description: {
      en: "We analyze your business model in detail, and develop the ideal application you need.",
      es: "Analizamos tu modelo de negocio en detalle y desarrollamos la aplicación ideal que necesitas.",
    },
    image: service3IMG,
    href: "/solutions/qa",
  },
  {
    id: "service-4",
    title: "UX & UI\nDesign",
    description: {
      en: "We will create intuitive and engaging digital experiences that will captivate all your users.",
      es: "Crearemos experiencias digitales intuitivas y atractivas que cautivarán a todos tus usuarios.",
    },
    image: service4IMG,
    href: "/solutions/ux-ui",
  },
];

export default servicesItems;
