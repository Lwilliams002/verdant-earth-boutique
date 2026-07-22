import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/lib/journal";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal Earth & Tonic" },
      { name: "description", content: "Seasonal routines, plant wisdom and notes from the Earth & Tonic studio." },
      { property: "og:title", content: "Journal Earth & Tonic" },
      { property: "og:description", content: "Read Earth & Tonic notes on herbs, clean routines, and botanical wellness." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 pt-24 text-center">
        <span className="eyebrow text-moss">The journal</span>
        <h1 className="mt-4 font-display text-6xl text-forest-deep md:text-7xl">
          Notes from the <span className="font-script text-moss">studio</span>
        </h1>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="divide-y divide-border border-y border-border">
          {journalPosts.map((p) => (
            <Link
              key={p.slug}
              to="/journal/$slug"
              params={{ slug: p.slug }}
              className="group flex items-center justify-between gap-8 py-10"
            >
              <div>
                <span className="eyebrow text-moss">{p.tag}</span>
                <h2 className="mt-2 font-display text-3xl text-forest-deep transition-colors group-hover:text-moss">
                  {p.title}
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground/70">
                  {p.date} · {p.readTime}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-forest-deep transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
