import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import TextInput from "@/components/Inputs/TextInput";
import { useController, useFormContext } from "react-hook-form";
import type { ContactUsFormType } from "@features/ContactUs/validations";
import SelectInput from "@components/Inputs/SelectInput";
import { buttonStyles } from "@styles/button";

const ContactUsFormStep01 = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, trigger } = useFormContext<ContactUsFormType>();

  const handleSubmit = async () => {
    const isValidated = await trigger([
      "fullName",
      "email",
      "companyName",
      "sector",
    ]);
    if (isValidated) {
      setCurrentStep?.(2);
    }
  };

  const fullName = useController({
    name: "fullName",
    control,
  });

  const email = useController({
    name: "email",
    control,
  });

  const companyName = useController({
    name: "companyName",
    control,
  });

  const sector = useController({
    name: "sector",
    control,
  });

  const companySectors = [
    {
      label: t(locale, "contact-us.step-01.sector.options.a"),
      value: "automotive",
    },
    {
      label: t(locale, "contact-us.step-01.sector.options.b"),
      value: "e-commerce / retail",
    },
    {
      label: t(locale, "contact-us.step-01.sector.options.c"),
      value: "education / edtech",
    },
    {
      label: t(locale, "contact-us.step-01.sector.options.d"),
      value: "energy & utilities",
    },
    {
      label: t(locale, "contact-us.step-01.sector.options.e"),
      value: "entertainment & media",
    },
    {
      label: t(locale, "contact-us.step-01.sector.options.f"),
      value: "finance & insurance",
    },
  ];

  return (
    <div className="mx-auto mt-10 mb-10 flex w-[280px] flex-col gap-6 md:w-[398px]">
      <TextInput
        {...fullName.field}
        label={t(locale, "contact-us.step-01.full-name-label")}
        required
        errorMessage={fullName.fieldState.error?.message}
        containerClassName=" w-full"
      />
      <TextInput
        {...companyName.field}
        label={t(locale, "contact-us.step-01.company-name-label")}
        errorMessage={companyName.fieldState.error?.message}
      />
      <TextInput
        {...email.field}
        label={t(locale, "contact-us.step-01.email-label")}
        type="email"
        required
        errorMessage={email.fieldState.error?.message}
      />
      <SelectInput
        {...sector.field}
        label={t(locale, "contact-us.step-01.sector-label")}
        placeholder={t(locale, "contact-us.step-01.select-sector-placeholder")}
        required
        errorMessage={sector.fieldState.error?.message}
        options={companySectors}
      />
      <div className="mt-4 flex w-full justify-center gap-6">
        <button
          className={buttonStyles({ variant: "accent" })}
          onClick={handleSubmit}>
          {t("en", "contact-us.back")}
        </button>
        <button
          className={buttonStyles({ variant: "brand" })}
          onClick={handleSubmit}>
          {t("en", "contact-us.step-01.submit")}
        </button>
      </div>
    </div>
  );
};

export default ContactUsFormStep01;
