import { useId } from "react";
import Chevron from "@components/icons/Chevron";
import { cn } from "@styles/classNameMerge";
import { cva } from "class-variance-authority";

type Props = {
  label?: string;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
  errorMessage?: string;
  className?: string;
};

const SelectInput = ({
  label,
  errorMessage,
  options = [],
  onChange,
  value,
  className,
}: Props) => {
  const id = useId();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="group relative w-full">
        <select
          value={value || ""}
          onChange={handleChange}
          className={cn(select({ error: !!errorMessage }), className)}>
          <option disabled value="" className="text-lg leading-8">
            {label ?? "Select an option"}
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
        <span id={id} className="text-base font-medium text-red-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const select = cva(
  "relative w-full min-w-66 appearance-none rounded-full bg-white px-8 py-3 text-lg leading-8 text-teal-500 sm:min-w-86",
  {
    variants: {
      error: {
        true: "border-red-500 border-2",
      },
    },
  },
);

export default SelectInput;
