import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import { useController, useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import RadioInput from "@components/Inputs/RadioInput";
import { buttonStyles } from "@styles/button";

const ContactUsFormStep03 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, watch, trigger, formState, getValues } =
    useFormContext<ContactUsFormType>();
  const {
    field: { onChange, value },
    fieldState,
  } = useController({
    name: "projectType",
    control,
  });

  const handleSubmit = async () => {
    const isValid = await trigger("projectType");
    if (!isValid) return;

    const formData = getValues();
    setCurrentStep?.(4);
  };

  const goBack = () => {
    setCurrentStep?.(2);
  };

  const options = [
    {
      label: t(locale, "contact-us.step-03.options.a"),
      value: "website",
    },
    {
      label: t(locale, "contact-us.step-03.options.b"),
      value: "app",
    },
    {
      label: t(locale, "contact-us.step-03.options.c"),
      value: "chatbot / automation",
    },
    {
      label: t(locale, "contact-us.step-03.options.d"),
      value: "ui/ux design",
    },
    {
      label: t(locale, "contact-us.step-03.options.e"),
      value: "custom software",
    },
    {
      label: t(locale, "contact-us.step-03.options.f"),
      value: "developer integration",
    },
    {
      label: t(locale, "contact-us.step-03.options.g"),
      value: "hiring staff",
    },
    {
      label: t(locale, "contact-us.step-03.options.h"),
      value: "other",
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
          {t(locale, "contact-us.step-03.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep03;
