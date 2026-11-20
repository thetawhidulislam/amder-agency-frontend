import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ href }: { href: string | null }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="public-button fixed bottom-5 left-5 z-40 inline-flex items-center gap-3 rounded-full bg-brand py-1.5 pl-1.5 pr-5 font-medium text-white shadow-[0_10px_24px_-10px_rgb(225_29_39_/_0.5)] hover:bg-brand-dark"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
        <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </span>
      <span>Chat with us</span>
    </a>
  );
}
