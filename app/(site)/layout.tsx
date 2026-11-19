import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { siteConfig } from "@/config/site";
import { getServices, getSettings } from "@/lib/api-server";
import { whatsappLink } from "@/lib/utils";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.address ? { address: settings.address } : {}),
    ...(settings.socials ? { sameAs: Object.values(settings.socials).filter(Boolean) } : {}),
  };

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <WhatsAppFab href={whatsappLink(settings.whatsapp, "Hello Amader Agency, I would like to know more about your services.")} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
