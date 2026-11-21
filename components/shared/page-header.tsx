import { PageHeaderMotion } from "@/components/shared/page-header-motion";

export function PageHeader({ title, intro, chip }: { title: string; intro: string; chip: string }) {
  return (
    <div className="page-header relative isolate py-8 sm:py-12">
      <PageHeaderMotion chip={chip} title={title} intro={intro} />
    </div>
  );
}
