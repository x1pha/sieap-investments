## Plan: Add `/pricing` page + extend homepage Pricing section

### New file: `src/pages/Pricing.tsx`

Dedicated route at `/pricing`. Uses `Navigation`, `Footer`, dark theme, glass cards, Framer Motion. Sections in order:

1. **Hero** — headline "Pricing Built for Every Stage of Your Journey" + subtext.
2. **Anchor nav bar** (Task 3) — 3 pill links scrolling to `#startup-plans`, `#standalone-report`, `#other-pricing`. Pills: `bg-white/10 hover:bg-white/20 text-gray-300 text-sm px-4 py-2 rounded-full transition-all`.
3. **Startup Plans** (`id="startup-plans"`) — renders `<BusinessPricingSection />` (already has updated Growth/Premium tiers + Premium footnote).
4. **Why Monthly? explainer** (Task 1) — heading "Why Monthly? Because Valuation Isn't a One-Time Event." + subtext, then 2×2 glass-card grid with icons `Clock`, `TrendingUp`, `Users`, `Percent` (lucide-react). Below: italic note "One-time engagement option available for standalone valuation reports. See below."
5. **Standalone Valuation Report** (`id="standalone-report"`, Task 2) — heading "Just Need a Valuation? We Have That Too." + subtext. Single full-width glass card with: STANDALONE pill badge, title, price `₹15,000 – ₹25,000`, two-column included list (Check icons), italic footnote, CTA `Request Standalone Report` → `/apply` (`button-gradient`), comparison note below.
6. **Other Pricing** (`id="other-pricing"`) — heading "Incubator & Investor Plans"; renders `<IncubatorPricingSection />` and `<InvestorPricingSection />`.
7. **FAQ** (Task 4) — accordion with the standard pricing/subscription Q&As ending with the new "Is there a one-time option…" item using the exact answer text provided.

### Edit: `src/App.tsx`

Add `import Pricing from "./pages/Pricing";` and route `<Route path="/pricing" element={<Pricing />} />`.

### Edit: `src/components/pricing/PricingSection.tsx` (homepage)

Insert the **Why Monthly? explainer** and **Standalone Valuation Report** card directly after the tier cards render block (and before the existing closing of the section). Both reuse the same content and styling specified above. Anchor nav and FAQ are NOT added here (they belong to the dedicated page only). The user-type toggle, tier cards, and motion behavior remain unchanged.

### Styling notes (no palette changes)

- Glass cards reuse the existing `glass` utility class already used in `ForStartups.tsx`.
- Section spacing: `py-24 md:py-32`, container `container px-4`.
- Headings: `text-4xl md:text-5xl font-normal` with a `text-gradient` accent on a key word, matching the rest of the site.
- Icons via lucide-react (`Clock`, `TrendingUp`, `Users`, `Percent`, `Check`).
- All existing tokens (`text-foreground`, `text-muted-foreground`, `bg-secondary`, `button-gradient`, `text-primary`) retained. Only the explicit `text-white`, `text-gray-300`, `text-gray-400`, `text-gray-500`, `bg-white/10` classes from the spec are used verbatim where the user requested them.

### Files NOT changed

- `src/pages/ForStartups.tsx`, `ForInvestors.tsx`, `ForIncubators.tsx`, FAQ-related logic — untouched.
- `BusinessPricingSection.tsx`, `IncubatorPricingSection.tsx`, `InvestorPricingSection.tsx` — reused as-is.