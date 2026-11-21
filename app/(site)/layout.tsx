import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Preloader } from "@/components/motion/preloader";
import { ScrollProgress } from "@/components/motion/scroll-progress";
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
    <MotionProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var forced=new URLSearchParams(location.search).has("preloader");if(!forced&&(sessionStorage.getItem("aa-preloader")||matchMedia("(prefers-reduced-motion: reduce)").matches)){document.documentElement.dataset.pl="skip"}else{document.documentElement.dataset.pl="active"}}catch(e){document.documentElement.dataset.pl="skip"}})();`,
        }}
      />
      <Preloader />
      <noscript>
        <style>{"#preloader{display:none!important}"}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <WhatsAppFab href={whatsappLink(settings.whatsapp, "Hello Amader Agency, I would like to know more about your services.")} />
      <ScrollToTop />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </MotionProvider>
  );
}
