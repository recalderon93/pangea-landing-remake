import { cva } from "class-variance-authority";

export const wrapper = cva(
  "group flex py-4 sm:h-20 w-full cursor-pointer rounded-lg sm:rounded-xl items-center justify-between lg:rounded-2xl  px-3 sm:px-6 md:px-9 hover:bg-teal-700 ",
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
  "group-hover:text-white-50 group-aria-selected:text-white-50 font-semibold text-teal-700 text-[24px] leading-[32px] lg:text-[28px] lg:leading-[40px]",
  {
    variants: {
      isSelected: {
        true: "text-white-50",
        false: "",
      },
    },
  },
);

export const arrow = cva("size-7 transition-transform", {
  variants: {
    isOpen: {
      true: "rotate-45 fill-white-100",
      false:
        "-rotate-45 fill-teal-700 group-hover:fill-white-100 group-active:fill-white-100",
    },
  },
});
