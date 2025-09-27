import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "rounded-full disabled:bg-shade-200 px-6 py-1 sm:px-8 sm:py-3 elevation-1 active:shadow-none  caption bold shrink-0 leading-8 grow-0 uppercase flex items-center justify-center",
  {
    variants: {
      variant: {
        "accent-2":
          "bg-green-400 hover:bg-green-500 active:bg-green-500 text-white-50",
        brand: "bg-teal-400 hover:bg-teal-500 active:bg-teal-500 text-white-50",
        accent: "bg-white-100 hover:bg-shade-100 text-teal-400",
      },
      padding: {
        sm: "px-6 py-3",
        md: "px-6 py-3 sm:py-3 sm:px-8",
      },
    },
  },
);
