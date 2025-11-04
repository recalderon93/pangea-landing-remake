import { buttonStyles } from "@styles/button";
import { t, type Locale } from "@/i18n";
import { Routes } from "@constants/routes";

type Props = {
  lang?: Locale;
};

const NavigationMenuFooter = ({ lang = "en" }: Props) => (
  <div
    className="bg-pattern flex w-full flex-col items-start gap-8 rounded-2xl bg-teal-400 p-7 sm:flex-row sm:items-center sm:justify-between"
    onMouseDown={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}>
    <p className="h4 text-white-100 font-medium">
      {t(lang, "header.nav-menu-banner-1")}
      <span className="block text-green-200">
        {t(lang, "header.nav-menu-banner-2")}
      </span>
    </p>
    <a
      href={Routes[lang].contactUs}
      className={buttonStyles({ variant: "accent" })}>
      {t(lang, "header.book-a-call")}
    </a>
  </div>
);

export default NavigationMenuFooter;
