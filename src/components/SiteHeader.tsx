import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "Our Story" },
    { to: "/journal", label: "Journal" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-10 lg:py-5">
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="eyebrow text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="leading-none"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          <span className="text-xl font-extralight tracking-[0.42em] text-foreground md:text-[1.6rem]">
            EARTH &amp; TONIC
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <Link to="/shop" className="eyebrow text-foreground/80 hover-underline">
            Search
          </Link>
          <CartDrawer />
        </div>

        <div className="flex items-center gap-3 md:hidden">
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
          <div className="flex flex-col gap-5 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="eyebrow text-foreground"
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
