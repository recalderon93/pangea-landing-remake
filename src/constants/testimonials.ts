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
        content: "Quick update, team.",
      },
      {
        content:
          "The new app looks great - clean UI and a smoother flow. We're already seeing stronger engagement.",
      },
      {
        content: "Awesome. Let's move forward.",
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
        content: "Honestly, we're really happy with how everything turned out.",
      },
      {
        content:
          "The results exceeded our expectations - smooth process, clear communication, and strong delivery.",
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
      },
      {
        content:
          "Loving the latest UI tweaks — they really elevate the product.",
      },
      {
        content: "Absolutely. We'll align today and confirm the timeline.",
        isResponse: true,
      },
      {
        content: "This is shaping up to be our strongest release so far.",
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
        content: "This feature rollout was smooth and ahead of schedule.",
      },
      {
        content:
          "We're really glad to hear that. From day one, we focused on quality and delivery.",
        isResponse: true,
      },
      {
        content: "Any updates on the feedback loop?",
      },
      {
        content:
          "Yes — we're consolidating the insights now and will share the next steps later today.",
        isResponse: true,
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
        content: "Equipo, les dejo una actualización rápida.",
      },
      {
        content:
          "La nueva app quedó excelente. La interfaz es más clara y ya estamos viendo mejor engagement.",
      },
      {
        content: "Perfecto, seguimos adelante.",
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
        content: "¿Qué te parecieron los resultados?",
        isResponse: true,
      },
      {
        content: "La verdad, estamos muy contentos con cómo quedó todo.",
      },
      {
        content:
          "Los resultados superaron nuestras expectativas — el proceso fue fluido, la comunicación clara y la entrega muy sólida.",
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
        content: "¿Podemos avanzar con la próxima versión esta semana?",
      },
      {
        content:
          "Nos están encantando los últimos ajustes de UI — realmente elevan el producto.",
      },
      {
        content:
          "Claro. Hoy mismo nos alineamos y les confirmamos el timeline.",
        isResponse: true,
      },
      {
        content: "Todo apunta a que será nuestro mejor release hasta ahora.",
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
          "El despliegue de esta funcionalidad fue muy fluido y antes de lo previsto.",
      },
      {
        content:
          "Nos alegra mucho escucharlo. Mantuvimos el foco en calidad y tiempos desde el inicio.",
        isResponse: true,
      },
      {
        content: "¿Hay alguna novedad sobre el ciclo de feedback?",
      },
      {
        content:
          "Sí. Ya estamos consolidando los insights y compartimos los próximos pasos hoy mismo.",
        isResponse: true,
      },
    ],
  },
];
