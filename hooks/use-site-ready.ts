"use client";

import { useEffect, useState } from "react";

export function useSiteReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const state = document.documentElement.dataset.pl;
    if (state === "skip" || state === "done") {
      setReady(true);
    }

    const handleDone = () => setReady(true);
    window.addEventListener("preloader:done", handleDone);
    return () => window.removeEventListener("preloader:done", handleDone);
  }, []);

  return ready;
}
