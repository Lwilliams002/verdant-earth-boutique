import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import navVines from "@/assets/nav-vines.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "Our Story" },
    { to: "/journal", label: "Journal" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <img
        src={navVines}
        alt=""
        aria-hidden
        loading="lazy"
        className="nav-vine pointer-events-none absolute -top-6 left-0 right-0 z-0 h-40 w-full object-cover object-top md:h-56"
      />
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <nav className="hidden flex-1 items-center gap-8 text-sm tracking-wide text-forest-deep md:flex">
          {nav.slice(0, 2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-glow transition-colors hover:text-moss"
              activeProps={{ className: "text-moss" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/" className="flex items-center gap-3 text-forest-deep">
          <BrandMark className="h-9 w-7" />
          <div className="flex flex-col items-center leading-none">
            <span className="font-display text-xl tracking-[0.32em] text-glow">EARTH &amp; TONIC</span>
            <span className="mt-1 text-[10px] tracking-[0.4em] text-muted-foreground">EST · 2026</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-end gap-8 text-sm tracking-wide text-forest-deep md:flex">
          {nav.slice(2).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-glow transition-colors hover:text-moss"
              activeProps={{ className: "text-moss" }}
            >
              {n.label}
            </Link>
          ))}
          <button
            aria-label="Cart"
            className="relative rounded-full border border-border p-2 transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-medium text-cream">
              0
            </span>
          </button>
        </nav>

        <button
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="eyebrow text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
