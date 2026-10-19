import Chevron from "@components/icons/Chevron";

type Props = {
  nextHref?: string | null;
  previousHref?: string | null;
};

const NavButtons = ({ nextHref, previousHref }: Props) => (
  <div className="flex items-center justify-between gap-2">
    <a
      href={previousHref ?? "#"}
      className="border-white-50 flex size-10 items-center justify-center rounded-full border-[3px] md:size-16 md:border-[4px]">
      <div className="pr-[2px] md:pr-[4px]">
        <Chevron
          direction="left"
          className="stroke-white-50 md:hidden"
          width={20}
          height={10}
        />
        <Chevron
          direction="left"
          className="stroke-white-50 hidden md:block"
          width={28}
          height={14}
        />
      </div>
    </a>
    <a
      href={nextHref ?? "#"}
      className="border-white-50 flex size-10 items-center justify-center rounded-full border-[3px] md:size-16 md:border-[4px]">
      <div className="pl-[2px] md:pl-[4px]">
        <Chevron
          direction="right"
          className="stroke-white-50 md:hidden"
          width={20}
          height={10}
        />
        <Chevron
          direction="right"
          className="stroke-white-50 hidden md:block"
          width={28}
          height={14}
        />
      </div>
    </a>
  </div>
);

export default NavButtons;
