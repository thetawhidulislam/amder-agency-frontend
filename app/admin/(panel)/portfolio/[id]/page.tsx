"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { PortfolioForm } from "@/components/admin/portfolio-form";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminPortfolioItem } from "@/lib/types";

export default function EditPortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const item = useQuery({
    queryKey: ["admin", "portfolio", id],
    queryFn: async () => (await api.get<{ data: AdminPortfolioItem }>(`/admin/portfolio/${id}`)).data.data,
  });

  return (
    <>
      <PageHeader title="Edit project" />
      {item.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : item.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(item.error)}
        </p>
      ) : item.data ? (
        <PortfolioForm initial={item.data} />
      ) : null}
    </>
  );
}
