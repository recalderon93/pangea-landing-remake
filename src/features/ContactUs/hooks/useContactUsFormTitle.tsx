import type {
  ContactUsFormStepsType,
  ContactUsFormVariantsType,
} from "@/types/forms";
import { t, type Locale } from "@/i18n";

export default function useContactUsFormTitle(
  locale: Locale,
  step: ContactUsFormStepsType,
  variant: ContactUsFormVariantsType,
) {
  const FormTitleMapKey = {
    0: "",
    1: t(locale, "contact-us.step-01.title"),
    2: t(locale, "contact-us.step-02.title"),
    3: t(locale, "contact-us.step-03.title"),
    4: t(locale, "contact-us.step-04.title"),
    5: t(locale, "contact-us.step-05.title"),
    6: t(locale, "contact-us.step-06.title"),
    7: t(locale, "contact-us.step-07.title"),
  };

  if (step === 6 && variant !== "hire-talent") {
    return t(locale, "contact-us.step-07.title-variant");
  }

  return FormTitleMapKey[step] || "";
}
