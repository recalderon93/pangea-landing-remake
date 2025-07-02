import { cva } from "class-variance-authority";

type Props = {
  avatar: string;
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
    <img
      src={avatar}
      alt={username}
      width={40}
      height={40}
      className="aspect-square rounded-full object-cover"
    />
    <span
      className={labelStyle({
        color,
      })}>
      {`${username} |${role ? ` ${role} at` : ""} ${company}`}
    </span>
  </div>
);

const labelStyle = cva(
  "px-2 caption truncate overflow-hidden whitespace-nowrap",
  {
    variants: {
      color: {
        brand: "text-white-50",
        accent: "text-teal-500",
      },
    },
  },
);

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
