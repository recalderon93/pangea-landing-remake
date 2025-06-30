import { useEffect } from "react";

/**
 * # useFreezeScrollbar
 * Custom hook to freeze the scrollbar by setting the body's overflow style.
 */
export default function useFreezeScrollbar(freeze: boolean) {
  useEffect(() => {
    if (freeze) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [freeze]);
}
