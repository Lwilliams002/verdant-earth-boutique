import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products } from "@/lib/products";
import { useState } from "react";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Earth & Tonic" },
      { name: "description", content: "Shop organic herbal tonics and botanical skincare from Earth & Tonic." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [filter, setFilter] = useState<"All" | "Tonics" | "Skincare">("All");
  const list = filter === "All" ? products : products.filter((p) => p.category === filter);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-moss">— The Apothecary</span>
          <h1 className="mt-4 font-display text-6xl text-forest-deep">
            <span className="font-script text-moss">All</span> products
          </h1>
          <p className="mt-5 text-foreground/70">
            Small-batch tonics and botanical skincare, made with organic ingredients.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {(["All", "Tonics", "Skincare"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`eyebrow rounded-full border px-5 py-2 transition-colors ${
                filter === f
                  ? "border-forest-deep bg-forest-deep text-cream"
                  : "border-border text-foreground/70 hover:border-forest-deep/40"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3 lg:gap-10">
          {list.map((p) => (
            <Link
              key={p.slug}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col"
            >
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={420}
                  height={560}
                  className="bottle-shadow h-[88%] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 eyebrow text-moss">{p.category}</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-5 sm:gap-4">
                <h3 className="font-display text-lg text-forest-deep sm:text-2xl">{p.name}</h3>
                <span className="text-xs text-foreground/70 sm:text-sm">${p.price}</span>
              </div>
              <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
