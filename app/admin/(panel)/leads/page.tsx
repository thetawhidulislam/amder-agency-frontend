"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/field";
import { api, getErrorMessage } from "@/lib/api-client";
import type { Lead, LeadStatus, PageMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const statuses: LeadStatus[] = ["NEW", "CONTACTED", "CLOSED"];

export default function LeadsPage() {
  const qc = useQueryClient();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search);

  const leads = useQuery({
    queryKey: ["admin", "leads", { status, search: deferredSearch, page }],
    queryFn: async () =>
      (
        await api.get<{ items: Lead[]; meta: PageMeta }>("/admin/leads", {
          params: { page, limit: 15, ...(status ? { status } : {}), ...(deferredSearch ? { search: deferredSearch } : {}) },
        })
      ).data,
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "leads"] });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) => api.patch(`/admin/leads/${id}/status`, { status }),
    onSuccess: () => {
      refresh();
      toast.success("Status updated");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/leads/${id}`),
    onSuccess: () => {
      refresh();
      toast.success("Lead deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const meta = leads.data?.meta;

  return (
    <>
      <PageHeader title="Leads" description="Messages sent through the contact form." />

      <div className="mb-6 flex flex-wrap gap-3">
        <Input
          aria-label="Search leads"
          placeholder="Search by name, phone or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="w-44"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </Select>
      </div>

      {leads.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : leads.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(leads.error)}
        </p>
      ) : leads.data?.items.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {leads.data.items.map((lead) => (
            <li key={lead.id} className="py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium">{lead.name}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    <a href={`tel:${lead.phone}`} className="underline underline-offset-4">
                      {lead.phone}
                    </a>
                    {lead.email ? (
                      <>
                        {" "}
                        |{" "}
                        <a href={`mailto:${lead.email}`} className="underline underline-offset-4">
                          {lead.email}
                        </a>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {[lead.service?.title, lead.budget, formatDate(lead.createdAt)].filter(Boolean).join(" | ")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Select
                    aria-label={`Status for ${lead.name}`}
                    value={lead.status}
                    onChange={(e) => updateStatus.mutate({ id: lead.id, status: e.target.value as LeadStatus })}
                    className="w-36"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </Select>
                  <Button
                    variant="primary"
                    size="sm"
                    aria-label={`Delete lead from ${lead.name}`}
                    onClick={() => {
                      if (window.confirm(`Delete the lead from ${lead.name}? This cannot be undone.`)) remove.mutate(lead.id);
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm">{lead.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-10 text-sm text-muted">No leads match. Try clearing the search or filter.</p>
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
