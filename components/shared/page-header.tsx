import { Reveal } from "@/components/motion/reveal";
import { SectionChip } from "@/components/shared/section-chip";

export function PageHeader({ title, intro, chip }: { title: string; intro: string; chip: string }) {
  return (
    <div className="page-header relative isolate py-8 sm:py-12">
      <Reveal className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionChip className="mb-6">{chip}</SectionChip>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tighter text-balance">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-muted sm:text-xl">{intro}</p>
        </div>
      </Reveal>
    </div>
  );
}
