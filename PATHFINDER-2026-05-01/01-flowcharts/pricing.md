# Pricing System — Flowchart

```mermaid
flowchart TD
    START([User visits pricing section]) --> PS["PricingSection.tsx:54<br/>useState userType='business'"]
    PS --> TABS["Tabs: Business / Investor / Incubator<br/>PricingSection.tsx:111<br/>onValueChange → setLocalUserType"]
    TABS -->|"business"| BIZ["BusinessPricingSection.tsx:91<br/>3 tiers: Basic ₹999, Growth ₹3499, Premium ₹8999"]
    TABS -->|"investor"| INV["InvestorPricingSection.tsx:91<br/>2 tiers: Solo ₹14999, Managed ₹39999"]
    TABS -->|"incubator"| INC["IncubatorPricingSection.tsx:79<br/>2 tiers: Scout ₹24999, Accelerate ₹64999"]
    BIZ --> CS1["CardSpotlight.tsx:9<br/>Hover spotlight effect"]
    INV --> CS2["CardSpotlight.tsx:9"]
    INC --> CS3["CardSpotlight.tsx:9"]
    BIZ -->|"business only"| WHY["Why Monthly section<br/>PricingSection.tsx:172"]
    WHY --> SA["Standalone Report CTA<br/>Link to /apply<br/>PricingSection.tsx:326"]
```

## Pricing Tiers

### Business
| Tier | Price | Popular |
|------|-------|---------|
| Basic | ₹999/mo | No |
| Growth | ₹3,499/mo | Yes |
| Premium | ₹8,999/mo | No |

### Investor
| Tier | Price | Popular |
|------|-------|---------|
| Solo Investor | ₹14,999/mo | No |
| Managed Investor | ₹39,999/mo | Yes |

### Incubator
| Tier | Price | Popular |
|------|-------|---------|
| Scout Incubator | ₹24,999/mo | No |
| Accelerate Incubator | ₹64,999/mo | Yes |

## Remaining Duplication (not yet unified)

The three `*PricingSection` components share ~85% identical structure (CardSpotlight wrapper, CheckCircle features list, conditional button styling, identical Framer Motion animations). A generic `<PricingTier>` component could eliminate ~70 LOC. See `04-handoff-prompts.md` if this becomes a priority.
