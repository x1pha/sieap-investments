# Feature Inventory — SIEAP Investments

> Generated: 2026-05-01 | Repo: sieap-investments-main

| # | Feature | Entry Point(s) | Core Files |
|---|---------|---------------|-----------|
| 1 | **App Shell & Routing** | `src/main.tsx`, `src/App.tsx` | `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/index.css` |
| 2 | **Landing Page (Home)** | `src/pages/Index.tsx` | `src/components/features/FeaturesSection.tsx`, `src/components/pricing/PricingSection.tsx`, `src/components/TestimonialsSection.tsx`, `src/components/LogoCarousel.tsx` |
| 3 | **Role Pages (Business/Investor/Incubator)** | `src/pages/MainIndex.tsx` | `src/pages/BusinessPage.tsx`, `src/pages/InvestorPage.tsx`, `src/pages/IncubatorPage.tsx` |
| 4 | **LinkedIn Feed System** | `src/contexts/LinkedInFeedContext.tsx` | `src/config/linkedin-posts.ts`, `src/worker.ts`, `scripts/refresh-linkedin-posts.ts`, `.github/workflows/refresh-posts.yml` |
| 5 | **Content Hub (Blog + Traction)** | `src/pages/Traction.tsx`, `src/pages/Blog.tsx` | `src/pages/LinkedInGallery.tsx`, `src/config/blog-posts.ts`, `src/config/social-posts.ts` |
| 6 | **Pricing System** | `src/components/pricing/PricingSection.tsx` | `src/components/pricing/BusinessPricingSection.tsx`, `src/components/pricing/InvestorPricingSection.tsx`, `src/components/pricing/IncubatorPricingSection.tsx`, `src/components/pricing/CardSpotlight.tsx` |
| 7 | **Legal Pages** | `src/pages/legal/` | `Privacy.tsx`, `Terms.tsx`, `Disclaimer.tsx` |
| 8 | **Mentors & About** | `src/pages/Mentors.tsx`, `src/pages/About.tsx` | `src/components/SEOHead.tsx`, static mentor data |
| 9 | **CI/CD Pipeline** | `.github/workflows/deploy.yml`, `.github/workflows/refresh-posts.yml` | `wrangler.jsonc`, `src/worker.ts` |
| 10 | **Image Proxy** | `src/worker.ts:36` → `/api/img-proxy` | `src/lib/utils.ts` (proxyImageUrl), `src/components/LinkedInLightbox.tsx` |
| 11 | **Gallery (Social Posts)** | `src/pages/Gallery.tsx` | `src/config/social-posts.ts` |
| 12 | **Blog Post Detail** | `src/pages/BlogPost.tsx` | `src/config/blog-posts.ts` |
| 13 | **Shared Utilities** | `src/lib/utils.ts` | `formatDate()`, `proxyImageUrl()`, `isLocalDev`, `cn()` |
| 14 | **Shared LinkedIn Lightbox** | `src/components/LinkedInLightbox.tsx` | Used in Traction, LinkedInGallery |
