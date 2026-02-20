import ArrowIcon from "@components/icons/ArrowIcon";
import { wrapper, text, arrow } from "./styles";
import { cn } from "@styles/classNameMerge";

type Props = {
  title: string;
  href: string;
  onMouseEnter?: () => void;
  onClick?: () => void;
  isSelected?: boolean;
  showArrow?: boolean;
  className?: string;
};

const LinkOptionItem = ({
  title,
  href,
  onMouseEnter,
  onClick,
  isSelected = false,
  showArrow = false,
  className = "",
}: Props) => (
  <a
    href={href}
    className={cn([wrapper({ isSelected }), className])}
    onMouseEnter={onMouseEnter}
    onClick={onClick}>
    <p key={title} className={text({ isSelected })}>
      {title}
    </p>
    {showArrow ? <ArrowIcon className={arrow({ isOpen: false })} /> : <div />}
  </a>
);

export default LinkOptionItem;
