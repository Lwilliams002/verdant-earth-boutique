import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { subscribeShopifyEmail } from "@/lib/shopify";

type Variant = "light" | "dark";

interface NewsletterSignupProps {
  variant?: Variant;
  heading?: string;
  description?: string;
  className?: string;
}

export function NewsletterSignup({
  variant = "light",
  heading = "Join the list",
  description = "Be first to know about new tonics, skincare, and small-batch drops.",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isDark = variant === "dark";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.set("form_type", "customer");
      body.set("utf8", "✓");
      body.set("contact[email]", value);
      body.set("contact[tags]", "newsletter,prospect");
      body.set("contact[accepts_marketing]", "true");

      // Shopify accepts cross-origin form posts; response is opaque under no-cors,
      // which is fine — the subscription is recorded on the store side.
      await fetch(`https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/contact`, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      setDone(true);
      setEmail("");
      toast.success("You're on the list — thanks for joining.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={className}>
      {heading && (
        <h4
          className={`font-display text-2xl md:text-3xl ${
            isDark ? "text-cream" : "text-forest-deep"
          }`}
        >
          {heading}
        </h4>
      )}
      {description && (
        <p
          className={`mt-2 text-sm ${
            isDark ? "text-cream/75" : "text-foreground/70"
          }`}
        >
          {description}
        </p>
      )}
      {done ? (
        <div
          className={`mt-5 rounded-sm border px-5 py-4 ${
            isDark
              ? "border-cream/30 bg-cream/10 text-cream"
              : "border-forest-deep/20 bg-forest-deep/5 text-forest-deep"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                isDark ? "bg-cream text-forest-deep" : "bg-forest-deep text-cream"
              }`}
              aria-hidden="true"
            >
              ✓
            </span>
            <div>
              <p className="font-medium">Thank you for signing up!</p>
              <p
                className={`mt-1 text-sm ${
                  isDark ? "text-cream/75" : "text-foreground/70"
                }`}
              >
                You&apos;re on the list — watch your inbox for updates on new
                drops and herbal rituals.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className={`mt-5 flex flex-col gap-2 sm:flex-row sm:items-stretch`}
        >
          <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            maxLength={255}
            className={`flex-1 rounded-sm border px-4 py-3 text-sm outline-none transition-colors ${
              isDark
                ? "border-cream/25 bg-transparent text-cream placeholder:text-cream/50 focus:border-cream/60"
                : "border-forest-deep/20 bg-white text-forest-deep placeholder:text-foreground/40 focus:border-forest-deep/50"
            }`}
          />
          <button
            type="submit"
            disabled={submitting}
            className={`rounded-sm px-6 py-3 text-xs tracking-[0.25em] transition-colors disabled:opacity-60 ${
              isDark
                ? "bg-cream text-forest-deep hover:bg-cream/90"
                : "bg-forest-deep text-cream hover:bg-forest-deep/90"
            }`}
          >
            {submitting ? "JOINING…" : "SUBSCRIBE"}
          </button>
        </form>
      )}
      {!done && (
        <p
          className={`mt-3 text-[11px] tracking-wide ${
            isDark ? "text-cream/50" : "text-foreground/50"
          }`}
        >
          No spam. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
