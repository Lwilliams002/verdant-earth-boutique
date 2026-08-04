import gutTonic from "@/assets/gut-tonic.png";
import sleepDrops from "@/assets/sleep-drops.png";
import hibiscusSoap from "@/assets/hibiscus-soap.png";
import milkHoney from "@/assets/milk-honey.png";

import imgBeeswax from "@/assets/ingredient-beeswax.jpg";
import imgCalendula from "@/assets/ingredient-calendula.jpg";
import imgChamomile from "@/assets/ingredient-chamomile.jpg";
import imgJojobaOil from "@/assets/ingredient-jojoba-oil.jpg";
import imgLavender from "@/assets/ingredient-lavender.jpg";
import imgArrowroot from "@/assets/ingredient-organic-arrowroot-powder.jpg";

export type IngredientMeta = { name: string; note: string; desc: string; img?: string };

// Ingredient details keyed by Shopify product handle.
// Falls back to a generic set for products not listed here.
export const PRODUCT_INGREDIENTS: Record<string, IngredientMeta[]> = {
  "earth-balm-botanical-skin-balm-2oz": [
    { name: "Calendula", note: "Calms irritation", desc: "Known for calming irritation and comforting sensitive skin.", img: imgCalendula },
    { name: "Chamomile", note: "Gentle & soothing", desc: "Naturally calming for delicate, stressed, or easily irritated skin.", img: imgChamomile },
    { name: "Jojoba oil", note: "Locks in hydration", desc: "Locks in hydration without feeling heavy, helping skin stay soft and balanced.", img: imgJojobaOil },
    { name: "Beeswax", note: "Protective seal", desc: "Creates a breathable layer that helps keep skin hydrated longer.", img: imgBeeswax },
    { name: "Organic Arrowroot Powder", note: "Light texture", desc: "Helps absorb excess oil for a soft, smooth, non greasy feel.", img: imgArrowroot },
  ],
  "moon-balm-lavender-botanical-balm-2-0z": [
    { name: "Lavender", note: "Calms the senses", desc: "Known for its calming properties that help comfort stressed, sensitive skin.", img: imgLavender },
    { name: "Chamomile", note: "Gentle & soothing", desc: "Naturally calming for delicate, stressed, or easily irritated skin.", img: imgChamomile },
    { name: "Jojoba Oil", note: "Locks in hydration", desc: "Locks in hydration without feeling heavy, helping skin stay soft and balanced.", img: imgJojobaOil },
    { name: "Beeswax", note: "Protective seal", desc: "Creates a breathable layer that helps keep skin hydrated.", img: imgBeeswax },
    { name: "Organic arrowroot powder", note: "Light texture", desc: "Helps absorb excess oil for a soft, smooth non greasy feel.", img: imgArrowroot },
  ],
};

export const DEFAULT_INGREDIENTS: IngredientMeta[] = [
  { name: "Organic Herbs", note: "Whole plant", desc: "Whole plant botanicals from farms we trust, chosen for purity and potency." },
  { name: "Clean Carrier Oils", note: "Nourishing base", desc: "Cold pressed plant oils never seed oils that carry active botanicals into the skin." },
  { name: "Small Batch Craft", note: "Made by hand", desc: "Formulated and poured in small batches to preserve freshness and integrity." },
  { name: "No Synthetics", note: "Nothing hidden", desc: "Free from synthetic fragrance, dyes, and fillers. Just what belongs." },
];

export function getIngredients(handle: string): IngredientMeta[] {
  return PRODUCT_INGREDIENTS[handle] ?? DEFAULT_INGREDIENTS;
}

export type ProductUseMeta = {
  directions: string[];
  suggestedUses: string[];
  suggestedNote?: string;
  storage: string[];
};

export const PRODUCT_USES: Record<string, ProductUseMeta> = {
  "moon-balm-lavender-botanical-balm-2-0z": {
    directions: [
      "Apply a small amount to dry, rough, or irritated skin as needed.",
      "Massage gently until absorbed.",
    ],
    suggestedUses: [
      "Temples",
      "Neck",
      "Shoulders",
      "Chest",
      "Wrists",
      "Hands",
      "Legs",
      "Feet",
      "Dry skin areas",
    ],
    suggestedNote: "For relaxation and a restful night.",
    storage: [
      "Store in a cool, dry place away from direct sunlight.",
    ],
  },
  "earth-balm-botanical-skin-balm-2oz": {
    directions: [
      "Apply a small amount to dry, rough, or irritated skin as needed.",
      "Massage gently until absorbed.",
    ],
    suggestedUses: [
      "Neck",
      "Arms",
      "Elbows",
      "Hands",
      "Legs",
      "Feet",
      "Dry skin areas",
    ],
    storage: [
      "Store in a cool, dry place away from direct sunlight.",
    ],
  },
};

export function getProductUses(handle: string): ProductUseMeta | null {
  return PRODUCT_USES[handle] ?? null;
}

// Products we plan to bring back surfaced as "Coming soon" in the collection.
export type ComingSoonProduct = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: string;
};

export const COMING_SOON: ComingSoonProduct[] = [
  { slug: "gut-tonic", name: "Gut Tonic", tagline: "Back to the root", price: 38, image: gutTonic, category: "Tonics" },
  { slug: "sleep-drops", name: "Sleep Drops", tagline: "Rest. Relax. Restore.", price: 44, image: sleepDrops, category: "Tonics" },
  { slug: "hibiscus-bloom-soap", name: "Hibiscus Bloom Soap", tagline: "Brighten & bloom", price: 18, image: hibiscusSoap, category: "Skincare" },
  { slug: "milk-honey-body-butter", name: "Milk & Honey Butter", tagline: "Silky hydration", price: 32, image: milkHoney, category: "Skincare" },
];
