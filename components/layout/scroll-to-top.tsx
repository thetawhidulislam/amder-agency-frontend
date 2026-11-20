"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  function scrollToTop() {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
      className={`scroll-to-top public-button fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)] ${
        visible ? "scroll-to-top-visible" : ""
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.75} />
    </button>
  );
}
