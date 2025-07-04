import { FAQListEN, FAQListES } from "@/constants/FAQ";
import FAQItem from "./FAQsItem";
import { useState } from "react";
import type { Locale } from "@/i18n";

type Props = {
  locale: Locale;
};

const FAQsSection = ({ locale }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  function toggleQuestion(index: number) {
    setSelectedQuestion((st) => {
      if (st === index) return null;
      return index;
    });
  }

  const FAQList = locale === "es" ? FAQListES : FAQListEN;

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        {FAQList.slice(0, 3).map((item, index) => (
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
        {FAQList.slice(3, 6).map((item, index) => (
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
  );
};

export default FAQsSection;
