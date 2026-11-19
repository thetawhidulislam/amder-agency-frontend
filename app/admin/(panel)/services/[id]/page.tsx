"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { ServiceForm } from "@/components/admin/service-form";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminService } from "@/lib/types";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const service = useQuery({
    queryKey: ["admin", "services", id],
    queryFn: async () => (await api.get<{ data: AdminService }>(`/admin/services/${id}`)).data.data,
  });

  return (
    <>
      <PageHeader title="Edit service" />
      {service.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : service.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(service.error)}
        </p>
      ) : service.data ? (
        <ServiceForm initial={service.data} />
      ) : null}
    </>
  );
}
