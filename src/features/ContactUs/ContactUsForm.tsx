import { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import { type Locale } from "@/i18n";
import { cva } from "class-variance-authority";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ContactUsFormStepsType } from "@/types/forms";
import useContactUsFormTitle from "./hooks/useContactUsFormTitle";
import ContactUsFormContent from "./Content/Content";
import { FormProvider, useForm } from "react-hook-form";
import {
  getContactUsFormValidator,
  type ContactUsFormType,
} from "./validations";

type Props = {
  locale: Locale;
};

const ContactUsForm = ({ locale }: Props) => {
  const methods = useForm<ContactUsFormType>({
    resolver: zodResolver(getContactUsFormValidator(locale)),
  });

  const [formStep, setFormStep] = useState<ContactUsFormStepsType>(0);
  const [totalSteps, setTotalSteps] = useState<number>(5);

  const formTitle = useContactUsFormTitle(
    locale,
    formStep,
    totalSteps === 6 ? "build-something" : "hire-talent",
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email");
    const emailParam =
      emailFromUrl ?? window.sessionStorage.getItem("contactUsEmail");

    if (!emailParam) return;

    if (emailFromUrl) {
      window.sessionStorage.setItem("contactUsEmail", emailFromUrl);
    } else {
      window.sessionStorage.removeItem("contactUsEmail");
    }

    // Set the email value in the form
    methods.setValue("email", emailParam);

    // Move to step 1 (contact information step)
    setFormStep(1);

    // Optional: Clean up the URL to remove the query parameter
    if (emailFromUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete("email");

      window.history.replaceState({}, "", url.pathname);
    }
  }, []);

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
            <h1 className="w-full max-w-[682px] px-4 text-center text-xl leading-[1.2] text-white md:text-[32px]">
              {formTitle}
            </h1>
          </div>
        ) : null}
        <ContactUsFormContent
          formCurrentStep={formStep}
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
