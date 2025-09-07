import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import RadioInput from "@components/Inputs/RadioInput";
import { buttonStyles } from "@styles/button";
import { useController, useForm, useFormContext } from "react-hook-form";
import SelectInput from "@components/Inputs/SelectInput";
import type { ContactUsFormType } from "@features/ContactUs/validations";

const ContactUsFormStep06 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control } = useFormContext<ContactUsFormType>();
  const durationControl = useController({
    name: "duration",
    control,
  });

  const teamFitControl = useController({
    name: "teamFit",
    control,
  });

  const locationControl = useController({
    name: "location",
    control,
  });

  const durationOptions = [
    {
      label: t(locale, "contact-us.step-06.fieldset-1.options.a"),
      value: "1-3",
    },
    {
      label: t(locale, "contact-us.step-06.fieldset-1.options.b"),
      value: "3-6",
    },
    {
      label: t(locale, "contact-us.step-06.fieldset-1.options.c"),
      value: "6+",
    },
    {
      label: t(locale, "contact-us.step-06.fieldset-1.options.d"),
      value: "exploring",
    },
  ];

  const teamFitOptions = [
    {
      label: t(locale, "contact-us.step-06.fieldset-2.options.a"),
      value: "join our team",
    },
    {
      label: t(locale, "contact-us.step-06.fieldset-2.options.b"),
      value: "freelance",
    },
  ];

  return (
    <div className="mt-10 mb-10 flex w-[280px] flex-col gap-6 md:w-[682px]">
      <fieldset className="lg: flex grid-cols-2 flex-col gap-6 lg:grid">
        <legend>
          <p className="pb-4 text-lg leading-[26px] text-white">Duration:</p>
        </legend>
        <div className="flex flex-col gap-6">
          {durationOptions.slice(0, 2).map((option) => (
            <RadioInput
              key={option.value}
              id={option.value}
              name={option.value}
              label={option.label}
              value={option.value}
              checked={durationControl.field.value === option.value}
              onChange={durationControl.field.onChange}
            />
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {durationOptions.slice(2).map((option) => (
            <RadioInput
              key={option.value}
              id={option.value}
              name={option.value}
              label={option.label}
              value={option.value}
              checked={durationControl.field.value === option.value}
              onChange={durationControl.field.onChange}
            />
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <fieldset className="flex flex-col gap-6">
          <legend>
            <p className="pb-4 text-lg leading-[26px] text-white">Team fit:</p>
          </legend>
          {teamFitOptions.map((option) => (
            <RadioInput
              key={option.value}
              id={option.value}
              name={option.value}
              label={option.label}
              value={option.value}
              checked={teamFitControl.field.value === option.value}
              onChange={teamFitControl.field.onChange}
            />
          ))}
        </fieldset>
        <div className="flex flex-col">
          <p className="pb-4 text-lg leading-[26px] text-white">
            Location (optional):
          </p>
          <SelectInput
            {...locationControl.field}
            errorMessage={locationControl.fieldState.error?.message}
            options={[
              {
                label: t(locale, "contact-us.step-06.fieldset-3.options.a"),
                value: "remote",
              },
              {
                label: t(locale, "contact-us.step-06.fieldset-3.options.b"),
                value: "on-site",
              },
            ]}
            label={t(locale, "contact-us.step-06.fieldset-3.placeholder")}
          />
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center gap-6">
        <button
          className={buttonStyles({ variant: "accent" })}
          onClick={() => setCurrentStep?.(5)}>
          {t(locale, "contact-us.back")}
        </button>
        <button
          className={buttonStyles({ variant: "accent-2" })}
          onClick={() => setCurrentStep?.(7)}>
          {t(locale, "contact-us.step-06.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep06;
