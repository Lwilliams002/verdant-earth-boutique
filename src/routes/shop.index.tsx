import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchShopifyProducts } from "@/lib/shopify";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Earth & Tonic" },
      { name: "description", content: "Shop organic herbal tonics and botanical skincare from Earth & Tonic." },
      { property: "og:title", content: "Shop Earth & Tonic" },
      { property: "og:description", content: "Browse Earth & Tonic's small-batch botanical products made with organic herbs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["shopify-products"],
      queryFn: () => fetchShopifyProducts(),
    });
  },
  component: ShopPage,
});

function ShopPage() {
  const { data: products, isLoading } = useSuspenseQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchShopifyProducts(),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-moss">The Apothecary</span>
          <h1 className="mt-4 font-display text-6xl text-forest-deep">
            <span className="font-script text-moss">All</span> products
          </h1>
          <p className="mt-5 text-foreground/70">
            Small-batch tonics and botanical skincare, made with organic ingredients.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3 lg:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[3/4] w-full rounded-sm" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3 lg:gap-10">
            {products.map((p) => {
              const node = p.node;
              const image = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;
              return (
                <Link
                  key={node.handle}
                  to="/shop/$slug"
                  params={{ slug: node.handle }}
                  className="group flex flex-col"
                >
                  <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
                    {image ? (
                      <img
                        src={image.url}
                        alt={image.altText ?? node.title}
                        loading="lazy"
                        width={420}
                        height={560}
                        className="bottle-shadow h-[88%] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-[88%] w-full bg-muted" />
                    )}
                    <span className="absolute left-4 top-4 eyebrow text-moss">
                      {node.productType || "Product"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-5 sm:gap-4">
                    <h3 className="font-display text-lg text-forest-deep sm:text-2xl">{node.title}</h3>
                    <span className="text-xs text-foreground/70 sm:text-sm">
                      {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm line-clamp-2">
                    {node.description || node.vendor}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 text-center">
            <p className="text-muted-foreground">No products found in your Shopify store.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell me what product you want to add and I can create it for you.
            </p>
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
