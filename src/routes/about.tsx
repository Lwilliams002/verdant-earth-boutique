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
          <span className="eyebrow inline-block text-cream/70">— Our story</span>
          <h2 className="mt-4 story-script-heading text-5xl leading-tight md:text-6xl">
            Why I started
          </h2>

          <div className="mx-auto mt-14 max-w-2xl space-y-6 text-center text-base leading-[1.85] text-cream/85">
            <p>
              My journey began in my grandmother's kitchen, where mason jars of dried herbs lined the windowsill — chamomile, ginger, lavender — gathered from her garden and used with quiet confidence. She never called it holistic. She just called it living.
            </p>
            <p>
              Years later, I stood in aisle after aisle of products wrapped in promises of "natural" that felt anything but. I was tired of compromises and ingredients I couldn't pronounce. I kept thinking about those jars, and I started making my own remedies in that same spirit.
            </p>
            <p>
              What began as small batches for family and friends slowly became something bigger. Earth &amp; Tonic grew from a simple desire: to create products as honest and purposeful as the ones my grandmother made, using organic herbs from farms I trust, handled with intention, and free from seed oils, synthetic fragrances, or fillers.
            </p>
            <p>
              This isn't a brand built on buzzwords. It is a return to what we have always known — that nature, handled with respect, holds everything we need.
            </p>
            <p>
              Every formula we craft is rooted in that kitchen-table tradition. We choose whole-plant extracts because isolates miss the symphony. We partner with small organic farms because patience grows better medicine. We make everything by hand in small batches because freshness matters, and because there is something sacred about slowing down.
            </p>
            <p>
              My grandmother never measured her legacy in jars. She measured it in the quiet trust of the people she cared for. That is the spirit behind every bottle that leaves our studio — not perfection, but presence. Not hype, but honesty.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-xl border border-cream/30 px-8 py-8">
            <p className="font-display text-sm tracking-[0.2em]">THIS ISN'T JUST A BUSINESS.</p>
            <p className="mt-3 text-cream/85 leading-relaxed">A return to simple ingredients, chosen with care.</p>
            <p className="text-cream/85 leading-relaxed">A return to tradition, rooted in trust.</p>
            <p className="text-cream/85 leading-relaxed">A return to nature — where wellness began.</p>
          </div>

          <div className="mt-14">
            <p className="font-script text-2xl text-sage">Thank you for being part of this journey.</p>
            <p className="mt-5 font-script text-xl text-sage">With gratitude,</p>
            <p className="mt-2 font-display text-lg tracking-[0.15em]">PAMELA ESPINOZA</p>
            <p className="mt-1 text-sm tracking-[0.15em] text-cream/60">FOUNDER, EARTH &amp; TONIC</p>
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
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-forest-deep/20" />

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
                  <div className="flex items-center gap-6 md:gap-0">
                    {/* content */}
                    <div className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:order-3 md:pl-12 md:text-left"}`}>
                      <span className="font-script text-3xl text-moss">{m.year}</span>
                      <h3 className="mt-1 font-display text-xl text-forest-deep">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-forest-deep/70">{m.desc}</p>
                    </div>

                    {/* node */}
                    <div className="relative z-10 flex w-8 shrink-0 justify-center md:order-2 md:w-auto">
                      <div className="h-3 w-3 rounded-full border-2 border-forest-deep bg-background" />
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
