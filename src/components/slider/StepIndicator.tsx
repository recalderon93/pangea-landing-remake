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

  const isAtEnd = currentIndex >= numberOfItems - 1;

  return (
    <div
      role="tablist"
      aria-label="Slider pagination"
      className={cn([
        "flex items-center justify-center gap-1 transition-all duration-300",
        isAtEnd && "pl-2",
        className,
      ])}>
      {Array.from({ length: numberOfItems }, (_, index) => {
        const isActive = index === currentIndex;
        const isLast = index === numberOfItems - 1;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={isActive}
            onClick={() => onGoToItem?.(index)}
            className={cn(
              "flex h-8 w-8 cursor-pointer items-center justify-center transition-all duration-300",
              isLast && "ml-3",
              isLast && isAtEnd && "ml-5",
            )}>
            <span className={dot({ isActive, isEnd: isLast && isAtEnd })} />
          </button>
        );
      })}
    </div>
  );
};

const dot = cva("rounded-full transition-all duration-300", {
  variants: {
    isActive: {
      true: "h-2 w-6 bg-teal-500",
      false: "h-2 w-2 bg-gray-300 hover:bg-gray-400",
    },
    isEnd: {
      true: "ring-4 ring-teal-500/25",
      false: "",
    },
  },
});

export default StepIndicators;
