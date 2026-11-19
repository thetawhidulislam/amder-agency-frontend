"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import type { Settings } from "@/lib/types";

const socialKeys = ["facebook", "instagram", "linkedin", "youtube", "tiktok", "website"] as const;

const url = z.union([z.string().trim().url("Enter a full link starting with https://"), z.literal("")]);

const schema = z.object({
  phone: z.string().max(30),
  whatsapp: z.string().max(30),
  email: z.union([z.string().trim().email("Enter a valid email address"), z.literal("")]),
  address: z.string().max(300),
  businessHours: z.string().max(200),
  facebook: url,
  instagram: url,
  linkedin: url,
  youtube: url,
  tiktok: url,
  website: url,
});
type Values = z.infer<typeof schema>;

const toValues = (s?: Settings): Values => ({
  phone: s?.phone ?? "",
  whatsapp: s?.whatsapp ?? "",
  email: s?.email ?? "",
  address: s?.address ?? "",
  businessHours: s?.businessHours ?? "",
  facebook: s?.socials?.facebook ?? "",
  instagram: s?.socials?.instagram ?? "",
  linkedin: s?.socials?.linkedin ?? "",
  youtube: s?.socials?.youtube ?? "",
  tiktok: s?.socials?.tiktok ?? "",
  website: s?.socials?.website ?? "",
});

export default function SettingsPage() {
  const qc = useQueryClient();
  const settings = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => (await api.get<{ data: Settings }>("/admin/settings")).data.data,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: toValues() });

  useEffect(() => {
    if (settings.data) reset(toValues(settings.data));
  }, [settings.data, reset]);

  const save = useMutation({
    mutationFn: (v: Values) => {
      const socials: Record<string, string> = {};
      for (const key of socialKeys) if (v[key]) socials[key] = v[key];
      return api.put("/admin/settings", {
        phone: v.phone,
        whatsapp: v.whatsapp,
        email: v.email,
        address: v.address,
        businessHours: v.businessHours,
        socials,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "settings"] });
      toast.success("Settings saved");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return (
    <>
      <PageHeader title="Site settings" description="Contact details shown in the footer, contact page and WhatsApp button." />

      {settings.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate className="max-w-3xl space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
              <Input id="phone" type="tel" {...register("phone")} />
            </Field>
            <Field label="WhatsApp number" htmlFor="whatsapp" error={errors.whatsapp?.message} hint="Include the country code, for example +8801XXXXXXXXX.">
              <Input id="whatsapp" type="tel" {...register("whatsapp")} />
            </Field>
          </div>

          <Field label="Email" htmlFor="email" error={errors.email?.message}>
            <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
          </Field>
          <Field label="Address" htmlFor="address" error={errors.address?.message}>
            <Input id="address" {...register("address")} />
          </Field>
          <Field label="Business hours" htmlFor="businessHours" error={errors.businessHours?.message}>
            <Input id="businessHours" {...register("businessHours")} />
          </Field>

          <fieldset className="space-y-5 border-t border-line pt-6">
            <legend className="mb-1 font-display text-lg font-semibold">Social links</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              {socialKeys.map((key) => (
                <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} htmlFor={key} error={errors[key]?.message}>
                  <Input id={key} type="url" placeholder="https://" aria-invalid={!!errors[key]} {...register(key)} />
                </Field>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-line pt-6">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving..." : "Save settings"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
