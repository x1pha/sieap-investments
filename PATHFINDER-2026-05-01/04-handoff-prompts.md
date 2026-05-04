# Handoff Prompts — SIEAP Investments

> Systems A–D are implemented. These prompts cover remaining optional improvements.

---

## Handoff E: Generic `PricingTier` Component

```
Refactor the three pricing section components in the SIEAP codebase at /Volumes/Drive/SIEAP/sieap-investments-main to use a shared PricingTier card.

**Goal**: Eliminate the ~120 lines of duplicated tier card markup across:
- src/components/pricing/BusinessPricingSection.tsx:55-89 (BusinessTier component)
- src/components/pricing/InvestorPricingSection.tsx:40-89 (InvestorTier component)
- src/components/pricing/IncubatorPricingSection.tsx:43-77 (IncubatorTier component)

**New file**: src/components/pricing/PricingTier.tsx
Props interface:
- name: string
- price: string
- description: string
- features: string[]
- limitations?: string[] (InvestorTier only)
- isPopular?: boolean
- footnote?: string (BusinessTier footer note)

The CardSpotlight wrapper, Most Popular badge, CheckCircle features list, and button styling are identical across all three — extract them.

**InvestorTier divergence**: has an AlertTriangle limitations section (InvestorPricingSection.tsx:66-78). Use the optional `limitations` prop.

Anti-pattern guards:
- Do NOT add props beyond what's listed — no variant, no colorScheme, no theme
- Keep the three *PricingSection files as thin wrappers with their data arrays
- Verify bun run build passes
```

---

## Handoff F: CI/CD Reusable Workflow

```
Extract the duplicated build+deploy steps from GitHub Actions workflows in the SIEAP repo at /Volumes/Drive/SIEAP/sieap-investments-main.

**Duplicated steps**:
- deploy.yml:19-37 (Install → Build → Deploy to Cloudflare)
- refresh-posts.yml:42-59 (same steps, same env vars, same secrets)

**New file**: .github/workflows/build-and-deploy.yml
Use `on: workflow_call` with secrets passed through.

**Updated callers**:
- deploy.yml — replace steps 3-5 with `uses: ./.github/workflows/build-and-deploy.yml`
- refresh-posts.yml — replace steps 6-7 with the same

Anti-pattern guards:
- Do NOT merge the two workflows into one — they have different triggers and the refresh workflow has unique steps (Apify fetch, git commit) that must stay separate
- Verify both workflows pass in GitHub Actions after the change
```
