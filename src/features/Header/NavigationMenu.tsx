import { useHeaderActions, useShowMobileMenu } from "@/store/header/store";
import { t, type Locale } from "@/i18n";
import useFreezeScrollbar from "@hooks/useFreezeScrollbar";
import LinkOptionItem from "@components/OptionItem/LinkOptionItem";
import ButtonOptionItem from "@components/OptionItem/ButtonOptionItem";
import { getSolutionsByLocale } from "@/constants/services";
import { useEffect, useId, useState } from "react";
import NavigationMenuFooter from "./NavigationMenuFooter";
import { Routes } from "@constants/routes";

type Props = {
  lang?: Locale;
};

const MobileNavigationMenu = ({ lang = "en" }: Props) => {
  const show = useShowMobileMenu();
  const { closeMobileMenu } = useHeaderActions();
  const [showSolutions, setShowSolutions] = useState(false);

  useFreezeScrollbar(show);

  useEffect(() => {
    if (!show) {
      setShowSolutions(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMobileMenu, show]);

  const menuId = useId();
  const servicesItems = getSolutionsByLocale(lang);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!show}
      aria-label={t(lang, "header.menu")}
      className={`fixed inset-0 z-40 flex w-full flex-col overflow-y-auto bg-gray-50 px-8 pt-18 transition-all duration-300 sm:pt-26 md:px-10 md:pt-30 lg:hidden ${
        show
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}>
      {/* Full-bleed background that extends well past any safe-area edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 bg-gray-50"
        style={{ height: "150vh" }}
      />
      <div className="relative flex min-h-full flex-col pb-10">
        <nav
          aria-label={t(lang, "header.menu")}
          className="flex flex-1 flex-col pt-14">
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
                    onClick={closeMobileMenu}
                    className="paragraph-1 flex w-full flex-1 items-center p-4 font-medium text-teal-700 hover:text-white">
                    <span>{service.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <LinkOptionItem
            className={`${showSolutions ? "mt-6" : "mt-0"}`}
            title={t(lang, "header.who-we-are")}
            href={Routes[lang].whoWeAre}
            onClick={closeMobileMenu}
          />
          <LinkOptionItem
            title={t(lang, "header.our-work")}
            href={Routes[lang].ourWork}
            onClick={closeMobileMenu}
          />
        </nav>
        <div className="shrink-0 pt-8 pb-8">
          <NavigationMenuFooter lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationMenu;
