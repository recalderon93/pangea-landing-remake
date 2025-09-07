import ContactUsFormStep01 from "./Step01";
import ContactUsFormStep02 from "./Step02";
import ContactUsFormStep03 from "./Step03";
import ContactUsFormStep04 from "./Step04";
import ContactUsFormStep05 from "./Step05";
import ContactUsFormStep06 from "./Step06";
import ContactUsFormStep07 from "./Step07";
import FormInitialStep from "./Step00";
import type { ContactUsFormStepsType } from "@/types/forms";
import type { Locale } from "@/i18n";

type Props = {
  formCurrentStep: ContactUsFormStepsType;
  locale?: Locale;
  setFormCurrentStep?: (step: ContactUsFormStepsType) => void;
  setFormTotalSteps?: (steps: number) => void;
};

const FormSteps = {
  0: FormInitialStep,
  1: ContactUsFormStep01,
  2: ContactUsFormStep02,
  3: ContactUsFormStep03,
  4: ContactUsFormStep04,
  5: ContactUsFormStep05,
  6: ContactUsFormStep06,
  7: ContactUsFormStep07,
};

const ContactUsFormContent = ({
  formCurrentStep,
  setFormCurrentStep,
  setFormTotalSteps,
  locale = "en",
}: Props) => {
  const FormStep = FormSteps[formCurrentStep] || FormInitialStep;

  return (
    <FormStep
      locale={locale}
      // @ts-expect-error available steps are from 0 to 7
      setCurrentStep={setFormCurrentStep}
      setTotalSteps={setFormTotalSteps}
    />
  );
};

export default ContactUsFormContent;
