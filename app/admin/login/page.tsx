"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import { setSessionFlag, setToken } from "@/lib/auth-token";

const schema = z.object({
  email: z.string().trim().email("Enter your email address"),
  password: z.string().min(1, "Enter your password"),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" } });

  async function onSubmit(values: Values) {
    setError(null);
    try {
      const response = await api.post<{ token?: string }>("/auth/login", values);
      if (response.data.token) setToken(response.data.token);
      setSessionFlag(7);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm space-y-5">
        <Image src="/logo.png" alt="Amader Agency" width={56} height={56} className="size-14 bg-white object-contain" priority />
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">Amader Agency website</p>
        </div>

        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="username" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Password" htmlFor="password" error={errors.password?.message}>
          <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
        </Field>

        {error ? (
          <p role="alert" className="text-sm text-brand">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </main>
  );
}
