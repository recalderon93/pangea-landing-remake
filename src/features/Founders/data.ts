import { t, type Locale } from "@/i18n";

const getFoundersData = (locale: Locale) => [
  {
    id: 1,
    image:
      "https://i.pinimg.com/736x/e3/82/37/e38237ab4dfba32828583f9f977e2ff8.jpg",
    fullName: t(locale, "who-we-are.founders.founder-1.name"),
    role: t(locale, "who-we-are.founders.founder-1.role"),
    description: [
      t(locale, "who-we-are.founders.founder-1.description-1"),
      t(locale, "who-we-are.founders.founder-1.description-2"),
      t(locale, "who-we-are.founders.founder-1.description-3"),
    ],
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/e3/82/37/e38237ab4dfba32828583f9f977e2ff8.jpg",
    fullName: t(locale, "who-we-are.founders.founder-2.name"),
    role: t(locale, "who-we-are.founders.founder-2.role"),
    description: [
      t(locale, "who-we-are.founders.founder-2.description-1"),
      t(locale, "who-we-are.founders.founder-2.description-2"),
      t(locale, "who-we-are.founders.founder-2.description-3"),
    ],
  },
];

export default getFoundersData;
