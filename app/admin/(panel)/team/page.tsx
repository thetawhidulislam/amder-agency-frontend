"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Badge, PageHeader } from "@/components/admin/page-header";
import { Button, buttonClass } from "@/components/ui/button";
import { useConfirmDelete } from "@/hooks/use-confirm-delete";
import { api, getErrorMessage } from "@/lib/api-client";
import type { AdminTeamMember } from "@/lib/types";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AdminTeamPage() {
  const qc = useQueryClient();
  const confirmDelete = useConfirmDelete();
  const [failedPhotos, setFailedPhotos] = useState<Set<string>>(() => new Set());
  const members = useQuery({
    queryKey: ["admin", "team"],
    queryFn: async () => (await api.get<{ data: AdminTeamMember[] }>("/admin/team")).data.data,
  });

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "team"] });

  const reorder = useMutation({
    mutationFn: (ids: string[]) =>
      api.patch("/admin/team/reorder", { items: ids.map((id, order) => ({ id, order })) }),
    onSuccess: refresh,
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/team/${id}`),
    onSuccess: () => {
      refresh();
      toast.success("Team member deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });

  function move(index: number, direction: -1 | 1) {
    const list = [...(members.data ?? [])];
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];
    reorder.mutate(list.map((member) => member.id));
  }

  return (
    <>
      <PageHeader
        title="Team"
        description="Manage the people featured on the website and home page."
        action={
          <Link href="/admin/team/new" className={buttonClass({ size: "sm" })}>
            Add team member
          </Link>
        }
      />

      {members.isLoading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : members.isError ? (
        <p role="alert" className="text-sm text-brand">
          {getErrorMessage(members.error)}
        </p>
      ) : members.data?.length ? (
        <ul className="divide-y divide-line border-y border-line">
          {members.data.map((member, index) => (
            <li key={member.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface font-display font-semibold text-muted">
                  {member.photo && !failedPhotos.has(member.id) ? (
                    <Image
                      src={member.photo}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      onError={() =>
                        setFailedPhotos((current) => new Set(current).add(member.id))
                      }
                    />
                  ) : (
                    <span aria-hidden="true">{initials(member.name)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{member.name}</p>
                  <p className="mt-0.5 truncate text-sm text-muted">{member.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={member.isActive ? "good" : "neutral"}>
                  {member.isActive ? "Visible" : "Hidden"}
                </Badge>
                {member.showOnHome ? <Badge>On home</Badge> : null}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Move ${member.name} up`}
                  disabled={index === 0 || reorder.isPending}
                  onClick={() => move(index, -1)}
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Move ${member.name} down`}
                  disabled={index === members.data.length - 1 || reorder.isPending}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Link
                  href={`/admin/team/${member.id}`}
                  aria-label={`Edit ${member.name}`}
                  className={buttonClass({ variant: "ghost", size: "sm" })}
                >
                  <Pencil className="size-4" />
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  aria-label={`Delete ${member.name}`}
                  onClick={() => {
                    if (confirmDelete(`Delete "${member.name}"? This cannot be undone.`)) {
                      remove.mutate(member.id);
                    }
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-y border-line py-10 text-sm text-muted">
          No team members yet. Add the first member to feature them on the website.
        </p>
      )}
    </>
  );
}
