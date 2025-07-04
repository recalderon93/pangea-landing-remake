import SolutionItem from "./SolutionsItems";
import solutionsData from "@/constants/services";
import SliderButtons from "@components/slider/Buttons";
import { buttonStyles } from "@styles/button";
import StepIndicators from "@components/slider/StepIndicator";
import useCarousel from "@hooks/useCarousel";
import { t, type Locale } from "@/i18n";
import { cva } from "class-variance-authority";

type Props = {
  locale?: Locale;
};

const SolutionsSlider = ({ locale }: Props) => {
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
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14">
        <button className={buttonStyles({ variant: "brand" })}>
          {t(locale, "landing.solutions.cta")}
        </button>
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
                description={solution.description.en}
                image={solution.image.src}
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

const containerStyles = cva(
  "no-scrollbar w-full px-4 py-6 sm:px-6 md:px-10 lg:px-14",
  {
    variants: {
      isScrollable: {
        true: "no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth",
        false: "flex justify-center overflow-hidden",
      },
    },
  },
);

const contentStyles = cva("flex w-max gap-4", {
  variants: {
    isScrollable: {
      true: "",
      false: "justify-center",
    },
  },
});

export default SolutionsSlider;
