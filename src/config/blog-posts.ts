export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: "Trust" | "Evaluation" | "Investing" | "Platform" | "Ecosystem" | "Announcement";
  readTime: string;
  linkedinUrl: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "001",
    slug: "why-we-published-our-evaluation-framework",
    title: "Why We Published Our Evaluation Framework",
    excerpt:
      "Most platforms hide their scoring methodology behind NDAs and brand language. We published ours — all 100 points, 5 pillars, and 27 sub-parameters. Here's the reasoning.",
    content: `Most investment platforms treat their evaluation methodology as proprietary IP. The logic is understandable: if you publish your scoring criteria, startups will game it.

We disagree. And here's why.

**The Gaming Argument is Backwards**

If a startup "games" our scorecard by improving their financials, cleaning up their cap table, and building a real product — they've become a better investment. That's not gaming the system. That's the system working.

The only things a startup can't "game" on SIEAP are the things we verify independently: bank statements, GST returns, MCA filings, customer reference calls. You can tell us anything. We check what matters.

**Transparency is the Only Trust Strategy That Scales**

At launch, SIEAP has no track record. No famous portfolio exits. No 20,000-member investor network. What we have is a methodology.

Publishing it openly means every investor, startup, and incubator can evaluate whether our framework is rigorous before they engage with us. If they find weaknesses, they tell us. We improve. That feedback loop is more valuable than any brand campaign.

**We Applied It to Ourselves**

SIEAP scores 35–45 on its own scorecard today. Bronze tier. Pre-revenue, three-person team, no product at scale. We publish that number because a framework that flatters its creator is worthless.

The evaluation framework is available in full at sieapinvest.com/evaluation.`,
    author: "SIEAP Founding Team",
    date: "2026-04-06",
    category: "Trust",
    readTime: "4 min read",
    linkedinUrl: "#",
    published: true,
  },
  {
    id: "002",
    slug: "sieap-scores-bronze-on-its-own-scorecard",
    title: "SIEAP Scores Bronze on Its Own Scorecard. Here's Why That's the Point.",
    excerpt:
      "We built a 100-point evaluation framework and applied it to ourselves. We scored 35–45. Bronze tier. And we're publishing that number openly.",
    content: `We scored ourselves.

SIEAP applied its own 100-point evaluation scorecard to SIEAP. The result: 35–45 points. Bronze tier.

**Why We're Publishing This**

Because the alternative is worse. If SIEAP silently exempted itself from its own framework, or quietly scored itself Gold to look credible, the entire value of the evaluation system collapses.

A valuation methodology that doesn't apply to its creator is not a methodology — it's marketing.

**What the Score Actually Means**

Bronze isn't failure. Bronze is early. Here's the breakdown:

Financial Strength: 5/30 — Pre-revenue, no MRR to show yet.
Product / Technology: 10/25 — Platform in build, no live product at scale.
Market / Growth: 15/20 — Large TAM, clear positioning, India-specific gap validated.
ESG / Governance: 10/15 — Pvt Ltd registered, DPDP compliant, pursuing DPIIT and SEBI.
Team / Execution: 8/10 — Small but defined accountability, fast execution.

Total: ~48. High Bronze.

**This Changes as We Deliver**

When we close our first 3 investments via the platform, our Financial score moves. When KPIs go live, Product moves. When DPIIT registration is complete, ESG moves. Every quarter, we'll publish the updated self-score.

The evaluation framework is a living system. We're the first subjects.`,
    author: "SIEAP Founding Team",
    date: "2026-04-04",
    category: "Trust",
    readTime: "3 min read",
    linkedinUrl: "#",
    published: true,
  },
  {
    id: "003",
    slug: "the-100-point-scorecard-explained",
    title: "The 100-Point Scorecard: 27 Parameters, 5 Pillars, One Score",
    excerpt:
      "How SIEAP evaluates startups — every pillar, every parameter, and why stage-calibrated weights change the game.",
    content: `Every startup that enters SIEAP's evaluation process gets scored on 100 points across 5 pillars and 27 sub-parameters. Here's how the framework works.

**The 5 Pillars**

1. Financial Strength & Traction (30 points at Stage 5): MRR, revenue growth, LTV:CAC, burn rate, runway, financial documentation, cash flow, cap table clarity.

2. Product, MVP & Technology (25 points): Product readiness, PMF evidence, technology moat, scalability, product metrics (DAU/MAU/NPS), IP protection.

3. Market, Growth & Stage (20 points): TAM/SAM/SOM sizing, market growth rate, competitive positioning, growth channels, SIEAP stage assignment.

4. ESG & Governance (15 points): Legal structure, MCA compliance, data privacy (DPDP Act), social impact, ethical practices.

5. Team & Execution Quality (10 points): Domain expertise, team completeness, execution velocity, coachability.

**Why Weights Change by Stage**

A pre-idea startup cannot be evaluated on revenue. A Stage 5 startup must be. So at Stage 1, Team gets 45% of the weight — it's the only thing we can reliably evaluate. By Stage 5, Financial gets 30% — because that's what investors need to see.

The methodology — not the numbers — stays constant. Stage assignment determines the weights. The composite score determines the tier.

**The Tier System**

Platinum (85-100): Exceptional. Priority listing.
Gold (70-84): Investor Ready. Standard listing.
Silver (55-69): Developing. Not yet listed.
Bronze (40-54): Early stage. Mentorship track.
Not Qualified (<40): Redirect to earlier stage.

Only Gold+ at Stage 5 appears on the investor dashboard.`,
    author: "SIEAP Founding Team",
    date: "2026-04-02",
    category: "Evaluation",
    readTime: "5 min read",
    linkedinUrl: "#",
    published: true,
  },
  {
    id: "004",
    slug: "5-red-flags-instant-rejection",
    title: "5 Red Flags That Get a Startup Instantly Rejected",
    excerpt:
      "Not every startup makes it through SIEAP's evaluation. Here are the 5 automatic deal-breakers — and why they're non-negotiable.",
    content: `SIEAP has 7 automatic red flags. Any one of them triggers immediate action regardless of the startup's overall score. Five of them result in permanent rejection. Here they are.

**1. Falsified Financial Data**

If a startup submits bank statements, GST returns, or revenue figures that don't match the independently verified data — they're permanently banned. No appeals. No second chances.

This is the single most important protection for our investor pool. One successful fraud case would destroy the credibility of every evaluation we've ever done.

**2. Founder Criminal Record (Financial Fraud)**

A founder with a history of financial fraud, money laundering, or securities violations is permanently rejected. We run basic verification on all founders as part of the evaluation process.

**3. Undisclosed Legal Disputes**

Every startup must disclose active litigation, IP disputes, and regulatory investigations. Failure to disclose — even if the dispute is minor — results in an immediate pause and a 7-day window to provide full disclosure. If disclosure doesn't happen, permanent rejection.

**4. 2+ Critical Document Failures**

If a startup fails verification on 2 or more critical documents (bank statements, MCA filings, GST returns, founding agreements), they're permanently rejected. One failure gets a 14-day cure window. Two failures means systematic misrepresentation.

**5. Cap Table Disputes Among Co-Founders**

An unresolved cap table dispute means the startup cannot legally transfer equity to investors. We pause evaluation until a SHA (Shareholders' Agreement) and board resolution are in place. If unresolved after 30 days, permanent rejection.

**Why These Are Non-Negotiable**

Our 1% fee model means we only succeed when investors succeed. Every fraudulent listing is a direct financial and reputational loss for SIEAP. The red flag system isn't just ethics — it's commercial survival.`,
    author: "SIEAP Founding Team",
    date: "2026-03-30",
    category: "Evaluation",
    readTime: "4 min read",
    linkedinUrl: "#",
    published: true,
  },
];
