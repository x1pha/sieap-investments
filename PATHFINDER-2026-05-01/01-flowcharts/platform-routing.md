# Platform Routing & Role Pages — Flowchart

```mermaid
flowchart TD
    A["URL: /business | /investor | /incubator"] --> B["App.tsx routes<br/>→ MainIndex"]
    HOME["URL: /"] --> IDX["Index.tsx:71<br/>Homepage"]
    B --> C["MainIndex.tsx:9<br/>useState userType='business'"]
    C --> D["useEffect: pathname detection<br/>MainIndex.tsx:13"]
    D --> E["handleTypeChange()<br/>MainIndex.tsx:20<br/>setUserType + navigate"]
    E --> F["Navigation.tsx:11<br/>userType + onTypeChange props<br/>(tabs rendered when onTypeChange set)"]
    F --> G["Tabs: business/investor/incubator<br/>Navigation.tsx:88-112"]
    C --> H["renderContent() switch<br/>MainIndex.tsx:25"]
    H -->|"business"| I["BusinessPage.tsx:84<br/>SEOHead + Tally ConsultationModal"]
    H -->|"investor"| J["InvestorPage.tsx:8<br/>SEOHead added"]
    H -->|"incubator"| K["IncubatorPage.tsx:8<br/>SEOHead added"]
    I --> L["BusinessPricingSection.tsx:91"]
    J --> M["InvestorPricingSection.tsx:91"]
    K --> N["IncubatorPricingSection.tsx:79"]
    L --> O["PricingSection.tsx:54<br/>userType state (local only)"]
    M --> O
    N --> O
    IDX --> O
```

## Notes

- `Navigation.tsx` conditionally renders role-switcher Tabs **only** when `onTypeChange` prop is provided (role pages). `Index.tsx` passes no props — tabs hidden on homepage. This is intentional.
- `UserTypeContext.tsx` was defined but never provided in `App.tsx` — removed (dead code). `PricingSection.tsx` now uses local state only.
- All three role pages now have `<SEOHead>` for proper search indexing.
