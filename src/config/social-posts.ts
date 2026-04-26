export interface SocialPost {
  id: string;
  platform: "linkedin" | "twitter";
  title: string;
  excerpt: string;
  date: string;
  postUrl: string; /* TODO: Replace # with actual LinkedIn/X post URL */
  category: "Trust" | "Evaluation" | "Insights" | "Platform" | "Ecosystem" | "Announcement";
  embedCode?: string;
}

export const socialPosts: SocialPost[] = [
  {
    id: "li-001",
    platform: "linkedin",
    title: "Why We Published Our Evaluation Framework",
    excerpt:
      "Most platforms hide their scoring methodology. We published ours — all 100 points, 5 pillars, and 27 sub-parameters. Here's why transparency is the only trust strategy that works.",
    date: "2026-04-06",
    postUrl: "#",
    category: "Trust",
  },
  {
    id: "li-002",
    platform: "linkedin",
    title: "SIEAP Scores 35–45 on Its Own Scorecard. Bronze Tier.",
    excerpt:
      "We built a framework that gives us a Bronze score. Pre-revenue, three-person team, pre-product at scale. We're telling you this because a system that inflates its creator's score is worthless.",
    date: "2026-04-04",
    postUrl: "#",
    category: "Trust",
  },
  {
    id: "li-003",
    platform: "linkedin",
    title: "The 1% Fee: Why Aligned Incentives Beat Listing Fees",
    excerpt:
      "Most platforms charge a listing fee whether or not you raise. We charge 1% only when you get funded. That's the only incentive structure that makes sense.",
    date: "2026-04-02",
    postUrl: "#",
    category: "Platform",
  },
  {
    id: "li-004",
    platform: "linkedin",
    title: "India's Startup Evaluation Gap",
    excerpt:
      "Due diligence on a single startup takes 40–60 hours. Most angels skip it entirely. We built a 19–29 day CA-verified evaluation system to close that gap.",
    date: "2026-03-30",
    postUrl: "#",
    category: "Insights",
  },
  {
    id: "li-005",
    platform: "linkedin",
    title: "From Campus to Capital: SIEAP College Chapters",
    excerpt:
      "We're embedding evaluation-first culture in India's top colleges through E-Cell partnerships. IITs, NITs, BITS — campus to capital.",
    date: "2026-03-28",
    postUrl: "#",
    category: "Ecosystem",
  },
  {
    id: "li-006",
    platform: "linkedin",
    title: "What Service Partners Mean for Early-Stage Startups",
    excerpt:
      "Legal, finance, GTM, talent — all bundled at discounted rates inside every SIEAP subscription. Here's how the partner network works.",
    date: "2026-03-25",
    postUrl: "#",
    category: "Platform",
  },
  {
    id: "x-001",
    platform: "twitter",
    title: "100 points. 5 pillars. 1 score.",
    excerpt:
      "SIEAP's evaluation framework is public. Every investor who looks at a startup on our platform sees the same standardised evidence. No self-reported data. No surprises.",
    date: "2026-04-05",
    postUrl: "#",
    category: "Evaluation",
  },
  {
    id: "x-002",
    platform: "twitter",
    title: "Stage matters more than score.",
    excerpt:
      "A Stage 2 startup scoring Gold ≠ investor-ready. The same score at Stage 5 = listed on the investor dashboard. Same framework. Different context. Zero ambiguity.",
    date: "2026-04-03",
    postUrl: "#",
    category: "Evaluation",
  },
];
