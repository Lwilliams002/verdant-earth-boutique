import gutTonicAsset from "@/assets/gut-tonic.png.asset.json";
import sleepDropsAsset from "@/assets/sleep-drops.png.asset.json";
import hibiscusSoapAsset from "@/assets/hibiscus-soap.png.asset.json";
import milkHoneyAsset from "@/assets/milk-honey.png.asset.json";
const gutTonic = gutTonicAsset.url;
const sleepDrops = sleepDropsAsset.url;
const hibiscusSoap = hibiscusSoapAsset.url;
const milkHoney = milkHoneyAsset.url;

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: "Tonics" | "Skincare";
  short: string;
  long: string;
  benefits: string[];
  ingredients: { name: string; note: string }[];
  size: string;
  badges: string[];
};

export const products: Product[] = [
  {
    slug: "gut-tonic",
    name: "Gut Tonic",
    tagline: "Back to the Root",
    price: 38,
    image: gutTonic,
    category: "Tonics",
    short: "A 100% natural daily blend for bloat, gas, and digestion — crafted from six organic herbs.",
    long: "Many digestive issues don't start with what you eat — they start with how well your body digests it. Gut Tonic is a small-batch herbal extract designed to support your gut from the root, gently and daily.",
    benefits: [
      "Soothes occasional bloating",
      "Eases gas & digestive discomfort",
      "Relieves heaviness after meals",
      "Supports everyday digestive wellness",
    ],
    ingredients: [
      { name: "Ginger Root", note: "Soothes the stomach" },
      { name: "Fennel Seed", note: "Reduces bloating" },
      { name: "Peppermint Leaf", note: "Calms discomfort" },
      { name: "Chamomile Flower", note: "Gentle & calming" },
      { name: "Lemon Balm", note: "Eases tension" },
      { name: "Dandelion Root", note: "Traditional digestive aid" },
    ],
    size: "1 FL OZ · 30 ML",
    badges: ["Plant Powered", "Clean Ingredients", "No Seed Oils", "Cruelty Free"],
  },
  {
    slug: "sleep-drops",
    name: "Sleep Drops",
    tagline: "Rest. Relax. Restore.",
    price: 44,
    image: sleepDrops,
    category: "Tonics",
    short: "A calming herbal blend to help you unwind, quiet the mind, and drift naturally — no melatonin, ever.",
    long: "Crafted to support your nervous system and ease the day's tension. Six traditional botanicals work together to bring you back to rest, gently and without dependence.",
    benefits: [
      "Calms the mind & eases stress",
      "Supports a healthy nervous system",
      "Helps you fall asleep naturally",
      "Wake up rested & balanced",
    ],
    ingredients: [
      { name: "Chamomile", note: "Soothes & supports relaxation" },
      { name: "Lemon Balm", note: "Calms the mind" },
      { name: "Passionflower", note: "Reduces restlessness" },
      { name: "Lavender", note: "Promotes calm" },
      { name: "Oat Straw", note: "Nourishes the nervous system" },
      { name: "Skullcap", note: "Eases occasional stress" },
    ],
    size: "2 FL OZ · 60 ML",
    badges: ["No Melatonin", "Non-Habit Forming", "Plant Based", "Small Batch"],
  },
  {
    slug: "hibiscus-bloom-soap",
    name: "Hibiscus Bloom Soap",
    tagline: "Brighten. Nourish. Bloom.",
    price: 18,
    image: hibiscusSoap,
    category: "Skincare",
    short: "A luxurious botanical bar with hibiscus flower and pink clay to gently cleanse and reveal radiant skin.",
    long: "Handcrafted in small batches with real botanicals and nourishing oils. Hibiscus antioxidants and pink clay work together to softly cleanse, exfoliate and brighten.",
    benefits: [
      "Rich in antioxidants",
      "Gently nourishing",
      "Promotes radiant skin",
      "Made with real botanicals",
    ],
    ingredients: [
      { name: "Hibiscus Flower", note: "Antioxidant glow" },
      { name: "Pink Clay", note: "Draws out impurities" },
      { name: "Coconut Oil", note: "Creamy nourishing lather" },
      { name: "Olive Oil", note: "Vitamins to protect skin" },
      { name: "Shea Butter", note: "Moisturizes & softens" },
    ],
    size: "4.5 OZ BAR",
    badges: ["Real Botanicals", "Handmade", "Plant Based", "All Skin Types"],
  },
  {
    slug: "milk-honey-body-butter",
    name: "Milk & Honey Body Butter",
    tagline: "Silky hydration, inspired by nature.",
    price: 32,
    image: milkHoney,
    category: "Skincare",
    short: "A deeply nourishing body cream whipped with organic shea, mango butter and honey extract.",
    long: "Made with skin-loving ingredients chosen for deep hydration and a silky, never-greasy finish. Soft skin starts here.",
    benefits: [
      "Deep hydration",
      "Softens dry skin",
      "Nourishes & conditions",
      "Leaves skin silky smooth",
    ],
    ingredients: [
      { name: "Organic Shea Butter", note: "Rich, healing" },
      { name: "Organic Mango Butter", note: "Softens & smooths" },
      { name: "Oat Milk Extract", note: "Calms the skin" },
      { name: "Organic Honey Extract", note: "Natural humectant" },
      { name: "Organic Jojoba Oil", note: "Balances moisture" },
      { name: "Vitamin E Oil", note: "Antioxidant care" },
    ],
    size: "NET WT. 8 OZ · 227 G",
    badges: ["Organic", "Cruelty Free", "Small Batch", "Made With Love"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
