import { cva } from "class-variance-authority";

export const wrapper = cva(
  "group flex py-5 sm:h-20 w-full cursor-pointer rounded-lg sm:rounded-xl items-center justify-between lg:rounded-2xl xl:rounded-3xl px-3 sm:px-6 md:px-9 hover:bg-teal-700 xl:h-22",
  {
    variants: {
      isSelected: {
        true: "bg-teal-700",
        false: "",
      },
    },
  },
);

export const text = cva(
  "group-hover:text-white-50 group-aria-selected:text-white-50 font-semibold text-teal-700 text-[24px] leading-[32px] lg:text-[28px] lg:leading-[40px] xl:text-[40px] xl:leading-[48px]",
  {
    variants: {
      isSelected: {
        true: "text-white-50",
        false: "",
      },
    },
  },
);

export const arrow = cva("fill-white-100 size-7 transition-transform", {
  variants: {
    isOpen: {
      true: "rotate-45 block",
      false: "-rotate-45 hidden group-hover:block group-active:block",
    },
  },
});
