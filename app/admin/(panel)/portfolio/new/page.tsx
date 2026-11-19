import { PageHeader } from "@/components/admin/page-header";
import { PortfolioForm } from "@/components/admin/portfolio-form";

export const metadata = { title: "New project" };

export default function NewPortfolioPage() {
  return (
    <>
      <PageHeader title="New project" />
      <PortfolioForm />
    </>
  );
}
