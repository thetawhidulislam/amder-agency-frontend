import { Container, Section } from "@/components/shared/container";
import { LoadingSkeleton, SkeletonBlock } from "@/components/shared/loading-skeleton";

export default function SiteLoading() {
  return (
    <LoadingSkeleton>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <SkeletonBlock className="h-14 w-3/4 max-w-xl rounded-2xl sm:h-20" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((card) => (
              <SkeletonBlock key={card} className="aspect-[4/3] rounded-3xl" />
            ))}
          </div>
        </Container>
      </Section>
    </LoadingSkeleton>
  );
}
