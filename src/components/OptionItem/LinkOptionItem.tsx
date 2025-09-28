import ArrowIcon from "@components/icons/ArrowIcon";
import { wrapper, text, arrow } from "./styles";
import { cn } from "@styles/classNameMerge";

type Props = {
  title: string;
  href: string;
  onMouseEnter?: () => void;
  isSelected?: boolean;
  showArrow?: boolean;
  className?: string;
};

const LinkOptionItem = ({
  title,
  href,
  onMouseEnter,
  isSelected = false,
  showArrow = false,
  className = "",
}: Props) => (
  <a
    href={href}
    className={cn([wrapper({ isSelected }), className])}
    onMouseEnter={onMouseEnter}>
    <p key={title} className={text({ isSelected })}>
      {title}
    </p>
    {showArrow ? <ArrowIcon className={arrow({ isOpen: false })} /> : <div />}
  </a>
);

export default LinkOptionItem;
