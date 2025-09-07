import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import CustomFileInput from "@components/Inputs/FileInput";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import { useController, useFormContext } from "react-hook-form";
import { buttonStyles } from "@styles/button";
import { submitToNetlify } from "@features/ContactUs/formHelpers";

const ContactUsFormStep07 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, trigger, getValues } = useFormContext<ContactUsFormType>();

  const handleSubmit = async () => {
    console.log("isValid");
    const isValid = await trigger(["attachments"]);
    console.log("isValid", isValid);
    alert("isValid: " + isValid);
    if (isValid) {
      const formData = getValues();
      console.log("Form Data to submit:", formData);

      await submitToNetlify("contact-us", formData, "/contact-us/thank-you");
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

  const { field, fieldState } = useController({
    control,
    name: "attachments",
  });

  return (
    <div className="mt-10 mb-10 flex w-[287px] flex-col gap-9 md:w-[456px]">
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
          className={buttonStyles({ variant: "accent" })}
          onClick={goBack}>
          {t(locale, "contact-us.step-07.back")}
        </button>
        <button
          className={buttonStyles({ variant: "accent-2" })}
          // onClick={handleSubmit}
          onClick={handleSubmit}>
          {t(locale, "contact-us.step-07.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep07;
