export type TestimonialType = {
  id: string;
  username: string;
  avatar: string;
  company: string;
  role?: string;
  testimonials: {
    content: string;
    isResponse?: boolean;
  }[];
};

export const testimonialsData: TestimonialType[] = [
  {
    id: "1",
    username: "John Sherman",
    company: "Nex",
    role: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",

    testimonials: [
      {
        content: "Hey team!!",
      },
      {
        content:
          "The new app is fantastic!! The smooth interface has boosted our engagement. Great job!!!",
      },
      {
        content: "Perfect!",
        isResponse: true,
      },
    ],
  },
  {
    id: "2",
    username: "Emily Shang",
    role: "COO",
    company: "Gotrack",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "What do you think of the results?",
        isResponse: true,
      },
      {
        content: "Hi, how are you?",
      },
      {
        content:
          "We're absolutely thrilled with the results! They've exceeded our expectations in every way.",
      },
    ],
  },
  {
    id: "3",
    username: "Carlos Mendes",
    role: "Head of Design",
    company: "Flowbit",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "Can we push the next version this week?",
        isResponse: true,
      },
      {
        content:
          "Loving the latest UI tweaks – they really elevate the product.",
      },
      {
        content: "This is shaping up to be our best release yet.",
      },
    ],
  },
  {
    id: "4",
    username: "Anika Roy",
    role: "Product Manager",
    company: "Zentry",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "This feature rollout was smooth and ahead of schedule!",
      },
      {
        content: "Any updates on the feedback loop?",
        isResponse: true,
      },
      {
        content: "Thanks for staying on top of everything.",
      },
    ],
  },
  {
    id: "5",
    username: "Anika Roy",
    role: "Product Manager",
    company: "Zentry",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "This feature rollout was smooth and ahead of schedule!",
      },
      {
        content: "Any updates on the feedback loop?",
        isResponse: true,
      },
      {
        content: "Thanks for staying on top of everything.",
      },
    ],
  },
];

// The same but translated to Spanish
export const testimonialsDataEs: TestimonialType[] = [
  {
    id: "1",
    username: "John Sherman",
    company: "Nex",
    role: "CEO",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",

    testimonials: [
      {
        content: "¡Hola equipo!",
      },
      {
        content:
          "¡La nueva aplicación es fantástica! La interfaz fluida ha aumentado nuestro compromiso. ¡Gran trabajo!",
      },
      {
        content: "¡Perfecto!",
        isResponse: true,
      },
    ],
  },
  {
    id: "2",
    username: "Emily Shang",
    role: "COO",
    company: "Gotrack",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "¿Qué piensas de los resultados?",
        isResponse: true,
      },
      {
        content: "Hola, ¿cómo estás?",
      },
      {
        content:
          "¡Estamos absolutamente encantados con los resultados! Han superado nuestras expectativas en todos los sentidos.",
      },
    ],
  },
  {
    id: "3",
    username: "Carlos Mendes",
    role: "Head of Design",
    company: "Flowbit",
    avatar:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content: "¿Podemos lanzar la próxima versión esta semana?",
        isResponse: true,
      },
      {
        content:
          "Me encantan los últimos ajustes de la interfaz de usuario: realmente elevan el producto.",
      },
      {
        content:
          "Esto se está convirtiendo en nuestro mejor lanzamiento hasta ahora.",
      },
    ],
  },
  {
    id: "4",
    username: "Anika Roy",
    role: "Product Manager",
    company: "Zentry",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content:
          "¡El despliegue de esta función fue fluido y adelantado al cronograma!",
      },
      {
        content: "¿Alguna actualización sobre el ciclo de retroalimentación?",
        isResponse: true,
      },
      {
        content: "Gracias por mantener todo bajo control.",
      },
    ],
  },
  {
    id: "5",
    username: "Anika Roy",
    role: "Product Manager",
    company: "Zentry",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    testimonials: [
      {
        content:
          "¡El despliegue de esta función fue fluido y adelantado al cronograma!",
      },
      {
        content: "¿Alguna actualización sobre el ciclo de retroalimentación?",
        isResponse: true,
      },
      {
        content: "Gracias por mantener todo bajo control.",
      },
    ],
  },
];
