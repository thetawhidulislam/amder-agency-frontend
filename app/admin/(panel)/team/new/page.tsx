import { PageHeader } from "@/components/admin/page-header";
import { TeamForm } from "@/components/admin/team-form";

export const metadata = { title: "New team member" };

export default function NewTeamMemberPage() {
  return (
    <>
      <PageHeader title="New team member" />
      <TeamForm />
    </>
  );
}
