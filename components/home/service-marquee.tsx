import type { Service } from "@/lib/types";

function ServiceNames({ services }: { services: Service[] }) {
  return (
    <div className="flex shrink-0 items-center gap-7 px-5">
      {services.map((service) => (
        <span key={service.id} className="flex shrink-0 items-center gap-7">
          <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-white">
            {service.title}
          </span>
          <span aria-hidden="true" className="size-2 shrink-0 bg-brand" />
        </span>
      ))}
    </div>
  );
}

export function ServiceMarquee({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div className="service-marquee h-14 overflow-hidden bg-ink">
      <div className="service-marquee-track flex h-full w-max items-center">
        <ServiceNames services={services} />
        <div aria-hidden="true">
          <ServiceNames services={services} />
        </div>
      </div>
    </div>
  );
}
