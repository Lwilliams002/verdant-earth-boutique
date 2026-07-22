import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingBottle } from "@/components/FloatingBottle";
import { Marquee } from "@/components/Marquee";
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopify";
import botanicalBg from "@/assets/botanical-bg.jpg";
import sideVine from "@/assets/plants/side-vine.png";
import sectionLeaves from "@/assets/section-leaves.png";
import collectionHerbs from "@/assets/collection-herbs.png";
import plantSprig from "@/assets/plant-sprig.png";
import plantPattern from "@/assets/plant-pattern.jpeg";
import productEarthCollection from "@/assets/product-earth-balm-collection.png";
import productDuoBoxed from "@/assets/product-duo-boxed.png";
import founderStory from "@/assets/founder-story.png";
import { BundleCTA } from "@/components/BundleCTA";
import { COMING_SOON } from "@/lib/productMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArrowRight, Leaf, Sprout, Droplet, HeartHandshake, Flower, TreePine, Sun, HandHeart } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earth & Tonic — Rooted in nature. Crafted for wellness." },
      {
        name: "description",
        content:
          "Small-batch herbal tonics and botanical skincare made with organic ingredients. Discover Earth & Tonic's organic balms and tonics.",
      },
      { property: "og:title", content: "Earth & Tonic — Rooted in nature." },
      {
        property: "og:description",
        content: "Organic herbal tonics & botanical skincare, crafted in small batches.",
      },
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
  component: Home,
});

function Home() {
  const { data: products } = useSuspenseQuery({
    queryKey: ["shopify-products"],
    queryFn: () => fetchShopifyProducts(),
  });
  const hero = products?.[0]?.node;
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <Hero hero={hero} />
      <Marquee />
      <Pillars />
        <Collection products={products ?? []} />
        <BundleCTA products={products ?? []} />
      <Story />
      <Ingredients />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Hero({ hero }: { hero?: ShopifyProduct["node"] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: `url(${botanicalBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/40 to-background" />

      <img
        src={sideVine}
        alt=""
        aria-hidden
        loading="lazy"
        className="side-vine animate-sway-slow pointer-events-none absolute -left-10 -top-6 z-0 hidden h-[34rem] w-auto md:block"
      />
      <img
        src={sideVine}
        alt=""
        aria-hidden
        loading="lazy"
        className="side-vine animate-sway-reverse pointer-events-none absolute -right-12 top-[22rem] z-0 hidden h-[28rem] w-auto -scale-x-100 md:block"
      />




      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="flex flex-col justify-center">
          <span className="eyebrow text-moss">— Est. 2026 · Small batch wellness</span>
          <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-forest-deep">
            Back to the
            <br />
            <span className="font-script text-[1.15em] text-moss">root of </span>
            wellness.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/75">
            Herbal tonics and botanical skincare crafted in small batches with organic ingredients —
            for everyday rituals that feel grounded, gentle and good.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-forest-deep px-7 py-4 text-sm tracking-[0.2em] text-cream transition-colors hover:bg-forest"
            >
              SHOP THE COLLECTION
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="eyebrow border-b border-forest-deep/40 pb-1 text-forest-deep hover:border-forest-deep"
            >
              Our story
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs tracking-[0.18em] text-muted-foreground">
            <span className="flex items-center gap-2"><Leaf className="h-3.5 w-3.5" /> ORGANIC HERBS</span>
            <span className="flex items-center gap-2"><Droplet className="h-3.5 w-3.5" /> NO SEED OILS</span>
            <span className="flex items-center gap-2"><Sprout className="h-3.5 w-3.5" /> SMALL BATCH</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Big circle behind bottle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="aspect-square w-[88%] rounded-full border border-forest/15" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="aspect-square w-[70%] rounded-full bg-forest-deep/8 blur-2xl" />
          </div>

          {/* Floating product */}
          {hero && (
            <FloatingBottle
              src={hero.images.edges[0]?.node?.url}
              alt={hero.images.edges[0]?.node?.altText ?? hero.title}
              priority
              className="relative z-10 h-[520px] w-[360px] sm:h-[600px] sm:w-[420px]"
            />
          )}

          {/* floating badge */}
          <div className="absolute right-2 top-10 z-20 hidden flex-col items-center rounded-full border border-forest/20 bg-cream/90 p-4 text-center backdrop-blur sm:flex">
            <span className="font-script text-2xl leading-none text-forest-deep">est.</span>
            <span className="eyebrow mt-1 text-moss">2026</span>
          </div>
          {hero && (
            <div className="absolute bottom-10 left-2 z-20 hidden max-w-[180px] rounded-2xl border border-forest/15 bg-cream/90 p-5 text-sm backdrop-blur sm:block">
              <div className="eyebrow text-moss">Featured</div>
              <div className="mt-1 font-display text-lg leading-tight text-forest-deep">
                {hero.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{hero.description}</div>
              <Link
                to="/shop/$slug"
                params={{ slug: hero.handle }}
                className="mt-3 inline-flex items-center gap-1 text-xs tracking-wider text-forest-deep hover:underline"
              >
                SHOP — {hero.priceRange.minVariantPrice.currencyCode} {parseFloat(hero.priceRange.minVariantPrice.amount).toFixed(0)}{" "}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Mobile hero CTA — appears directly under the bottle */}
          {hero && (
            <Link
              to="/shop/$slug"
              params={{ slug: hero.handle }}
              className="group absolute inset-x-6 bottom-2 z-20 inline-flex items-center justify-center gap-3 rounded-full bg-forest-deep px-6 py-3.5 text-xs tracking-[0.2em] text-cream shadow-lg transition-colors hover:bg-forest sm:hidden"
            >
              SHOP {hero.title.toUpperCase()} — {hero.priceRange.minVariantPrice.currencyCode} {parseFloat(hero.priceRange.minVariantPrice.amount).toFixed(0)}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { icon: Leaf, title: "Plant Powered", desc: "Whole-plant extracts from organic farms." },
    { icon: Sprout, title: "Rooted in Nature", desc: "Traditional herbs, modern formulation." },
    { icon: Droplet, title: "Clean Ingredients", desc: "Never any seed oils or synthetics." },
    { icon: HeartHandshake, title: "Crafted with Care", desc: "Small batch, made by hand." },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <img
        src={sectionLeaves}
        alt=""
        aria-hidden
        loading="lazy"
        className="section-leaves pointer-events-none absolute -top-10 left-0 right-0 z-0 h-56 w-full object-cover object-top md:h-80"
      />
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
        {items.map(({ icon: Icon, title }) => (
          <div key={title} className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-forest/20 text-forest-deep">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl text-forest-deep">{title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function Collection({ products }: { products: ShopifyProduct[] }) {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <img
        src={collectionHerbs}
        alt=""
        aria-hidden
        loading="lazy"
        className="collection-herbs pointer-events-none absolute -top-10 left-0 right-0 z-0 h-36 w-full object-cover object-top md:h-52"
      />
      <div className="relative z-10 flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow text-moss">— The collection</span>
          <h2 className="mt-3 font-display text-5xl text-forest-deep md:text-6xl">
            <span className="font-script text-moss">Crafted</span> for daily routines
          </h2>
        </div>
        <Link to="/shop" className="eyebrow hidden border-b border-forest-deep/40 pb-1 text-forest-deep md:inline">
          View all →
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4 lg:gap-10">
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest/5" />
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
                <span className="absolute left-4 top-4 eyebrow text-moss">{node.productType || "Product"}</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-5 sm:gap-4">
                <h3 className="font-display text-lg text-forest-deep sm:text-2xl">{node.title}</h3>
                <span className="text-xs text-foreground/70 sm:text-sm">
                  {price.currencyCode} {parseFloat(price.amount).toFixed(0)}
                </span>
              </div>
              <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm line-clamp-2">{node.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Coming soon — hidden until launch
      <div className="relative z-10 mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-moss">— In the works</span>
            <h3 className="mt-3 font-display text-4xl text-forest-deep md:text-5xl">
              <span className="font-script text-moss">Coming</span> soon
            </h3>
            <p className="mt-3 max-w-lg text-sm text-foreground/70">
              New tonics and skincare joining the shelf. Sign up below to be first to know when they launch.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4 lg:gap-10">
          {COMING_SOON.map((p) => (
            <div key={p.slug} className="group flex flex-col opacity-90">
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="bottle-shadow h-[80%] w-auto object-contain grayscale-[35%] transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 eyebrow text-moss">{p.category}</span>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-forest-deep/85 py-2 text-cream">
                  <span className="eyebrow text-[10px] tracking-[0.25em]">Coming soon</span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2 sm:mt-5 sm:gap-4">
                <h4 className="font-display text-lg text-forest-deep sm:text-2xl">{p.name}</h4>
                <span className="text-xs text-foreground/70 sm:text-sm">${p.price}</span>
              </div>
              <p className="mt-1 text-xs italic text-muted-foreground sm:text-sm">{p.tagline}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-sm border border-forest-deep/10 bg-cream-deep/50 p-8 md:p-12">
          <NewsletterSignup
            variant="light"
            heading="Be first in line"
            description="Sign up to get early access when these tonics and skincare launch."
            className="mx-auto max-w-xl text-center [&_form]:justify-center"
          />
        </div>
      </div>
      */}
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative mt-12 overflow-hidden bg-forest-deep text-cream">
      <div
        className="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage: `url(${plantPattern})`,
          backgroundSize: "420px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -left-10 top-12 z-[1] h-[26rem] w-auto opacity-60 mix-blend-screen md:-left-4 md:h-[34rem]"
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 bottom-12 z-[1] h-[26rem] w-auto -scale-x-100 opacity-60 mix-blend-screen md:-right-4 md:h-[34rem]"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-10 lg:py-32">
        {/* Founder photo */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-3 rounded-sm bg-cream/8 blur-xl" />
          <div className="relative overflow-hidden rounded-sm border-4 border-cream/90 bg-cream p-2 shadow-2xl">
            <img
              src={founderStory}
              alt="Pamela, founder of Earth & Tonic, holding Earth Balm and Moon Balm"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 z-20 hidden rounded-full border border-cream/30 bg-forest-deep/90 px-5 py-3 text-center backdrop-blur lg:block">
            <span className="font-script text-2xl leading-none text-sage">Pamela</span>
            <span className="block text-[10px] tracking-[0.2em] text-cream/70">FOUNDER</span>
          </div>
        </div>

        {/* Story text */}
        <div className="text-center lg:text-left">
          <span className="eyebrow inline-block text-cream/70">Our story</span>
          <h2 className="mt-4 story-script-heading text-5xl leading-tight md:text-6xl">
            Why I started
          </h2>

          <div className="mx-auto mt-10 max-w-xl space-y-5 text-base leading-[1.85] text-cream/85 lg:mx-0">
            <p>
              Earth &amp; Tonic started during my own health journey after being diagnosed with PCOS. I wanted to better understand my body, so I began researching herbs and natural ingredients to support my overall wellness. What started as a personal passion quickly turned into something I genuinely loved.
            </p>
            <p>
              I also realized how many everyday products are filled with unnecessary synthetic ingredients. That inspired me to create products made with clean, thoughtfully chosen ingredients because I truly believe we don't always need all the extra additives to care for our bodies.
            </p>
            <p>
              Thank you for being here and supporting my small business. It truly means the world to me.
            </p>
          </div>

          <div className="mt-10">
            <p className="font-script text-2xl text-sage">— Pamela</p>
            <p className="mt-2 text-sm tracking-[0.15em] text-cream/60">FOUNDER, EARTH &amp; TONIC</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const products = [
    {
      image: productEarthCollection,
      name: "Earth Balm",
      tagline: "Botanical Skin Balm",
      copy:
        "A grounding everyday balm crafted with calendula and chamomile-infused oils to soothe, soften and restore skin that needs a little extra care.",
      ingredients: [
        "Calendula Infused Oil",
        "Chamomile Infused Oil",
        "Jojoba Oil",
        "Beeswax",
        "Organic Arrowroot",
      ],
      slug: "earth-balm-botanical-skin-balm-2oz",
    },
    {
      image: productDuoBoxed,
      name: "The Duo",
      tagline: "Earth Balm + Moon Balm",
      copy:
        "Two balms, one routine. Earth Balm to ground your mornings and Moon Balm — infused with lavender — to soften the wind-down into evening.",
      ingredients: [
        "Lavender Infused Oil",
        "Chamomile Infused Oil",
        "Calendula Infused Oil",
        "Jojoba Oil",
        "Beeswax",
        "Organic Arrowroot",
      ],
      slug: "shop",
    },
  ];

  const standards = [
    { icon: Leaf, label: "Certified Organic", detail: "Grown without pesticides or synthetic fertilisers" },
    { icon: Droplet, label: "Infused, Not Isolated", detail: "Whole botanicals steeped into every oil" },
    { icon: HandHeart, label: "Small-Batch Crafted", detail: "Handmade in limited quantities for freshness" },
    { icon: Sprout, label: "Clean Ingredients", detail: "Only clean carrier oils and botanical bases" },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.07]"
        style={{
          backgroundImage: `url(${plantPattern})`,
          backgroundSize: "360px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -left-8 top-16 z-0 hidden h-[28rem] w-auto opacity-40 md:block"
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-8 bottom-16 z-0 hidden h-[28rem] w-auto -scale-x-100 opacity-40 md:block"
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="eyebrow text-moss divider-leaf">Powered by nature</span>
        <h2 className="mt-5 font-display text-5xl text-forest-deep md:text-6xl">
          What goes in
          <br />
          <span className="font-script text-moss">matters.</span>
        </h2>
        <p className="mt-6 leading-relaxed text-foreground/70">
          Every balm is built from a short list of whole-plant ingredients — chosen for what they
          do, and how gently they do it. No isolates, no synthetics, no shortcuts.
        </p>
      </div>

      {/* Product showcases */}
      <div className="relative z-10 mt-20 space-y-24">
        {products.map((p, i) => (
          <div
            key={p.name}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-sage/20 to-cream/40 blur-2xl" />
              <img
                src={p.image}
                alt={`${p.name} — ${p.tagline}`}
                loading="lazy"
                className="w-full rounded-[1.5rem] object-cover shadow-xl"
              />
            </div>
            <div>
              <span className="eyebrow text-moss">{p.tagline}</span>
              <h3 className="mt-3 font-display text-4xl text-forest-deep md:text-5xl">
                {p.name}
              </h3>
              <p className="mt-5 leading-relaxed text-foreground/75">{p.copy}</p>

              <div className="mt-8">
                <p className="text-xs font-medium tracking-[0.2em] text-forest-deep/70">
                  MADE WITH
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-forest/20 bg-card/60 px-3 py-1.5 text-xs tracking-wide text-foreground/80"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={p.slug === "shop" ? "/shop" : "/shop/$slug"}
                params={p.slug === "shop" ? undefined : { slug: p.slug }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-forest-deep underline-offset-4 hover:underline"
              >
                {p.slug === "shop" ? "Shop the duo" : `Shop ${p.name}`}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Standards Row */}
      <div className="relative z-10 mx-auto mt-24 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {standards.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 text-forest-deep">
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm font-medium tracking-wide text-forest-deep">{label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${plantPattern})`,
          backgroundSize: "320px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -left-20 top-0 z-0 hidden h-[24rem] w-auto opacity-60 md:block"
      />
      <img
        src={plantSprig}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-20 top-0 z-0 hidden h-[24rem] w-auto -scale-x-100 opacity-60 md:block"
      />
      <div className="relative z-10">
      <h2 className="font-display text-4xl text-forest-deep md:text-5xl">
        Join the <span className="font-script text-moss">rooted</span> circle.
      </h2>
      <p className="mt-4 text-muted-foreground">
        Receive seasonal routines, early product drops and a little bit of plant wisdom — straight
        to your inbox.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5"
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button className="rounded-full bg-forest-deep px-5 py-2 text-xs tracking-[0.2em] text-cream hover:bg-forest">
          JOIN
        </button>
      </form>
      </div>
    </section>
  );
}
