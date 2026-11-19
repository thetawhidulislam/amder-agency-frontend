"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { serviceIconNames } from "@/components/shared/service-icon";
import { Button, buttonClass } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminService } from "@/lib/types";

const schema = z.object({
  title: z.string().trim().min(2, "Enter a title").max(120),
  slug: z.string().trim().regex(/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  icon: z.string(),
  shortDesc: z.string().trim().min(10, "At least 10 characters").max(300, "Keep it under 300 characters"),
  description: z.string().trim().min(10, "At least 10 characters"),
  features: z.string(),
  order: z.number({ message: "Enter a number" }).int().min(0),
  isActive: z.boolean(),
  metaTitle: z.string().max(160),
  metaDescription: z.string().max(300),
});

type Values = z.infer<typeof schema>;

export function ServiceForm({ initial }: { initial?: AdminService }) {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      icon: initial?.icon ?? "",
      shortDesc: initial?.shortDesc ?? "",
      description: initial?.description ?? "",
      features: (initial?.features ?? []).join("\n"),
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
      metaTitle: initial?.metaTitle ?? "",
      metaDescription: initial?.metaDescription ?? "",
    },
  });

  const save = useMutation({
    mutationFn: (v: Values) => {
      const payload = {
        title: v.title,
        ...(v.slug ? { slug: v.slug } : {}),
        icon: v.icon,
        shortDesc: v.shortDesc,
        description: v.description,
        features: v.features.split("\n").map((s) => s.trim()).filter(Boolean),
        order: v.order,
        isActive: v.isActive,
        metaTitle: v.metaTitle,
        metaDescription: v.metaDescription,
      };
      return initial ? api.patch(`/admin/services/${initial.id}`, payload) : api.post("/admin/services", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
      toast.success(initial ? "Service saved" : "Service created");
      router.push("/admin/services");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" aria-invalid={!!errors.title} {...register("title")} />
        </Field>
        <Field label="URL slug" htmlFor="slug" error={errors.slug?.message} hint="Leave empty to create it from the title.">
          <Input id="slug" aria-invalid={!!errors.slug} {...register("slug")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Icon" htmlFor="icon">
          <Select id="icon" {...register("icon")}>
            <option value="">Default</option>
            {serviceIconNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Display order" htmlFor="order" error={errors.order?.message} hint="Lower numbers show first.">
          <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
        </Field>
      </div>

      <Field label="Short description" htmlFor="shortDesc" error={errors.shortDesc?.message} hint="Shown on cards and lists.">
        <Textarea id="shortDesc" rows={2} aria-invalid={!!errors.shortDesc} {...register("shortDesc")} />
      </Field>

      <Field label="Full description" htmlFor="description" error={errors.description?.message} hint="Separate paragraphs with a blank line.">
        <Textarea id="description" rows={8} aria-invalid={!!errors.description} {...register("description")} />
      </Field>

      <Field label="What is included" htmlFor="features" hint="One item per line.">
        <Textarea id="features" rows={6} {...register("features")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="SEO title" htmlFor="metaTitle" error={errors.metaTitle?.message}>
          <Input id="metaTitle" {...register("metaTitle")} />
        </Field>
        <Field label="SEO description" htmlFor="metaDescription" error={errors.metaDescription?.message}>
          <Input id="metaDescription" {...register("metaDescription")} />
        </Field>
      </div>

      <label className="flex items-center gap-2.5 text-sm">
        <Checkbox {...register("isActive")} />
        Show this service on the website
      </label>

      <div className="flex gap-3 border-t border-line pt-6">
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Saving..." : initial ? "Save changes" : "Create service"}
        </Button>
        <Link href="/admin/services" className={buttonClass({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
