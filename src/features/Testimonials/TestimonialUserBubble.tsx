import { cva } from "class-variance-authority";
import UserIcon from "@components/icons/UserIcon";

type Props = {
  avatar?: string;
  username: string;
  company: string;
  role?: string;
  color?: "brand" | "accent";
};

const TestimonialUserBubble = ({ username, company, role, color }: Props) => (
  <div className={wrapperStyle({ color })}>
    <div className={iconWrapperStyle({ color })}>
      <UserIcon size={32} className={iconStyle({ color })} />
    </div>
    <span
      className={labelStyle({
        color,
      })}>
      {`${username} |${role ? ` ${role} at` : ""} ${company}`}
    </span>
  </div>
);

const labelStyle = cva(
  "px-2 caption truncate overflow-hidden whitespace-nowrap flex-1 min-w-0",
  {
    variants: {
      color: {
        brand: "text-white-50",
        accent: "text-teal-500",
      },
    },
  },
);

const iconWrapperStyle = cva(
  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      color: {
        brand: "bg-teal-400",
        accent: "bg-white-50",
      },
    },
  },
);

const iconStyle = cva("", {
  variants: {
    color: {
      brand: "text-white-50",
      accent: "text-teal-400",
    },
  },
});

export const wrapperStyle = cva(
  "h-12 rounded-[24px] elevation-2 w-60 flex items-center border px-[6px] backdrop-blur-xl backdrop-saturate-150 sm:w-78",
  {
    variants: {
      color: {
        brand:
          "border-white/35 bg-teal-600/55 shadow-[0_8px_32px_-4px_rgba(0,20,24,0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        accent:
          "border-white/60 bg-white/88 shadow-[0_8px_28px_-6px_rgba(0,35,42,0.12),inset_0_1px_0_0_rgba(255,255,255,0.9)]",
      },
    },
  },
);

export default TestimonialUserBubble;
