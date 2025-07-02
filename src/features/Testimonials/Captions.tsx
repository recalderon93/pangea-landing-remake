import SliderButtons from "@components/slider/Buttons";
import { t, type Locale } from "@/i18n";
import { buttonStyles } from "@styles/button";

type Props = {
  locale?: Locale;
  goNext?: () => void;
  goPrev?: () => void;
  onGoToItem?: (index: number) => void;
  selectedIndex?: number;
  totalItems?: number;
};

const TestimonialsCaptions = ({
  locale,
  goNext,
  goPrev,
  selectedIndex,
  totalItems = 0,
}: Props) => (
  <div className="z-20 flex flex-col justify-center gap-10 px-8 py-10 sm:px-12 md:px-16 lg:absolute lg:top-0 lg:bottom-0 lg:left-0 lg:flex lg:w-[45vw] lg:flex-col lg:bg-white/80 lg:pr-4 lg:pl-20 lg:backdrop-blur-3xl">
    <h2 className="h3 whitespace-pre-line text-teal-400">
      {t(locale, "landing.testimonials.title")}
    </h2>
    <div className="flex flex-row items-center justify-between gap-10 lg:justify-start lg:gap-y-10">
      <button className={buttonStyles({ variant: "accent" })}>
        {t(locale, "landing.testimonials.cta")}
      </button>
      <div className="flex items-center gap-10 lg:justify-between lg:gap-6">
        <SliderButtons
          color="accent"
          onGoNext={goNext}
          onGoPrevious={goPrev}
          showControls
          nextDisabled={selectedIndex === totalItems - 1}
          previousDisabled={selectedIndex === 0}
        />
      </div>
    </div>
  </div>
);

export default TestimonialsCaptions;
