# Content Hub (Blog + Traction + Gallery) — Flowchart

```mermaid
flowchart TD
    SEED["src/config/linkedin-posts.ts<br/>LINKEDIN_POSTS_SEED (49 posts)"] --> CTX["LinkedInFeedContext.tsx:66<br/>LinkedInFeedProvider"]
    BCFG["src/config/blog-posts.ts<br/>blogPosts (4 posts)"] --> BLOG["Blog.tsx:63"]
    SCFG["src/config/social-posts.ts<br/>socialPosts (8 items)"] --> TR
    CTX --> TR["Traction.tsx:322<br/>useSearchParams → activeTab"]
    TR -->|"tab=posts"| PT["PostsTab:103<br/>filter hasImages, 3-col masonry<br/>proxyImageUrl() for all images"]
    TR -->|"tab=blog"| BT["BlogTab:202<br/>mirrors Blog.tsx layout"]
    TR -->|"tab=updates"| UT["UpdatesTab:260<br/>social announcements"]
    PT --> LL["LinkedInLightbox (shared)<br/>src/components/LinkedInLightbox.tsx"]
    CTX --> GAL["LinkedInGallery.tsx:119<br/>3-col masonry gallery"]
    GAL --> LL
    BLOG --> BC["BlogCard:17<br/>category filter + formatDate"]
    BCFG --> BPOST["BlogPost.tsx<br/>Slug-based detail page"]
    UTILS["src/lib/utils.ts<br/>formatDate(), proxyImageUrl(), isLocalDev"] --> PT
    UTILS --> GAL
    UTILS --> BLOG
    UTILS --> BPOST
    UTILS --> LL
```

## Shared Components & Utilities (post-unification)

| Component/Utility | Source | Used By |
|---|---|---|
| `LinkedInLightbox` | `src/components/LinkedInLightbox.tsx` | Traction.tsx, LinkedInGallery.tsx |
| `proxyImageUrl()` | `src/lib/utils.ts` | Traction.tsx, LinkedInGallery.tsx, LinkedInLightbox.tsx |
| `formatDate()` | `src/lib/utils.ts` | Traction.tsx, LinkedInGallery.tsx, Blog.tsx, BlogPost.tsx, Gallery.tsx, Index.tsx |
| `isLocalDev` | `src/lib/utils.ts` | (consumed by proxyImageUrl) |

## Previously Duplicated (now unified)

| Was duplicated in | Extracted to |
|---|---|
| `Traction.tsx:43-99`, `LinkedInGallery.tsx:61-117` | `src/components/LinkedInLightbox.tsx` |
| `Traction.tsx:18-31`, `LinkedInGallery.tsx:11-22`, `Blog.tsx:13`, `BlogPost.tsx:9`, `Gallery.tsx:14`, `Index.tsx:63` | `src/lib/utils.ts` |
