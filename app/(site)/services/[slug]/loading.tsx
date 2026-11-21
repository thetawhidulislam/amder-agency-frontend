import { Container, Section } from "@/components/shared/container";
import { LoadingSkeleton, SkeletonBlock } from "@/components/shared/loading-skeleton";

export default function ServiceDetailLoading() {
  return (
    <LoadingSkeleton>
      <Section className="pb-12 sm:pb-16">
        <Container>
          <SkeletonBlock className="h-4 w-28 rounded-full" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <SkeletonBlock className="size-8 rounded-lg" />
              <SkeletonBlock className="mt-5 h-14 w-4/5 max-w-xl rounded-2xl sm:h-20" />
              <div className="mt-6 space-y-2">
                <SkeletonBlock className="h-5 w-full max-w-xl rounded-full" />
                <SkeletonBlock className="h-5 w-4/5 max-w-lg rounded-full" />
              </div>
              <div className="mt-12">
                <SkeletonBlock className="h-8 w-64 rounded-xl" />
                <div className="mt-5 space-y-0 border-t border-line">
                  {[0, 1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-b border-line py-4">
                      <SkeletonBlock className="size-4 shrink-0 rounded-full" />
                      <SkeletonBlock className="h-4 w-4/5 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
              <SkeletonBlock className="h-7 w-3/4 rounded-full" />
              <SkeletonBlock className="mt-5 h-12 w-full rounded-xl" />
            </div>
          </div>
        </Container>
      </Section>
      <Section className="border-t border-line py-14 sm:py-20">
        <Container className="max-w-3xl space-y-5">
          {[0, 1, 2].map((paragraph) => (
            <div key={paragraph} className="space-y-2">
              <SkeletonBlock className="h-5 w-full rounded-full" />
              <SkeletonBlock className="h-5 w-11/12 rounded-full" />
              <SkeletonBlock className="h-5 w-2/3 rounded-full" />
            </div>
          ))}
        </Container>
      </Section>
      <Section className="border-t border-line py-14 sm:py-20">
        <Container>
          <SkeletonBlock className="h-10 w-2/3 max-w-lg rounded-xl" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="overflow-hidden rounded-3xl border border-line bg-white">
                <SkeletonBlock className="aspect-[4/3] rounded-none" />
                <div className="space-y-3 p-5">
                  <SkeletonBlock className="h-4 w-2/3 rounded-full" />
                  <SkeletonBlock className="h-4 w-1/2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </LoadingSkeleton>
  );
}
