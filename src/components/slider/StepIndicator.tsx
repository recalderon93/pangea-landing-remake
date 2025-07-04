import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  showControls?: boolean;
  currentIndex: number;
  onGoToItem?: (index: number) => void;
  numberOfItems: number;
  className?: string;
};

const StepIndicators = ({
  showControls = true,
  currentIndex = 0,
  onGoToItem,
  numberOfItems = 3,
  className = "",
}: Props) => {
  if (!showControls) return <div className="hidden" />;

  return (
    <div className={cn(["flex items-center justify-center gap-2", className])}>
      {Array.from({ length: numberOfItems }, (_, index) => (
        <button
          key={index}
          onClick={() => onGoToItem?.(index)}
          className={button({
            isActive: index === currentIndex,
          })}
        />
      ))}
    </div>
  );
};

const button = cva("h-2 w-2 rounded-full transition-all duration-300", {
  variants: {
    isActive: {
      true: "bg-teal-500",
      false: "bg-gray-300",
    },
  },
});

export default StepIndicators;
