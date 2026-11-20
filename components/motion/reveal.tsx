"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "span";
}) {
  const elementRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const Element = as;

  useEffect(() => {
    setReady(true);

    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={(element) => {
        elementRef.current = element;
      }}
      className="motion-reveal overflow-hidden"
      data-ready={ready}
      data-visible={visible}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </Element>
  );
}
