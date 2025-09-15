import { useState } from "react";
import { t, type Locale } from "@/i18n";
import HeroTextInput from "./HeroTextInput";

type Props = {
  locale: Locale;
};

const HeroTextInputWrapper = ({ locale }: Props) => {
  // Redirect to Contact us page passing the email as query param
  const [email, setEmail] = useState("");

  const handleRedirect = (email: string) => {
    const url = new URL("/contact-us", window.location.origin);
    url.searchParams.set("email", email);
    window.location.href = url.toString();
  };

  return (
    <HeroTextInput
      buttonTitle={t(locale, "hero.cta")}
      variant="accent"
      placeholder={t(locale, "hero.text-input-placeholder")}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onButtonClick={() => handleRedirect(email)}
    />
  );
};

export default HeroTextInputWrapper;
