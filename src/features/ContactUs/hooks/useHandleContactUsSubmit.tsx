import { useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import { submitToNetlify } from "@features/ContactUs/formHelpers";
import { useCallback, useEffect, useState } from "react";
import type { ContactUsFormStepsType } from "@/types/forms";

/**
 * # useHandleContactUsSubmit
 * @description A custom hook to handle the submission of the Contact Us form.
 * Needs to be inside the FormProvider from react-hook-form.
 */
export default function useHandleContactUsSubmit(
  currentStep?: ContactUsFormStepsType,
  setCurrentStep?: (step: ContactUsFormStepsType) => void,
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
      await submitToNetlify("contact-us", data, "/contact-us/thank-you");
      setIsSubmitting(false);
    })();
  }, [currentStep]);

  useEffect(() => {
    return () => setIsSubmitting(false);
  }, []);

  return { onSubmit, isSubmitting };
}
