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

type Props = {
  lang?: Locale;
};

const Header = ({ lang = "en" }: Props) => {
  const isScrolled = useIsScrolled("#sentinel");
  const { toggleSolutions, toggleMobileMenu } = useHeaderActions();
  const showSolutions = useShowSolutions();
  const showMobileMenu = useShowMobileMenu();
  const showHeaderFrame = isScrolled || showSolutions || showMobileMenu;
  const color = showHeaderFrame ? "brand" : "accent";

  const navStyles = navItemStyles({ color });

  return (
    <>
      <header
        className={styles({
          isScrolled: showHeaderFrame,
        })}>
        <div className="sm:w-46">
          <Logo color={color} />
        </div>
        <nav
          className="hidden h-full grow items-center justify-center gap-8 lg:flex xl:gap-14"
          data-testid="desktop-navigation">
          <button className={navStyles} onClick={toggleSolutions}>
            {t(lang, "header.solutions")}
            <Chevron
              color={showHeaderFrame ? "brand" : "accent"}
              direction={showSolutions ? "up" : "down"}
            />
          </button>
          <a href={t(lang, "header.url.who-we-are")} className={navStyles}>
            {t(lang, "header.who-we-are")}
          </a>
          <a href={t(lang, "header.url.our-work")} className={navStyles}>
            {t(lang, "header.our-work")}
          </a>
        </nav>
        <div className="flex justify-end sm:w-44">
          <BurgerMenu
            color={showHeaderFrame ? "brand" : "accent"}
            className="lg:hidden"
            onClick={toggleMobileMenu}
          />
          <button
            className={cn([
              buttonStyles({ variant: showHeaderFrame ? "brand" : "accent" }),
              "hidden lg:block",
            ])}>
            {t(lang, "header.cta")}
          </button>
        </div>
      </header>
      <div id="sentinel" className="absolute h-1 w-full"></div>
      <SolutionsMenu onClose={toggleSolutions} />
      <MobileNavigationMenu />
    </>
  );
};

const styles = cva(
  "sticky top-0 w-full h-18 sm:h-26 md:h-30 px-6 flex items-center sm:px-8 lg:px-20 transition-all duration-200 ease-in-out justify-between z-50 -mb-18 sm:-mb-26 md:-mb-30 ",
  {
    variants: {
      isScrolled: {
        true: "bg-white-100 elevation-1 backdrop-blur-md",
        false: "bg-transparent shadow-none",
      },
    },
  },
);

const navItemStyles = cva(
  "flex items-center gap-2 paragraph-1 bold cursor-pointer",
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
