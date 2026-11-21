import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function PortfolioEmptyState({
  className,
  staggerDelay = 80,
}: {
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={cn(className)}>
      <div aria-hidden="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((tile) => (
          <Reveal key={tile} delay={tile * staggerDelay} className="overflow-visible">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
              <div className="relative aspect-[4/3] bg-surface">
                <Image
                  src="/logo.png"
                  alt=""
                  width={128}
                  height={128}
                  className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.12]"
                />
              </div>
              <div className="p-5">
                <span className="block h-4 w-2/3 rounded-full bg-surface" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center font-display text-xl font-semibold">Projects coming soon</p>
    </div>
  );
}
