import { cva } from "class-variance-authority";
import type { TestimonialType } from "@/constants/testimonials";
import TestimonialUserBubble from "./TestimonialUserBubble";
import { cn } from "@styles/classNameMerge";

type Props = TestimonialType & {
  color: "brand" | "accent";
  className?: string;
};

const TestimonialItem = ({
  color = "brand",
  avatar,
  company,
  testimonials,
  username,
  role,
  className = "",
}: Props) => (
  <div className={cn(wrapperStyle({ color }), className)}>
    <div className="flex flex-1 flex-col items-start gap-3 pb-16 sm:gap-3.5 sm:pb-18">
      {testimonials.map((item, index) => (
        <div
          key={index}
          className={chatBubbleStyle({
            cardColor: color,
            isResponse: item.isResponse || false,
          })}>
          <p className="paragraph-2">{item.content}</p>
        </div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-8 pb-7 sm:px-10 sm:pb-9">
      <TestimonialUserBubble
        avatar={avatar}
        username={username}
        company={company}
        role={role}
        color={color}
      />
    </div>
  </div>
);

const chatBubbleStyle = cva(
  "max-w-[90%] rounded-2xl px-4 py-3 shadow-sm sm:px-5 sm:py-3.5",
  {
    variants: {
      isResponse: {
        true: "self-end rounded-br-sm",
        false: "self-start rounded-bl-sm",
      },
      cardColor: {
        brand: "",
        accent: "",
      },
    },
    compoundVariants: [
      {
        cardColor: "brand",
        isResponse: false,
        class:
          "bg-white-100/90 text-teal-500 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35)]",
      },
      {
        cardColor: "brand",
        isResponse: true,
        class:
          "bg-white-50/15 text-white-100 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.1)]",
      },
      {
        cardColor: "accent",
        isResponse: false,
        class: "bg-white-50 text-teal-500 ring-1 ring-shade-100/60",
      },
      {
        cardColor: "accent",
        isResponse: true,
        class: "bg-teal-400 text-white-50",
      },
    ],
    defaultVariants: {
      cardColor: "brand",
      isResponse: false,
    },
  },
);

const wrapperStyle = cva(
  "relative flex h-106 min-h-0 w-80 flex-col overflow-hidden rounded-3xl elevation-3 px-8 pt-7 sm:w-116 sm:min-w-116 sm:pt-9 sm:h-124",
  {
    variants: {
      color: {
        brand: "bg-teal-400",
        accent: "bg-white-100",
      },
    },
  },
);

export default TestimonialItem;
