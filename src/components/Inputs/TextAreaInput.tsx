import { cva } from "class-variance-authority";
import { useId, type InputHTMLAttributes } from "react";

type Props = {
  errorMessage?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;
const TextAreaInput = ({ errorMessage, ...props }: Props) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <textarea
        id={id}
        aria-describedby={`error-${id}`}
        placeholder="Enter your answer here"
        className={textarea({
          error: !!errorMessage,
        })}
        {...props}
      />

      {errorMessage && (
        <span id={`error-${id}`} className="text-base font-medium text-red-200">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const textarea = cva(
  "min-h-[144px] rounded-3xl border-[3px] bg-white px-6 py-4 text-teal-400 placeholder:text-teal-400/70",
  {
    variants: {
      error: {
        true: "border-red-200 border-2",
      },
    },
  },
);

export default TextAreaInput;
