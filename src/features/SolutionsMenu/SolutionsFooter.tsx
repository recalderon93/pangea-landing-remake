import { buttonStyles } from "@styles/button";
import { t, type Locale } from "@/i18n";

type Props = {
  lang?: Locale;
};

const SolutionsMenuFooter = ({ lang = "en" }: Props) => {
  return (
    <div className="border-t-shade-50 flex w-full items-center justify-between border-t-3 lg:h-40">
      <h2 className="text-shade-100 text-[40px] leading-[48px] xl:text-[56px] xl:leading-[64px]">
        {t(lang, "header.solutions")}
      </h2>
      <div className="flex items-center gap-6">
        <p className="h5 text-teal-700">{t(lang, "header.know-more")}</p>
        <button className={buttonStyles({ variant: "brand" })}>
          {t(lang, "header.book-a-call")}
        </button>
      </div>
    </div>
  );
};

export default SolutionsMenuFooter;
