import { useEffect } from "react";

/**
 * # useFreezeScrollbar
 * Custom hook to freeze the scrollbar by setting the body's overflow style.
 */
export default function useFreezeScrollbar(freeze: boolean) {
  useEffect(() => {
    if (!freeze) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [freeze]);
}
