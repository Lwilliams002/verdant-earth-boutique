import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandMark } from "@/components/BrandMark";
import botanicalBg from "@/assets/botanical-bg.jpg";
import plantPattern from "@/assets/plant-pattern.jpeg";
import plantSprig from "@/assets/plant-sprig.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Earth & Tonic" },
      { name: "description", content: "Earth & Tonic is a small-batch wellness studio rooted in nature, crafting herbal tonics and botanical skincare with intention." },
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
          <BrandMark className="mx-auto h-16 w-14 text-forest-deep" />
          <span className="eyebrow mt-8 inline-block text-moss">— Our story</span>
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
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center lg:px-10">
          <span className="eyebrow inline-block text-cream/70">Our story</span>
          <h2 className="mt-4 story-script-heading text-5xl leading-tight md:text-6xl">
            Why I started
          </h2>

          <div className="mx-auto mt-14 max-w-2xl space-y-6 text-center text-base leading-[1.85] text-cream/85">
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

          <div className="mt-14">
            <p className="font-script text-2xl text-sage">— Pamela</p>
            <p className="mt-2 text-sm tracking-[0.15em] text-cream/60">FOUNDER, EARTH &amp; TONIC</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="eyebrow inline-block text-moss">— The journey</span>
            <h2 className="mt-4 font-display text-4xl text-forest-deep md:text-5xl">
              From kitchen table to today
            </h2>
          </div>

          <div className="relative mt-16">
            {/* vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-forest-deep/20 md:left-1/2 md:-translate-x-1/2" />

            {[
              {
                year: "2016",
                title: "The first batch",
                desc: "Small remedies made for family and friends, inspired by my grandmother’s kitchen tradition.",
              },
              {
                year: "2018",
                title: "Earth & Tonic is born",
                desc: "A quiet launch from a home studio, built on honesty, whole plants, and patience.",
              },
              {
                year: "2020",
                title: "Farm partnerships",
                desc: "Began working directly with small organic herb farms we still source from today.",
              },
              {
                year: "2023",
                title: "Expanded offerings",
                desc: "Added botanical skincare and seasonal collections, always small-batch and seed-oil free.",
              },
              {
                year: "Today",
                title: "A growing community",
                desc: "Shipping nationwide to customers who believe wellness should feel as good as it works.",
              },
            ].map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={m.year} className="relative mb-12 last:mb-0">
                  <div className="flex items-start md:items-center">
                    {/* node */}
                    <div className="relative z-10 flex w-8 shrink-0 justify-center pt-3 md:order-2 md:w-auto md:pt-0">
                      <div className="h-3 w-3 rounded-full border-2 border-forest-deep bg-background" />
                    </div>

                    {/* content */}
                    <div
                      className={`min-w-0 flex-1 pl-4 text-left md:flex-none md:pl-0 md:w-1/2 ${
                        isLeft ? "md:order-1 md:pr-12 md:text-right" : "md:order-3 md:pl-12 md:text-left"
                      }`}
                    >
                      <span className="font-script text-3xl text-moss">{m.year}</span>
                      <h3 className="mt-1 font-display text-xl text-forest-deep">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-forest-deep/70">{m.desc}</p>
                    </div>

                    {/* spacer for alternating layout */}
                    <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:order-3" : "md:order-1"}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-forest-deep py-24 text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          {[
            { n: "01", t: "Source", d: "Organic herbs from farm partners we know by name." },
            { n: "02", t: "Craft", d: "Slow-extracted, small-batch and tested by hand." },
            { n: "03", t: "Share", d: "Bottled with intention, shipped to your countertop." },
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
