"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button, buttonClass } from "@/components/ui/button";
import { Checkbox, Field, Input, Textarea } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminTeamMember, TeamSocials } from "@/lib/types";

const urlSchema = z.string().url();
const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || urlSchema.safeParse(value).success, "Enter a valid URL");

const parseSkills = (value: string) => value.split(",").map((skill) => skill.trim()).filter(Boolean);

const schema = z.object({
  name: z.string().trim().min(2, "Enter a name").max(100),
  slug: z.string().trim().regex(/^$|^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  role: z.string().trim().min(2, "Enter a role").max(100),
  department: z.string().max(100),
  bio: z.string().max(400, "Keep the bio under 400 characters"),
  about: z.string().max(5000, "Keep the profile under 5000 characters"),
  skills: z
    .string()
    .refine((value) => parseSkills(value).length <= 15, "Enter no more than 15 skills")
    .refine(
      (value) => parseSkills(value).every((skill) => skill.length <= 40),
      "Each skill must be 40 characters or fewer"
    ),
  photo: z.string(),
  linkedin: optionalUrl,
  facebook: optionalUrl,
  instagram: optionalUrl,
  order: z.number({ message: "Enter a number" }).int().min(0),
  isActive: z.boolean(),
  showOnHome: z.boolean(),
});

type Values = z.infer<typeof schema>;

export function TeamForm({ initial }: { initial?: AdminTeamMember }) {
  const router = useRouter();
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initial?.name ?? "",
      slug: initial?.slug ?? "",
      role: initial?.role ?? "",
      department: initial?.department ?? "",
      bio: initial?.bio ?? "",
      about: initial?.about ?? "",
      skills: (initial?.skills ?? []).join(", "),
      photo: initial?.photo ?? "",
      linkedin: initial?.socials?.linkedin ?? "",
      facebook: initial?.socials?.facebook ?? "",
      instagram: initial?.socials?.instagram ?? "",
      order: initial?.order ?? 0,
      isActive: initial?.isActive ?? true,
      showOnHome: initial?.showOnHome ?? true,
    },
  });
  const bioLength = watch("bio").length;

  const save = useMutation({
    mutationFn: (values: Values) => {
      const socials: TeamSocials = {};
      if (values.linkedin) socials.linkedin = values.linkedin;
      if (values.facebook) socials.facebook = values.facebook;
      if (values.instagram) socials.instagram = values.instagram;

      const payload = {
        name: values.name,
        ...(values.slug ? { slug: values.slug } : {}),
        role: values.role,
        department: values.department,
        bio: values.bio,
        about: values.about,
        skills: parseSkills(values.skills),
        photo: values.photo,
        socials,
        order: values.order,
        isActive: values.isActive,
        showOnHome: values.showOnHome,
      };

      return initial
        ? api.patch(`/admin/team/${initial.id}`, payload)
        : api.post("/admin/team", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "team"] });
      toast.success(initial ? "Team member saved" : "Team member created");
      router.push("/admin/team");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  return (
    <form onSubmit={handleSubmit((values) => save.mutate(values))} noValidate className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Role" htmlFor="role" error={errors.role?.message}>
          <Input id="role" aria-invalid={!!errors.role} {...register("role")} />
        </Field>
      </div>

      <Field
        label="URL slug"
        htmlFor="slug"
        error={errors.slug?.message}
        hint="Leave empty to create it from the name."
      >
        <Input id="slug" aria-invalid={!!errors.slug} {...register("slug")} />
      </Field>

      <Field label="Department" htmlFor="department" error={errors.department?.message} hint="Optional.">
        <Input id="department" aria-invalid={!!errors.department} {...register("department")} />
      </Field>

      <Field
        label="Bio"
        htmlFor="bio"
        error={errors.bio?.message}
        hint={`Shown on cards, max 400. ${bioLength}/400 characters. Optional.`}
      >
        <Textarea id="bio" rows={4} maxLength={400} aria-invalid={!!errors.bio} {...register("bio")} />
      </Field>

      <Field
        label="About"
        htmlFor="about"
        error={errors.about?.message}
        hint="Longer profile. Separate paragraphs with a blank line."
      >
        <Textarea id="about" rows={8} maxLength={5000} aria-invalid={!!errors.about} {...register("about")} />
      </Field>

      <Field
        label="Skills"
        htmlFor="skills"
        error={errors.skills?.message}
        hint="Separate with commas. Add up to 15 skills."
      >
        <Input id="skills" aria-invalid={!!errors.skills} {...register("skills")} />
      </Field>

      <div>
        <p className="mb-1.5 text-sm font-medium">Photo</p>
        <ImageUploader
          value={watch("photo") ? [watch("photo")] : []}
          max={1}
          folder="team"
          onChange={(urls) => setValue("photo", urls[0] ?? "", { shouldDirty: true })}
        />
        <p className="mt-2 text-xs text-muted">Square or portrait photo, face centered.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="LinkedIn URL" htmlFor="linkedin" error={errors.linkedin?.message}>
          <Input id="linkedin" type="url" aria-invalid={!!errors.linkedin} {...register("linkedin")} />
        </Field>
        <Field label="Facebook URL" htmlFor="facebook" error={errors.facebook?.message}>
          <Input id="facebook" type="url" aria-invalid={!!errors.facebook} {...register("facebook")} />
        </Field>
      </div>
      <Field label="Instagram URL" htmlFor="instagram" error={errors.instagram?.message}>
        <Input id="instagram" type="url" aria-invalid={!!errors.instagram} {...register("instagram")} />
      </Field>

      <Field label="Display order" htmlFor="order" error={errors.order?.message} hint="Lower numbers show first.">
        <Input id="order" type="number" min={0} {...register("order", { valueAsNumber: true })} />
      </Field>

      <div className="space-y-3">
        <label className="flex items-center gap-2.5 text-sm">
          <Checkbox {...register("isActive")} />
          Show on the website
        </label>
        <label className="flex items-center gap-2.5 text-sm">
          <Checkbox {...register("showOnHome")} />
          Show on the home page
        </label>
      </div>

      <div className="flex gap-3 border-t border-line pt-6">
        <Button type="submit" disabled={save.isPending}>
          {save.isPending ? "Saving..." : initial ? "Save changes" : "Create team member"}
        </Button>
        <Link href="/admin/team" className={buttonClass({ variant: "outline" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
