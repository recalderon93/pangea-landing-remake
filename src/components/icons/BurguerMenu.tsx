import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  color?: "accent" | "brand";
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
};

export default function BurgerMenu({
  color = "accent",
  className = "",
  isActive,
  onClick,
}: Props) {
  const activeClass = {
    brand: "bg-shade-50 inset-shadow-sm",
    accent: "bg-teal-500 inset-shadow-sm",
  };

  return (
    <button
      aria-label="burger-menu"
      className={cn([
        "flex aspect-square w-12 items-center justify-center rounded-full active:inset-shadow-sm sm:w-16",
        color === "brand" ? "hover:bg-shade-50" : "hover:bg-teal-500",
        wrapperStyles({ color }),
        isActive && activeClass[color],
        className,
      ])}
      onClick={onClick}>
      <svg
        width="36"
        height="24"
        viewBox="0 0 36 24"
        className={cn(iconStyles({ color }))}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M0 22C0 23.1046 0.895431 24 2 24H34C35.1046 24 36 23.1046 36 22V22C36 20.8954 35.1046 20 34 20H2C0.895431 20 0 20.8954 0 22V22ZM0 12C0 13.1046 0.895431 14 2 14H34C35.1046 14 36 13.1046 36 12V12C36 10.8954 35.1046 10 34 10H2C0.895431 10 0 10.8954 0 12V12ZM2 0C0.895431 0 0 0.895431 0 2V2C0 3.10457 0.895431 4 2 4H34C35.1046 4 36 3.10457 36 2V2C36 0.895431 35.1046 0 34 0H2Z" />
      </svg>
    </button>
  );
}

const wrapperStyles = cva(
  "flex aspect-square w-12 items-center justify-center rounded-full active:inset-shadow-sm sm:w-16",
  {
    variants: {
      color: {
        accent: "hover:bg-teal-500",
        brand: "hover:bg-shade-50",
      },
    },
  },
);

const iconStyles = cva("h-4 sm:h-6 w-6 sm:w-8", {
  variants: {
    color: {
      accent: "fill-white-100",
      brand: "fill-teal-400",
    },
  },
});
