import { cva } from "class-variance-authority";
import type { TestimonialType } from "@/constants/testimonials";
import TestimonialUserBubble from "./TestimonialUserBubble";

type Props = TestimonialType & {
  color: "brand" | "accent";
};

const TestimonialItem = ({
  color = "brand",
  avatar,
  company,
  testimonials,
  username,
  role,
}: Props) => (
  <div className={wrapperStyle({ color })}>
    <div className="flex grow-1 flex-col items-start gap-5">
      {testimonials.map((item, index) => (
        <div
          key={index}
          className={chatStyle({
            color,
            isResponse: item.isResponse || false,
          })}>
          <p className="paragraph-2 text-teal-400">{item.content}</p>
        </div>
      ))}
    </div>
    <TestimonialUserBubble
      avatar={avatar}
      username={username}
      company={company}
      role={role}
      color={color}
    />
  </div>
);

const chatStyle = cva(
  "elevation-1 bg-white-50 rounded-xl px-5 py-4 max-w-[90%]",
  {
    variants: {
      isResponse: {
        true: "self-end rounded-br-[2px]",
        false: "rounded-bl-[2px]",
      },
      color: {
        brand: "bg-teal-400",
        accent: "bg-white-50",
      },
    },
  },
);

const wrapperStyle = cva(
  "rounded-3xl w-80 w h-106 flex flex-col elevation-3 px-8 sm:px-10 py-7 sm:py-9 sm:w-116 sm:min-w-116 sm:h-124",
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
