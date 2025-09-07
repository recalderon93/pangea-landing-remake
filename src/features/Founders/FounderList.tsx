import { t, type Locale } from "@/i18n";
import FounderItem from "./FounderItem";
import FounderModal, { type Founder } from "./FounderModal";
import { useState } from "react";
import getFoundersData from "./data";

type Props = {
  locale: Locale;
};

const FounderList = ({ locale }: Props) => {
  const [founder, setFounder] = useState<Founder | null>(null);
  const founders = getFoundersData(locale);

  const handleFounderClick = (founderData: Founder) => setFounder(founderData);

  const onCloseModal = () => setFounder(null);

  const onGoNext = () => founders[1] ?? setFounder(founders[1]);
  const onGoPrevious = () => founders[0] ?? setFounder(founders[0]);

  return (
    <>
      <div className="flex flex-col items-center gap-20 pt-24 pb-30">
        {founders.map((founderData) => (
          <FounderItem
            key={founderData.id}
            image={founderData.image}
            name={founderData.fullName}
            role={founderData.role}
            description={founderData.description.join(" ")}
            onClick={() => handleFounderClick(founderData)}
          />
        ))}
      </div>
      <FounderModal
        founder={founder}
        onClose={onCloseModal}
        disabledNext={!founder || founder.id === 2}
        disabledPrevious={!founder || founder.id === 1}
        onGoNext={onGoNext}
        onGoPrevious={onGoPrevious}
      />
    </>
  );
};

export default FounderList;
