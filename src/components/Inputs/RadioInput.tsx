type Props = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const RadioInput = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  disabled,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div
      className={`group flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-white py-3 pr-6 pl-3 text-sm font-normal text-teal-500 transition-all duration-200 ease-in-out hover:bg-gray-50 hover:shadow-sm ${checked ? "ring-opacity-50 bg-teal-50 ring-2 ring-teal-500" : ""} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={() => {
        if (!disabled && onChange) {
          onChange(value);
        }
      }}>
      <div className="relative">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="peer sr-only"
        />
        {/* Custom radio button */}
        <div
          className={`flex size-[18px] items-center justify-center rounded-full border-2 transition-all duration-200 ${
            checked
              ? "border-teal-400 bg-teal-400"
              : "border-teal-400 bg-white group-hover:border-teal-400"
          } ${disabled ? "border-gray-200 bg-gray-100" : ""}`}>
          {/* Inner dot when checked */}
          {checked && (
            <div className="size-2 rounded-full bg-white transition-all duration-200" />
          )}
        </div>
      </div>
      <label
        htmlFor={id}
        className={`cursor-pointer text-lg font-medium text-teal-500 transition-colors duration-200 select-none ${disabled ? "cursor-not-allowed text-gray-400" : ""}`}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
