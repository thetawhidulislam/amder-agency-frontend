"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Badge, PageHeader } from "@/components/admin/page-header";
import { buttonClass } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import type { Lead, LeadStats } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const stats = useQuery({
    queryKey: ["admin", "leads", "stats"],
    queryFn: async () => (await api.get<{ data: LeadStats }>("/admin/leads/stats")).data.data,
  });
  const recent = useQuery({
    queryKey: ["admin", "leads", { recent: true }],
    queryFn: async () => (await api.get<{ items: Lead[] }>("/admin/leads?limit=5")).data.items,
  });

  const numbers = [
    { label: "New leads", value: stats.data?.NEW },
    { label: "Contacted", value: stats.data?.CONTACTED },
    { label: "Closed", value: stats.data?.CLOSED },
    { label: "All time", value: stats.data?.total },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        action={
          <div className="flex gap-2">
            <Link href="/admin/services/new" className={buttonClass({ variant: "outline", size: "sm" })}>
              Add service
            </Link>
            <Link href="/admin/portfolio/new" className={buttonClass({ size: "sm" })}>
              Add project
            </Link>
          </div>
        }
      />

      <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
        {numbers.map((n, i) => (
          <div key={n.label} className={`py-6 ${i > 0 ? "md:border-l md:pl-6" : ""} ${i % 2 === 1 ? "border-l pl-6 md:pl-6" : ""} border-line`}>
            <dt className="text-sm text-muted">{n.label}</dt>
            <dd className="mt-1 font-display text-4xl font-semibold">{n.value ?? "-"}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Latest leads</h2>
          <Link href="/admin/leads" className="text-sm underline underline-offset-4">
            View all
          </Link>
        </div>

        {recent.isLoading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : recent.data?.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {recent.data.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted">
                    {lead.phone}
                    {lead.service ? `, ${lead.service.title}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted">
                  {formatDate(lead.createdAt)}
                  <Badge tone={lead.status === "NEW" ? "warn" : lead.status === "CLOSED" ? "good" : "neutral"}>
                    {lead.status.toLowerCase()}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-y border-line py-8 text-sm text-muted">No leads yet. They appear here when someone uses the contact form.</p>
        )}
      </section>
    </>
  );
}
