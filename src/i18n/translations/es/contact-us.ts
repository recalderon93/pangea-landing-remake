export default {
  name: "Contactanos",
  title: "Construyamos algo significativo juntos",
  caption:
    "Desde ideas pequeñas hasta grandes visiones — estamos listos para ayudarte a hacerlas realidad.",
  "email-placeholder": "Correo electrónico",
  back: "VOLVER",
  "step-01": {
    title: "1. Información de contacto",
    "full-name-label": "Nombre completo",
    "email-label": "Correo electrónico",
    "company-name-label": "Nombre de la empresa (opcional)",
    "sector-label": "Sector",
    "full-name-placeholder": "Nombre completo",
    "email-placeholder": "Correo electrónico",
    "company-name-placeholder": "Nombre de la empresa (opcional)",
    "select-sector-placeholder": "Selecciona un sector",
    sector: {
      placeholder: "Selecciona un sector",
      options: {
        a: "Automotriz",
        b: "E-commerce / Retail",
        c: "Educación / EdTech",
        d: "Energía y Servicios Públicos",
        e: "Entretenimiento y Medios",
        f: "Finanzas y Seguros",
      },
    },

    submit: "SIGUIENTE",
  },
  "step-02": {
    title: "2. ¿Qué estás buscando?",
    options: {
      a: "Necesito un equipo o experto para construir algo para mí",
      b: "Estoy buscando contratar un desarrollador o talento digital para mi equipo",
      c: "Aún no estoy seguro / quiero explorar ambas opciones",
    },
    submit: {
      "build-something": "Construyamos tu Proyecto",
      "hire-talent": "Contrata Talento LATAM de Primer Nivel",
      "not-sure": "Empecemos Juntos",
    },
  },
  "step-03": {
    title: "3. Tipo de proyecto",
    options: {
      a: "Sitio web",
      b: "Aplicación",
      c: "Chatbot / Automatización",
      d: "Diseño UI/UX",
      e: "Software personalizado",
      f: "Integración de desarrolladores",
      g: "Contratación de personal",
      h: "Otro:",
    },
    submit: "SIGUIENTE",
  },
  "step-04": {
    title: "4. ¿Para cuándo lo necesitas?",
    options: {
      a: "Lo antes posible",
      b: "En 1-2 meses",
      c: "En mas de 3 meses",
      d: "Solo estoy explorando",
    },
    submit: "SIGUIENTE",
  },
  "step-05": {
    title: "5. Cuéntanos más sobre lo que necesitas",
    question:
      "¿Qué problema estás tratando de resolver? ¿Tienes ideas, metas o expectativas que quieras compartir?",
    submit: "ENVIAR",
    next: "SIGUIENTE",
  },
  "step-06": {
    title: "6. Detalles de contratación de talento",
    "fieldset-1": {
      legend: "Duración del proyecto:",
      options: {
        a: "1-3 meses",
        b: "3-6 meses",
        c: "Más de 6 meses",
        d: "En curso / no estoy seguro",
      },
    },
    "fieldset-2": {
      legend: "Tipo de colaboración:",
      options: {
        a: "Unirse a mi equipo",
        b: "Freelance",
      },
    },
    "fieldset-3": {
      legend: "Ubicación preferida",
      placeholder: "Selecciona una ubicación",
      options: {
        a: "Costa Oeste",
        b: "Costa Este",
        c: "Centro de EE.UU.",
        d: "Europa Occidental",
        e: "LATAM",
        f: "Oceanía",
        g: "Asia",
      },
    },
    back: "VOLVER",
    submit: "ENVIAR",
  },
  "step-07": {
    title: "7. Archivos adjuntos (opcional)",
    "title-variant": "6. Detalles de contratación de talento",
    caption:
      "Sube cualquier referencia, briefing o archivo útil para entender tu idea.",
    back: "VOLVER",
    submit: "ENVIAR",
  },
  "file-input": {
    "choose-file": "Elige un archivo o arrástralo aquí",
    add: "Buscar archivos",
    "add-more": "Agregar más archivos",
    "max-file-size": "Tamaño máximo de archivo:",
    "not-supported": "Tipo de archivo no soportado. Aceptados:",
    "files-not-added":
      " Algunos archivos no se agregaron debido a restricciones de tipo o tamaño.",
    more: "más",
  },
  errors: {
    required: {
      fullName: "El nombre completo es obligatorio",
      email: "El correo electrónico es obligatorio",
      sector: "El sector es obligatorio",
      "contact-reason": "Por favor, proporciona un motivo de contacto",
      "project-type": "Por favor, selecciona un tipo de proyecto",
      timeline: "Por favor, selecciona un plazo",
      needs: "Por favor, comparte más sobre tus necesidades",
      duration: "Por favor, selecciona una duración",
      "team-fit": "Por favor, selecciona una opción de ajuste de equipo",
    },
    "fullName-length": "El nombre completo debe tener al menos 2 caracteres",
    "email-format":
      "Por favor, ingresa una dirección de correo electrónico válida",
    "files-count": "Puedes subir hasta 3 archivos",
    "file-size": "Cada archivo debe ser de 10MB o menos",
  },
  success: {
    title: "¡Gracias por contactarnos!",
    caption:
      "Agradecemos que te hayas puesto en contacto con nosotros. Un miembro de nuestro equipo se comunicará contigo pronto.",
    "back-home": "Volver al inicio",
  },
};
