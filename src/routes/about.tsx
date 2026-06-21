import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandMark } from "@/components/BrandMark";
import botanicalBgAsset from "@/assets/botanical-bg.jpg.asset.json";
const botanicalBg = botanicalBgAsset.url;

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
    <div className="min-h-screen bg-background">
      <SiteHeader />

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

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <p className="font-display text-2xl leading-relaxed text-forest-deep">
          Earth &amp; Tonic began with a simple question: what if the most powerful daily rituals
          were the ones already growing in the ground beneath us?
        </p>
        <div className="mt-10 space-y-6 text-foreground/80">
          <p>
            We started this studio out of a love for traditional herbalism and a frustration
            with shelves of "wellness" products full of fillers, seed oils and synthetics. Every
            Earth &amp; Tonic formula is small batch, made by hand and rooted in plants — never
            in marketing.
          </p>
          <p>
            We work directly with organic farmers, choose whole-plant extracts over isolates, and
            test every batch ourselves. Nothing is rushed; everything is intentional.
          </p>
          <p className="font-script text-3xl text-moss">
            Nature has everything we need to heal.
          </p>
        </div>
      </section>

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
