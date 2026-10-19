import { cva } from "class-variance-authority";

type Props = {
  totalSteps?: number;
  currentStep?: number;
  onClickStep?: (step: number) => void;
};

const StepCounter = ({ onClickStep, totalSteps, currentStep = 0 }: Props) => (
  <div className="flex gap-3">
    {Array.from({ length: totalSteps ?? 0 }).map((_, index) => (
      <button
        key={index}
        type="button"
        aria-label={`Step ${index + 1}`}
        aria-current={index + 1 === currentStep ? "step" : undefined}
        disabled={index + 1 > (currentStep ?? 0)}
        onClick={() => onClickStep?.(index + 1)}
        className="flex size-8 items-center justify-center">
        <span
          className={step({
            selected: index + 1 === currentStep,
            greater: index + 1 > currentStep,
            lesser: index + 1 < currentStep,
          })}
        />
      </button>
    ))}
  </div>
);

const step = cva("size-3 rounded-full shadow-md md:size-4", {
  variants: {
    selected: {
      true: "bg-green-300",
    },
    greater: {
      true: "bg-neutral-50",
    },
    lesser: {
      true: "bg-green-400",
    },
  },
});

export default StepCounter;
