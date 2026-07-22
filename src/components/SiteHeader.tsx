import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import navVines from "@/assets/nav-vines.png";
import { CartDrawer } from "@/components/CartDrawer";

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

        <Link to="/" className="relative flex flex-col items-center text-center leading-none">
          <span
            aria-hidden
            className="absolute -inset-x-6 -inset-y-3 rounded-full bg-cream/80 blur-xl"
          />
          <span className="text-glow relative text-xl font-light tracking-[0.28em] text-forest-deep md:text-2xl" style={{ fontFamily: "var(--font-brand)" }}>
            EARTH &amp; TONIC
          </span>
          <span className="text-glow eyebrow relative mt-1 text-[10px] font-semibold text-moss">
            Rooted in nature
          </span>
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
          <CartDrawer />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <CartDrawer />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="eyebrow text-forest-deep"
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
