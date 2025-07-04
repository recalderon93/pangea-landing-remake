import { cva } from "class-variance-authority";
import ImagePlaceholder from "@/images/project-item-placeholder.png";
import { cn } from "@styles/classNameMerge";
import ArrowIcon from "@components/icons/ArrowIcon";

type Props = {
  projectId: string;
  name?: string;
  description?: string;
  image?: ImageMetadata;
  className?: string;
  isSquare?: boolean;
};

const ProjectItem = ({ isSquare = true, image, className = "" }: Props) => (
  <div className={cn(wrapperStyle({ isSquare }), className)}>
    <img
      src={image?.src || ImagePlaceholder.src}
      alt=""
      className="object-fill"
    />
    <button className={buttonStyle}>
      <p className="caption bold text-white-50">View Project</p>
      <div className="bg-white-100 flex aspect-square w-8 items-center justify-center rounded-full">
        <ArrowIcon className="fill-shade-200 size-4" />
      </div>
    </button>
  </div>
);

const buttonStyle =
  "p-1 md:p-[6px] rounded-full pl-4 md:pl-5 absolute right-6 bottom-6 flex items-center gap-4 md:right-8 md:bottom-8 backdrop-blur shadow-[-1px_2px_4px_0px_rgba(0,0,0,0.4)] bg-[linear-gradient(91deg,rgba(52,59,58,0.20)_0%,rgba(52,59,58,0.10)_100%)] active:shadow-none";

const wrapperStyle = cva(
  "rounded-3xl shadow-md lg:max-w-[624px] overflow-hidden relative max-w-[400] w-full",
  {
    variants: {
      isSquare: {
        true: "aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      isSquare: true,
    },
  },
);

export default ProjectItem;
