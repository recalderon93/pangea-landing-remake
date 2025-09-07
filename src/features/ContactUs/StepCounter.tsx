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
        disabled={index + 1 > (currentStep ?? 0)}
        onClick={() => onClickStep?.(index + 1)}
        className={step({
          selected: index + 1 === currentStep,
          greater: index + 1 > currentStep,
          lesser: index + 1 < currentStep,
        })}
      />
    ))}
  </div>
);

const step = cva(
  "size-3 md:size-4 rounded-full shadow-md cursor-pointer disabled:cursor-auto",
  {
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
  },
);

export default StepCounter;
