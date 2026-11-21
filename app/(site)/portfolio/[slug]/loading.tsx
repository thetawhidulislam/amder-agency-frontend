import { Container, Section } from "@/components/shared/container";
import { LoadingSkeleton, SkeletonBlock } from "@/components/shared/loading-skeleton";

export default function PortfolioDetailLoading() {
  return (
    <LoadingSkeleton>
      <Section className="pb-14">
        <Container>
          <SkeletonBlock className="h-4 w-28 rounded-full" />
          <SkeletonBlock className="mt-8 h-14 w-4/5 max-w-4xl rounded-2xl sm:h-20" />
          <SkeletonBlock className="mt-5 h-5 w-64 max-w-full rounded-full" />
          <SkeletonBlock className="mt-12 aspect-[16/9] rounded-3xl" />
        </Container>
      </Section>
      <Container className="grid gap-10 pb-20 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div className="flex flex-wrap content-start gap-2">
          {[0, 1, 2, 3].map((tag) => (
            <SkeletonBlock key={tag} className="h-7 w-20 rounded-full" />
          ))}
        </div>
        <div className="space-y-5">
          {[0, 1, 2].map((paragraph) => (
            <div key={paragraph} className="space-y-2">
              <SkeletonBlock className="h-5 w-full rounded-full" />
              <SkeletonBlock className="h-5 w-11/12 rounded-full" />
              <SkeletonBlock className="h-5 w-2/3 rounded-full" />
            </div>
          ))}
        </div>
      </Container>
      <Container className="pb-20">
        <SkeletonBlock className="aspect-video rounded-3xl" />
      </Container>
      <Container className="grid gap-6 pb-24 sm:grid-cols-2">
        {[0, 1, 2, 3].map((image) => (
          <SkeletonBlock key={image} className="aspect-[4/3] rounded-3xl" />
        ))}
      </Container>
    </LoadingSkeleton>
  );
}
