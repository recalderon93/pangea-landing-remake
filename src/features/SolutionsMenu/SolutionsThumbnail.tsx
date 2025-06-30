import { t, type Locale } from "@/i18n";

type Props = {
  src?: string;
  description?: string;
  lang?: Locale;
};

const SolutionsMenuThumbnail = ({ src, description, lang = "en" }: Props) => (
  <div className="flex flex-1 flex-col items-center gap-7 px-8 lg:px-0">
    <div className="bg-shade-200 max-w- relative aspect-[1.75] w-full max-w-[360px] overflow-hidden rounded-3xl md:max-w-[456px]">
      <img
        alt=""
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
    <p className="paragraph-1 max-w-[400px] text-center font-semibold text-teal-700 sm:max-w-[456px] lg:text-start lg:font-normal">
      {description}
    </p>
    <button className="paragraph-1 bolder cursor-pointer text-teal-700 underline lg:hidden">
      {t(lang, "header.learn-more")}
    </button>
  </div>
);

export default SolutionsMenuThumbnail;
