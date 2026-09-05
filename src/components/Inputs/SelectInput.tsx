import { useId } from "react";
import Chevron from "@components/icons/Chevron";
import { cn } from "@styles/classNameMerge";
import { cva } from "class-variance-authority";

type Props = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
  errorMessage?: string;
  className?: string;
};

const SelectInput = ({
  label,
  placeholder,
  required,
  errorMessage,
  options = [],
  onChange,
  value,
  className,
}: Props) => {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label
          htmlFor={generatedId}
          className="text-sm leading-5 font-medium text-white sm:text-lg sm:leading-[26px]">
          {label}
          {required ? (
            <span className="ml-0.5" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className="group relative w-full">
        <select
          id={generatedId}
          value={value || ""}
          required={required}
          aria-required={required}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? errorId : undefined}
          onChange={handleChange}
          className={cn(select({ error: !!errorMessage }), className)}>
          <option disabled value="" className="text-lg leading-8">
            {placeholder ?? "Select an option"}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-lg leading-8">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-[50%] right-[20px] -translate-y-[50%]">
          <Chevron
            className="transition-transform duration-200 group-focus-within:rotate-180"
            color="brand"
            width={20}
            height={10}
            direction="down"
          />
        </div>
      </div>
      {errorMessage && (
        <span id={errorId} className="text-base font-medium text-red-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const select = cva(
  "relative w-full min-w-66 appearance-none rounded-full bg-white px-8 py-3 text-[14px] leading-5 sm:text-lg sm:leading-8 text-teal-500 sm:min-w-86",
  {
    variants: {
      error: {
        true: "border-red-500 border-2",
      },
    },
  },
);

export default SelectInput;
