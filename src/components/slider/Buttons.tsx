import { cva } from "class-variance-authority";
import Chevron from "@components/icons/Chevron";

type Props = {
  onGoNext?: () => void;
  onGoPrevious?: () => void;
  showControls?: boolean;
  nextDisabled?: boolean;
  previousDisabled?: boolean;
  color: "brand" | "accent";
};

const SliderButtons = ({
  onGoNext,
  onGoPrevious,
  showControls = true,
  nextDisabled = false,
  previousDisabled = false,
  color,
}: Props) => {
  if (!showControls) return <div className="hidden" />;

  const chevronColor = color === "brand" ? "accent" : "brand";

  return (
    <div className="min-width-22 flex gap-2">
      <button
        disabled={previousDisabled}
        onClick={onGoPrevious}
        className={buttonVariants({ color, direction: "left" })}>
        <Chevron direction="left" width={20} height={11} color={chevronColor} />
      </button>
      <button
        disabled={nextDisabled}
        onClick={onGoNext}
        className={buttonVariants({ color, direction: "right" })}>
        <Chevron
          direction="right"
          width={22}
          height={11}
          color={chevronColor}
        />
      </button>
    </div>
  );
};

const buttonVariants = cva(
  "flex w-14  h-14 items-center justify-center rounded-full border-[3px] pr-1 shadow hover:shadow-none disabled:opacity-70",
  {
    variants: {
      color: {
        brand: "border-white-50 bg-teal-400",
        accent: "border-teal-500 bg-white-50",
      },
      direction: {
        left: "",
        right: "pl-1",
      },
    },
  },
);

export default SliderButtons;
