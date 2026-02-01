import { useShowSolutions } from "@/store/header/store";
import { cn } from "@/styles/classNameMerge";
import useFreezeScrollbar from "@hooks/useFreezeScrollbar";
import type { Locale } from "@/i18n";
import SolutionsMenuFooter from "./SolutionsFooter";
import SolutionsHeader from "./SolutionsHeader";
import SolutionsMenuThumbnail from "./SolutionsThumbnail";
import LinkOptionItem from "@components/OptionItem/LinkOptionItem";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { getSolutionsByLocale } from "@/constants/services";

type Props = {
  lang?: Locale;
  onClose?: () => void;
};

const SolutionsMenu = ({ lang = "en", onClose }: Props) => {
  const servicesItems = getSolutionsByLocale(lang);
  const [selectedService, setSelectedService] = useState<
    (typeof servicesItems)[0]
  >(servicesItems[0]);
  const show = useShowSolutions();

  useFreezeScrollbar(show);

  const backdrop = cva("", {
    variants: {
      show: {
        true: "fixed top-0 left-0 z-30 h-screen w-screen bg-black/20 backdrop-blur-sm",
        false: "hidden",
      },
    },
  });

  return (
    <div
      className={backdrop({ show })}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose?.();
        }
      }}
      role="presentation">
      <div
        role="presentation"
        className={cn([
          "fixed top-0 left-0 z-40 min-h-[780px] w-screen min-w-[620px] overflow-hidden rounded-b-[40px] bg-white/0 pt-18 shadow-xl sm:pt-26 md:pt-30 2xl:left-[50%] 2xl:w-[1536px] 2xl:translate-x-[-50%]",
          show ? "hidden lg:flex" : "hidden",
        ])}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-0 h-18 w-full bg-white/70 sm:h-26 md:h-30"></div>
        <div className="mx-auto flex h-full w-full flex-col overflow-y-auto rounded-b-[40px] bg-gray-50 p-12 2xl:w-[1536px]">
          <SolutionsHeader onClose={onClose} />
          <div className="flex w-full pb-22">
            <div className="flex flex-1/3 flex-col gap-7">
              <SolutionsMenuThumbnail
                src={selectedService.image.src}
                description={selectedService.description}
              />
            </div>
            <div className="flex flex-2/3 pl-10">
              <div className="flex w-full flex-col gap-1">
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
    </div>
  );
};

export default SolutionsMenu;
