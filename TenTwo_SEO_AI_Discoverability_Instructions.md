# TenTwo — Search Engine & AI Discoverability Instructions

## Purpose

Update the existing TenTwo website for strong technical discoverability across Google Search, Bing, Google AI-powered search, ChatGPT/OpenAI search, Claude/Anthropic, Perplexity, other legitimate AI retrieval systems, social sharing, and machine-readable web discovery.

**This is not a visual redesign task.**

Do not change the established visual design, typography, layout, image selection, section order, animations, colours, hero, or existing copy unless explicitly instructed below.

Use the existing website/project as the source of truth. **Do not invent property facts.** If a fact cannot be verified from the existing project, leave a clearly marked placeholder and report it at the end.

---

## 1. Authoritative TenTwo Positioning

Property name: **TenTwo**

Property type: **Private contemporary residence**

Location: **Near Kandy, Sri Lanka**

Core positioning:

> A private contemporary residence near Kandy, Sri Lanka, designed for families and groups of friends to share the entire residence privately.

Key characteristics, where verified in the existing project:

- private residence
- entire residence
- private pool
- contemporary architecture
- floor-to-ceiling glass
- indoor/outdoor connection
- natural light
- water
- landscape
- open views
- shared living spaces
- private suites
- families
- groups of friends

Primary guest types:

- families
- groups of friends

Primary geographic markets:

- United Kingdom
- Europe
- United States
- Australia
- Japan
- China
- South Korea

Do **not** position TenTwo around:

- solo travel
- digital nomads
- backpacking
- business travel
- budget travel
- hostels
- cheap accommodation

---

## 2. SEO Positioning

Position TenTwo as a **private contemporary residence near Kandy**, not as a generic luxury villa, hotel, or resort.

Do not repeatedly use the word "luxury".

Do not keyword stuff.

Do not create awkward keyword combinations such as:

> luxury villa Kandy luxury accommodation Sri Lanka luxury holiday

Natural language is more important than keyword density.

---

## 3. Homepage Title

Set:

```html
<title>TenTwo | Private Contemporary Residence Near Kandy, Sri Lanka</title>
```

Do not use titles such as:

- Best Luxury Villa in Sri Lanka
- Ultimate Luxury Villa Kandy
- Luxury Holiday Villa Sri Lanka

---

## 4. Meta Description

Add a natural meta description along these lines:

```html
<meta name="description" content="TenTwo is a private contemporary residence near Kandy, Sri Lanka, reserved exclusively for families and groups of friends, with a private pool, shared living spaces and a strong connection to the surrounding landscape.">
```

Prioritize natural language over an exact character count.

---

## 5. Canonical URL

Add a canonical URL using the actual production domain.

Example only:

```html
<link rel="canonical" href="https://ACTUAL-PRODUCTION-DOMAIN.com/">
```

Do **not** invent the domain.

Inspect the existing project for domain references, booking links, social links, existing canonical URLs, and deployment configuration.

If the production domain cannot be determined, use a clearly marked TODO rather than leaving an incorrect production URL.

---

## 6. Robots Meta

Add:

```html
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
```

Do not add `noindex`.

Do not unnecessarily block legitimate search crawlers.

---

## 7. Open Graph

Add:

```html
<meta property="og:type" content="website">
<meta property="og:title" content="TenTwo | Private Contemporary Residence Near Kandy, Sri Lanka">
<meta property="og:description" content="A private contemporary residence near Kandy, Sri Lanka, reserved exclusively for families and groups of friends.">
<meta property="og:url" content="ACTUAL_CANONICAL_URL">
<meta property="og:site_name" content="TenTwo">
<meta property="og:image" content="ABSOLUTE_HERO_IMAGE_URL">
<meta property="og:image:alt" content="TenTwo private contemporary residence near Kandy, Sri Lanka">
```

Use the strongest TenTwo hero image. Use an absolute HTTPS URL for `og:image`.

If image dimensions are known, also add `og:image:width` and `og:image:height`.

Do not use relative image paths for social images.

---

## 8. Twitter / X Card

Add:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="TenTwo | Private Contemporary Residence Near Kandy, Sri Lanka">
<meta name="twitter:description" content="A private contemporary residence near Kandy, Sri Lanka, reserved exclusively for families and groups of friends.">
<meta name="twitter:image" content="ABSOLUTE_HERO_IMAGE_URL">
<meta name="twitter:image:alt" content="TenTwo private contemporary residence near Kandy, Sri Lanka">
```

Only add an official X/Twitter account if one already exists in the project. Never invent an account.

---

## 9. HTML Language

Ensure:

```html
<html lang="en">
```

Do not add fake localized pages.

---

## 10. Hreflang

Do **not** create hreflang links merely because TenTwo targets multiple countries.

Only add hreflang when actual translated/localized versions exist.

If only one English page exists:

```html
<link rel="alternate" hreflang="en" href="ACTUAL_CANONICAL_URL">
<link rel="alternate" hreflang="x-default" href="ACTUAL_CANONICAL_URL">
```

Do not create fake Japanese, Chinese, Korean, or other language URLs.

---

## 11. Schema.org Structured Data

Implement accurate JSON-LD structured data.

Use the most appropriate Schema.org lodging/property entity supported by Schema.org and the facts actually present in the project.

Include only verified information such as:

- name
- description
- URL
- image
- address
- locality
- region
- country
- telephone
- email
- geo coordinates
- number of rooms
- number of bedrooms
- amenities
- check-in information
- check-out information
- sameAs
- booking URL

Do not invent prices, ratings, review counts, coordinates, room counts, amenities, or star ratings.

### LodgingBusiness example

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": "ACTUAL_URL#lodging",
  "name": "TenTwo",
  "description": "TenTwo is a private contemporary residence near Kandy, Sri Lanka, reserved exclusively for families and groups of friends.",
  "url": "ACTUAL_URL",
  "image": [
    "ABSOLUTE_IMAGE_URL_1",
    "ABSOLUTE_IMAGE_URL_2",
    "ABSOLUTE_IMAGE_URL_3"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kandy",
    "addressCountry": "LK"
  }
}
```

Only include additional address fields if verified.

If the property is technically outside Kandy city, use the actual locality from the existing website. Do not falsely state that it is inside Kandy.

Baseline description, subject to verification:

> TenTwo is a private contemporary residence near Kandy, Sri Lanka, reserved exclusively for one family or group of friends at a time. The residence combines contemporary architecture, private outdoor space, shared living areas and a close connection to the surrounding landscape.

Only add amenities explicitly verified in the website/project.

---

## 12. WebSite Schema

Add:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "ACTUAL_URL#website",
  "name": "TenTwo",
  "url": "ACTUAL_URL",
  "description": "Private contemporary residence near Kandy, Sri Lanka."
}
```

Use consistent `@id` values.

---

## 13. Organization / Brand

If appropriate, add a lightweight Organization entity for TenTwo.

Do not invent a legal company name.

If official social profiles already exist in the project, connect them through `sameAs`.

Do not invent social profiles.

---

## 14. Breadcrumb / FAQ / Review / Price Schema

Do not create BreadcrumbList schema for the homepage unless it reflects a real visible hierarchy.

Do not add fake FAQ schema. If a visible FAQ exists, structured data may reflect those actual questions and answers.

Do not add `aggregateRating`, `review`, or `starRating` without legitimate verified review data.

Do not add fake `price`, `priceRange`, `availability`, or `offers`. Do not hardcode stale availability.

---

## 15. Image SEO

Every meaningful image should have useful descriptive `alt` text.

Avoid:

- image1
- IMG_2387
- hero
- villa
- photo

Examples:

> Contemporary TenTwo residence overlooking the private pool and surrounding landscape near Kandy

> TenTwo living area opening through large glass doors towards the private pool

> Private pool at TenTwo surrounded by the residence and garden

> Contemporary interior at TenTwo with floor-to-ceiling glass and outdoor views

Do not keyword stuff or repeat identical alt text.

Decorative images should use:

```html
alt=""
```

where appropriate.

Where practical, use descriptive filenames such as:

- `tentwo-private-residence-kandy.jpg`
- `tentwo-private-pool-kandy.jpg`
- `tentwo-contemporary-architecture.jpg`
- `tentwo-living-room.jpg`
- `tentwo-dining-area.jpg`
- `tentwo-rooftop-terrace.jpg`
- `tentwo-bedroom-master-suite.jpg`

Do not break existing references. If renaming is risky, keep filenames and prioritize alt text and structured data.

---

## 16. Social Sharing Image

Use the strongest existing TenTwo architectural photograph.

Recommended target dimensions:

> 1200 × 630

Do not create a graphic covered in text.

---

## 17. XML Sitemap

Create:

```text
/sitemap.xml
```

Include all canonical, indexable public pages.

At minimum:

```text
/
```

If actual pages exist, include them, for example:

- `/residence`
- `/architecture`
- `/gallery`
- `/location`

Only include URLs that actually exist.

Do not include booking endpoints, query URLs, duplicates, development URLs, temporary URLs, or tracking URLs.

Use the actual production domain.

---

## 18. Robots.txt

Create or update:

```text
/robots.txt
```

Use:

```text
User-agent: *
Allow: /

Sitemap: https://ACTUAL-DOMAIN.com/sitemap.xml
```

Replace the domain with the actual verified production domain.

Do not block CSS, JavaScript, images, or important page resources.

---

## 19. AI Crawlers

The site should be accessible to legitimate AI/search crawlers unless there is a specific business reason to block them.

Do not add blanket blocks for:

- GPTBot
- OAI-SearchBot
- ClaudeBot
- PerplexityBot
- Google-Extended
- Bingbot
- Applebot

Do not use `Disallow: /` for AI crawlers.

The objective is to make TenTwo discoverable by AI-powered search and answer systems.

---

## 20. Do Not Invent AI Metadata

Do not create unsupported tags such as:

```html
<meta name="ai-description">
<meta name="ai-content">
<meta name="chatgpt-description">
<meta name="claude-description">
```

There is no universal AI meta tag that replaces normal SEO.

AI/search discoverability should instead be supported through:

- semantic HTML
- clear headings
- accurate visible content
- structured data
- canonical URLs
- robots.txt
- sitemap.xml
- descriptive images
- machine-readable property information

---

## 21. llms.txt

Create:

```text
/llms.txt
```

Treat this as an additional machine-readable resource, not a replacement for SEO, robots.txt or sitemap.xml.

Use concise factual content:

```markdown
# TenTwo

> Private contemporary residence near Kandy, Sri Lanka.

## About

TenTwo is a private contemporary residence near Kandy, Sri Lanka, reserved exclusively for one family or group of friends at a time.

The residence is designed around privacy, contemporary architecture, natural light, water, landscape and shared time.

## Property

- Private residence
- Entire residence reserved for one group at a time
- Private pool
- Contemporary architecture
- Indoor/outdoor connection
- Shared living spaces
- Private suites
- Rooftop terrace

Only retain bullet points verified in the existing website.

## Location

TenTwo is located near Kandy, Sri Lanka.

Use the actual verified location description from the website.

## Guests

TenTwo is designed primarily for families and groups of friends who value privacy, architecture, comfort, landscape and shared time.

## Website

- [Home](ACTUAL_URL)
- [Residence](ACTUAL_URL/...)
- [Architecture](ACTUAL_URL/...)
- [Gallery](ACTUAL_URL/...)
- [Location](ACTUAL_URL/...)
- [Availability](ACTUAL_URL/...)

Only include links to pages that actually exist.

## Contact

Use the verified official contact details from the existing website.

Do not invent contact information.
```

Keep this factual. Do not add marketing fluff or keyword stuffing.

---

## 22. Semantic HTML and Heading Hierarchy

Review the existing HTML and improve semantic structure without changing visual appearance.

Use appropriately:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Use descriptive `aria-label` attributes where useful.

Ensure there is exactly one meaningful homepage H1.

The homepage H1 should be the existing hero statement:

> A private residence, shaped by light and landscape.

Use H2 for major visible sections.

Do not add invisible headings for SEO.

---

## 23. SEO Copy and Voice

Do not rewrite the site into SEO copy.

Maintain the established TenTwo voice:

- calm
- confident
- sophisticated
- warm
- understated
- contemporary
- editorial

Avoid:

- best
- ultimate
- paradise
- dream holiday
- once-in-a-lifetime
- exclusive getaway
- luxury escape
- cheap
- deal
- budget

Do not repeatedly use "luxury".

The architecture and privacy should communicate the premium positioning.

---

## 24. Location Search Context

Make sure the website naturally communicates:

- TenTwo
- Kandy
- Sri Lanka
- private residence
- contemporary residence
- private pool

Do not repeat terms unnaturally.

Do not claim the property is "in Kandy" if it is actually outside Kandy. Use the correct verified locality.

---

## 25. Search Intent

The site should naturally establish relevance for searches such as:

- private residence near Kandy
- private villa near Kandy
- contemporary villa Kandy
- private pool accommodation Kandy
- architectural villa Sri Lanka
- private residence Sri Lanka
- family villa near Kandy
- group accommodation near Kandy
- private villa Sri Lanka
- contemporary accommodation near Kandy

Do not add these as a keyword list, hidden text, or keyword block.

Establish the concepts through natural content and accurate metadata.

---

## 26. AI Answerability

Review the visible page and ensure an AI system can answer these questions from the website without guessing:

1. What is TenTwo?
2. Where is TenTwo?
3. Is TenTwo a hotel or private residence?
4. Is the residence shared with other guests?
5. Who is TenTwo designed for?
6. Is the pool private?
7. What makes the architecture distinctive?
8. How many private suites are there?
9. What shared spaces exist?
10. What is nearby?
11. How can someone check availability?
12. How can someone contact TenTwo?

If an answer cannot be determined from the existing website, identify the missing information rather than inventing it.

Do not add an FAQ section unless instructed.

---

## 27. Validation

After implementation:

- validate JSON-LD syntax
- verify Schema.org property names
- verify all URLs
- remove placeholder URLs before production
- remove fabricated values
- check for duplicate/conflicting entities
- use consistent `@id` values

---

## 28. Performance

Do not compromise performance for SEO.

Ensure:

- hero image has appropriate loading priority
- below-the-fold images use lazy loading
- images have width/height or aspect-ratio where practical
- no unnecessary JavaScript
- no huge external SEO libraries
- fonts load efficiently
- no unnecessary render-blocking scripts

For the primary hero image, use:

```html
fetchpriority="high"
```

where appropriate.

Do not lazy-load the primary hero image.

---

## 29. Production Indexing Safety

Search the project for:

- `localhost`
- `127.0.0.1`
- `staging`
- `noindex`
- `nofollow`
- `example.com`
- `your-domain`
- `placeholder`
- `TODO`

Make sure there are no accidental:

- `noindex`
- `nofollow`
- canonical URLs pointing to localhost
- canonical URLs pointing to staging
- staging URLs
- temporary URLs

that would affect production indexing.

---

## 30. Search Console / Bing Webmaster Tools

Do not invent verification tokens.

If existing verification metadata is present, preserve it.

If not, add clearly marked locations where verified tokens can later be inserted:

```html
<!-- GOOGLE SEARCH CONSOLE VERIFICATION TOKEN GOES HERE -->
<!-- BING WEBMASTER VERIFICATION TOKEN GOES HERE -->
```

Do not invent tokens.

---

## 31. Analytics

Do not add analytics unless an existing analytics implementation already exists.

If analytics already exists:

- preserve it
- ensure it does not interfere with indexing
- do not duplicate scripts

Do not introduce Google Analytics as part of this task.

---

## 32. Social Profiles

If official TenTwo social profiles exist in the project, connect them through `sameAs`.

Only use verified official accounts.

Never invent social URLs.

---

## 33. Expected Files

The implementation should result in the appropriate files:

```text
index.html
robots.txt
sitemap.xml
llms.txt
```

and any necessary updates to:

- CSS
- JS
- image metadata

Do not create unnecessary files.

---

## 34. Final Checklist

Confirm:

- [ ] `<title>` exists and is accurate
- [ ] meta description exists
- [ ] canonical URL exists
- [ ] robots meta exists
- [ ] Open Graph metadata exists
- [ ] Twitter/X metadata exists
- [ ] `lang="en"` exists
- [ ] JSON-LD exists
- [ ] LodgingBusiness/property schema is accurate
- [ ] WebSite schema exists
- [ ] no fabricated reviews
- [ ] no fabricated ratings
- [ ] no fabricated prices
- [ ] no fake amenities
- [ ] image alt text is descriptive
- [ ] sitemap.xml exists
- [ ] robots.txt exists
- [ ] sitemap is referenced from robots.txt
- [ ] llms.txt exists
- [ ] legitimate search/AI crawlers are not unnecessarily blocked
- [ ] no accidental noindex
- [ ] no staging/localhost canonical
- [ ] no fake verification tokens
- [ ] no fake social accounts
- [ ] no fake hreflang pages
- [ ] no hidden keyword stuffing
- [ ] no invisible SEO text
- [ ] visible editorial copy remains unchanged
- [ ] visual design remains unchanged

---

## 35. Final Report Required From Claude

At the end, provide a concise implementation report containing:

1. Files created/modified
2. Metadata added
3. Structured data added
4. Crawler/directive configuration
5. Sitemap status
6. llms.txt status
7. Any factual information still needing to be supplied
8. Any production-domain URLs requiring confirmation

---

## Final Instruction

This is a **technical discoverability implementation**, not a content or visual redesign.

Do not:

- redesign the page
- add new visible sections
- add generic SEO copy
- add keyword blocks
- add fake FAQs
- add fake reviews
- add fake ratings
- add fake prices
- invent facts
- change the established visual design

Use the existing TenTwo content as the source of truth.

Where information is missing, flag it for the site owner rather than guessing.

Make no unrelated changes.
