import { useMemo } from "react";
import TestimonialsCaptions from "@features/Testimonials/Captions";
import TestimonialItem from "@features/Testimonials/Item";
import SliderButtons from "@components/slider/Buttons";
import StepIndicators from "@components/slider/StepIndicator";
import useCarousel from "@hooks/useCarousel";
import { buttonStyles } from "@styles/button";
import { Routes } from "@constants/routes";
import { t, type Locale } from "@/i18n";
import { testimonialsData, testimonialsDataEs } from "@/constants/testimonials";
import { cva } from "class-variance-authority";

type Props = {
  locale: Locale;
};

const Testimonials = ({ locale }: Props) => {
  const data = useMemo(
    () => (locale === "es" ? testimonialsDataEs : testimonialsData),
    [locale],
  );

  const {
    itemRefs,
    containerRef,
    goNext,
    goPrev,
    isScrollable,
    selectedIndex,
    setSelectedIndex,
  } = useCarousel({
    numberOfItems: data.length,
  });

  return (
    <div className="flex flex-col py-14 sm:py-16 md:py-20">
      <TestimonialsCaptions locale={locale} />

      <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-14">
        <a
          href={Routes[locale].contactUs}
          className={buttonStyles({ variant: "accent" })}>
          {t(locale, "landing.testimonials.cta")}
        </a>
        <SliderButtons
          color="accent"
          onGoNext={goNext}
          onGoPrevious={goPrev}
          showControls={isScrollable}
          nextDisabled={selectedIndex >= data.length - 1}
          previousDisabled={selectedIndex <= 0}
        />
      </div>

      <div ref={containerRef} className={containerStyles({ isScrollable })}>
        <div className={contentStyles({ isScrollable })}>
          {data.map((item, i) => (
            <div
              key={item.id}
              className="snap-start"
              ref={(el) => {
                itemRefs.current[i] = el;
              }}>
              <TestimonialItem
                id={item.id}
                avatar={item.avatar}
                username={item.username}
                role={item.role}
                company={item.company}
                testimonials={item.testimonials}
                color={i % 2 === 0 ? "brand" : "accent"}
                className={i % 2 === 0 ? "bg-pattern" : ""}
              />
            </div>
          ))}
        </div>
      </div>

      <StepIndicators
        showControls={isScrollable}
        currentIndex={selectedIndex}
        onGoToItem={setSelectedIndex}
        numberOfItems={data.length}
      />
    </div>
  );
};

const containerStyles = cva("no-scrollbar w-full py-6 pt-12 sm:pt-[68px]", {
  variants: {
    isScrollable: {
      true: "no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth scroll-px-4 sm:scroll-px-6 md:scroll-px-10 lg:scroll-px-14",
      false:
        "flex justify-center overflow-hidden px-4 sm:px-6 md:px-10 lg:px-14",
    },
  },
});

const contentStyles = cva("flex w-max gap-10", {
  variants: {
    isScrollable: {
      true: "px-4 sm:px-6 md:px-10 lg:px-14",
      false: "justify-center",
    },
  },
});

export default Testimonials;
