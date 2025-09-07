import type { PropsWithChildren } from "react";
import { cn } from "@styles/classNameMerge";
import StepCounter from "./StepCounter";

type Props = {
  containerClassName?: string;
  onStepChange?: (step: number) => void;
  totalSteps?: number;
  currentStep?: number;
} & PropsWithChildren;

const FormWrapper = ({
  children,
  containerClassName,
  onStepChange,
  totalSteps,
  currentStep = 0,
}: Props) => (
  <div className="px-4 pt-3 md:px-10">
    <div
      className={cn(
        "mx-auto flex min-h-[495px] flex-col items-center rounded-4xl bg-teal-400 pt-5 pb-16 md:min-h-[612px] md:pt-8 md:pb-24",
        containerClassName,
      )}>
      {currentStep > 0 ? (
        <StepCounter
          totalSteps={totalSteps}
          currentStep={currentStep}
          onClickStep={onStepChange}
        />
      ) : null}
      <div className="flex flex-col pt-9 md:pt-20">{children}</div>
    </div>
  </div>
);

export default FormWrapper;
