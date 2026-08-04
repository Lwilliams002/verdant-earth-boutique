import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Marquee } from "@/components/Marquee";
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopify";
import productEarthCollection from "@/assets/product-earth-balm-collection.png";
import productDuoBoxed from "@/assets/product-duo-boxed.jpg";
import founderStory from "@/assets/founder-story.png";
import { BundleCTA } from "@/components/BundleCTA";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earth & Tonic Botanical Wellness" },
      {
        name: "description",
        content:
          "Small batch botanical balms and herbal wellness. Clean, thoughtful ingredients crafted for everyday routines.",
      },
      { property: "og:title", content: "Earth & Tonic Botanical Wellness" },
      {
        property: "og:description",
        content: "Clean botanical balms and herbal wellness, crafted in small batches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["shopify-products"],
      queryFn: () => fetchShopifyProducts(),
    });
  },
  component: Home,
});

function Home() {
  const { data: products } = useSuspenseQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchShopifyProducts(),
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero products={products ?? []} />
      <Marquee />
      <EditorialSplit />
      <Collection products={products ?? []} />
      <BundleCTA products={products ?? []} />
      <StoryTeaser />
      <ValuesBand />
      <SiteFooter />
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */

function Hero({ products }: { products: ShopifyProduct[] }) {
  const hero = products?.[0]?.node;
  const heroImg = hero?.images.edges[0]?.node;

  return (
    <section className="relative border-b border-border">
      <div className="grid min-h-[78vh] grid-cols-1 lg:grid-cols-2">
        {/* Copy */}
        <div className="order-2 flex flex-col justify-center px-6 py-16 lg:order-1 lg:px-16 lg:py-24">
          <span className="eyebrow text-foreground/60">Now Available</span>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-tight text-foreground">
            The Botanical<br />
            <span className="italic text-foreground/80">Balm Collection</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/70">
            Thoughtfully crafted balms made with herb infused oils and clean ingredients for your everyday routine
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-foreground px-9 py-4 text-[11px] tracking-[0.32em] text-background transition-colors hover:bg-foreground/85"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              SHOP NOW
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="eyebrow border-b border-foreground/40 pb-1 text-foreground hover:border-foreground"
            >
              Our story
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 relative overflow-hidden bg-[color:var(--cream-deep)] lg:order-2">
          {heroImg ? (
            <img
              src={heroImg.url}
              alt={heroImg.altText ?? hero?.title ?? "Earth & Tonic"}
              className="h-full min-h-[60vh] w-full object-contain px-10 py-12 lg:min-h-[78vh]"
            />
          ) : (
            <img
              src={productEarthCollection}
              alt="Earth & Tonic balm collection"
              className="h-full min-h-[60vh] w-full object-contain px-10 py-12 lg:min-h-[78vh]"
            />
          )}
          {hero && (
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground">
              <div className="max-w-xs">
                <div className="eyebrow text-foreground/55">Featured</div>
                <div className="mt-1 font-display text-2xl">{hero.title}</div>
              </div>
              <Link
                to="/shop/$slug"
                params={{ slug: hero.handle }}
                className="eyebrow hover-underline"
              >
                {hero.priceRange.minVariantPrice.currencyCode}{" "}
                {parseFloat(hero.priceRange.minVariantPrice.amount).toFixed(0)}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- EDITORIAL SPLIT --------------------------- */

function EditorialSplit() {
  return (
    <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 px-0 py-0 md:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--cream-deep)]">
        <img
          src={productDuoBoxed}
          alt="Earth Balm and Moon Balm duo"
          loading="lazy"
          className="h-full w-full object-contain px-8 py-10"
        />
      </div>
      <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
        <span className="eyebrow text-foreground/60">Introducing</span>
        <h2 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
          The <span className="italic">Routine</span> Duo
        </h2>
        <p className="mt-6 max-w-md text-foreground/70">
          Earth Balm and Moon Balm. Your daily skincare essentials, thoughtfully
          crafted with clean ingredients
        </p>
        <div className="mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-[11px] tracking-[0.32em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            SHOP THE DUO <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ COLLECTION ------------------------------ */

function Collection({ products }: { products: ShopifyProduct[] }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-20 pt-24 lg:px-10">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow text-foreground/60">Shop</span>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            The <span className="italic">Collection</span>
          </h2>
        </div>
        <Link to="/shop" className="eyebrow hidden hover-underline sm:inline-flex">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
        {products.slice(0, 8).map((p) => {
          const node = p.node;
          const image = node.images.edges[0]?.node;
          const hover = node.images.edges[1]?.node ?? image;
          const price = node.priceRange.minVariantPrice;
          return (
            <Link
              key={node.handle}
              to="/shop/$slug"
              params={{ slug: node.handle }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--cream-deep)]">
                {image && (
                  <img
                    src={image.url}
                    alt={image.altText ?? node.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-500 group-hover:opacity-0"
                  />
                )}
                {hover && (
                  <img
                    src={hover.url}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    {node.title}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/55">
                    {node.productType || "Botanical balm"}
                  </p>
                </div>
                <span className="text-sm text-foreground/70">
                  ${parseFloat(price.amount).toFixed(0)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ STORY TEASER ------------------------------ */

function StoryTeaser() {
  return (
    <section className="border-y border-border bg-[color:var(--cream-deep)]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-stretch gap-0 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-auto">
          <img
            src={founderStory}
            alt="Pamela, founder of Earth & Tonic"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 lg:px-20 lg:py-24">
          <span className="eyebrow text-foreground/60">Our Story</span>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            <span className="italic">Why</span> I started
          </h2>
          <div className="mt-8 space-y-5 text-foreground/75 leading-relaxed">
            <p>
              Earth &amp; Tonic started during my own health journey after being diagnosed with PCOS.
              I began researching herbs and natural ingredients to better understand my body, and what
              started as a personal passion quickly turned into something I genuinely loved.
            </p>
            <p>
              I create products with clean, thoughtfully chosen ingredients because I truly believe
              we don't always need all the extra additives to care for our bodies.
            </p>
          </div>
          <div className="mt-10">
            <p className="font-display text-2xl italic text-foreground">Pamela</p>
            <p className="mt-2 eyebrow text-foreground/55">FOUNDER, EARTH &amp; TONIC</p>
          </div>
          <div className="mt-10">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-[11px] tracking-[0.32em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              READ MORE <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ VALUES BAND ------------------------------ */

function ValuesBand() {
  const values = [
    { t: "Small Batch", d: "Handcrafted in small quantities." },
    { t: "Clean Ingredients", d: "Organic, thoughtfully sourced." },
    { t: "QUALITY FIRST", d: "Made with ingredients you can trust\u00a0" },
    { t: "Made with Care", d: "Formulated by our founder." },
  ];
  return (
    <section className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 px-6 py-20 md:grid-cols-4 lg:px-10">
      {values.map((v) => (
        <div key={v.t} className="text-center">
          <h3 className="eyebrow text-foreground">{v.t}</h3>
          <p className="mt-3 text-sm text-foreground/60">{v.d}</p>
        </div>
      ))}
    </section>
  );
}
