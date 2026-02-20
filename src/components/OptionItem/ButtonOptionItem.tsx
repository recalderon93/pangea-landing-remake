import ArrowIcon from "@components/icons/ArrowIcon";
import { wrapper, text, arrow } from "./styles";

type Props = {
  title: string;
  onMouseEnter?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
  showArrow?: boolean;
  isOpen?: boolean;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

const ButtonOptionItem = ({
  title,
  onMouseEnter,
  onClick,
  isSelected = false,
  isOpen = false,
  showArrow = false,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: Props) => (
  <button
    type="button"
    className={wrapper({ isSelected })}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
    aria-expanded={ariaExpanded}
    aria-controls={ariaControls}>
    <p key={title} className={text({ isSelected })}>
      {title}
    </p>
    {showArrow ? <ArrowIcon className={arrow({ isOpen })} /> : <div />}
  </button>
);

export default ButtonOptionItem;
