import { useShowMobileMenu } from "@/store/header/store";
import { t, type Locale } from "@/i18n";
import useFreezeScrollbar from "@hooks/useFreezeScrollbar";
import LinkOptionItem from "@components/OptionItem/LinkOptionItem";
import ButtonOptionItem from "@components/OptionItem/ButtonOptionItem";
import servicesItems from "@/constants/services";
import { useId, useState } from "react";
import NavigationMenuFooter from "./NavigationMenuFooter";

type Props = {
  lang?: Locale;
};

const MobileNavigationMenu = ({ lang = "en" }: Props) => {
  const show = useShowMobileMenu();
  const [showSolutions, setShowSolutions] = useState(false);

  useFreezeScrollbar(show);
  const menuId = useId();

  return (
    <div
      className={`fixed top-0 left-0 z-40 flex h-screen w-full flex-col overflow-y-auto bg-gray-50 px-8 pt-18 pb-12 transition-all duration-300 sm:pt-26 md:px-10 md:pt-30 ${
        show ? "block" : "hidden"
      }`}>
      <div className="flex h-full min-h-[720px] flex-col">
        <nav className="flex flex-1 flex-col pt-14">
          <ButtonOptionItem
            title={t(lang, "header.solutions")}
            showArrow
            isSelected={showSolutions}
            isOpen={showSolutions}
            onClick={() => setShowSolutions((st) => !st)}
            aria-expanded={showSolutions}
            aria-controls={menuId}
          />
          {showSolutions ? (
            <ul className="border-shade-100 border-b-2 pt-4" id={menuId}>
              {servicesItems.map((service, index) => (
                <li
                  key={service.id}
                  className={`flex w-full hover:bg-teal-700 ${index < servicesItems.length - 1 ? "border-shade-100 border-b-2" : ""}`}>
                  <a
                    href={service.href}
                    className="paragraph-1 flex w-full flex-1 items-center p-4 font-medium text-teal-700 hover:text-white">
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <LinkOptionItem
            className="mt-6"
            title={t(lang, "header.who-we-are")}
            href={t(lang, "header.url.who-we-are")}
          />
          <LinkOptionItem
            title={t(lang, "header.our-work")}
            href={t(lang, "header.url.our-work")}
          />
        </nav>
        <NavigationMenuFooter lang={lang} />
      </div>
    </div>
  );
};

export default MobileNavigationMenu;
