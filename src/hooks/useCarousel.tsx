import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  numberOfItems?: number;
};

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(index, length - 1));
}

function getScrollPaddingLeft(container: HTMLDivElement) {
  const styles = window.getComputedStyle(container);
  return Number.parseFloat(styles.scrollPaddingLeft || styles.paddingLeft) || 0;
}

function isScrolledToEnd(container: HTMLDivElement) {
  const maxScroll = container.scrollWidth - container.clientWidth;
  return maxScroll > 1 && container.scrollLeft >= maxScroll - 8;
}

function getStartAlignedIndex(
  container: HTMLDivElement,
  items: (HTMLDivElement | null)[],
  numberOfItems: number,
) {
  if (isScrolledToEnd(container)) {
    return Math.max(numberOfItems - 1, 0);
  }

  const origin =
    container.getBoundingClientRect().left + getScrollPaddingLeft(container);
  let closestIndex = 0;
  let closestDistance = Infinity;

  items.forEach((item, index) => {
    if (!item) return;

    const distance = Math.abs(item.getBoundingClientRect().left - origin);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function scrollItemIntoView(container: HTMLDivElement, item: HTMLDivElement) {
  const containerRect = container.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const delta =
    itemRect.left - containerRect.left - getScrollPaddingLeft(container);

  container.scrollTo({
    left: container.scrollLeft + delta,
    behavior: "smooth",
  });
}

export default function useCarousel({ numberOfItems = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectedIndexRef = useRef(0);
  const isProgrammaticScroll = useRef(false);
  const programmaticTimeout = useRef<ReturnType<typeof window.setTimeout>>(0);
  const [selectedIndex, setSelectedIndexState] = useState(0);

  const goToIndex = useCallback(
    (index: number) => {
      const nextIndex = clampIndex(index, numberOfItems);
      selectedIndexRef.current = nextIndex;
      setSelectedIndexState(nextIndex);

      const container = containerRef.current;
      const item = itemRefs.current[nextIndex];
      if (!container || !item) return;

      isProgrammaticScroll.current = true;
      window.clearTimeout(programmaticTimeout.current);
      scrollItemIntoView(container, item);
      programmaticTimeout.current = window.setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    },
    [numberOfItems],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const syncIndexFromScroll = () => {
      if (isProgrammaticScroll.current) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const nextIndex = getStartAlignedIndex(
          container,
          itemRefs.current,
          numberOfItems,
        );
        if (nextIndex === selectedIndexRef.current) return;

        selectedIndexRef.current = nextIndex;
        setSelectedIndexState(nextIndex);
      });
    };

    const endProgrammaticScroll = () => {
      isProgrammaticScroll.current = false;
    };

    container.addEventListener("scroll", syncIndexFromScroll, {
      passive: true,
    });
    container.addEventListener("scrollend", endProgrammaticScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(programmaticTimeout.current);
      container.removeEventListener("scroll", syncIndexFromScroll);
      container.removeEventListener("scrollend", endProgrammaticScroll);
    };
  }, [numberOfItems]);

  const goNext = () => goToIndex(selectedIndexRef.current + 1);
  const goPrev = () => goToIndex(selectedIndexRef.current - 1);

  return {
    containerRef,
    itemRefs,
    selectedIndex,
    setSelectedIndex: goToIndex,
    isScrollable: true,
    goNext,
    goPrev,
  };
}
