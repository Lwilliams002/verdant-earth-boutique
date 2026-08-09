import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import {
  BUNDLE_DISCOUNT_AMOUNT,
  BUNDLE_DISCOUNT_PER_ITEM,
  BUNDLE_MIN_ITEMS,
  BUNDLE_PRODUCT_HANDLES,
  isBalmProduct,
  type ShopifyProduct,
} from "@/lib/shopify";
import { Loader2, Minus, Plus, Sparkles } from "lucide-react";

const MAX_PER_BALM = 10;

type BundleLine = {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
};

function toBundleLine(p: ShopifyProduct, quantity: number): BundleLine | null {
  const variant = p.node.variants.edges[0]?.node;
  if (!variant) return null;
  return {
    product: p,
    variantId: variant.id,
    variantTitle: variant.title,
    price: variant.price,
    quantity,
    selectedOptions: variant.selectedOptions || [],
  };
}

export function BundleCTA({ products }: { products: ShopifyProduct[] }) {
  const { addBundle, isLoading } = useCartStore();
  // Map of product handle -> chosen quantity (allows the same balm more than once).
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Preset "Routine Bundle" combo (Earth + Moon), kept as a one-click option.
  const presetProducts = useMemo(
    () =>
      BUNDLE_PRODUCT_HANDLES.map((handle) => products.find((p) => p.node.handle === handle)).filter(
        (p): p is ShopifyProduct => Boolean(p)
      ),
    [products]
  );

  // Every balm the customer can mix and match.
  const balmProducts = useMemo(() => products.filter(isBalmProduct), [products]);

  if (balmProducts.length < BUNDLE_MIN_ITEMS) return null;

  const currency = balmProducts[0].node.priceRange.minVariantPrice.currencyCode;

  const setQty = (handle: string, next: number) => {
    const clamped = Math.max(0, Math.min(MAX_PER_BALM, next));
    setQuantities((prev) => {
      const updated = { ...prev };
      if (clamped === 0) delete updated[handle];
      else updated[handle] = clamped;
      return updated;
    });
  };

  const totalQty = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const meetsMin = totalQty >= BUNDLE_MIN_ITEMS;

  const customSubtotal = balmProducts.reduce((sum, p) => {
    const q = quantities[p.node.handle] ?? 0;
    return sum + q * parseFloat(p.node.priceRange.minVariantPrice.amount);
  }, 0);
  const customSavings = meetsMin ? BUNDLE_DISCOUNT_PER_ITEM * totalQty : 0;
  const customTotal = customSubtotal - customSavings;

  const handleAddCustom = async () => {
    if (!meetsMin) return;
    const lines = balmProducts
      .map((p) => {
        const q = quantities[p.node.handle] ?? 0;
        return q > 0 ? toBundleLine(p, q) : null;
      })
      .filter((l): l is BundleLine => l !== null);
    if (lines.length === 0) return;
    await addBundle(lines);
    setQuantities({});
  };

  const handleAddPreset = async () => {
    const lines = presetProducts
      .map((p) => toBundleLine(p, 1))
      .filter((l): l is BundleLine => l !== null);
    if (lines.length < BUNDLE_MIN_ITEMS) return;
    await addBundle(lines);
  };

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="relative overflow-hidden rounded-lg border border-forest-deep/10 bg-forest-deep text-cream">
        <div className="p-8 md:p-14">
          <span className="eyebrow inline-flex items-center gap-2 text-sage">
            <Sparkles className="h-3.5 w-3.5" /> Build your own bundle
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Mix &amp; <span className="font-script text-sage">Match</span> Bundle
          </h2>
          <p className="mt-4 max-w-xl text-cream/80 leading-relaxed">
            Choose any {BUNDLE_MIN_ITEMS} or more balms you love and automatically save $
            {BUNDLE_DISCOUNT_PER_ITEM.toFixed(2)} on each one. Want two of the same? Just add it
            twice it&apos;s completely up to you.
          </p>

          {/* Selectable balm grid with quantity steppers */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {balmProducts.map((p) => {
              const img = p.node.images.edges[0]?.node;
              const qty = quantities[p.node.handle] ?? 0;
              const isSelected = qty > 0;
              return (
                <div
                  key={p.node.handle}
                  className={`relative flex flex-col items-center gap-3 rounded-md border p-3 text-center transition-colors ${
                    isSelected ? "border-sage bg-cream/10" : "border-cream/15 bg-cream/3"
                  }`}
                >
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText ?? p.node.title}
                      className="h-14 w-14 shrink-0 rounded-sm bg-cream/10 object-contain p-1"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm">{p.node.title}</p>
                    <p className="text-xs text-cream/60">
                      {currency} {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setQty(p.node.handle, qty - 1)}
                      disabled={qty <= 0}
                      aria-label={`Remove one ${p.node.title}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-sage hover:bg-cream/10 disabled:opacity-35"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-6 text-center font-display text-base" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(p.node.handle, qty + 1)}
                      disabled={qty >= MAX_PER_BALM}
                      aria-label={`Add one ${p.node.title}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-sage hover:bg-cream/10 disabled:opacity-35"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary + add */}
          <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {meetsMin ? (
                <p className="text-sm text-cream/70">
                  {totalQty} balms selected
                  <span className="mx-2 text-cream/30">·</span>
                  <span className="text-cream/60 line-through">
                    {currency} {customSubtotal.toFixed(2)}
                  </span>
                  <span className="ml-2 font-display text-lg text-cream">
                    {currency} {customTotal.toFixed(2)}
                  </span>
                  <span className="ml-2 text-xs uppercase tracking-widest text-sage">
                    Save ${customSavings.toFixed(2)}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-cream/60">
                  Add at least {BUNDLE_MIN_ITEMS} balms to unlock $
                  {BUNDLE_DISCOUNT_PER_ITEM.toFixed(2)} off each.
                </p>
              )}
            </div>
            <Button
              onClick={handleAddCustom}
              disabled={isLoading || !meetsMin}
              size="lg"
              className="rounded-full bg-cream px-8 text-forest-deep hover:bg-cream/90 disabled:opacity-40"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add bundle to cart"}
            </Button>
          </div>

          {/* Preset combo quick-pick */}
          {presetProducts.length >= BUNDLE_MIN_ITEMS && (
            <div className="mt-8 flex flex-col gap-4 rounded-md border border-cream/10 bg-cream/3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg">
                  Or grab our <span className="font-script text-sage">Routine</span> Bundle
                </p>
                <p className="mt-1 text-sm text-cream/60">
                  {presetProducts.map((p) => p.node.title).join(" + ")} — save $
                  {BUNDLE_DISCOUNT_AMOUNT.toFixed(2)} on the classic morning &amp; evening pair.
                </p>
              </div>
              <Button
                onClick={handleAddPreset}
                disabled={isLoading}
                variant="outline"
                size="lg"
                className="shrink-0 rounded-full border-cream/40 bg-transparent px-8 text-cream hover:bg-cream/10 hover:text-cream"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add preset bundle"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
