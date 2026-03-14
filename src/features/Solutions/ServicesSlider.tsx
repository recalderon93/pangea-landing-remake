import SolutionItem from "./SolutionsItems";
import SliderButtons from "@components/slider/Buttons";
import { buttonStyles } from "@styles/button";
import StepIndicators from "@components/slider/StepIndicator";
import useCarousel from "@hooks/useCarousel";
import { t, type Locale } from "@/i18n";
import { cva } from "class-variance-authority";
import { Routes } from "@constants/routes";

type SolutionItem = {
  id: string;
  href: string;
  image: string;
  title: string;
  description: string;
};

type Props = {
  locale?: Locale;
  solutions: SolutionItem[];
};

const SolutionsSlider = ({ locale = "en", solutions }: Props) => {
  const solutionsData = solutions;
  const {
    itemRefs,
    containerRef,
    goNext,
    goPrev,
    isScrollable,
    selectedIndex,
    setSelectedIndex,
  } = useCarousel({
    numberOfItems: solutionsData.length,
  });

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-14">
        <a
          href={Routes[locale].contactUs}
          className={buttonStyles({ variant: "brand" })}>
          {t(locale, "landing.solutions.cta")}
        </a>
        {/* Slider Controls */}
        <SliderButtons
          onGoNext={goNext}
          onGoPrevious={goPrev}
          showControls={isScrollable}
          nextDisabled={selectedIndex >= solutionsData.length - 1}
          previousDisabled={selectedIndex <= 0}
          color="brand"
        />
      </div>

      <div ref={containerRef} className={containerStyles({ isScrollable })}>
        <div className={contentStyles({ isScrollable })}>
          {solutionsData.map((solution, i) => (
            <div
              key={solution.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}>
              <SolutionItem
                title={solution.title}
                description={solution.description}
                image={solution.image}
                href={solution.href}
                isSelected={i === selectedIndex}
                onClick={() => setSelectedIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>
      <StepIndicators
        showControls={isScrollable}
        currentIndex={selectedIndex}
        onGoToItem={(setIndex: number) => {
          setSelectedIndex(setIndex);
        }}
        numberOfItems={solutionsData.length}
      />
    </div>
  );
};

const containerStyles = cva("no-scrollbar w-full py-6 pt-12 sm:pt-[68px]", {
  variants: {
    isScrollable: {
      true: "no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth",
      false:
        "flex justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14",
    },
  },
});

const contentStyles = cva("flex w-max gap-4", {
  variants: {
    isScrollable: {
      true: "px-4 sm:px-6 md:px-10 lg:px-14",
      false: "justify-center",
    },
  },
});

export default SolutionsSlider;
