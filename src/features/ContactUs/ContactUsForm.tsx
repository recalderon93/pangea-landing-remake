import { useMemo, useState } from "react";
import FormWrapper from "./FormWrapper";
import { t, type Locale } from "@/i18n";
import { cva } from "class-variance-authority";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactUsFormStepsType } from "@/types/forms";
import useContactUsFormTitle from "./hooks/useContactUsFormTitle";
import ContactUsFormContent from "./Content/Content";
import { FormProvider, useForm } from "react-hook-form";
import { ContactUsFormValidator, type ContactUsFormType } from "./validations";

type Props = {
  locale: Locale;
};

const ContactUsForm = ({ locale }: Props) => {
  const methods = useForm<ContactUsFormType>({
    resolver: zodResolver(ContactUsFormValidator),
  });

  const [formStep, setFormStep] = useState<ContactUsFormStepsType>(0);
  const [totalSteps, setTotalSteps] = useState<number>(6);

  const formCurrentStep = useMemo(() => {
    if (totalSteps === 6 && formStep === 6) {
      return 7;
    }
    return formStep;
  }, [formStep, totalSteps]);

  const formTitle = useContactUsFormTitle(
    locale,
    formStep,
    totalSteps === 7 ? "hire-talent" : "build-something",
  );

  return (
    <FormProvider {...methods}>
      <FormWrapper
        totalSteps={totalSteps}
        currentStep={formStep}
        onStepChange={setFormStep as (step: number) => void}
        containerClassName={container({
          steps: formStep,
        })}>
        {formTitle ? (
          <div className="">
            <h1 className="text-xl leading-[1.2] text-white md:text-[32px]">
              {formTitle}
            </h1>
          </div>
        ) : null}
        <ContactUsFormContent
          formCurrentStep={formCurrentStep}
          locale={locale}
          setFormCurrentStep={setFormStep}
          setFormTotalSteps={setTotalSteps}
        />
      </FormWrapper>
    </FormProvider>
  );
};

const container = cva("", {
  variants: {
    steps: {
      0: "gap-12",
      1: "flex flex-col items-center",
      2: "flex flex-col items-center",
      3: "flex flex-col items-center",
      4: "flex flex-col items-center",
      5: "flex flex-col items-center",
      6: "flex flex-col items-center",
      7: "flex flex-col items-center",
    },
  },
});

export default ContactUsForm;
