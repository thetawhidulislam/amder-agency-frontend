"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone, Globe } from "lucide-react";
import type { ReactNode } from "react";
import { m } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE, MOTION_LEVEL } from "@/lib/motion";

const contactIcons = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  address: MapPin,
  hours: Clock,
  social: Globe,
};

export type ContactIconName = keyof typeof contactIcons;

export function AnimatedContactDetail({
  icon,
  label,
  children,
  delay,
}: {
  icon: ContactIconName;
  label: string;
  children: ReactNode;
  delay: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion || MOTION_LEVEL === "calm";
  const Icon = contactIcons[icon];

  return (
    <Reveal variant="up" delay={delay} className="overflow-visible">
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
        <m.span
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10"
          initial={staticMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            staticMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 320, damping: 20, delay: delay / 1000 }
          }
          data-reveal=""
        >
          <Icon aria-hidden="true" className="size-5 text-brand" strokeWidth={1.75} />
        </m.span>
        <div className="min-w-0 pt-0.5">
          <dt className="font-medium">{label}</dt>
          <dd className="mt-1 break-words text-muted">{children}</dd>
        </div>
      </div>
    </Reveal>
  );
}

export function AnimatedContactField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const simpleReveal = MOTION_LEVEL === "calm" && !reducedMotion;

  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="contact-field-label text-sm font-medium">
        {label}
      </label>
      {children}
      <div className="min-h-5">
        {error ? (
          <m.p
            role="alert"
            className="text-xs text-brand"
            initial={reducedMotion ? false : simpleReveal ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={simpleReveal ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : simpleReveal ? 0.65 : 0.25, ease: EASE }}
            data-reveal=""
          >
            {error}
          </m.p>
        ) : null}
      </div>
    </div>
  );
}
