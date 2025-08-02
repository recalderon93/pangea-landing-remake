import ArrowIcon from "@components/icons/ArrowIcon";
import { t, type Locale } from "@/i18n";

type Props = {
  locale?: Locale;
  image: string;
  name: string;
  role: string;
  description: string;
  /** This function is called when the button is clicked only en small screen */
  onClick?: () => void;
};

const FounderItem = ({
  locale = "en",
  name,
  image,
  role,
  description,
  onClick,
}: Props) => (
  <>
    <button
      className="cursor-pointer overflow-hidden rounded-3xl shadow-xs active:shadow-none lg:hidden"
      onClick={onClick}>
      <div className="bg-shade-200 h-[366px] w-[366px]">
        <img
          src={image}
          alt={`${name}${t(locale, "who-we-are.founders.img-alt")}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-start gap-5 rounded-b-3xl bg-teal-400 px-9 py-4">
        <div className="flex w-full flex-col items-start">
          <h3 className="text-xl leading-8 font-extrabold text-white">
            {name}
          </h3>
          <p className="text-base leading-6 font-normal text-white">{role}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base leading-6 font-semibold text-white">
            {t(locale, "who-we-are.founders.close")}
          </p>
          <ArrowIcon className="size-4 fill-white" />
        </div>
      </div>
    </button>
    <div className="hidden items-center gap-12 lg:flex">
      <div className="bg-shade-200 relative h-[405px] w-[366px] shrink-0 overflow-hidden rounded-3xl shadow-md lg:h-[281px] lg:w-[255px] lg:rounded-4xl">
        <img
          src={image}
          alt={`${name}${t(locale, "who-we-are.founders.img-alt")}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="hidden lg:flex lg:flex-col">
        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-[30px] leading-10 font-semibold text-teal-400">
              {name}
            </h3>
            <p className="paragraph-2 text-[16px] text-teal-400">{role}</p>
          </div>
          <p className="paragraph-1 text-shade-400 leading-8 font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  </>
);

export default FounderItem;
