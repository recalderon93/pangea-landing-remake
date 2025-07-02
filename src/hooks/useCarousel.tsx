import { useEffect, useRef, useState } from "react";

type Props = {
  numberOfItems?: number;
};

export default function useCarousel({ numberOfItems = 0 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const content = itemRefs.current[selectedIndex];

  //   if (container && content) {
  //     content.scrollIntoView({
  //       behavior: "smooth",
  //       inline: "center",
  //       block: "nearest",
  //     });
  //   }
  // }, [selectedIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const content = itemRefs.current[selectedIndex];

    if (container && content) {
      const containerRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const offset = contentRect.left - containerRect.left;
      const centerOffset =
        offset - container.clientWidth / 2 + content.clientWidth / 2;

      container.scrollTo({
        left: container.scrollLeft + centerOffset,
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      const container = containerRef.current!;
      const totalContentWidth = itemRefs.current.reduce(
        (acc, el) => acc + (el?.offsetWidth ?? 0),
        0,
      );
      setIsScrollable(totalContentWidth > container.clientWidth);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const goNext = () => {
    if (selectedIndex < numberOfItems - 1) {
      setSelectedIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((i) => i - 1);
    }
  };

  return {
    containerRef,
    itemRefs,
    selectedIndex,
    setSelectedIndex,
    isScrollable,
    goNext,
    goPrev,
  };
}
