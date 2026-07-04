import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingBottle } from "@/components/FloatingBottle";
import { BrandMark } from "@/components/BrandMark";
import { getProduct, products, type Product } from "@/lib/products";
import { Minus, Plus, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import botanicalBg from "@/assets/botanical-bg.jpg";

export const Route = createFileRoute("/shop/$slug")({
  head: ({ params }) => {
    const p = getProduct(params.slug);
    return {
      meta: [
        { title: p ? `${p.name} — Earth & Tonic` : "Product — Earth & Tonic" },
        { name: "description", content: p?.short ?? "Earth & Tonic product" },
        { property: "og:title", content: p?.name ?? "Earth & Tonic" },
        { property: "og:description", content: p?.short ?? "" },
        ...(p ? [{ property: "og:image", content: p.image } as const] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-5xl text-forest-deep">Not found</h1>
        <Link to="/shop" className="eyebrow mt-6 inline-block text-moss">← Back to shop</Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-forest-deep">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
      <SiteFooter />
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const mid = Math.ceil(product.ingredients.length / 2);
  const leftIngredients = product.ingredients.slice(0, mid);
  const rightIngredients = product.ingredients.slice(mid);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ backgroundImage: `url(${botanicalBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background" />

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          {/* Title row */}
          <div className="text-center">
            <span className="eyebrow text-moss">{product.category}</span>
            <h1 className="mt-3 font-display text-6xl leading-none text-forest-deep md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-2 font-script text-3xl text-moss">{product.tagline}</p>
          </div>

          {/* Loadout: ingredients | product | ingredients */}
          <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 lg:mt-14 lg:grid-cols-[1fr_minmax(320px,1.1fr)_1fr] lg:gap-8">
            {/* Left ingredients */}
            <ul className="space-y-8 lg:space-y-6">
              {leftIngredients.map((i) => (
                <li
                  key={i.name}
                  className="group flex flex-col items-end gap-2 text-right lg:flex-row-reverse lg:items-start lg:gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-card transition-colors group-hover:border-moss lg:h-14 lg:w-14">
                    <BrandMark className="h-5 w-4 text-moss lg:h-7 lg:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm leading-tight text-forest-deep sm:text-base lg:text-xl">{i.name}</h3>
                    <p className="mt-1 hidden text-sm text-foreground/70 sm:block">{i.note}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Center product */}
            <div className="relative flex items-center justify-center">
              <div className="absolute aspect-square w-[88%] rounded-full border border-forest/15" />
              <div className="absolute aspect-square w-[70%] rounded-full border border-forest/10" />
              <FloatingBottle
                src={product.image}
                alt={product.name}
                priority
                className="relative z-10 h-[300px] w-[190px] sm:h-[440px] sm:w-[300px] lg:h-[560px] lg:w-[400px]"
              />
            </div>

            {/* Right ingredients */}
            <ul className="space-y-8 lg:space-y-6">
              {rightIngredients.map((i) => (
                <li
                  key={i.name}
                  className="group flex flex-col items-start gap-2 text-left lg:flex-row lg:gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-card transition-colors group-hover:border-moss lg:h-14 lg:w-14">
                    <BrandMark className="h-5 w-4 text-moss lg:h-7 lg:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm leading-tight text-forest-deep sm:text-base lg:text-xl">{i.name}</h3>
                    <p className="mt-1 hidden text-sm text-foreground/70 sm:block">{i.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy panel */}
          <div className="mx-auto mt-16 max-w-2xl rounded-sm border border-border bg-card/60 p-8 backdrop-blur">
            <p className="text-center text-foreground/75">{product.short}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs tracking-wider text-foreground/70"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <span className="font-display text-3xl text-forest-deep">${product.price}</span>
              <span className="text-xs tracking-[0.2em] text-muted-foreground">{product.size}</span>
            </div>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-border bg-background">
                <button
                  aria-label="Decrease"
                  className="px-4 py-3 text-foreground/70 hover:text-forest-deep"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button
                  aria-label="Increase"
                  className="px-4 py-3 text-foreground/70 hover:text-forest-deep"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1800);
                }}
                className="flex-1 rounded-full bg-forest-deep px-7 py-4 text-sm tracking-[0.2em] text-cream transition-colors hover:bg-forest"
              >
                {added ? (
                  <span className="inline-flex items-center justify-center gap-2"><Check className="h-4 w-4" /> ADDED</span>
                ) : (
                  `ADD TO CART — $${(product.price * qty).toFixed(0)}`
                )}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free shipping on orders over $60. Ships in 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow text-moss">— Made with intention</span>
            <h2 className="mt-3 font-display text-5xl text-forest-deep">
              Why <span className="font-script text-moss">{product.name}?</span>
            </h2>
            <p className="mt-6 text-foreground/75">{product.long}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            {product.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-background p-6">
                <BrandMark className="mt-1 h-6 w-5 shrink-0 text-moss" />
                <p className="text-sm text-foreground/80">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="text-center">
            <span className="eyebrow text-moss divider-leaf">Crafted with</span>
            <h2 className="mt-4 font-display text-5xl text-forest-deep">
              <span className="font-script text-moss">{product.ingredients.length}</span> organic ingredients
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
            {product.ingredients.map((i) => (
              <div key={i.name} className="bg-cream-deep p-8">
                <BrandMark className="h-10 w-8 text-moss" />
                <h3 className="mt-4 font-display text-2xl text-forest-deep">{i.name}</h3>
                <p className="mt-1 eyebrow text-moss">{i.note}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl text-forest-deep">You may also love</h2>
          <Link to="/shop" className="eyebrow border-b border-forest-deep/40 pb-1 text-forest-deep">
            View all <ArrowRight className="ml-1 inline h-3 w-3" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {related.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="group">
              <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={420}
                  height={560}
                  className="bottle-shadow h-[88%] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-4">
                <h3 className="font-display text-lg text-forest-deep sm:text-xl">{p.name}</h3>
                <span className="text-xs text-foreground/70 sm:text-sm">${p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
