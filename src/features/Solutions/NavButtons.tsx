import Chevron from "@components/icons/Chevron";

type Props = {
  nextHref?: string | null;
  previousHref?: string | null;
};

const NavButtons = ({ nextHref, previousHref }: Props) => (
  <div className="flex items-center justify-between gap-2">
    <a
      href={previousHref ?? "#"}
      className="flex size-10 items-center justify-center rounded-full border-[3px] border-[#EAEDEC80] md:size-16 md:border-[4px]">
      <div className="pr-[2px] md:pr-[4px]">
        <Chevron
          direction="left"
          className="stroke-[#EAEDEC80] md:hidden"
          width={20}
          height={10}
        />
        <Chevron
          direction="left"
          className="hidden stroke-[#EAEDEC80] md:block"
          width={28}
          height={14}
        />
      </div>
    </a>
    <a
      href={nextHref ?? "#"}
      className="flex size-10 items-center justify-center rounded-full border-[3px] border-[#EAEDEC80] md:size-16 md:border-[4px]">
      <div className="pl-[2px] md:pl-[4px]">
        <Chevron
          direction="right"
          className="stroke-[#EAEDEC80] md:hidden"
          width={20}
          height={10}
        />
        <Chevron
          direction="right"
          className="hidden stroke-[#EAEDEC80] md:block"
          width={28}
          height={14}
        />
      </div>
    </a>
  </div>
);

export default NavButtons;
