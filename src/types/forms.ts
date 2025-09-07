import type { Locale } from "@/i18n";

export type FormStepProps<T extends object = any> = {
  locale: Locale;
  setCurrentStep?: (step?: ContactUsFormStepsType) => void;
  setTotalSteps?: (steps: number) => void;
};

export type ContactUsFormVariantsType =
  | "hire-talent"
  | "build-something"
  | "not-sure";

export type ContactUsFormState = {
  currentStep: number;
  variant: ContactUsFormVariantsType;
};

export type ContactUsFormStepsType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
