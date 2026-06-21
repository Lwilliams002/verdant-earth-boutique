export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  content: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "returning-to-the-root",
    title: "Returning to the root: an intro to bitter herbs",
    excerpt:
      "Why bitter botanicals like dandelion and ginger have been digestion's quiet allies for centuries.",
    tag: "Herbalism",
    date: "June 4, 2026",
    readTime: "6 min read",
    author: "Pamela Espinoza",
    content: [
      "Long before probiotics lined the shelves of every grocery store, our grandmothers reached for something simpler: a bitter root, steeped slow, sipped before a meal. Bitterness is a flavor we have largely engineered out of modern food, and with it we have lost one of the body's oldest cues for digestion.",
      "When the tongue tastes bitter, a quiet cascade begins. Saliva increases. The stomach prepares acid. The liver nudges bile into motion. Nothing dramatic — just the body remembering how to do what it has always known.",
      "In our Gut Tonic, we lean on three plants that have carried this tradition for generations: dandelion root for the liver, ginger for warmth and motility, and gentian for that unmistakable, mouth-puckering bitterness. Together they are less of a supplement and more of an invitation — a small ritual to slow down before you eat.",
      "If you are new to bitters, start with a few drops on the tongue ten minutes before a meal. Notice the way your stomach softens. Notice that you chew a little longer. That is the plant doing its quiet work.",
    ],
  },
  {
    slug: "the-case-against-melatonin",
    title: "The case against melatonin (and what we use instead)",
    excerpt:
      "How traditional nervines like passionflower and skullcap support sleep without dependence.",
    tag: "Sleep",
    date: "May 18, 2026",
    readTime: "8 min read",
    author: "Pamela Espinoza",
    content: [
      "Melatonin is a hormone. That sentence alone should give us pause. We take it casually — a gummy before bed, another on a long flight — but we are dosing a signal the body produces in tiny, precisely-timed amounts.",
      "What most people actually need is not more melatonin. It is a calmer nervous system at the end of the day. That is where the old nervines come in: passionflower, skullcap, California poppy. Plants that do not knock you out, but instead help your shoulders drop, your jaw unclench, your mind stop rehearsing tomorrow.",
      "Our Sleep Drops are built around this idea. Passionflower for the looping thoughts. Skullcap for the tense body. A whisper of chamomile to round it all out. No hangover, no dependency, no overriding the body's own rhythm.",
      "Sleep is not a problem to solve with a stronger sedative. It is a conversation with the nervous system. These plants are simply better translators.",
    ],
  },
  {
    slug: "a-morning-ritual-in-three-drops",
    title: "A morning ritual in three drops",
    excerpt:
      "A simple, slow practice for grounding your nervous system before the day begins.",
    tag: "Rituals",
    date: "April 29, 2026",
    readTime: "4 min read",
    author: "Pamela Espinoza",
    content: [
      "Before the phone. Before the email. Before the first conversation of the day. Three drops, under the tongue, and one full breath.",
      "This is not a productivity hack. It is the opposite. It is a small, deliberate pause that tells your body: we are not running yet. We are here first.",
      "I use our Gut Tonic in the morning — the bitterness wakes the system gently and sets digestion up for the day. Some mornings I follow it with a cup of warm water and lemon. Some mornings I do not. The ritual is the point, not the prescription.",
      "If you are looking for somewhere to start, start here. Three drops. One breath. Then begin.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}
