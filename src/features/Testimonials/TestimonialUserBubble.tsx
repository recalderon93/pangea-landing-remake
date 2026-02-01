import { cva } from "class-variance-authority";
import UserIcon from "@components/icons/UserIcon";

type Props = {
  avatar?: string;
  username: string;
  company: string;
  role?: string;
  color?: "brand" | "accent";
};

const TestimonialUserBubble = ({
  avatar,
  username,
  company,
  role,
  color,
}: Props) => (
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
  "h-12 rounded-[24px] elevation-2 w-60 flex items-center px-[6px] sm:w-78 ",
  {
    variants: {
      color: {
        brand:
          "bg-[linear-gradient(102deg,rgba(251,251,251,0.2)_0%,rgba(251,251,251,0.05)_100%)]",
        accent:
          "bg-[linear-gradient(102deg,rgba(251,251,251,0.2)_0%,rgba(251,251,251,0.05)_100%)]",
      },
    },
  },
);

export default TestimonialUserBubble;
