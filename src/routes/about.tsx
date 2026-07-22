import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import botanicalBg from "@/assets/botanical-bg.jpg";
import plantPattern from "@/assets/plant-pattern.jpeg";
import plantSprig from "@/assets/plant-sprig.png";
import founderStory from "@/assets/founder-story.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Earth & Tonic" },
      { name: "description", content: "Earth & Tonic is a small-batch wellness studio rooted in nature, crafting herbal tonics and botanical skincare with intention." },
      { property: "og:title", content: "Our Story — Earth & Tonic" },
      { property: "og:description", content: "The founder story behind Earth & Tonic, clean ingredients, and small-batch botanical wellness." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40" style={{ backgroundImage: `url(${botanicalBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 to-background" />
        <div className="mx-auto max-w-4xl px-6 py-28 text-center lg:py-36">
          <span className="eyebrow inline-block text-moss">— Our story</span>
          <h1 className="mt-4 font-display text-6xl leading-tight text-forest-deep md:text-7xl">
            Rooted in nature.
            <br />
            <span className="font-script text-moss">Crafted for wellness.</span>
          </h1>
        </div>
      </section>

      {/* Story — matches homepage Why I Started */}
      <section className="relative overflow-hidden bg-forest-deep text-cream">
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
                src={founderStory.url}
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

      {/* Process */}
      <section className="bg-forest-deep py-24 text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          {[
            { n: "01", t: "Source", d: "We carefully choose every ingredient because what goes into our products matter" },
            { n: "02", t: "Craft", d: "Every batch is handcrafted in small quantities" },
            { n: "03", t: "Share", d: "Created to become part of your everyday routine" },
          ].map((s) => (
            <div key={s.n}>
              <span className="font-script text-5xl text-sage">{s.n}</span>
              <h3 className="mt-3 font-display text-3xl">{s.t}</h3>
              <p className="mt-3 text-cream/80">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
