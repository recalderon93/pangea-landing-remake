import { t, type Locale } from "@/i18n";
import useIsScrolled from "@hooks/useIsScrolled";
import { cva } from "class-variance-authority";
import Logo from "@components/icons/Logo";
import BurgerMenu from "@components/icons/BurguerMenu";
import { cn } from "@styles/classNameMerge";
import { buttonStyles } from "@styles/button";
import Chevron from "@components/icons/Chevron";
import SolutionsMenu from "@features/SolutionsMenu/SolutionsMenu";
import {
  useHeaderActions,
  useShowMobileMenu,
  useShowSolutions,
} from "@store/header/store";
import MobileNavigationMenu from "./NavigationMenu";
import useGetUrl from "@hooks/useGetUrl";
import { Routes } from "@constants/routes";

type Props = {
  lang?: Locale;
  fillHeader?: boolean; // Optional prop to control header fill
};

const Header = ({ lang = "en", fillHeader = false }: Props) => {
  const isScrolled = useIsScrolled("#sentinel");
  const { toggleSolutions, toggleMobileMenu } = useHeaderActions();
  const showSolutions = useShowSolutions();
  const showMobileMenu = useShowMobileMenu();
  const showHeaderFrame =
    isScrolled || showSolutions || showMobileMenu || fillHeader;
  const color = showHeaderFrame ? "brand" : "accent";

  const navStyles = navItemStyles({ color });

  const currentPath = useGetUrl();

  return (
    <>
      <header
        className={styles({
          isScrolled: showHeaderFrame,
          fillHeader,
        })}>
        <div className="sm:w-46">
          <a href={Routes[lang].home} aria-label="Pangea Logo">
            <Logo color={color} />
          </a>
        </div>
        <nav
          className="hidden h-full grow items-center justify-center gap-8 lg:flex xl:gap-14"
          data-testid="desktop-navigation">
          <button
            type="button"
            className={navStyles}
            onClick={toggleSolutions}
            aria-label={t(lang, "header.solutions")}
            aria-expanded={showSolutions}>
            {t(lang, "header.solutions")}
            <Chevron
              color={showHeaderFrame ? "brand" : "accent"}
              direction={showSolutions ? "up" : "down"}
            />
          </button>
          <a href={Routes[lang].whoWeAre} className={navStyles}>
            {t(lang, "header.who-we-are")}
          </a>
          <a href={Routes[lang].ourWork} className={navStyles}>
            {t(lang, "header.our-work")}
          </a>
        </nav>
        <div className="flex justify-end sm:w-44">
          <BurgerMenu
            color={showHeaderFrame ? "brand" : "accent"}
            className="lg:hidden"
            onClick={toggleMobileMenu}
            aria-label={t(lang, "header.menu")}
          />
          {currentPath !== Routes[lang].contactUs ? (
            <a
              href={Routes[lang].contactUs}
              className={cn([
                buttonStyles({ variant: showHeaderFrame ? "brand" : "accent" }),
                "hidden lg:block",
              ])}>
              {t(lang, "header.cta")}
            </a>
          ) : null}
        </div>
      </header>
      <div id="sentinel" className="absolute h-1 w-full"></div>
      <SolutionsMenu onClose={toggleSolutions} />
      <MobileNavigationMenu />
    </>
  );
};

const styles = cva(
  "sticky top-0 w-full h-18 sm:h-26 md:h-30 px-6 flex items-center sm:px-8 lg:px-20 transition-all duration-200 ease-in-out justify-between z-50 max-w-[1536px] mx-auto",
  {
    variants: {
      isScrolled: {
        true: "bg-white-100 elevation-1 backdrop-blur-md",
        false: "bg-transparent shadow-none",
      },
      fillHeader: {
        true: "bg-white-100 elevation-1 backdrop-blur-md ",
        false: "bg-transparent shadow-none -mb-18 sm:-mb-26 md:-mb-30",
      },
    },
  },
);

const navItemStyles = cva(
  "flex items-center gap-2 text-xl leading-6 font-semibold cursor-pointer",
  {
    variants: {
      color: {
        accent: "text-white-100",
        brand: "text-teal-400 hover:text-teal-500",
      },
    },
  },
);

export default Header;
