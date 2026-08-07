import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-[color:var(--cream-deep)] text-foreground">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex flex-col leading-none" style={{ fontFamily: "var(--font-brand)" }}>
              <span className="text-lg font-extralight tracking-[0.42em]">EARTH &amp; TONIC</span>
              <span className="mt-2 text-[10px] tracking-[0.4em] text-foreground/55">EST · 2026</span>
            </div>
            <p className="mt-6 max-w-xs font-display text-2xl italic leading-snug text-foreground/85">
              Rooted in nature.<br />Crafted for wellness.
            </p>
          </div>

          <FooterCol title="Shop" links={[
            { to: "/shop", label: "All products" },
            { to: "/shop", label: "Balms" },
            { to: "/shop", label: "Bundles" },
          ]} />
          <FooterCol title="About" links={[
            { to: "/about", label: "Our Story" },
            { to: "/gallery", label: "Gallery" },
            { to: "/about", label: "Ingredients" },
          ]} />
          <FooterCol title="Care" links={[
            { to: "/about", label: "Contact" },
            { to: "/about", label: "Shipping" },
            { to: "/about", label: "Returns" },
          ]} />
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <NewsletterSignup
            heading="Join the list"
            description="New drops, small batch launches and early access, straight to your inbox."
            className="max-w-xl"
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 text-xs tracking-wide text-foreground/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Earth &amp; Tonic. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/earth.and.tonic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Instagram className="h-4 w-4" /> @earth.and.tonic
            </a>
            <a
              href="https://www.tiktok.com/@earthandtonicwellness"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <TikTokIcon className="h-4 w-4" /> @earthandtonicwellness
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 3c.3 2.1 1.6 3.6 3.6 3.8v2.4c-1.2.1-2.3-.2-3.4-.8v5.9c0 3.2-2.6 5.7-5.8 5.7A5.7 5.7 0 0 1 5.2 14a5.6 5.6 0 0 1 6-5.6v2.5a3.2 3.2 0 0 0-.7-.1 3.2 3.2 0 1 0 3.2 3.2V3h2.8z" />
    </svg>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow text-foreground/60">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-foreground/85">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover-underline">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
