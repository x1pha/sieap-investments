# Duplication Report — SIEAP Investments

> Generated: 2026-05-01 | Status: Systems A–D implemented ✅

## Within-Feature Duplications

| # | Concern | File A | File B | LOC Duped | Status |
|---|---------|--------|--------|-----------|--------|
| W1 | `Lightbox` component | `Traction.tsx:43-99` | `LinkedInGallery.tsx:61-117` | 114 | ✅ Extracted to `src/components/LinkedInLightbox.tsx` |
| W2 | `proxyImageUrl()` + `isLocalDev` | `Traction.tsx:18-24` | `LinkedInGallery.tsx:15-24` | 14 | ✅ Extracted to `src/lib/utils.ts` |
| W3 | `formatDate()` | 6 files | — | 18 | ✅ Extracted to `src/lib/utils.ts` |
| W4 | 3-col masonry split | `Traction.tsx:107-110` | `LinkedInGallery.tsx:131-133` | 8 | ⏳ Minor; left in place |
| W5 | Pricing tier card boilerplate | `BusinessPricingSection.tsx:55-89` | `InvestorPricingSection.tsx:40-89`, `IncubatorPricingSection.tsx:43-77` | 120 | ⏳ See handoff E |

## Cross-Feature Duplications

| # | Concern | Locations | Status |
|---|---------|-----------|--------|
| C1 | Role page hero+services boilerplate | `BusinessPage.tsx:126-244`, `InvestorPage.tsx:41-157`, `IncubatorPage.tsx:41-200` | ⏳ Structural; low urgency |
| C2 | SEO metadata absent | `BusinessPage.tsx`, `InvestorPage.tsx`, `IncubatorPage.tsx` | ✅ SEOHead added to all three |
| C3 | `UserTypeContext` defined but never provided | `UserTypeContext.tsx` (deleted), `PricingSection.tsx:57` | ✅ Dead code removed |
| C4 | CI/CD build+deploy steps | `deploy.yml:19-37` and `refresh-posts.yml:42-59` | ⏳ Low priority (22 lines) |
| C5 | Navigation props inconsistency | `Index.tsx` vs `MainIndex.tsx` | ✅ Confirmed intentional — no action |
| C6 | ConsultationModal (Tally) single implementation | `BusinessPage.tsx:10-81` | ✅ Confirmed intentional for now |
