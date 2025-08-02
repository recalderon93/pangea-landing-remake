import useFreezeScrollbar from "@hooks/useFreezeScrollbar";
import SliderButtons from "@components/slider/Buttons";
import { t, type Locale } from "@/i18n";

export type Founder = {
  id: number;
  image?: string;
  fullName?: string;
  role?: string;
  description?: string[];
};

type Props = {
  locale?: Locale;
  founder: Founder | null;
  onClose?: () => void;
  onGoNext?: () => void;
  onGoPrevious?: () => void;
  disabledNext?: boolean;
  disabledPrevious?: boolean;
};

const FounderModal = ({
  locale = "en",
  founder,
  onClose,
  onGoNext,
  onGoPrevious,
  disabledNext,
  disabledPrevious,
}: Props) => {
  useFreezeScrollbar(!!founder);

  if (!founder) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-auto bg-white pt-18 sm:pt-26 md:pt-30">
      <div className="mx-auto flex w-full max-w-[430px] flex-col px-8 pt-9">
        <div className="flex w-full items-center justify-between">
          <SliderButtons
            color="accent"
            showControls
            onGoNext={onGoNext}
            onGoPrevious={onGoPrevious}
            nextDisabled={disabledNext}
            previousDisabled={disabledPrevious}
          />
          <button className="cursor-pointer px-2 py-1" onClick={onClose}>
            <p className="paragraph-1 bold text-shade-300">
              {t(locale, "who-we-are.founders.close")}
            </p>
          </button>
        </div>
        <div className="bg-shade-200 mx-auto mt-[52px] aspect-[366/251] w-[95%] max-w-[366px] overflow-hidden rounded-3xl">
          <img
            src={founder.image}
            alt={`${founder.fullName}${t(locale, "who-we-are.founders.img-alt")}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-8 mb-10 flex flex-col items-center">
          <h2 className="text-xl leading-8 font-extrabold text-teal-400">
            {founder.fullName}
          </h2>
          <p className="text-base leading-6 font-normal text-teal-400">
            {founder.role}
          </p>
        </div>
        <div className="text-shade-400 mx-auto flex w-[95%] max-w-[366px] flex-col gap-4 pb-16">
          {founder.description?.map((paragraph, index) => (
            <p key={index} className="paragraph-1 leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderModal;
