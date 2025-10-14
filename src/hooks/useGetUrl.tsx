import { useEffect, useState } from "react";

export default function useGetUrl() {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.pathname);
    }
  }, []);

  return currentUrl;
}
