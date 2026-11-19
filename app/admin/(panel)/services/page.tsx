"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge, PageHeader } from "@/components/admin/page-header";
import { Button, buttonClass } from "@/components/ui/button";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminService } from "@/lib/types";

export default function AdminServicesPage() {
  const qc = useQueryClient();
  const services = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => (await api.get<{ data: AdminService[] }>("/admin/services")).data.data,
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "services"] });

  const reorder = useMutation({
    mutationFn: (ids: string[]) => api.patch("/admin/services/reorder", { items: ids.map((id, order) => ({ id, order })) }),
    onSuccess: refresh,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/services/${id}`),
    onSuccess: () => {
      refresh();
      toast.success("Service deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  function move(index: number, dir: -1 | 1) {
    const list = [...(services.data ?? [])];
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    reorder.mutate(list.map((s) => s.id));
  }

  return (
    <>
      <PageHeader
        title="Services"
        description="These appear on the home page, services pages, footer and contact form."
        action={
          <Link href="/admin/services/new" className={buttonClass({ size: "sm" })}>
            Add service
          </Link>
        }
      />

      {services.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : services.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(services.error)}
        </p>
      ) : services.data?.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {services.data.map((s, i) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="font-medium">{s.title}</p>
                <p className="mt-0.5 text-sm text-muted">
                  /{s.slug} | {s._count?.portfolio ?? 0} project(s)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={s.isActive ? "good" : "neutral"}>{s.isActive ? "Visible" : "Hidden"}</Badge>
                <Button variant="ghost" size="sm" aria-label={`Move ${s.title} up`} disabled={i === 0 || reorder.isPending} onClick={() => move(i, -1)}>
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Move ${s.title} down`}
                  disabled={i === services.data.length - 1 || reorder.isPending}
                  onClick={() => move(i, 1)}
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Link href={`/admin/services/${s.id}`} aria-label={`Edit ${s.title}`} className={buttonClass({ variant: "ghost", size: "sm" })}>
                  <Pencil className="size-4" />
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  aria-label={`Delete ${s.title}`}
                  onClick={() => {
                    if (window.confirm(`Delete "${s.title}"? This cannot be undone.`)) remove.mutate(s.id);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-10 text-sm text-muted">No services yet. Add your first service to show it on the website.</p>
      )}
    </>
  );
}
