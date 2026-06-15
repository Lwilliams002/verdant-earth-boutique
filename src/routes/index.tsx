import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingBottle } from "@/components/FloatingBottle";
import { Marquee } from "@/components/Marquee";
import { BrandMark } from "@/components/BrandMark";
import { products } from "@/lib/products";
import botanicalBg from "@/assets/botanical-bg.jpg";
import sideVine from "@/assets/plants/side-vine.png";
import { ArrowRight, Leaf, Sprout, Droplet, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earth & Tonic — Rooted in nature. Crafted for wellness." },
      {
        name: "description",
        content:
          "Small-batch herbal tonics and botanical skincare made with organic ingredients. Discover Gut Tonic, Sleep Drops and more from Earth & Tonic.",
      },
      { property: "og:title", content: "Earth & Tonic — Rooted in nature." },
      {
        property: "og:description",
        content: "Organic herbal tonics & botanical skincare, crafted in small batches.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const hero = products[0];
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <Hero hero={hero} />
      <Marquee />
      <Pillars />
      <Collection />
      <Story />
      <Ingredients />
      <Newsletter />
      <SiteFooter />
    </div>
  );
}

function Hero({ hero }: { hero: (typeof products)[number] }) {
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
          <FloatingBottle
            src={hero.image}
            alt={hero.name}
            priority
            className="relative z-10 h-[520px] w-[360px] sm:h-[600px] sm:w-[420px]"
          />

          {/* floating badge */}
          <div className="absolute right-2 top-10 z-20 hidden flex-col items-center rounded-full border border-forest/20 bg-cream/90 p-4 text-center backdrop-blur sm:flex">
            <span className="font-script text-2xl leading-none text-forest-deep">est.</span>
            <span className="eyebrow mt-1 text-moss">2026</span>
          </div>
          <div className="absolute bottom-10 left-2 z-20 hidden max-w-[180px] rounded-2xl border border-forest/15 bg-cream/90 p-5 text-sm backdrop-blur sm:block">
            <div className="eyebrow text-moss">Featured</div>
            <div className="mt-1 font-display text-lg leading-tight text-forest-deep">
              {hero.name}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{hero.tagline}</div>
            <Link
              to="/shop/$slug"
              params={{ slug: hero.slug }}
              className="mt-3 inline-flex items-center gap-1 text-xs tracking-wider text-forest-deep hover:underline"
            >
              SHOP — ${hero.price} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
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
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="grid gap-y-10 md:grid-cols-4 md:gap-x-8">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-start">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-forest/20 text-forest-deep">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-xl text-forest-deep">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Collection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="relative z-10 flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow text-moss">— The collection</span>
          <h2 className="mt-3 font-display text-5xl text-forest-deep md:text-6xl">
            <span className="font-script text-moss">Crafted</span> for daily rituals
          </h2>
        </div>
        <Link to="/shop" className="eyebrow hidden border-b border-forest-deep/40 pb-1 text-forest-deep md:inline">
          View all →
        </Link>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link
            key={p.slug}
            to="/shop/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col"
          >
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-cream-deep">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest/5" />
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
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl text-forest-deep">{p.name}</h3>
              <span className="text-sm text-foreground/70">${p.price}</span>
            </div>
            <p className="mt-1 text-sm italic text-muted-foreground">{p.tagline}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="relative mt-12 overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url(${botanicalBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        mixBlendMode: "overlay",
      }} />
      <img
        src={sideVine}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 top-0 z-0 hidden h-[36rem] w-auto opacity-30 mix-blend-screen md:block"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)" }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10">
        <div>
          <BrandMark className="h-20 w-16 text-cream" />
          <span className="eyebrow mt-8 inline-block text-cream/70">— Our story</span>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Nature has everything we need <span className="font-script italic text-sage">to heal.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-6 text-cream/85">
          <p className="text-lg leading-relaxed">
            Earth &amp; Tonic was born from a simple belief — that the most powerful wellness rituals
            are the ones rooted in the soil. Every tincture, every bar, every jar is formulated with
            traditional herbs and made in small batches so each bottle carries intention.
          </p>
          <p className="text-lg leading-relaxed">
            From our farm partners to your countertop, nothing is rushed. Everything is rooted.
          </p>
          <Link
            to="/about"
            className="mt-4 inline-flex w-fit items-center gap-3 border-b border-cream/40 pb-1 text-sm tracking-[0.2em]"
          >
            READ OUR STORY <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const herbs = [
    { name: "Ginger Root", note: "Soothes the stomach" },
    { name: "Chamomile", note: "Calms the mind" },
    { name: "Lavender", note: "Promotes rest" },
    { name: "Lemon Balm", note: "Eases tension" },
    { name: "Fennel Seed", note: "Reduces bloating" },
    { name: "Dandelion Root", note: "Traditional aid" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow text-moss divider-leaf">Powered by nature</span>
        <h2 className="mt-5 font-display text-5xl text-forest-deep md:text-6xl">
          Six organic herbs.
          <br />
          <span className="font-script text-moss">One quiet ritual.</span>
        </h2>
        <p className="mt-6 text-foreground/70">
          Every formula begins with whole-plant ingredients chosen for what they do — and how
          gently they do it.
        </p>
      </div>
      <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-3">
        {herbs.map((h) => (
          <div key={h.name} className="bg-background p-8">
            <BrandMark className="h-10 w-8 text-moss" />
            <h3 className="mt-4 font-display text-2xl text-forest-deep">{h.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{h.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 text-center">
      <img
        src={sideVine}
        alt=""
        aria-hidden
        loading="lazy"
        className="side-vine pointer-events-none absolute -left-16 top-0 z-0 hidden h-[22rem] w-auto md:block"
      />
      <img
        src={sideVine}
        alt=""
        aria-hidden
        loading="lazy"
        className="side-vine pointer-events-none absolute -right-16 top-0 z-0 hidden h-[22rem] w-auto -scale-x-100 md:block"
      />
      <div className="relative z-10">
      <BrandMark className="mx-auto h-14 w-12 text-forest-deep" />
      <h2 className="mt-6 font-display text-4xl text-forest-deep md:text-5xl">
        Join the <span className="font-script text-moss">rooted</span> circle.
      </h2>
      <p className="mt-4 text-muted-foreground">
        Receive seasonal rituals, early product drops and a little bit of plant wisdom — straight
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
    </section>
  );
}
