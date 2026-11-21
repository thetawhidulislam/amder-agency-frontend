"use client";

import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { MOTION_LEVEL } from "@/lib/motion";
import type { Service } from "@/lib/types";

function ServiceNames({ services }: { services: Service[] }) {
  return (
    <div className="flex shrink-0 items-center gap-7 px-5">
      {services.map((service) => (
        <span key={service.id} className="flex shrink-0 items-center gap-7">
          <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-white">
            {service.title}
          </span>
          <span aria-hidden="true" className="size-2 shrink-0 bg-brand" />
        </span>
      ))}
    </div>
  );
}

export function ServiceMarquee({ services }: { services: Service[] }) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(marqueeRef, { amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  if (services.length === 0) return null;

  return (
    <div
      ref={marqueeRef}
      className="service-marquee h-14 overflow-hidden bg-ink"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="service-marquee-track flex h-full w-max items-center"
        data-reveal=""
        style={{
          animationPlayState:
            MOTION_LEVEL === "rich" && isInView && !isHovered ? "running" : "paused",
        }}
      >
        <ServiceNames services={services} />
        <div aria-hidden="true">
          <ServiceNames services={services} />
        </div>
      </div>
    </div>
  );
}
