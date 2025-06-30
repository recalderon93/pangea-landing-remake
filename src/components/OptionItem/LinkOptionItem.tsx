import ArrowIcon from "@components/icons/ArrowIcon";
import { wrapper, text, arrow } from "./styles";

type Props = {
  title: string;
  href: string;
  onMouseEnter?: () => void;
  isSelected?: boolean;
  showArrow?: boolean;
};

const LinkOptionItem = ({
  title,
  href,
  onMouseEnter,
  isSelected = false,
  showArrow = false,
}: Props) => (
  <a
    href={href}
    className={wrapper({ isSelected })}
    onMouseEnter={onMouseEnter}>
    <p key={title} className={text({ isSelected })}>
      {title}
    </p>
    {showArrow ? <ArrowIcon className={arrow({ isOpen: false })} /> : <div />}
  </a>
);

export default LinkOptionItem;
