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
            { to: "/journal", label: "Journal" },
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
          <a href="#" aria-label="Instagram" className="flex items-center gap-2 hover:text-foreground">
            <Instagram className="h-4 w-4" /> @earth.and.tonic
          </a>
        </div>
      </div>
    </footer>
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
