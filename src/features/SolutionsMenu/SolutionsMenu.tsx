import { useShowSolutions } from "@/store/header/store";
import { cn } from "@/styles/classNameMerge";
import useFreezeScrollbar from "@hooks/useFreezeScrollbar";
import servicesItems from "@/constants/services";
import type { Locale } from "@/i18n";
import SolutionsMenuFooter from "./SolutionsFooter";
import SolutionsHeader from "./SolutionsHeader";
import SolutionsMenuThumbnail from "./SolutionsThumbnail";
import LinkOptionItem from "@components/OptionItem/LinkOptionItem";
import { useState } from "react";

type Props = {
  lang?: Locale;
  onClose?: () => void;
};

const SolutionsMenu = ({ lang = "en", onClose }: Props) => {
  const [selectedService, setSelectedService] = useState<
    (typeof servicesItems)[0]
  >(servicesItems[0]);
  const show = useShowSolutions();

  useFreezeScrollbar(show);

  return (
    <div
      className={cn([
        "sticky top-0 z-40 h-screen w-screen pt-18 sm:pt-26 md:pt-30",
        show ? "hidden lg:flex" : "hidden",
      ])}>
      <div className="bg flex flex-1 flex-col bg-gray-50 p-12">
        <SolutionsHeader onClose={onClose} />
        <div className="flex w-full flex-1">
          <div className="flex flex-1/3 flex-col gap-7">
            <SolutionsMenuThumbnail
              src={selectedService.image.src}
              description={selectedService.description[lang]}
            />
          </div>
          <div className="flex flex-2/3 pl-10">
            <div className="flex w-full flex-col gap-3">
              {servicesItems.map((service) => (
                <LinkOptionItem
                  key={service.title}
                  title={service.title}
                  isSelected={selectedService.id === service.id}
                  onMouseEnter={() => setSelectedService(service)}
                  href={service.href}
                  showArrow
                />
              ))}
            </div>
          </div>
        </div>
        <SolutionsMenuFooter />
      </div>
    </div>
  );
};

export default SolutionsMenu;
