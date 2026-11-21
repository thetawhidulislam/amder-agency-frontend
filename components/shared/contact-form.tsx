"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedContactField } from "@/components/shared/animated-contact";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/field";
import { budgetOptions } from "@/config/site";
import { DURATION, EASE, MOTION_LEVEL } from "@/lib/motion";
import { api, getErrorMessage } from "@/lib/api-client";
import type { Service } from "@/lib/types";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z.string().trim().regex(/^\+?[\d\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.union([z.string().trim().email("Enter a valid email address"), z.literal("")]),
  serviceId: z.string(),
  budget: z.string(),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Please keep it under 2000 characters"),
  website: z.string(),
});

type Values = z.infer<typeof schema>;

export function ContactForm({ services, defaultServiceId = "" }: { services: Service[]; defaultServiceId?: string }) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const staticMotion = reducedMotion || MOTION_LEVEL === "calm";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", serviceId: defaultServiceId, budget: "", message: "", website: "" },
  });

  async function onSubmit(values: Values) {
    setServerError(null);
    try {
      await api.post("/leads", { ...values, source: "website-contact-form" });
      setSent(true);
      reset();
    } catch (err) {
      setServerError(getErrorMessage(err));
    }
  }

  const shake = serverError && !staticMotion ? [0, -6, 6, -4, 4, 0] : 0;

  return (
    <m.div
      className="rounded-3xl border border-line bg-white p-10 shadow-[var(--shadow-card)]"
      animate={{ x: shake }}
      transition={{
        duration: serverError && !staticMotion ? 0.35 : 0,
        ease: EASE,
        times: [0, 0.16, 0.32, 0.5, 0.68, 1],
      }}
      data-reveal=""
    >
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <m.div
            key="success"
            role="status"
            className="border-l-2 border-brand py-2 pl-6"
            initial={staticMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={staticMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: staticMotion ? 0 : DURATION.reveal, ease: EASE }}
            data-reveal=""
          >
            <div className="flex items-center gap-3">
              <m.svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                fill="none"
                className="size-7 shrink-0 text-brand"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <m.circle
                  cx="16"
                  cy="16"
                  r="13"
                  pathLength={1}
                  initial={staticMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: staticMotion ? 0 : 0.5, ease: EASE }}
                />
                <m.path
                  d="m9.5 16 4.2 4.2 8.8-9"
                  pathLength={1}
                  initial={staticMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: staticMotion ? 0 : 0.35, delay: staticMotion ? 0 : 0.5, ease: EASE }}
                />
              </m.svg>
              <m.h2
                className="font-display text-3xl font-semibold"
                initial={staticMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: staticMotion ? 0 : DURATION.reveal, delay: staticMotion ? 0 : 0.85, ease: EASE }}
                data-reveal=""
              >
                Message received
              </m.h2>
            </div>
            <m.p
              className="mt-3 max-w-md text-muted"
              initial={staticMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: staticMotion ? 0 : DURATION.reveal, delay: staticMotion ? 0 : 0.9, ease: EASE }}
              data-reveal=""
            >
              Thank you. Our team will contact you soon on the number you gave us.
            </m.p>
            <m.div
              initial={staticMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: staticMotion ? 0 : DURATION.reveal, delay: staticMotion ? 0 : 1.4, ease: EASE }}
              data-reveal=""
            >
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                Send another message
              </Button>
            </m.div>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="public-contact-form space-y-5"
            initial={staticMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={staticMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: staticMotion ? 0 : DURATION.reveal, ease: EASE }}
            data-reveal=""
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={0} className="overflow-visible">
                <AnimatedContactField label="Your name" htmlFor="name" error={errors.name?.message}>
                  <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className="contact-field" {...register("name")} />
                </AnimatedContactField>
              </Reveal>
              <Reveal delay={50} className="overflow-visible">
                <AnimatedContactField label="Phone or WhatsApp number" htmlFor="phone" error={errors.phone?.message}>
                  <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className="contact-field" {...register("phone")} />
                </AnimatedContactField>
              </Reveal>
            </div>

            <Reveal delay={100} className="overflow-visible">
              <AnimatedContactField label="Email (optional)" htmlFor="email" error={errors.email?.message}>
                <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className="contact-field" {...register("email")} />
              </AnimatedContactField>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              <Reveal delay={150} className="overflow-visible">
                <AnimatedContactField label="Service you need" htmlFor="serviceId">
                  <Select id="serviceId" className="contact-field" {...register("serviceId")}>
                    <option value="">Not sure yet</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </Select>
                </AnimatedContactField>
              </Reveal>
              <Reveal delay={200} className="overflow-visible">
                <AnimatedContactField label="Budget (optional)" htmlFor="budget">
                  <Select id="budget" className="contact-field" {...register("budget")}>
                    <option value="">Select a range</option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </Select>
                </AnimatedContactField>
              </Reveal>
            </div>

            <Reveal delay={250} className="overflow-visible">
              <AnimatedContactField label="Tell us about your business and what you need" htmlFor="message" error={errors.message?.message}>
                <Textarea id="message" rows={5} aria-invalid={!!errors.message} className="contact-field" {...register("message")} />
              </AnimatedContactField>
            </Reveal>

            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Leave this field empty</label>
              <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {serverError ? (
              <m.p
                role="alert"
                className="text-sm text-brand"
                initial={staticMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: staticMotion ? 0 : 0.25, ease: EASE }}
                data-reveal=""
              >
                {serverError}
              </m.p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Sending message" : "Send message"}
              className="public-button h-12 rounded-xl px-8 text-base shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)]"
            >
              <span className="grid">
                <m.span
                  className="col-start-1 row-start-1 whitespace-nowrap"
                  initial={false}
                  animate={{ opacity: isSubmitting ? 0 : 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  aria-hidden={isSubmitting}
                >
                  Send message
                </m.span>
                <m.span
                  className="col-start-1 row-start-1 inline-flex items-center gap-2 whitespace-nowrap"
                  initial={false}
                  animate={{ opacity: isSubmitting ? 1 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  aria-hidden={!isSubmitting}
                >
                  <Loader2
                    aria-hidden="true"
                    className={MOTION_LEVEL === "rich" && !reducedMotion ? "contact-submit-spinner size-4 animate-spin" : "size-4"}
                    strokeWidth={1.75}
                  />
                  Sending...
                </m.span>
              </span>
            </Button>
          </m.form>
        )}
      </AnimatePresence>
    </m.div>
  );
}
