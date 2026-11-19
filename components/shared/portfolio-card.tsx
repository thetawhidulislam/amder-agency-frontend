import Image from "next/image";
import Link from "next/link";
import type { PortfolioSummary } from "@/lib/types";

export function PortfolioCard({ item }: { item: PortfolioSummary & { service?: { title: string } } }) {
  const meta = [item.service?.title, item.client].filter(Boolean).join(", ");
  return (
    <Link href={`/portfolio/${item.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden border-b-0 bg-surface group-hover:border-b-[3px] group-hover:border-brand">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold transition-colors group-hover:text-brand">{item.title}</h3>
      {meta ? <p className="mt-1 text-sm text-muted">{meta}</p> : null}
    </Link>
  );
}
