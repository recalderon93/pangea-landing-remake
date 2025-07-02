import { useEffect, useRef, useState } from "react";
import TestimonialsCaptions from "@features/Testimonials/Captions";
import TestimonialsSlider from "@features/Testimonials/Slider";
import StepIndicators from "@components/slider/StepIndicator";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    function detectCenteredItem() {
      if (!container) return;

      const itemWidth = itemRefs.current[0]?.offsetWidth || 300;
      const centeredIndex = Math.round(container.scrollLeft / itemWidth);

      if (centeredIndex > 5) {
        setCurrentIndex(5);
      } else if (centeredIndex < 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(centeredIndex);
      }
    }

    container.addEventListener("scroll", detectCenteredItem, { passive: true });

    return () => container.removeEventListener("scroll", detectCenteredItem);
  }, []);

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
          goNext={goNext}
          goPrev={goPrev}
          selectedIndex={currentIndex}
          totalItems={itemRefs.current.length}
        />
        <TestimonialsSlider
          locale="en"
          itemsRefs={itemRefs}
          containerRef={containerRef}
        />
      </div>
      <div className="flex flex-1 lg:pl-[50vw]">
        <div className="flex flex-1 items-center justify-center lg:w-116">
          <StepIndicators
            currentIndex={currentIndex}
            onGoToItem={setCurrentIndex}
            numberOfItems={5}
            showControls
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
