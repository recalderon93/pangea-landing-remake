import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "rounded-full disabled:bg-shade-200 px-4 py-3 sm:px-6 sm:py-4 elevation-1 active:shadow-none  caption bold shrink-0 grow-0 uppercase flex items-center justify-center",
  {
    variants: {
      variant: {
        brand: "bg-teal-400 hover:bg-teal-500 active:bg-teal-500 text-white-50",
        accent: "bg-white-100 hover:bg-shade-100 text-teal-400",
      },
    },
  },
);
