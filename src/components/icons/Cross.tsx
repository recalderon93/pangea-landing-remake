import { cva } from "class-variance-authority";

type Props = {
  variant?: "close" | "plus";
};

const CrossIcon = ({ variant = "plus" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={crossStyles({ variant })}
    viewBox="0 0 29 29"
    fill="none">
    <path d="M28.9914 14.4957H3.80142e-05" strokeWidth="3" />
    <path d="M14.4958 28.9918L14.4958 0.000403003" strokeWidth="3" />
  </svg>
);

const crossStyles = cva(
  "min-w-4 h-4  sm:min-w-5 sm:h-6 lg:min-w-6 lg:h-6 stroke-teal-400 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        close: "rotate-45",
        plus: "",
      },
    },
    defaultVariants: {
      variant: "plus",
    },
  },
);

export default CrossIcon;
