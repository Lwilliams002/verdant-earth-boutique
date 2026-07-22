import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingBottle } from "@/components/FloatingBottle";
import { BrandMark } from "@/components/BrandMark";
import { Minus, Plus, Check, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import botanicalBg from "@/assets/botanical-bg.jpg";
import { fetchShopifyProductByHandle, fetchShopifyProducts } from "@/lib/shopify.functions";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Earth & Tonic` },
      { name: "description", content: "Earth & Tonic product" },
    ],
  }),
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["shopify-product", params.slug],
      queryFn: () => fetchShopifyProductByHandle({ data: { handle: params.slug } }),
    });
    await context.queryClient.ensureQueryData({
      queryKey: ["shopify-products"],
      queryFn: () => fetchShopifyProducts(),
    });
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-5xl text-forest-deep">Not found</h1>
        <Link to="/shop" className="eyebrow mt-6 inline-block text-moss">
          ← Back to shop
        </Link>
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
  const { slug } = Route.useParams();
  const { data: product } = useSuspenseQuery({
    queryKey: ["shopify-product", slug],
    queryFn: () => fetchShopifyProductByHandle({ data: { handle: slug } }),
  });
  const { data: allProducts } = useSuspenseQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchShopifyProducts(),
  });

  if (!product) throw notFound();

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const image = product.images.edges[0]?.node;
  const price = product.priceRange.minVariantPrice;
  const variant = product.variants.edges[0]?.node;
  const related = (allProducts ?? [])
    .filter((p: ShopifyProduct) => p.node.handle !== product.handle)
    .slice(0, 3);

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions,
    });
    setAdded(true);
    toast.success("Added to cart", { description: `${product.title} — ${qty} item${qty > 1 ? "s" : ""}` });
    setTimeout(() => setAdded(false), 1800);
  };

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
            <span className="eyebrow text-moss">{product.productType || "Product"}</span>
            <h1 className="mt-3 font-display text-6xl leading-none text-forest-deep md:text-7xl">
              {product.title}
            </h1>
            <p className="mt-2 font-script text-3xl text-moss">{product.vendor}</p>
          </div>

          {/* Center product */}
          <div className="mt-10 flex items-center justify-center lg:mt-14">
            <div className="relative flex items-center justify-center">
              <div className="absolute aspect-square w-[88%] rounded-full border border-forest/15" />
              <div className="absolute aspect-square w-[70%] rounded-full border border-forest/10" />
              {image ? (
                <FloatingBottle
                  src={image.url}
                  alt={image.altText ?? product.title}
                  priority
                  className="relative z-10 h-[300px] w-[190px] sm:h-[440px] sm:w-[300px] lg:h-[560px] lg:w-[400px]"
                />
              ) : (
                <div className="relative z-10 h-[300px] w-[190px] sm:h-[440px] sm:w-[300px] lg:h-[560px] lg:w-[400px] bg-muted rounded-full" />
              )}
            </div>
          </div>

          {/* Buy panel */}
          <div className="mx-auto mt-16 max-w-2xl rounded-sm border border-border bg-card/60 p-8 backdrop-blur">
            <p className="text-center text-foreground/75">{product.description || product.title}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <span className="font-display text-3xl text-forest-deep">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </span>
              <span className="text-xs tracking-[0.2em] text-muted-foreground">
                {variant?.title || "Default"}
              </span>
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
                onClick={handleAddToCart}
                disabled={!variant || isLoading}
                className="flex-1 rounded-full bg-forest-deep px-7 py-4 text-sm tracking-[0.2em] text-cream transition-colors hover:bg-forest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> ADDING
                  </span>
                ) : added ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" /> ADDED
                  </span>
                ) : (
                  `ADD TO CART — ${price.currencyCode} ${(parseFloat(price.amount) * qty).toFixed(2)}`
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
              Why <span className="font-script text-moss">{product.title}?</span>
            </h2>
            <p className="mt-6 text-foreground/75">
              {product.description || "Crafted with care using organic, whole-plant ingredients."}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            {["Plant Powered", "Clean Ingredients", "Small Batch", "Cruelty Free"].map((b) => (
              <div key={b} className="flex items-start gap-3 bg-background p-6">
                <BrandMark className="mt-1 h-6 w-5 shrink-0 text-moss" />
                <p className="text-sm text-foreground/80">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-4xl text-forest-deep">You may also love</h2>
            <Link to="/shop" className="eyebrow border-b border-forest-deep/40 pb-1 text-forest-deep">
              View all <ArrowRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {related.map((p: ShopifyProduct) => {
              const node = p.node;
              const relatedImage = node.images.edges[0]?.node;
              const relatedPrice = node.priceRange.minVariantPrice;
              return (
                <Link key={node.handle} to="/shop/$slug" params={{ slug: node.handle }} className="group">
                  <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
                    {relatedImage ? (
                      <img
                        src={relatedImage.url}
                        alt={relatedImage.altText ?? node.title}
                        loading="lazy"
                        width={420}
                        height={560}
                        className="bottle-shadow h-[88%] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-[88%] w-full bg-muted" />
                    )}
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-4">
                    <h3 className="font-display text-lg text-forest-deep sm:text-xl">{node.title}</h3>
                    <span className="text-xs text-foreground/70 sm:text-sm">
                      {relatedPrice.currencyCode} {parseFloat(relatedPrice.amount).toFixed(0)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
