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
import { Check, Loader2, Sparkles } from "lucide-react";

type BundleLine = {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
};

function toBundleLine(p: ShopifyProduct): BundleLine | null {
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
}

export function BundleCTA({ products }: { products: ShopifyProduct[] }) {
  const { addBundle, isLoading } = useCartStore();
  const [selected, setSelected] = useState<string[]>([]);

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

  const toggle = (handle: string) => {
    setSelected((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  };

  const selectedProducts = balmProducts.filter((p) => selected.includes(p.node.handle));
  const selectedCount = selectedProducts.length;
  const meetsMin = selectedCount >= BUNDLE_MIN_ITEMS;

  const customSubtotal = selectedProducts.reduce(
    (sum, p) => sum + parseFloat(p.node.priceRange.minVariantPrice.amount),
    0
  );
  const customSavings = meetsMin ? BUNDLE_DISCOUNT_PER_ITEM * selectedCount : 0;
  const customTotal = customSubtotal - customSavings;

  const addLines = async (items: ShopifyProduct[]) => {
    const lines = items.map(toBundleLine).filter((l): l is BundleLine => l !== null);
    if (lines.length < BUNDLE_MIN_ITEMS) return;
    await addBundle(lines);
  };

  const handleAddCustom = async () => {
    if (!meetsMin) return;
    await addLines(selectedProducts);
    setSelected([]);
  };

  const handleAddPreset = () => addLines(presetProducts);

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
            {BUNDLE_DISCOUNT_PER_ITEM.toFixed(2)} on each one. Peppermint + Earth, Sweet Lemon +
            Moon it&apos;s completely up to you.
          </p>

          {/* Selectable balm grid */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {balmProducts.map((p) => {
              const img = p.node.images.edges[0]?.node;
              const isSelected = selected.includes(p.node.handle);
              return (
                <button
                  key={p.node.handle}
                  type="button"
                  onClick={() => toggle(p.node.handle)}
                  aria-pressed={isSelected}
                  className={`group relative flex items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-sage bg-cream/10"
                      : "border-cream/15 bg-cream/3 hover:border-cream/40"
                  }`}
                >
                  <span
                    className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-sage bg-sage text-forest-deep"
                        : "border-cream/30 text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {img && (
                    <img
                      src={img.url}
                      alt={img.altText ?? p.node.title}
                      className="h-14 w-14 shrink-0 rounded-sm bg-cream/10 object-contain p-1"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-display text-sm">{p.node.title}</span>
                    <span className="block text-xs text-cream/60">
                      {currency} {parseFloat(p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Summary + add */}
          <div className="mt-8 flex flex-col gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {meetsMin ? (
                <p className="text-sm text-cream/70">
                  {selectedCount} balms selected
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
                  Select at least {BUNDLE_MIN_ITEMS} balms to unlock $
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
