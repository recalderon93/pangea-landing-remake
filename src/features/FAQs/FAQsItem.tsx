import { useRef, useEffect, useState } from "react";
import CrossIcon from "@components/icons/Cross";
import { cva } from "class-variance-authority";

type Props = {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

const FAQItem = ({ question, answer, isOpen = false, onToggle }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      const scrollHeight = el.scrollHeight;
      setHeight(`${scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <button
      className={itemStyles({ isOpen })}
      onClick={onToggle}
      aria-expanded={isOpen}>
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <h3 className="paragraph-1 bolder text-left text-teal-400">
          {question}
        </h3>
        <CrossIcon variant={isOpen ? "close" : "plus"} />
      </div>

      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-500">
        <div className="text-shade-400 paragraph-2 mt-4 mr-10 flex pt-2 text-left sm:mt-6 lg:mt-8">
          {answer}
        </div>
      </div>
    </button>
  );
};

const itemStyles = cva(
  "bg-white-50 elevation-1 flex flex-none cursor-pointer flex-col justify-between rounded-2xl px-6 transition-all duration-300 sm:rounded-[20px] py-4 sm:py-5 md:py-6 lg:py-7 sm:px-8 md:px-9 lg:rounded-3xl lg:px-10",
  {
    variants: {
      isOpen: {
        true: "",
        false: "",
      },
    },
  },
);

export default FAQItem;
