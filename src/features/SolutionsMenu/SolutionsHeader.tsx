import { t, type Locale } from "@/i18n";

type Props = {
  lang?: Locale;
  onClose?: () => void;
};

const SolutionsHeader = ({ lang = "en", onClose }: Props) => {
  return (
    <div className="mb-2 flex w-full items-center justify-end px-3 lg:px-0 xl:mb-8">
      {/* <Logo color="brand" /> */}

      <button
        className="h5 text-shade-200 hover:text-shade-400 active:text-shade-400 cursor-pointer p-2"
        onClick={onClose}>
        {t(lang, "header.close")}
      </button>
    </div>
  );
};

export default SolutionsHeader;
