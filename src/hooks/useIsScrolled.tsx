import { useEffect, useState } from "react";

/**
 * @function useIsObserved
 * @description A hook to determine if a specific element has been scrolled out of view.
 * It uses the Intersection Observer API to monitor the visibility of the element.
 * @example
 * const isScrolled = useIsScrolled(".my-element");
 * const isScrolled = useIsScrolled("#my-element");
 * @param input - A CSS selector string to target the element.
 */
export default function useIsObserved(input: string) {
  const [isObserved, setObserved] = useState(false);

  useEffect(() => {
    // Check if input already has the .
    const sentinel = document.querySelector(input);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setObserved(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return isObserved;
}
