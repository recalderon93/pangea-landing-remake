import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import { useController, useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import RadioInput from "@components/Inputs/RadioInput";
import { buttonStyles } from "@/styles/button";

const ContactUsFormStep04 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, watch, trigger, formState, getValues } =
    useFormContext<ContactUsFormType>();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({
    name: "timeline",
    control,
  });

  const handleSubmit = async () => {
    const isValid = await trigger("timeline");
    if (!isValid) return;

    const formData = getValues();
    setCurrentStep?.(5);
  };

  const goBack = () => {
    setCurrentStep?.(3);
  };

  const options = [
    {
      label: t(locale, "contact-us.step-04.options.a"),
      value: "asap",
    },
    {
      label: t(locale, "contact-us.step-04.options.b"),
      value: "1-2 months",
    },
    {
      label: t(locale, "contact-us.step-04.options.c"),
      value: "3+ months",
    },
    {
      label: t(locale, "contact-us.step-04.options.d"),
      value: "just exploring",
    },
  ];

  return (
    <div className="mt-10 mb-10 flex w-[280px] flex-col gap-6 md:w-[682px] lg:grid lg:grid-cols-2">
      {options.map((option) => (
        <RadioInput
          key={option.value}
          name={option.value}
          checked={value === option.value}
          label={option.label}
          onChange={onChange}
          id={option.value}
          value={option.value}
        />
      ))}

      {fieldState.error ? (
        <span className="text-base font-medium text-red-200">
          {fieldState.error.message}
        </span>
      ) : null}

      <div className="grid-span-2 col-span-2 mt-4 flex w-full justify-center gap-6">
        <button
          className={buttonStyles({ variant: "accent" })}
          onClick={goBack}>
          {t(locale, "contact-us.back")}
        </button>
        <button
          disabled={!value}
          className={buttonStyles({ variant: "accent-2" })}
          onClick={handleSubmit}>
          {t(locale, "contact-us.step-04.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep04;
