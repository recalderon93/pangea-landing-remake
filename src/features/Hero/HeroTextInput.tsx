import type { InputHTMLAttributes } from "react";
import TextInputBase from "@components/Inputs/TextInputBase";
import SubmitIcon from "@components/icons/SubmitIcon";
import { buttonStyles } from "@styles/button";
import { cn } from "@styles/classNameMerge";

type Props = {
  variant?: "brand" | "accent";
  buttonTitle?: string;
  // Callback executed when the text field button is clicked
  onButtonClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const HeroTextInput = ({
  variant = "brand",
  buttonTitle,
  onButtonClick,
  ...props
}: Props) => (
  <div className="relative gap-4 lg:flex">
    <TextInputBase variant={variant} {...props} />
    <button
      className="absolute top-1/2 right-4 -translate-y-1/2 lg:hidden"
      data-testid="icon-field-button"
      aria-label={buttonTitle}
      onClick={onButtonClick}>
      <SubmitIcon color={variant} />
    </button>
    <button
      title={buttonTitle}
      data-testid="field-button"
      onClick={onButtonClick}
      className={cn([buttonStyles({ variant }), "hidden lg:flex"])}>
      <p>{buttonTitle}</p>
    </button>
  </div>
);

export default HeroTextInput;
