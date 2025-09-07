import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@styles/classNameMerge";
import { cva } from "class-variance-authority";

type TextInputProps = {
  errorMessage?: string;
  containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  errorMessage,
  containerClassName,
  ...props
}: TextInputProps) => {
  const id = useId();
  return (
    <div
      className={cn(
        "relative flex w-full min-w-66 flex-col gap-2 sm:min-w-86",
        containerClassName,
      )}>
      <input
        {...props}
        aria-describedby={id}
        className={cn(
          wrapper({ error: !!errorMessage }),
          props.className || "",
        )}
      />
      {errorMessage && (
        <span id={id} className="text-base font-medium text-red-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const wrapper = cva(
  "border-[2px] placeholder-teal-400/70 text-lg leading-8 rounded-full h-10 sm:h-14 paragraph-1 px-6 sm:px-8 border-white-100 text-teal-500 outline-shade-50 bg-white w-full",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
    },
  },
);

export default TextInput;
