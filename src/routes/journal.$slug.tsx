import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ArrowLeft } from "lucide-react";
import { getJournalPost, journalPosts } from "@/lib/journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getJournalPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Earth & Tonic Journal` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-forest-deep">Post not found</h1>
        <Link to="/journal" className="mt-6 inline-block text-moss underline">
          Back to the journal
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-forest-deep">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 text-moss underline">Try again</button>
      </div>
      <SiteFooter />
    </div>
  ),
  component: JournalPostPage,
});

function JournalPostPage() {
  const { post } = Route.useLoaderData();
  const others = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-moss hover:text-forest-deep"
        >
          <ArrowLeft className="h-4 w-4" /> The journal
        </Link>
        <span className="eyebrow mt-8 block text-moss">— {post.tag}</span>
        <h1 className="mt-3 font-display text-5xl text-forest-deep md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
          {post.author} · {post.date} · {post.readTime}
        </p>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-forest-deep/80">
          {post.content.map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-border bg-cream/40">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <span className="eyebrow text-moss">— Keep reading</span>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to="/journal/$slug"
                  params={{ slug: p.slug }}
                  className="group block border border-border bg-background p-8 transition-colors hover:border-moss"
                >
                  <span className="eyebrow text-moss">{p.tag}</span>
                  <h3 className="mt-2 font-display text-2xl text-forest-deep group-hover:text-moss">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
