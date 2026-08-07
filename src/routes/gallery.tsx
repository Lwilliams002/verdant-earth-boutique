import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import galleryKitchen from "@/assets/gallery-kitchen.jpg";
import galleryMoonBalm from "@/assets/gallery-moon-balm.png";
import galleryEarthBalm from "@/assets/gallery-earth-balm.png";
import galleryFounderDuo from "@/assets/gallery-founder-duo.jpg";
import galleryMoonBalmLifestyle from "@/assets/gallery-moon-balm-lifestyle.jpg";
import galleryMoonBalmPortrait from "@/assets/gallery-moon-balm-portrait.jpg";
import galleryMoonBalmBlanket from "@/assets/gallery-moon-balm-blanket.jpg";
import galleryNewImage from "@/assets/gallery-new-image.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery Earth & Tonic" },
      { name: "description", content: "A behind the scenes look at Earth & Tonic. Small batch balms, handcrafted with clean botanical ingredients." },
      { property: "og:title", content: "Gallery Earth & Tonic" },
      { property: "og:description", content: "Behind the scenes moments from the Earth & Tonic studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: galleryKitchen, alt: "Pamela weighing ingredients in the studio kitchen", span: "md:col-span-2 md:row-span-2" },
  { src: galleryEarthBalm, alt: "Earth Balm tin resting on soft linen fabric", span: "" },
  { src: galleryMoonBalm, alt: "Moon Balm tin resting on soft linen fabric", span: "" },
  { src: galleryFounderDuo, alt: "Founder holding Earth Balm and Moon Balm outdoors", span: "md:row-span-2" },
  { src: galleryMoonBalmPortrait, alt: "Pamela holding a Moon Balm tin", span: "md:row-span-2" },
  { src: galleryMoonBalmBlanket, alt: "Moon Balm tin resting on a soft blanket", span: "" },
  { src: galleryMoonBalmLifestyle, alt: "Moon Balm as part of a nightly routine", span: "md:col-span-2" },
  { src: galleryNewImage, alt: "Earth & Tonic handcrafted balm", span: "md:col-span-2 md:row-span-2" },
];

function GalleryPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-6 pt-20 pb-10 text-center lg:pt-28">
        <span className="eyebrow inline-block text-moss">Gallery</span>
        <h1 className="mt-4 font-display text-5xl leading-tight text-forest-deep md:text-6xl">
          Moments from the studio
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          A closer look at how each batch of Earth & Tonic comes to life. Handcrafted in small quantities with clean, thoughtfully chosen ingredients.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-24 lg:px-8">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[280px] md:grid-cols-4 md:gap-4">
          {photos.map((p, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-sm bg-muted ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
