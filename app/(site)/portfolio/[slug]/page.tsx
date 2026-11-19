import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/home/cta-band";
import { Container, Section } from "@/components/shared/container";
import { getPortfolioItem, getSettings } from "@/lib/api-server";
import { whatsappLink, youtubeEmbed } from "@/lib/utils";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return { title: "Project not found" };
  return {
    title: item.title,
    description: item.description.slice(0, 160),
    alternates: { canonical: `/portfolio/${item.slug}` },
    openGraph: { images: [item.cover] },
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const [item, settings] = await Promise.all([getPortfolioItem(slug), getSettings()]);
  if (!item) notFound();

  const embed = youtubeEmbed(item.videoUrl);
  const paragraphs = item.description.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <Section className="pb-14">
        <Container>
          <Link href="/portfolio" className="text-sm text-muted hover:text-brand">
            All projects
          </Link>
          <h1 className="before:mb-6 before:block before:h-1 before:w-12 before:bg-brand mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl">
            {item.title}
          </h1>
          <p className="mt-5 text-lg text-muted">
            <Link href={`/portfolio?service=${item.service.slug}`} className="underline decoration-brand underline-offset-4 hover:text-brand">
              {item.service.title}
            </Link>
            {item.client ? <> for {item.client}</> : null}
          </p>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-sm bg-surface">
            <Image src={item.cover} alt={item.title} fill priority sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover" />
          </div>
        </Container>
      </Section>

      <Container className="grid gap-10 pb-20 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          {item.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li key={t} className="rounded-sm border border-line px-3 py-1 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="max-w-2xl space-y-5 text-lg text-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>

      {embed ? (
        <Container className="pb-20">
          <div className="aspect-video overflow-hidden rounded-sm bg-surface">
            <iframe
              src={embed}
              title={`${item.title} video`}
              loading="lazy"
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          </div>
        </Container>
      ) : item.videoUrl ? (
        <Container className="pb-20">
          <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-brand decoration-2 underline-offset-4">
            Watch the video
          </a>
        </Container>
      ) : null}

      {item.gallery.length > 0 ? (
        <Container className="grid gap-6 pb-24 sm:grid-cols-2">
          {item.gallery.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
              <Image src={src} alt={`${item.title} image ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </Container>
      ) : null}

      <CtaBand whatsapp={whatsappLink(settings.whatsapp)} title="Want a result like this for your business?" />
    </>
  );
}
