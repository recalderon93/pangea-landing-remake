import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import CustomFileInput from "@components/Inputs/FileInput";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import { useController, useFormContext } from "react-hook-form";
import { buttonStyles } from "@styles/button";
import { submitToNetlify } from "@features/ContactUs/formHelpers";
import { Routes } from "@constants/routes";

const ContactUsFormStep07 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, trigger, getValues } = useFormContext<ContactUsFormType>();

  const handleSubmit = async () => {
    const isValid = await trigger(["attachments"]);
    if (isValid) {
      const formData = getValues();

      await submitToNetlify("contact-us", formData, Routes[locale].success);
    }
  };

  function goBack() {
    const contactReason = getValues("contactReason");
    if (contactReason === "build-something") {
      setCurrentStep?.(6);
    } else {
      setCurrentStep?.(5);
    }
  }

  const { field } = useController({
    control,
    name: "attachments",
  });

  return (
    <div className="mt-10 mb-10 flex w-full max-w-[456px] flex-col gap-9">
      <div className="flex w-full justify-center">
        <CustomFileInput
          locale={locale}
          onFilesSelect={(file) => field.onChange(file)}
          selectedFiles={field.value || []}
          // errorMessage={fieldState.error?.message}
        />
      </div>
      <div className="mt-4 flex w-full justify-center gap-6">
        <button
          type="button"
          className={buttonStyles({ variant: "accent" })}
          onClick={goBack}>
          {t(locale, "contact-us.step-07.back")}
        </button>
        <button
          type="button"
          className={buttonStyles({ variant: "brand" })}
          onClick={handleSubmit}>
          {t(locale, "contact-us.step-07.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep07;
