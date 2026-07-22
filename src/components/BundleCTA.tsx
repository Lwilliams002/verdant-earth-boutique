import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import {
  BUNDLE_DISCOUNT_AMOUNT,
  BUNDLE_PRODUCT_HANDLES,
  type ShopifyProduct,
} from "@/lib/shopify";
import { Loader2, Sparkles } from "lucide-react";

export function BundleCTA({ products }: { products: ShopifyProduct[] }) {
  const { addBundle, isLoading } = useCartStore();

  const bundleProducts = useMemo(
    () =>
      BUNDLE_PRODUCT_HANDLES.map((handle) => products.find((p) => p.node.handle === handle)).filter(
        (p): p is ShopifyProduct => Boolean(p)
      ),
    [products]
  );

  if (bundleProducts.length < 2) return null;

  const currency = bundleProducts[0].node.priceRange.minVariantPrice.currencyCode;
  const subtotal = bundleProducts.reduce(
    (sum, p) => sum + parseFloat(p.node.priceRange.minVariantPrice.amount),
    0
  );
  const bundlePrice = subtotal - BUNDLE_DISCOUNT_AMOUNT;

  const handleAddBundle = async () => {
    const items = bundleProducts
      .map((p) => {
        const variant = p.node.variants.edges[0]?.node;
        if (!variant) return null;
        return {
          product: p,
          variantId: variant.id,
          variantTitle: variant.title,
          price: variant.price,
          quantity: 1,
          selectedOptions: variant.selectedOptions || [],
        };
      })
      .filter((i): i is NonNullable<typeof i> => i !== null);
    await addBundle(items);
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="relative overflow-hidden rounded-lg border border-forest-deep/10 bg-forest-deep text-cream">
        <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:p-14">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 text-sage">
              <Sparkles className="h-3.5 w-3.5" /> Limited bundle
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              The <span className="font-script text-sage">Routine</span> Bundle
            </h2>
            <p className="mt-4 max-w-xl text-cream/80 leading-relaxed">
              Both of our botanical balms together Earth Balm and Moon Balm for a complete morning
              and evening routine. Save ${BUNDLE_DISCOUNT_AMOUNT.toFixed(2)} when you take home the pair.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              {bundleProducts.map((p) => {
                const img = p.node.images.edges[0]?.node;
                return (
                  <div key={p.node.handle} className="flex items-center gap-3">
                    {img && (
                      <img
                        src={img.url}
                        alt={img.altText ?? p.node.title}
                        className="h-16 w-16 rounded-sm bg-cream/10 object-contain p-1"
                      />
                    )}
                    <div>
                      <p className="font-display text-sm">{p.node.title}</p>
                      <p className="text-xs text-cream/60">
                        {currency} {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="text-left md:text-right">
              <p className="text-sm text-cream/60 line-through">
                {currency} {subtotal.toFixed(2)}
              </p>
              <p className="font-display text-4xl">
                {currency} {bundlePrice.toFixed(2)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-sage">
                Save ${BUNDLE_DISCOUNT_AMOUNT.toFixed(2)}
              </p>
            </div>
            <Button
              onClick={handleAddBundle}
              disabled={isLoading}
              size="lg"
              className="rounded-full bg-cream px-8 text-forest-deep hover:bg-cream/90"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Add bundle to cart"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
