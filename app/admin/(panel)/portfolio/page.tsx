"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, PageHeader } from "@/components/admin/page-header";
import { Button, buttonClass } from "@/components/ui/button";
import { useConfirmDelete } from "@/hooks/use-confirm-delete";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminPortfolioItem, PageMeta } from "@/lib/types";

export default function AdminPortfolioPage() {
  const qc = useQueryClient();
  const confirmDelete = useConfirmDelete();
  const [page, setPage] = useState(1);

  const items = useQuery({
    queryKey: ["admin", "portfolio", { page }],
    queryFn: async () =>
      (await api.get<{ items: AdminPortfolioItem[]; meta: PageMeta }>("/admin/portfolio", { params: { page, limit: 15 } })).data,
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/portfolio/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "portfolio"] });
      toast.success("Project deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const meta = items.data?.meta;

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Projects shown on the portfolio page and under each service."
        action={
          <Link href="/admin/portfolio/new" className={buttonClass({ size: "sm" })}>
            Add project
          </Link>
        }
      />

      {items.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : items.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(items.error)}
        </p>
      ) : items.data?.items.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {items.data.items.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.cover} alt="" className="size-14 shrink-0 rounded-sm object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{[p.service.title, p.client].filter(Boolean).join(" | ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {p.featured ? <Badge tone="warn">Featured</Badge> : null}
                <Badge tone={p.isActive ? "good" : "neutral"}>{p.isActive ? "Visible" : "Hidden"}</Badge>
                <Link href={`/admin/portfolio/${p.id}`} aria-label={`Edit ${p.title}`} className={buttonClass({ variant: "ghost", size: "sm" })}>
                  <Pencil className="size-4" />
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  aria-label={`Delete ${p.title}`}
                  onClick={() => {
                    if (confirmDelete(`Delete "${p.title}"? This cannot be undone.`)) remove.mutate(p.id);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-10 text-sm text-muted">No projects yet. Add one to show it on the portfolio page.</p>
      )}

      {meta && meta.totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between text-sm">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-muted">
            Page {meta.page} of {meta.totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      ) : null}
    </>
  );
}
