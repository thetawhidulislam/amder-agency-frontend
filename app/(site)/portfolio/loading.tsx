import { Container, Section } from "@/components/shared/container";
import { LoadingSkeleton, SkeletonBlock } from "@/components/shared/loading-skeleton";

export default function PortfolioLoading() {
  return (
    <LoadingSkeleton>
      <Section className="pb-20">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <SkeletonBlock className="h-6 w-28 rounded-full" />
            <SkeletonBlock className="mt-6 h-16 w-3/4 max-w-xl rounded-2xl sm:h-24" />
            <SkeletonBlock className="mt-5 h-5 w-full max-w-2xl rounded-full" />
            <SkeletonBlock className="mt-2 h-5 w-4/5 max-w-xl rounded-full" />
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((item) => (
              <SkeletonBlock key={item} className="h-9 w-24 rounded-full" />
            ))}
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, item) => (
              <div key={item} className="overflow-hidden rounded-3xl border border-line bg-white">
                <SkeletonBlock className="aspect-[4/3] rounded-none" />
                <div className="space-y-3 p-5 sm:p-6">
                  <SkeletonBlock className="h-3 w-1/3 rounded-full" />
                  <SkeletonBlock className="h-6 w-3/4 rounded-full" />
                  <SkeletonBlock className="mt-5 h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </LoadingSkeleton>
  );
}
