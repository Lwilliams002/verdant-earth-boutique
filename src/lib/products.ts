import gutTonic from "@/assets/gut-tonic.png";
import sleepDrops from "@/assets/sleep-drops.png";
import hibiscusSoap from "@/assets/hibiscus-soap.png";
import milkHoney from "@/assets/milk-honey.png";

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
  ingredients: { name: string; note: string; desc: string }[];
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
    short: "A 100% natural daily blend for bloat, gas, and digestion crafted from six organic herbs.",
    long: "Many digestive issues don't start with what you eat they start with how well your body digests it. Gut Tonic is a small-batch herbal extract designed to support your gut from the root, gently and daily.",
    benefits: [
      "Soothes occasional bloating",
      "Eases gas & digestive discomfort",
      "Relieves heaviness after meals",
      "Supports everyday digestive wellness",
    ],
    ingredients: [
      { name: "Ginger Root", note: "Soothes the stomach", desc: "A warming root used for centuries to settle the stomach, stimulate digestion and ease queasiness after meals." },
      { name: "Fennel Seed", note: "Reduces bloating", desc: "Sweet, aromatic seeds that relax the digestive tract and help release trapped gas and uncomfortable bloating." },
      { name: "Peppermint Leaf", note: "Calms discomfort", desc: "Cooling menthol-rich leaves that soothe digestive spasms and bring quick, refreshing relief to an unsettled belly." },
      { name: "Chamomile Flower", note: "Gentle & calming", desc: "Delicate blossoms that calm both the gut and the mind, easing tension that often shows up as digestive upset." },
      { name: "Lemon Balm", note: "Eases tension", desc: "A bright, lemony herb from the mint family that gently relieves stress-related digestive discomfort." },
      { name: "Dandelion Root", note: "Traditional digestive aid", desc: "A time-honored bitter root that encourages healthy bile flow and supports the body's natural digestion and detox pathways." },
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
    short: "A calming herbal blend to help you unwind, quiet the mind, and drift naturally no melatonin, ever.",
    long: "Crafted to support your nervous system and ease the day's tension. Six traditional botanicals work together to bring you back to rest, gently and without dependence.",
    benefits: [
      "Calms the mind & eases stress",
      "Supports a healthy nervous system",
      "Helps you fall asleep naturally",
      "Wake up rested & balanced",
    ],
    ingredients: [
      { name: "Chamomile", note: "Soothes & supports relaxation", desc: "The classic bedtime flower, prized for its gentle sedative qualities that help the body wind down naturally." },
      { name: "Lemon Balm", note: "Calms the mind", desc: "A soothing herb that quiets racing thoughts and eases the mental chatter that keeps you up at night." },
      { name: "Passionflower", note: "Reduces restlessness", desc: "A beautiful climbing vine traditionally used to still restlessness and support deeper, more continuous sleep." },
      { name: "Lavender", note: "Promotes calm", desc: "Fragrant purple blooms known to lower tension and signal to the nervous system that it's safe to rest." },
      { name: "Oat Straw", note: "Nourishes the nervous system", desc: "The green tops of the oat plant, rich in minerals that feed and steady an overworked nervous system." },
      { name: "Skullcap", note: "Eases occasional stress", desc: "A traditional nervine herb that melts away the day's accumulated stress and supports a calm transition to sleep." },
    ],
    size: "2 FL OZ · 60 ML",
    badges: ["No Melatonin", "Non Habit Forming", "Plant Based", "Small Batch"],
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
      { name: "Hibiscus Flower", note: "Antioxidant glow", desc: "Known as the 'botox plant,' hibiscus is packed with natural AHAs and antioxidants that gently exfoliate and brighten." },
      { name: "Pink Clay", note: "Draws out impurities", desc: "A mild mineral clay that lifts away dirt and excess oil without stripping, leaving skin balanced and refreshed." },
      { name: "Coconut Oil", note: "Creamy nourishing lather", desc: "Creates the bar's rich, cushiony lather while delivering fatty acids that leave skin soft and supple." },
      { name: "Olive Oil", note: "Vitamins to protect skin", desc: "A skincare staple since antiquity, full of vitamins A and E that protect and condition delicate skin." },
      { name: "Shea Butter", note: "Moisturizes & softens", desc: "A deeply emollient butter that seals in moisture, so skin feels nourished long after you rinse." },
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
      { name: "Organic Shea Butter", note: "Rich, healing", desc: "Hand-harvested from the shea tree, this rich butter deeply repairs dryness and restores the skin's natural barrier." },
      { name: "Organic Mango Butter", note: "Softens & smooths", desc: "A silky, fast-absorbing butter pressed from mango seeds that smooths rough patches without any greasy feel." },
      { name: "Oat Milk Extract", note: "Calms the skin", desc: "Gentle oat-derived soothers that calm itchiness and irritation, ideal for even the most sensitive skin." },
      { name: "Organic Honey Extract", note: "Natural humectant", desc: "Nature's moisture magnet, drawing hydration into the skin and holding it there for lasting softness." },
      { name: "Organic Jojoba Oil", note: "Balances moisture", desc: "A liquid wax nearly identical to skin's own sebum, absorbing effortlessly to balance and condition." },
      { name: "Vitamin E Oil", note: "Antioxidant care", desc: "A protective antioxidant that defends skin from daily environmental stress while keeping the formula naturally fresh." },
    ],
    size: "NET WT. 8 OZ · 227 G",
    badges: ["Organic", "Cruelty Free", "Small Batch", "Made With Love"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
