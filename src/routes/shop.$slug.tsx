import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingBottle } from "@/components/FloatingBottle";
import { BrandMark } from "@/components/BrandMark";
import { getProduct, products } from "@/lib/products";
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
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ backgroundImage: `url(${botanicalBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background" />

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-10 lg:py-24">
          <div className="relative flex items-center justify-center">
            <div className="absolute aspect-square w-[80%] rounded-full border border-forest/15" />
            <FloatingBottle
              src={product.image}
              alt={product.name}
              priority
              className="relative z-10 h-[520px] w-[380px] sm:h-[620px] sm:w-[440px]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="eyebrow text-moss">{product.category}</span>
            <h1 className="mt-4 font-display text-6xl leading-none text-forest-deep md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-3 font-script text-3xl text-moss">{product.tagline}</p>

            <p className="mt-8 max-w-md text-foreground/75">{product.short}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs tracking-wider text-foreground/70"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <span className="font-display text-3xl text-forest-deep">${product.price}</span>
              <span className="text-xs tracking-[0.2em] text-muted-foreground">{product.size}</span>
            </div>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center rounded-full border border-border bg-card">
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
            <p className="mt-3 text-xs text-muted-foreground">
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
                <p className="mt-1 text-sm text-muted-foreground">{i.note}</p>
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
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
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
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-xl text-forest-deep">{p.name}</h3>
                <span className="text-sm text-foreground/70">${p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
