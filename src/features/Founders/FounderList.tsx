import { t, type Locale } from "@/i18n";
import FounderItem from "./FounderItem";
import FounderModal, { type Founder } from "./FounderModal";
import { useEffect, useState } from "react";
import getFoundersData from "./data";

type Props = {
  locale: Locale;
};

const FounderList = ({ locale }: Props) => {
  const [founder, setFounder] = useState<Founder | null>(null);
  const founders = getFoundersData(locale);

  const handleFounderClick = (founderData: Founder) => setFounder(founderData);

  const onCloseModal = () => setFounder(null);

  const onGoNext = () => setFounder(founders[1]);

  const onGoPrevious = () => setFounder(founders[0]);

  return (
    <>
      <div className="flex flex-col items-center gap-20 pt-14 pb-16 md:pt-24 md:pb-30">
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
