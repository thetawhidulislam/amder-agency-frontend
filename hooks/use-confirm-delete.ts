"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { SystemInfo } from "@/lib/types";

export function useConfirmDelete() {
  const system = useQuery({
    queryKey: ["admin", "system"],
    queryFn: async () => (await api.get<{ data: SystemInfo }>("/admin/system")).data.data,
    staleTime: Infinity,
  });

  return function confirmDelete(message: string): boolean {
    const prompt = system.data?.mode === "production" ? `PRODUCTION: ${message}` : message;
    return window.confirm(prompt);
  };
}
