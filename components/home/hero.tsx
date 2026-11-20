import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Rocket } from "lucide-react";
import { Container } from "@/components/shared/container";
import { ServiceIcon } from "@/components/shared/service-icon";
import { publicButtonClass } from "@/components/shared/public-button";
import { SectionChip } from "@/components/shared/section-chip";
import { Reveal } from "@/components/motion/reveal";
import { whyPoints } from "@/config/site";
import type { PortfolioListItem, Service } from "@/lib/types";

const tilePositions = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2 lg:row-span-2",
  "lg:col-start-1 lg:row-start-3",
];

export function Hero({
  services,
  featured,
  whatsapp,
}: {
  services: Service[];
  featured: PortfolioListItem[];
  whatsapp: string | null;
}) {
  const tiles = Array.from({ length: 4 }, (_, index) => ({
    service: services[index],
    project: featured[index],
    index,
  }));

  return (
    <section className="hero-section">
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="relative z-10">
          <Reveal>
            <SectionChip className="mb-6">Full-stack marketing agency</SectionChip>
          </Reveal>
          <h1 className="max-w-3xl font-display text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
            <Reveal as="span" className="motion-reveal-inline">
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line">One agency.</span>
              </span>
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line">Four specialist teams.</span>
              </span>
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line text-brand">One plan for your business.</span>
              </span>
            </Reveal>
          </h1>
          <Reveal delay={80}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Marketing, design, video and web, coordinated by one team so every part of your brand works together.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <ul className="mt-7 flex flex-wrap gap-3">
              {whyPoints.slice(0, 3).map((point) => (
                <li
                  key={point.title}
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-[rgb(11_11_11_/_0.1)] bg-white px-3 py-2.5 text-sm font-medium shadow-[var(--shadow-card)]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                    <Check aria-hidden="true" className="size-4 text-brand-dark" strokeWidth={1.75} />
                  </span>
                  {point.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={publicButtonClass({ size: "lg" })}>
                Start a project
                <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              </Link>
              {whatsapp ? (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={publicButtonClass({ size: "lg", variant: "outline" })}>
                  Chat on WhatsApp
                </a>
              ) : (
                <Link href="/services" className={publicButtonClass({ size: "lg", variant: "outline" })}>See our services</Link>
              )}
            </div>
          </Reveal>
        </div>

        <div className="relative isolate">
          <div className="hero-collage">
            {tiles.map(({ service, project, index }) => (
              <HeroTile key={service?.id ?? `logo-${index}`} service={service} project={project} index={index} />
            ))}
          </div>
          <aside className="hero-floating-card absolute left-[-24px] top-[55%] z-20 hidden items-center gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-lift)] lg:flex">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
              <Rocket aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block font-display text-base font-semibold">{services.length} specialist teams</span>
              <span className="mt-0.5 block text-sm text-muted">One coordinated plan</span>
            </span>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function HeroTile({
  service,
  project,
  index,
}: {
  service?: Service;
  project?: PortfolioListItem;
  index: number;
}) {
  const position = tilePositions[index];
  const tileClass = `hero-tile ${position} aspect-square lg:aspect-auto`;

  if (!service) {
    return (
      <div aria-hidden="true" className={`${tileClass} flex items-center justify-center border border-[rgb(11_11_11_/_0.1)] bg-white`}>
        <Image src="/logo.png" alt="" width={88} height={88} className="size-20 object-contain" />
      </div>
    );
  }

  if (project?.cover) {
    return (
      <Link href={`/services/${service.slug}`} className={`${tileClass} group block`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority={index === 0}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/45 p-4 text-white">
          <span className="font-display text-xl font-semibold">{service.title}</span>
          <span className="hero-tile-arrow flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
        </span>
      </Link>
    );
  }

  const color =
    index === 0
      ? "bg-ink text-white"
      : index === 1
        ? "bg-brand text-white"
        : index === 2
          ? "border border-[rgb(11_11_11_/_0.1)] bg-white text-ink"
          : "border border-[rgb(11_11_11_/_0.1)] bg-surface text-ink";
  const iconColor = index === 1 ? "bg-white/20 text-white" : "bg-brand/10 text-brand";

  return (
    <Link href={`/services/${service.slug}`} className={`${tileClass} group block ${color}`}>
      <div className="flex h-full flex-col p-5 sm:p-6">
        <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${iconColor}`}>
          <ServiceIcon name={service.icon} className="size-7" />
        </span>
        <span className="mt-4 block font-display text-2xl font-semibold leading-tight">{service.title}</span>
        {(index === 0 || index === 2) ? (
          <span className={`mt-2 hidden text-sm leading-relaxed opacity-75 lg:line-clamp-2 lg:block ${index === 0 ? "text-white" : "text-ink"}`}>
            {service.shortDesc}
          </span>
        ) : null}
        <span className={`hero-tile-arrow mt-auto flex size-10 shrink-0 items-center justify-center self-end rounded-full ${index === 0 ? "bg-white/10" : "bg-ink/5"}`}>
          <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
      </div>
    </Link>
  );
}
