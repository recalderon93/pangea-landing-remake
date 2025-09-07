import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import TextAreaInput from "@components/Inputs/TextAreaInput";
import { buttonStyles } from "@styles/button";
import { useController, useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";

const ContactUsFormStep05 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, watch, trigger, formState, getValues } =
    useFormContext<ContactUsFormType>();
  const { field, fieldState } = useController({
    name: "needs",
    control,
  });

  const handleSubmit = async () => {
    const isValid = await trigger(["needs"]);
    if (isValid) {
      // Submit the form
      setCurrentStep?.(6);
    }
  };

  const goBack = () => {
    setCurrentStep?.(4);
  };

  return (
    <div className="mt-10 mb-10 flex w-[280px] flex-col gap-9 md:w-[682px]">
      <p className="max-w-[500px] text-center text-lg leading-[26px] text-white md:text-start">
        {t(locale, "contact-us.step-05.question")}
      </p>
      <TextAreaInput errorMessage={fieldState.error?.message} {...field} />
      <div className="grid-span-2 col-span-2 mt-4 flex w-full justify-center gap-6">
        <button
          className={buttonStyles({ variant: "accent" })}
          onClick={goBack}>
          {t(locale, "contact-us.back")}
        </button>
        <button
          className={buttonStyles({ variant: "accent-2" })}
          onClick={handleSubmit}>
          {t(locale, "contact-us.step-05.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep05;
