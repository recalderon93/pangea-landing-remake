"use client";
import type { InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  variant?: "brand" | "accent";
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInputBase({
  className = "",
  variant = "brand",
  ...props
}: Props) {
  const styles = cn([baseStyles({ color: variant }), className]);

  return <input type="email" className={styles} {...props} />;
}

const baseStyles = cva(
  "border-[2px] placeholder-shade-50 rounded-full h-10 sm:h-14 paragraph-1 px-6 sm:px-8 min-w-66 sm:min-w-86",
  {
    variants: {
      color: {
        brand:
          "border-teal-400 text-teal-400 placeholder-shade-300 outline-teal-600",
        accent:
          "border-white-100 text-white-50 placeholder-shade-50 outline-shade-50",
      },
    },
  },
);
