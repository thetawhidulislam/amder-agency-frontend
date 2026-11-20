import { HeaderArt } from "@/components/graphics/header-art";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <div className="relative isolate">
      <HeaderArt />
      <Reveal className="relative z-10">
        <div className="max-w-4xl lg:max-w-[76%]">
          <span aria-hidden="true" className="section-heading-bar mb-6 block h-1 w-12 bg-brand" />
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tighter text-balance">
            {title}
          </h1>
          <p className="mt-5 max-w-4xl text-lg text-muted sm:text-xl">{intro}</p>
        </div>
      </Reveal>
    </div>
  );
}
