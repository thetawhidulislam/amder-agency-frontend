"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminTeamMember } from "@/lib/types";

export default function EditTeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const member = useQuery({
    queryKey: ["admin", "team", id],
    queryFn: async () => (await api.get<{ data: AdminTeamMember }>(`/admin/team/${id}`)).data.data,
  });

  return (
    <>
      <PageHeader title="Edit team member" />
      {member.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : member.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(member.error)}
        </p>
      ) : member.data ? (
        <TeamForm initial={member.data} />
      ) : null}
    </>
  );
}
