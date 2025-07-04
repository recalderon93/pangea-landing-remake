import { testimonialsData } from "@/constants/testimonials";
import TestimonialItem from "./Item";
import type { Locale } from "@/i18n";

type Props = {
  locale?: Locale;
  itemsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const TestimonialsSlider = ({ locale, itemsRefs, containerRef }: Props) => (
  <div className="flex flex-col gap-y-4">
    <div
      ref={containerRef}
      className="no-scrollbar snap-x snap-mandatory scroll-px-[cal(50vw-160px)] overflow-x-scroll scroll-smooth px-[calc(50vw-160px)] py-4 sm:scroll-px-[cal(50vw-232px)] sm:px-[calc(50vw-232px)] lg:scroll-px-[50vw] lg:px-[0]">
      <div className="inline-flex w-max items-center gap-10 py-3">
        <div className="w-0 shrink-0 lg:w-[50vw]" />
        {testimonialsData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              itemsRefs.current[i] = el;
            }}
            className="snap-center snap-always lg:snap-start">
            <TestimonialItem
              id={item.id}
              avatar={item.avatar}
              username={item.username}
              role={item.role}
              company={item.company}
              testimonials={item.testimonials}
              color={i % 2 !== 0 ? "brand" : "accent"}
            />
          </div>
        ))}
        <div className="w-0 shrink-0 lg:w-[50vw]" />
      </div>
    </div>
  </div>
);

export default TestimonialsSlider;
