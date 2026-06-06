import { Leaf } from "lucide-react";

const items = [
  "Rooted in Nature",
  "Small Batch",
  "Clean Ingredients",
  "No Seed Oils",
  "Cruelty Free",
  "Non GMO",
  "Crafted for Wellness",
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-cream-deep py-5 text-forest-deep">
      <div className="flex animate-[marquee_38s_linear_infinite] gap-12 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="eyebrow flex items-center gap-4">
            <Leaf className="h-3 w-3" />
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
