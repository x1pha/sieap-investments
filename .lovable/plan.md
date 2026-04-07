

## Plan: Update Pricing + Rewrite Three Audience Pages

This is a significant rewrite of 4 files: update pricing across the site and fully rewrite the three audience pages with the new content, pricing structure, and visual design specified.

### Changes Overview

**1. `src/pages/ForStartups.tsx`** — Full rewrite (largest change)
- Hero: Keep existing, same content
- 6-Stage Timeline: Keep existing interactive design, update tier labels ("Basic" not "Basic tier")
- **Section 3 — Replace pricing table with 3 styled pricing cards** (biggest change):
  - Basic ₹999/mo | ₹9,999/yr — dark navy header, "Entry Level" label
  - Growth ₹3,499/mo | ₹34,999/yr — teal header, "Most Popular" badge
  - Premium ₹8,999/mo | ₹89,999/yr — gold header, "Investor Ready" label
  - Each card has specific features, tagline, "Best for" text, bottom accent note
  - Footer note about included features + 1% success fee callout box
- Service Partners: Update desc to include ESOP, SHA, fractional CxO
- Evaluation: Update heading ("Not a Pitch Deck" instead of "Not Just a Pitch")
- FAQ: Add "Can I switch tiers?" Q, update existing answers to match new wording
- Update old prices in table headers (₹399→₹999, ₹1,499→₹3,499, ₹2,999→₹8,999) and annual line

**2. `src/pages/ForInvestors.tsx`** — Minor content tweaks
- Hero subtext: Remove last sentence, keep concise
- FAQ answers: Minor wording updates to match new prompt
- All content/structure stays the same

**3. `src/pages/ForIncubators.tsx`** — Minor content tweaks  
- Hero subtext: Slightly shortened
- FAQ: Update portal cost answer wording
- Structure unchanged

**4. `src/components/pricing/BusinessPricingSection.tsx`** — Update prices
- Starter: ₹7,999 → ₹999
- Growth: ₹24,999 → ₹3,499  
- Scale: ₹49,999 → ₹8,999
- Update tier names to Basic/Growth/Premium

**5. `src/components/pricing/InvestorPricingSection.tsx`** — No price changes needed (investor has no subscription)

**6. `src/components/pricing/IncubatorPricingSection.tsx`** — No price changes needed (contact-based pricing)

### Technical Details

- ForStartups pricing section: Replace the comparison table (lines 205-247) with a 3-card layout using styled dark cards with colored header bars (navy/teal/gold via Tailwind classes)
- Cards will use the existing `glass` class + custom header bar colors via `bg-[#1a1f3a]`, `bg-teal-900`, `bg-amber-900/80`
- Each card is self-contained with features list, price, CTA button
- Add a callout box below cards with `border border-primary/30` styling
- BusinessPricingSection prices updated to match new tiers for consistency across the site

