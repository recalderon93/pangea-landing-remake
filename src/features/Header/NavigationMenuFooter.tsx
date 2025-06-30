import { buttonStyles } from "@styles/button";
import { t, type Locale } from "@/i18n";

type Props = {
  lang?: Locale;
};

const NavigationMenuFooter = ({ lang }: Props) => (
  <div className="flex w-full flex-col items-start gap-8 rounded-2xl bg-teal-700 p-7 sm:flex-row sm:items-center sm:justify-between">
    <p className="h4 text-white-100 font-medium">
      {t(lang, "header.nav-menu-banner-1")}
      <span className="block text-green-300">
        {t(lang, "header.nav-menu-banner-2")}
      </span>
    </p>
    <button className={buttonStyles({ variant: "accent" })}>
      {t(lang, "header.book-a-call")}
    </button>
  </div>
);

export default NavigationMenuFooter;
