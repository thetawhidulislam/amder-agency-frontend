"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { budgetOptions } from "@/config/site";
import { api, getErrorMessage } from "@/lib/api-client";
import type { Service } from "@/lib/types";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z.string().trim().regex(/^\+?[\d\s-]{7,20}$/, "Enter a valid phone number"),
  email: z.union([z.string().trim().email("Enter a valid email address"), z.literal("")]),
  serviceId: z.string(),
  budget: z.string(),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000, "Please keep it under 2000 characters"),
  website: z.string(), // honeypot, stays empty for real people
});

type Values = z.infer<typeof schema>;

export function ContactForm({ services, defaultServiceId = "" }: { services: Service[]; defaultServiceId?: string }) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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

  if (sent) {
    return (
      <div role="status" className="border-l-2 border-brand py-2 pl-6">
        <div className="flex items-center gap-3">
          <CircleCheck aria-hidden="true" className="contact-success-icon size-7 shrink-0 text-brand" strokeWidth={1.75} />
          <h2 className="font-display text-3xl font-semibold">Message received</h2>
        </div>
        <p className="mt-3 max-w-md text-muted">Thank you. Our team will contact you soon on the number you gave us.</p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="public-contact-form space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" aria-invalid={!!errors.name} className="contact-field" {...register("name")} />
        </Field>
        <Field label="Phone or WhatsApp number" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} className="contact-field" {...register("phone")} />
        </Field>
      </div>

      <Field label="Email (optional)" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className="contact-field" {...register("email")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service you need" htmlFor="serviceId">
          <Select id="serviceId" className="contact-field" {...register("serviceId")}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Budget (optional)" htmlFor="budget">
          <Select id="budget" className="contact-field" {...register("budget")}>
            <option value="">Select a range</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Tell us about your business and what you need" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" rows={5} aria-invalid={!!errors.message} className="contact-field" {...register("message")} />
      </Field>

      {/* Honeypot: hidden from people, bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {serverError ? (
        <p role="alert" className="text-sm text-brand">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="contact-submit-spinner size-4 animate-spin" strokeWidth={1.75} />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
