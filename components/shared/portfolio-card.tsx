import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ImageProps } from "next/image";
import type { PortfolioSummary } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FadeImage } from "@/components/shared/fade-image";
import { ImageReveal } from "@/components/shared/image-reveal";

function getClientDisplay(client: string) {
  if (!/^https?:\/\//i.test(client)) {
    return { label: client, isUrl: false };
  }

  try {
    return { label: new URL(client).hostname, isUrl: true };
  } catch {
    return { label: client, isUrl: true };
  }
}

export function PortfolioCard({
  item,
  serviceTitle,
  surface = "default",
  imageReveal = false,
  priority = false,
  loading,
}: {
  item: PortfolioSummary & { service?: { title: string } };
  serviceTitle?: string;
  surface?: "default" | "transparent";
  imageReveal?: boolean;
  priority?: boolean;
  loading?: ImageProps["loading"];
}) {
  const service = serviceTitle ?? item.service?.title;
  const client = item.client ? getClientDisplay(item.client) : null;
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-3xl",
        surface === "default"
          ? "portfolio-card border border-line bg-white shadow-[var(--shadow-card)]"
          : "bg-transparent"
      )}
    >
      <div className="portfolio-card-frame relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-surface">
        {imageReveal ? (
          <ImageReveal>
            <FadeImage
              src={item.cover}
              alt={item.title}
              fill
              priority={priority}
              loading={loading}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="portfolio-image object-cover"
            />
          </ImageReveal>
        ) : (
          <FadeImage
            src={item.cover}
            alt={item.title}
            fill
            priority={priority}
            loading={loading}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="portfolio-image object-cover"
          />
        )}
        {service ? (
          <span className="absolute bottom-4 left-4 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink">
            {service}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="pb-4">
          {client ? (
            <p className={cn("text-xs font-medium text-muted", !client.isUrl && "uppercase tracking-wider")}>
              {client.label}
            </p>
          ) : null}
          <h3 className="mt-2 line-clamp-2 font-display text-xl font-semibold leading-snug text-ink">
            {item.title}
          </h3>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="text-sm font-medium">View project</span>
          <span className="portfolio-card-arrow flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </Link>
  );
}
