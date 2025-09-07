import { t } from "@/i18n";
import type { FormStepProps } from "@/types/forms";
import HeroTextInput from "@features/Hero/HeroTextInput";
import { useController, useFormContext } from "react-hook-form";

const FormInitialStep = ({ locale, setCurrentStep }: FormStepProps) => {
  const { control, trigger, formState, getValues } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: "email",
    control,
  });

  async function handleSubmit() {
    const isValidated = await trigger("email");
    if (isValidated) {
      const values = getValues();
      console.log(values);
      setCurrentStep?.(1);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xs leading-4 font-medium text-[#FBFBFB] md:text-[18px] md:leading-8">
          {t(locale, "contact-us.name")}
        </p>
        <h1 className="max-w-[752px] pt-4 pb-4 text-center text-[40px] leading-12 text-white md:pt-6 md:pb-8 md:text-[64px] md:leading-[80px]">
          {t(locale, "contact-us.title")}
        </h1>
        <p className="w-[68%] max-w-[460px] text-center text-base leading-6 font-normal text-white md:text-[20px] md:leading-8">
          {t(locale, "contact-us.caption")}
        </p>
      </div>
      <div className="flex w-full justify-center pt-12 md:mb-10">
        <HeroTextInput
          variant="accent"
          buttonTitle="GO"
          placeholder="Your Email"
          autoComplete="email"
          onButtonClick={handleSubmit}
          {...field}
          errorMessage={error?.message}
        />
      </div>
    </>
  );
};

export default FormInitialStep;
