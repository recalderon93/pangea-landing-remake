import { useEffect, useRef, useState, useMemo } from "react";
import TestimonialsCaptions from "@features/Testimonials/Captions";
import TestimonialsSlider from "@features/Testimonials/Slider";
import StepIndicators from "@components/slider/StepIndicator";
import type { Locale } from "@/i18n";
import { testimonialsData, testimonialsDataEs } from "@/constants/testimonials";

type Props = {
  locale: Locale;
};

const Testimonials = ({ locale }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const data = useMemo(() => {
    return locale === "es" ? testimonialsDataEs : testimonialsData;
  }, [locale]);

  const totalItems = data.length;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    function detectCenteredItem() {
      if (!container) return;

      const itemWidth = itemRefs.current[0]?.offsetWidth || 300;
      const centeredIndex = Math.round(container.scrollLeft / itemWidth);

      if (centeredIndex >= totalItems) {
        setCurrentIndex(totalItems - 1);
      } else if (centeredIndex < 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(centeredIndex);
      }
    }

    container.addEventListener("scroll", detectCenteredItem, { passive: true });

    return () => container.removeEventListener("scroll", detectCenteredItem);
  }, [totalItems]);

  function goPrev() {
    if (!containerRef.current || !itemRefs.current[0]) return;

    containerRef.current?.scrollBy({
      left: -itemRefs.current[0]?.offsetWidth - 40 || 300,
      behavior: "smooth",
    });
  }

  function goNext() {
    if (!containerRef.current || !itemRefs.current[0]) return;

    containerRef.current?.scrollBy({
      left: itemRefs.current[0]?.offsetWidth + 40 || 300,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex flex-col py-14 sm:py-16 md:py-20 lg:gap-2 lg:py-24">
      <div className="relative">
        <TestimonialsCaptions
          locale={locale}
          goNext={goNext}
          goPrev={goPrev}
          selectedIndex={currentIndex}
          totalItems={totalItems}
        />
        <TestimonialsSlider
          locale={locale}
          itemsRefs={itemRefs}
          containerRef={containerRef}
        />
      </div>
      <div className="flex flex-1 justify-center lg:pl-[50vw] 2xl:pl-[768px]">
        <div className="flex w-full justify-center lg:justify-start lg:pl-[232px]">
          <div className="lg:-translate-x-1/2">
            <StepIndicators
              currentIndex={currentIndex}
              onGoToItem={setCurrentIndex}
              numberOfItems={totalItems}
              showControls
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
