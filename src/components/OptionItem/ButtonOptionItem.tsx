import ArrowIcon from "@components/icons/ArrowIcon";
import { wrapper, text, arrow } from "./styles";

type Props = {
  title: string;
  onMouseEnter?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
  showArrow?: boolean;
  isOpen?: boolean;
};

const ButtonOptionItem = ({
  title,
  onMouseEnter,
  onClick,
  isSelected = false,
  isOpen = false,
  showArrow = false,
}: Props) => (
  <button
    className={wrapper({ isSelected })}
    onMouseEnter={onMouseEnter}
    onClick={onClick}>
    <p key={title} className={text({ isSelected })}>
      {title}
    </p>
    {showArrow ? <ArrowIcon className={arrow({ isOpen })} /> : <div />}
  </button>
);

export default ButtonOptionItem;
