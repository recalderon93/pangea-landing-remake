"use client";
import type { InputHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  variant?: "brand" | "accent";
  showError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextInputBase({
  className = "",
  showError = false,
  variant = "brand",
  ...props
}: Props) {
  const styles = cn([baseStyles({ error: showError }), className]);

  return <input className={styles} {...props} />;
}

const baseStyles = cva(
  " bg-white rounded-full h-10 sm:h-14 paragraph-1 px-6 sm:px-8 min-w-66 sm:min-w-86 text-teal-400 placeholder:text-teal-400/70 outline-teal-300 text-lg leading-8 ",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
    },
  },
);
