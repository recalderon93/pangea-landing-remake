import { t } from "@/i18n";
import type { ContactUsFormVariantsType, FormStepProps } from "@/types/forms";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import { useController, useFormContext } from "react-hook-form";
import RadioInput from "@components/Inputs/RadioInput";
import { buttonStyles } from "@styles/button";
import { cn } from "@styles/classNameMerge";

const ContactUsFormStep02 = ({
  locale,
  setCurrentStep,
  setTotalSteps,
}: FormStepProps) => {
  const { control, watch, trigger, formState, getValues } =
    useFormContext<ContactUsFormType>();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({
    name: "contactReason",
    control,
  });

  const handleSubmit = async () => {
    const isValid = await trigger(["contactReason"]);
    if (isValid) {
      // Submit the form
      if (value === "build-something") {
        setTotalSteps?.(7);
      } else {
        setTotalSteps?.(6);
      }
      setCurrentStep?.(3);
    }
  };

  const goBack = () => {
    setCurrentStep?.(1);
  };

  const selectedReason = watch("contactReason");

  return (
    <div className="mt-10 mb-10 flex w-[280px] flex-col gap-6 md:w-[682px]">
      <RadioInput
        name="build-something"
        checked={selectedReason === "build-something"}
        label={t(locale, "contact-us.step-02.options.a")}
        onChange={onChange}
        value={"build-something"}
        id="build-something"
      />
      <RadioInput
        name="hire-talent"
        checked={selectedReason === "hire-talent"}
        label={t(locale, "contact-us.step-02.options.b")}
        onChange={onChange}
        value={"hire-talent"}
        id="hire-talent"
      />
      <RadioInput
        name="not-sure"
        checked={selectedReason === "not-sure"}
        label={t(locale, "contact-us.step-02.options.c")}
        value="not-sure"
        onChange={onChange}
        id="not-sure"
      />

      {fieldState.error ? (
        <span className="text-base font-medium text-red-200">
          {fieldState.error.message}
        </span>
      ) : null}

      <div className="mt-4 flex w-full justify-center gap-6">
        <button
          className={cn(buttonStyles({ variant: "accent" }), "capitalize")}
          onClick={goBack}>
          {t(locale, "contact-us.back")}
        </button>
        <button
          disabled={!selectedReason}
          className={cn(buttonStyles({ variant: "accent-2" }), "capitalize")}
          onClick={handleSubmit}>
          {t(
            locale,
            `contact-us.step-02.submit.${(selectedReason as ContactUsFormVariantsType) || "build-something"}`,
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep02;
