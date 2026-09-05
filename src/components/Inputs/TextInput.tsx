import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@styles/classNameMerge";
import { cva } from "class-variance-authority";

type TextInputProps = {
  errorMessage?: string;
  containerClassName?: string;
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  errorMessage,
  containerClassName,
  label,
  required,
  id,
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${generatedId}-error`;

  return (
    <div
      className={cn(
        "relative flex w-full min-w-66 flex-col gap-2 sm:min-w-86",
        containerClassName,
      )}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm leading-5 font-medium text-white sm:text-lg sm:leading-[26px]">
          {label}
          {required ? (
            <span className="ml-0.5" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        {...props}
        id={inputId}
        required={required}
        aria-required={required}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorId : undefined}
        className={cn(
          wrapper({ error: !!errorMessage }),
          props.className || "",
        )}
      />
      {errorMessage && (
        <span id={errorId} className="text-base font-medium text-red-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const wrapper = cva(
  "border-[2px] placeholder-teal-400/70 text-[14px] leading-5 sm:text-lg sm:leading-8 rounded-full h-10 sm:h-14 paragraph-1 px-6 sm:px-8 border-white-100 text-teal-500 outline-shade-50 bg-white w-full",
  {
    variants: {
      error: {
        true: "border-red-500",
      },
    },
  },
);

export default TextInput;
