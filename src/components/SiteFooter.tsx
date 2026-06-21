import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { Instagram } from "lucide-react";
import navVinesAsset from "@/assets/nav-vines.png.asset.json";
const navVines = navVinesAsset.url;

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-forest-deep text-cream">
      <img
        src={navVines}
        alt=""
        aria-hidden
        loading="lazy"
        className="nav-vine-dark pointer-events-none absolute -top-6 left-0 right-0 z-0 h-32 w-full object-cover object-top md:h-44"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-8 text-cream" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg tracking-[0.32em]">EARTH &amp; TONIC</span>
                <span className="mt-1 text-[10px] tracking-[0.4em] text-cream/70">EST · 2026</span>
              </div>
            </div>
            <p className="mt-6 max-w-xs font-display text-2xl italic text-cream/90">
              Rooted in nature. <br />Crafted for wellness.
            </p>
          </div>

          <FooterCol title="Shop" links={[
            { to: "/shop", label: "All products" },
            { to: "/shop", label: "Tonics" },
            { to: "/shop", label: "Skincare" },
          ]} />
          <FooterCol title="Learn" links={[
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

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-cream/15 pt-8 text-xs tracking-wide text-cream/60 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Earth &amp; Tonic. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="flex items-center gap-2 hover:text-cream">
              <Instagram className="h-4 w-4" /> @earth.and.tonic
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow text-cream/70">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-cream/85">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="transition-colors hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
