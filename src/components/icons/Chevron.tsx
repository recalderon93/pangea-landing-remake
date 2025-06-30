import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  color?: "accent" | "brand";
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  width?: number;
  height?: number;
};

const Chevron = ({
  color = "brand",
  direction = "down",
  className = "",
  width = 10,
  height = 6,
}: Props) => (
  <svg
    viewBox="0 0 10 6"
    width={width}
    height={height}
    fill="none"
    data-testid={`chevron-${direction}`}
    className={cn(chevronStyle({ color, direction }), className)}
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 1L5 5L9 1"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const chevronStyle = cva("", {
  variants: {
    color: {
      accent: "stroke-white-100",
      brand: "stroke-teal-400",
    },
    direction: {
      up: "rotate-180",
      down: "rotate-0",
      left: "rotate-90",
      right: "rotate-270",
    },
  },
});

export default Chevron;
