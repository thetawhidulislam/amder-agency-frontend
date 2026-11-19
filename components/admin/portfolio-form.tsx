"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button, buttonClass } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminPortfolioItem, AdminService } from "@/lib/types";

const schema = z.object({
  title: z.string().trim().min(2, "Enter a title").max(150),
  slug: z.string().trim().regex(/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  serviceId: z.string().min(1, "Choose a service"),
  client: z.string().max(120),
  cover: z.string().min(1, "Upload a cover image"),
  gallery: z.array(z.string()),
  videoUrl: z.union([z.string().trim().url("Enter a full link starting with https://"), z.literal("")]),
  description: z.string().trim().min(10, "At least 10 characters"),
  tags: z.string(),
  featured: z.boolean(),
  isActive: z.boolean(),
  order: z.number({ message: "Enter a number" }).int().min(0),
});

type Values = z.infer<typeof schema>;

export function PortfolioForm({ initial }: { initial?: AdminPortfolioItem }) {
  const router = useRouter();
  const qc = useQueryClient();

  const services = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => (await api.get<{ data: AdminService[] }>("/admin/services")).data.data,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      serviceId: initial?.serviceId ?? "",
      client: initial?.client ?? "",
      cover: initial?.cover ?? "",
      gallery: initial?.gallery ?? [],
      videoUrl: initial?.videoUrl ?? "",
      description: initial?.description ?? "",
      tags: (initial?.tags ?? []).join(", "),
      featured: initial?.featured ?? false,
      isActive: initial?.isActive ?? true,
      order: initial?.order ?? 0,
    },
  });

  const cover = watch("cover");
  const gallery = watch("gallery");

  const save = useMutation({
    mutationFn: (v: Values) => {
      const payload = {
        title: v.title,
        ...(v.slug ? { slug: v.slug } : {}),
        serviceId: v.serviceId,
        client: v.client,
        cover: v.cover,
        gallery: v.gallery,
        videoUrl: v.videoUrl,
        description: v.description,
        tags: v.tags.split(",").map((t) => t.trim()).filter(Boolean),
        featured: v.featured,
        isActive: v.isActive,
        order: v.order,
      };
      return initial ? api.patch(`/admin/portfolio/${initial.id}`, payload) : api.post("/admin/portfolio", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
      toast.success(initial ? "Project saved" : "Project created");
      router.push("/admin/portfolio");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project title" htmlFor="title" error={errors.title?.message}>
          <Input id="title" aria-invalid={!!errors.title} {...register("title")} />
        </Field>
        <Field label="URL slug" htmlFor="slug" error={errors.slug?.message} hint="Leave empty to create it from the title.">
          <Input id="slug" aria-invalid={!!errors.slug} {...register("slug")} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service" htmlFor="serviceId" error={errors.serviceId?.message}>
          <Select id="serviceId" aria-invalid={!!errors.serviceId} {...register("serviceId")}>
            <option value="">Choose a service</option>
            {(services.data ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Client (optional)" htmlFor="client" error={errors.client?.message}>
          <Input id="client" {...register("client")} />
        </Field>
      </div>

      <Field label="Cover image" htmlFor="cover" error={errors.cover?.message}>
        <ImageUploader value={cover ? [cover] : []} onChange={(urls) => setValue("cover", urls[0] ?? "", { shouldValidate: true })} />
      </Field>

      <Field label="Gallery (optional)" htmlFor="gallery">
        <ImageUploader value={gallery} max={12} onChange={(urls) => setValue("gallery", urls)} />
      </Field>

      <Field label="Video link (optional)" htmlFor="videoUrl" error={errors.videoUrl?.message} hint="YouTube links play on the page. Other links show as a text link.">
        <Input id="videoUrl" type="url" aria-invalid={!!errors.videoUrl} {...register("videoUrl")} />
      </Field>

      <Field label="Description" htmlFor="description" error={errors.description?.message} hint="What the client needed and what you delivered. Separate paragraphs with a blank line.">
        <Textarea id="description" rows={7} aria-invalid={!!errors.description} {...register("description")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tags" htmlFor="tags" hint="Separate with commas.">
          <Input id="tags" {...register("tags")} />
        </Field>
        <Field label="Display order" htmlFor="order" error={errors.order?.message} hint="Lower numbers show first.">
          <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-8 text-sm">
        <label className="flex items-center gap-2.5">
          <Checkbox {...register("featured")} />
          Feature on the home page
        </label>
        <label className="flex items-center gap-2.5">
          <Checkbox {...register("isActive")} />
          Show on the website
        </label>
      </div>

      <div className="flex gap-3 border-t border-line pt-6">
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Saving..." : initial ? "Save changes" : "Create project"}
        </Button>
        <Link href="/admin/portfolio" className={buttonClass({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
