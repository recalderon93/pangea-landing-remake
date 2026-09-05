import { t, type Locale } from "@/i18n";

type Props = {
  locale?: Locale;
};

const TestimonialsCaptions = ({ locale = "en" }: Props) => (
  <div className="px-4 py-10 sm:px-6 md:px-10 lg:px-14">
    <h2 className="h3 max-w-[720px] whitespace-pre-line text-teal-400">
      {t(locale, "landing.testimonials.title")}
    </h2>
  </div>
);

export default TestimonialsCaptions;
