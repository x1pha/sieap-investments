## Plan: Update Growth & Premium Tier Content + Add Valuer Footnote

### Files that exist vs. specified

The user-mentioned files `src/pages/Pricing.tsx`, `src/components/PricingSection.tsx`, and `src/pages/FAQ.tsx` do **not** exist in this codebase. The actual pricing instances are:

1. `src/components/pricing/BusinessPricingSection.tsx` — startup/business tiers used by the homepage `PricingSection` (in `src/components/pricing/PricingSection.tsx`) and any page that mounts it.
2. `src/pages/ForStartups.tsx` — inline `pricingCards` array.

There is no FAQ page (Task 4 target is missing). The closest is the inline `faqs` array inside `ForStartups.tsx`, which has different questions and no Q17 about subscription cost.

### Changes

**1. `src/components/pricing/BusinessPricingSection.tsx`**

- **Growth tier** features: insert `"Basic SIEAP valuation report with business growth pointers"` immediately after `"Pitch deck review & refinement"`.
- **Premium tier** features: change `"Full SIEAP valuation (3-method + CA sign-off)"` → `"Full SIEAP valuation (3-method blend + CA sign-off*)"` (also fixes the missing word "blend" to match the spec).
- Render an italic muted footnote **only under the Premium card** (outside the `Card`, below the CTA), classes: `text-xs text-gray-500 italic mt-3 text-left`. Text:
  > *CA sign-off is included in all Premium valuations. Registered Valuer charges may be additional, depending on valuation complexity and applicable regulatory requirements. SIEAP will advise on applicability before engagement.
- Implementation: add an optional `footnote?: string` field on the `Premium` tier object, then render `{footnote && <p>...</p>}` inside the `motion.div` wrapper, after the `<BusinessTier />`.

**2. `src/pages/ForStartups.tsx`**

- **Growth `pricingCards`** (lines ~77–84): insert `"Basic SIEAP valuation report with business growth pointers"` after `"Pitch deck review & refinement"`.
- **Premium `pricingCards`** (line 99): update to `"Full SIEAP valuation (3-method blend + CA sign-off*)"`.
- Add an optional `footnote?: string` field on the Premium card object.
- In the cards grid render (lines 257–306), after the `motion.div` closes, render `{card.footnote && <p className="text-xs text-gray-500 italic mt-3 text-left">{card.footnote}</p>}` inside each tier's wrapper (visible only for Premium since only that card has the field).

### Files NOT changed (and why)

- `src/pages/Pricing.tsx` — does not exist.
- `src/components/PricingSection.tsx` — does not exist (the actual pricing section is at `src/components/pricing/PricingSection.tsx`, which delegates to `BusinessPricingSection.tsx`; updating the latter covers it).
- `src/pages/FAQ.tsx` — does not exist; the `ForStartups.tsx` inline FAQ has no equivalent Q17.

### Open question

Task 4 (FAQ Q17) cannot be performed because no FAQ page exists. Two options for the user to choose after approval:

- **A.** Skip Task 4 entirely.
- **B.** Create a new `src/pages/FAQ.tsx` with the Q17 answer (and route `/faq`) — this is out of scope of "targeted content corrections" so flagging here.

Tasks 1, 2, and 3 will be applied to `BusinessPricingSection.tsx` and `ForStartups.tsx` exactly as specified, with no styling, color, motion, or layout changes.