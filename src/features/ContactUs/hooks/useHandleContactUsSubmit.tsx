import { useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import { submitToNetlify } from "@features/ContactUs/formHelpers";
import { useCallback, useEffect, useState } from "react";
import type { ContactUsFormStepsType } from "@/types/forms";
import type { Locale } from "@/i18n";
import { Routes } from "@constants/routes";

/**
 * # useHandleContactUsSubmit
 * @description A custom hook to handle the submission of the Contact Us form.
 * Needs to be inside the FormProvider from react-hook-form.
 */
export default function useHandleContactUsSubmit(
  currentStep?: ContactUsFormStepsType,
  setCurrentStep?: (step: ContactUsFormStepsType) => void,
  locale: Locale = "en",
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, watch, trigger } = useFormContext<ContactUsFormType>();
  const contactReason = watch("contactReason");

  const onSubmit = useCallback(async () => {
    if (currentStep === 5) {
      const isValid = await trigger(["needs"]);

      if (!isValid) return;

      if (contactReason === "build-something") {
        return setCurrentStep?.(6);
      }
    }

    if (currentStep === 6) {
      const isValid = await trigger(["duration", "teamFit", "location"]);

      if (!isValid) return;
    }

    handleSubmit(async (data) => {
      setIsSubmitting(true);
      await submitToNetlify("contact-us", data, Routes[locale].success);
      setIsSubmitting(false);
    })();
  }, [
    contactReason,
    currentStep,
    handleSubmit,
    locale,
    setCurrentStep,
    trigger,
  ]);

  useEffect(() => {
    return () => setIsSubmitting(false);
  }, []);

  return { onSubmit, isSubmitting };
}
