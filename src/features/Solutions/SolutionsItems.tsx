import { cva } from "class-variance-authority";

type Props = {
  title: string;
  description: string;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const SolutionItem = ({
  description,
  image,
  title,
  isSelected = false,
  onClick,
}: Props) => (
  <div
    role="button"
    className="group elevation-2 bg-white-50 relative flex h-[560px] w-[320px] shrink-0 cursor-pointer snap-center flex-col justify-end overflow-hidden rounded-2xl lg:h-[672px] lg:w-[384px]"
    onClick={onClick}>
    <div className={captionWrapper({ isSelected })}>
      <h3 className={titleStyles({ isSelected })}>{title}</h3>
      <p className={captionStyles({ isSelected })}>{description}</p>
    </div>
    <div className="relative h-[65%] overflow-hidden">
      <img src={image} alt={title} className={imageStyles({ isSelected })} />
    </div>
  </div>
);

const captionWrapper = cva(
  "elevation-1 absolute top-0 right-0 left-0 z-10 min-h-[240px] rounded-2xl bg-gray-100 px-8 lg:px-9 py-10 transition-colors duration-300 ease-in-out group-hover:bg-teal-400",
  {
    variants: {
      isSelected: {
        true: "bg-teal-400",
        false: "bg-gray-100",
      },
    },
  },
);

const titleStyles = cva(
  "h4 bold whitespace-pre-line transition-colors duration-300 ease-in-out group-hover:text-green-200",
  {
    variants: {
      isSelected: {
        true: "text-green-200",
        false: "text-teal-400",
      },
    },
  },
);

const captionStyles = cva(
  "paragraph-2 group-hover:text-white-50 mt-4 text-teal-400",
  {
    variants: {
      isSelected: {
        true: "text-white-50",
        false: "text-teal-400",
      },
    },
  },
);

const imageStyles = cva(
  "absolute inset-0 h-full w-full object-cover object-[60%_10%] transition-transform duration-500 ease-in-out group-hover:scale-105",
  {
    variants: {
      isSelected: {
        true: "scale-105",
        false: "scale-100",
      },
    },
  },
);
export type ServiceItemProps = Props;

export default SolutionItem;
