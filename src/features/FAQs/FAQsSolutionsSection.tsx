import { solutionsFAQsEN, solutionsFAQsES } from "@/constants/FAQ";
import FAQItem from "./FAQsItem";
import { useState } from "react";
import { t, type Locale } from "@/i18n";
import { cva } from "class-variance-authority";

type Props = {
  locale: Locale;
  solution:
    | "project-management"
    | "web-development"
    | "ux-ui"
    | "qa"
    | "chatbot";
};

const FAQsSection = ({ locale, solution }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  function toggleQuestion(index: number) {
    setSelectedQuestion((st) => {
      if (st === index) return null;
      return index;
    });
  }

  const FAQList = locale === "en" ? solutionsFAQsEN : solutionsFAQsES;

  const title = cva("h3  whitespace-pre-line text-teal-400", {
    variants: {
      solution: {
        "project-management": "max-w-[753px]",
        "web-development": "max-w-[731px]",
        "ux-ui": "max-w-[731px]",
        qa: "max-w-[822px]",
        chatbot: "max-w-[1093px]",
      },
    },
  });

  return (
    <div className="md:py flex flex-col gap-10 px-8 py-14 sm:gap-12 sm:px-12 sm:py-16 md:gap-14 md:px-16 md:py-20 lg:gap-16 lg:px-20 lg:py-24">
      <h2 className={title({ solution })}>
        {t(locale, `faqs.${solution}.title`)}
      </h2>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          {FAQList[solution].slice(0, 2).map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              onToggle={() => toggleQuestion(index)}
              isOpen={selectedQuestion === index}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {FAQList[solution].slice(2, 4).map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              onToggle={() => toggleQuestion(index + 3)}
              isOpen={selectedQuestion === index + 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQsSection;
