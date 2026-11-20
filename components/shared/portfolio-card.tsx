import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PortfolioCard({
  item,
  featured = false,
}: {
  item: PortfolioSummary & { service?: { title: string } };
  featured?: boolean;
}) {
  const meta = [item.service?.title, item.client].filter(Boolean).join(", ");
  return (
    <Link href={`/portfolio/${item.slug}`} className={cn("group block", featured && "lg:col-span-2")}>
      <div className="portfolio-card-frame relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={item.cover}
          alt={item.title}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 67vw, (min-width: 640px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="portfolio-image object-cover"
        />
        <span aria-hidden="true" className="portfolio-card-arrow absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-ink text-white">
          <ArrowUpRight className="size-5" strokeWidth={1.75} />
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-brand">
        <span className="portfolio-title">{item.title}</span>
      </h3>
      {meta ? <p className="mt-1 text-sm text-muted">{meta}</p> : null}
    </Link>
  );
}
