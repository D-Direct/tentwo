# TENTWO — PREMIUM UI REDESIGN
## IMPLEMENTATION SPECIFICATION — VERSION 2

You are redesigning the existing TenTwo website in this VS Code project.

I have reviewed the current implementation.

The current design is too traditional and resembles an older luxury villa / boutique hotel website.

I want a substantial visual redesign.

**Do not simply refine the existing CSS.**

**Rebuild the visual system and page composition.**

The finished result must feel like a premium contemporary architectural residence website created by a high-end digital design studio.

---

# 1. PRIMARY VISUAL TARGET

The visual quality should feel comparable to:

- contemporary architecture studios
- premium private residences
- high-end editorial property websites
- Aman-style restraint
- modern Japanese hospitality design
- contemporary architecture magazines

Do NOT imitate any specific website.

Do NOT copy another brand.

The goal is:

> Contemporary architectural luxury through typography, scale, photography, whitespace and composition.

It must NOT look like:

- Airbnb
- Booking.com
- a hotel template
- a resort website
- a generic luxury villa
- a WordPress property template
- an old-fashioned boutique hotel

---

# 2. MAJOR CHANGE: FULL-BLEED VISUAL DESIGN

The current website incorrectly constrains major visual areas inside a 1440px content container.

Change this.

The following elements MUST be full viewport width:

- hero
- pool section
- major architectural photography
- selected gallery images

Use:

```css
width: 100%;
max-width: none;
```

Do not apply the global content max-width to full-bleed sections.

---

# 3. HERO — REBUILD COMPLETELY

The hero must occupy the entire viewport.

Use:

```css
.hero {
    width: 100%;
    height: 100svh;
    min-height: 720px;
    position: relative;
    overflow: hidden;
}
```

The image must touch:

- left edge
- right edge
- top edge
- bottom edge

There must be NO ivory margin around the hero.

There must be NO boxed hero.

There must be NO max-width on the hero.

Use the existing:

```text
images/hero.webp
```

as the hero image.

Use:

```css
background-size: cover;
background-position: center center;
```

Add a subtle dark overlay of approximately:

```css
rgba(0,0,0,0.20)
```

Do not use a heavy gradient.

---

# 4. HERO TYPOGRAPHY

Change the typography system.

Use Google Fonts:

### Display

```text
Instrument Serif
```

### UI / body

```text
Manrope
```

Import:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet">
```

Do not use Cormorant Garamond.

Do not use Jost.

The typography should feel more contemporary.

---

# 5. HERO TEXT

Use exactly:

Eyebrow:

```text
PRIVATE CONTEMPORARY RESIDENCE
```

H1:

```text
A private residence,
shaped by light
and landscape.
```

The line breaks should be deliberate on desktop.

Use:

```css
font-family: "Instrument Serif";
font-weight: 400;
font-size: clamp(64px, 7.5vw, 118px);
line-height: 0.88;
letter-spacing: -0.025em;
```

Maximum width approximately:

```text
760px
```

Supporting copy:

```text
A contemporary residence near Kandy, designed for families and friends to share the entire space — privately, comfortably and at their own pace.
```

Maximum width:

```text
520px
```

Do not make the supporting paragraph too large.

---

# 6. HERO CONTENT POSITION

Place content approximately:

```css
left: clamp(24px, 6vw, 96px);
bottom: clamp(48px, 8vw, 110px);
```

Do NOT center the hero text.

Do NOT vertically center everything.

The composition should feel editorial.

Add a small vertical scroll indicator on the bottom right.

It should be extremely subtle.

---

# 7. HEADER

The header must float over the hero.

Background:

```text
transparent
```

No white header bar.

No visible container.

Height approximately:

```text
88px
```

Logo:

```text
TENTWO
```

Manrope.

12px.

Letter spacing:

0.24em.

Navigation:

```text
RESIDENCE
ARCHITECTURE
GALLERY
LOCATION
```

CTA:

```text
CHECK AVAILABILITY
```

All white over hero.

After scrolling:

- background becomes rgba(245,243,238,0.94)
- backdrop-filter blur(18px)
- text becomes #171816
- height reduces subtly to approximately 76px

Transition:

300–500ms.

---

# 8. DO NOT MAKE THE HEADER LOOK LIKE A STANDARD HOTEL NAV

Avoid:

- large solid navigation bars
- thick buttons
- pill buttons
- shadows
- excessive spacing between nav items
- decorative borders

Keep it extremely clean.

---

# 9. PAGE COLOUR SYSTEM

Use this palette:

```css
--ink: #171816;
--ink-soft: #30312d;
--ivory: #F4F2ED;
--paper: #FAF9F6;
--stone: #D7D3CA;
--muted: #85847C;
--line: rgba(23,24,22,.14);
--white: #FFFFFF;
```

Do NOT use bronze/gold as a prominent accent.

No gold buttons.

No luxury-gold styling.

---

# 10. CONTENT WIDTH

For normal text/content:

```css
--page-pad: clamp(24px, 5vw, 88px);
--content-max: 1380px;
```

However:

**Never apply `max-width: 1380px` to full-bleed image sections.**

Text can be constrained.

Photography should often escape the text container.

---

# 11. SECTION RHYTHM

Do not make every section follow:

```text
image | text
text | image
image | text
```

That pattern is too predictable.

Create a visual rhythm using:

- full-width images
- asymmetric grids
- large whitespace
- text interludes
- overlapping images
- varying image sizes
- dark sections
- full-bleed photography

---

# 12. SECTION 2 — PRIVATE RESIDENCE

This section should be mostly whitespace.

Background:

```text
#F4F2ED
```

Height approximately:

```text
70vh
```

Minimum:

```text
600px
```

Place content near the centre-left.

Eyebrow:

```text
THE ENTIRE RESIDENCE
```

Headline:

```text
The entire residence,
exclusively yours.
```

Use Instrument Serif.

Font size:

```text
clamp(52px, 6vw, 88px)
```

On the right, use:

```text
TenTwo is reserved for one family or group at a time. The residence, private pool, living spaces and rooftop terrace are yours throughout your stay.
```

Then three small details horizontally:

```text
01
ENTIRE RESIDENCE

02
PRIVATE POOL

03
ONE GROUP AT A TIME
```

Do not use cards.

Do not use shadows.

Do not use rounded boxes.

---

# 13. ARCHITECTURE — FULL BLEED

This is a major visual moment.

Use:

```text
images/exterior-main.jpg
```

Create a full-width image.

Height:

```text
75–85vh
```

No container.

No border radius.

No margin on left/right.

Overlay a small text block.

Eyebrow:

```text
ARCHITECTURE
```

Headline:

```text
Designed around
light, water and landscape.
```

Text colour:

white.

Position:

bottom-left.

Do NOT put the image into a 65/35 content grid.

This must be full bleed.

---

# 14. ARCHITECTURE TEXT INTERLUDE

Immediately after the full-width architecture image, create a generous whitespace section.

Do not repeat the same headline.

Use:

```text
Floor-to-ceiling glass, clean lines and natural materials create a continuous connection between the residence and its surroundings.
```

Large body typography.

Maximum width:

700px.

Position asymmetrically.

This creates editorial rhythm.

---

# 15. LIVING SECTION

Do not use the current conventional 50/50 grid.

Create an asymmetrical composition.

Use:

```text
images/living-room.jpg
```

Image should occupy approximately 60–65% viewport width.

Height:

approximately 75vh.

Place text in the remaining area.

Headline:

```text
Space to gather.
Space to retreat.
```

Body:

```text
TenTwo is designed around the rhythm of shared time. Come together around the kitchen, living room and pool, then retreat to your own suite when you want quiet.
```

The image should visually extend beyond the normal text grid.

---

# 16. SUITES — DO NOT USE CARDS

Remove the current three-card layout.

Do NOT create:

```text
[image]
Master Suite
text
```

repeated three times.

Instead:

Create a large editorial section.

Eyebrow:

```text
THE RESIDENCE
```

Headline:

```text
Room for everyone.
Space for yourself.
```

Then create a staggered image composition:

- Master Suite image large
- Garden Suite image smaller and offset vertically
- Upper Suite image medium

Use CSS grid with intentional offsets.

No cards.

No borders.

No shadows.

No rounded corners.

Below each image use only:

```text
MASTER SUITE
GARDEN SUITE
UPPER SUITE
```

Use small Manrope uppercase typography.

---

# 17. LIVING & DINING

Use:

```text
images/dining.jpg
```

Make this a large editorial image.

Approximately:

```text
80vw
```

not constrained to the main content width.

Position it with a small text block partially offset from the image.

Headline:

```text
Made for long lunches,
slow mornings and evenings together.
```

Keep body copy short.

---

# 18. POOL — FULL SCREEN

The pool is a hero-level visual.

Use:

```text
images/pool.jpeg
```

Create:

```css
height: 90svh;
min-height: 700px;
width: 100%;
```

Full bleed.

No margins.

No container.

No cards.

Text bottom-left:

```text
PRIVATE POOL
```

Headline:

```text
Water, light
and open space.
```

Only a very short supporting sentence.

Do not clutter this section.

---

# 19. ROOFTOP

Use a different existing rooftop/exterior image if one exists.

Do NOT reuse `exterior-main.jpg` if another suitable image exists.

Create a split composition where:

- image occupies approximately 65%
- text occupies approximately 35%

But allow the image to extend beyond the normal content container.

Headline:

```text
Above the residence,
open to the landscape.
```

---

# 20. GALLERY

The gallery must NOT look like a standard masonry card grid.

Create a premium editorial gallery.

Use:

- large horizontal image
- tall portrait image
- smaller supporting image
- full-width image

Use significant whitespace between some images.

Example layout:

```text
        LARGE IMAGE
        ───────────────────────────────

                         SMALL IMAGE
                         ────────────

    TALL IMAGE
    ──────────

                         LARGE IMAGE
                         ─────────────
```

Allow images to overlap slightly where appropriate.

No borders.

No rounded corners.

No captions unless necessary.

Hover:

```css
transform: scale(1.03);
```

Slow transition.

---

# 21. LOCATION

Keep this section extremely minimal.

Background:

```text
#FAF9F6
```

Headline:

```text
Close to Kandy.
Removed from the everyday.
```

Do not create four large cards for nearby places.

Instead use a simple editorial list:

```text
KANDY                         15 MIN
BANDARANAIKE INTERNATIONAL   2.5 HRS
TEMPLE OF THE TOOTH           20 MIN
ROYAL BOTANICAL GARDENS       25 MIN
```

Use actual values currently present in the project.

Typography should be small and precise.

---

# 22. AVAILABILITY

Make this section visually strong.

Background:

```text
#171816
```

Height:

approximately:

```text
75vh
```

Eyebrow:

```text
YOUR STAY AT TENTWO
```

Headline:

```text
Your dates.
Your residence.
```

Use Instrument Serif.

Large.

Form should be horizontal on desktop.

But do NOT make it look like a booking engine.

Fields should be minimal:

```text
ARRIVAL
DEPARTURE
GUESTS
EMAIL
```

Thin borders.

No cards.

No shadows.

No rounded corners.

Button:

```text
CHECK AVAILABILITY
```

---

# 23. OTA LINKS

Move OTA links away from the main booking interface.

Do not create large platform cards.

At the bottom of the availability section use small text:

```text
Prefer to book through a travel platform?
```

Then:

```text
Booking.com
Airbnb
Agoda
Trip.com
```

Use small muted text links.

---

# 24. FOOTER

Keep the footer extremely minimal.

Dark background.

Large TENTWO wordmark.

Small text:

```text
Private contemporary residence near Kandy, Sri Lanka.
```

Navigation can be small.

Do not create a large corporate footer.

---

# 25. REMOVE THESE CURRENT DESIGN PATTERNS

Remove:

- max-width container around hero
- boxed hero
- repeated 50/50 sections
- repeated cards
- card-like accommodation presentation
- excessive borders
- excessive small uppercase labels
- large button rectangles
- gold/bronze accents
- old-fashioned serif-heavy typography
- symmetrical gallery
- generic hotel booking appearance
- unnecessary section boxes
- repetitive "image + text" rhythm

---

# 26. IMAGE QUALITY

Use the actual images in:

```text
images/
```

Before coding, inspect the available images.

Identify the best image for:

- hero
- architecture
- living
- dining
- pool
- suites
- rooftop
- gallery

Do not blindly reuse the same image.

Do not use placeholder images.

Do not use external stock photography.

---

# 27. IMAGE CROPPING

Use aggressive but tasteful cropping.

Images should feel immersive.

Use:

```css
object-fit: cover;
```

Use different aspect ratios.

Do not make every image the same height.

This variation is essential to the premium editorial appearance.

---

# 28. TYPOGRAPHY RULE

The website should NOT look like a typography showcase.

Use large serif typography only where it creates impact.

Most UI should be Manrope.

Use Instrument Serif for:

- hero H1
- major H2s
- occasional editorial statements

Do not use serif for:

- buttons
- navigation
- labels
- body copy
- forms

---

# 29. MICRO TYPOGRAPHY

Labels:

```text
10–11px
letter-spacing: .16em
uppercase
```

Body:

```text
16–18px
line-height: 1.7
```

Never make body copy too dark or too heavy.

Use:

```text
font-weight: 300 / 400
```

---

# 30. BUTTONS

No pill buttons.

No rounded buttons.

Use rectangular buttons with either:

```text
border: 1px solid currentColor;
```

or minimal text links.

Height:

approximately 52–56px.

Horizontal padding:

28px.

Typography:

10–11px.

Letter spacing:

0.15em.

---

# 31. ANIMATION

The current simple reveal animation is acceptable but insufficient.

Use subtle:

- image reveal
- opacity
- translateY 24px
- image scale from 1.04 to 1
- navigation transition

Do not animate every text element individually.

Animations must feel slow and expensive.

Recommended duration:

```text
800–1200ms
```

Use cubic-bezier easing.

Respect:

```css
prefers-reduced-motion
```

---

# 32. MOBILE

Mobile must retain the premium visual hierarchy.

Hero:

```text
height: 92svh
```

Hero remains full bleed.

H1:

approximately:

```text
52–62px
```

depending on viewport.

Do not reduce the hero into a small banner.

Images should remain large.

Pool:

approximately:

```text
80svh
```

Do not turn the page into a sequence of small cards.

The mobile version should feel editorial too.

---

# 33. DESKTOP BREAKPOINTS

Use:

```text
1440+
1200
1024
768
640
```

At large desktop widths, use the extra space for composition rather than simply increasing font sizes.

---

# 34. IMPORTANT: FULL-BLEED SECTION TECHNIQUE

If the page content is inside a centered wrapper, full-width sections must escape that wrapper.

Use either:

```css
.full-bleed {
    width: 100vw;
    margin-left: calc(50% - 50vw);
}
```

or structure the HTML so the full-width sections are outside the constrained content wrapper.

Do NOT accidentally produce:

```text
[ ivory margin ][ image ][ ivory margin ]
```

for hero/pool/major architecture images.

The hero and pool MUST touch both edges of the browser.

---

# 35. NO GENERIC DESIGN COMPONENTS

Do not create:

- feature cards
- testimonial cards
- review widgets
- rating badges
- "amenities" icon grids
- pricing cards
- booking cards
- decorative stat cards

TenTwo is being presented as an architectural residence.

---

# 36. FINAL VISUAL TEST

After implementation, view the page at 1440px width.

The first viewport should look approximately like:

```text
FULL SCREEN ARCHITECTURAL PHOTOGRAPHY

TENTWO                              MENU / NAV

                                     

A private residence,
shaped by light
and landscape.

PRIVATE CONTEMPORARY RESIDENCE

CHECK AVAILABILITY
```

There should be almost no visible "website chrome".

The photography should dominate.

---

# 37. MOST IMPORTANT DESIGN RULE

If you have to choose between:

A) adding more information

or

B) creating more visual space

choose B.

If you have to choose between:

A) adding another card

or

B) using one large photograph

choose B.

If you have to choose between:

A) adding another decorative element

or

B) leaving whitespace

choose B.

The website should feel premium because it is **restrained, spacious and confident**.

---

# 38. IMPLEMENTATION

Do not create a mockup.

Actually modify the existing project.

Use the existing image assets.

Replace the current CSS architecture where necessary.

Restructure HTML where necessary.

Keep vanilla HTML/CSS/JS.

Do not introduce React, Tailwind, Bootstrap or another framework.

Preserve working functionality.

After implementation, check the page at:

1440px
1280px
1024px
768px
390px
375px

Fix all overflow, image and responsive issues.

---

# 39. FINAL ACCEPTANCE CRITERIA

The result is acceptable only if:

- Hero image touches both sides of viewport.
- Hero image fills the viewport vertically.
- Hero feels cinematic.
- Header sits elegantly over the hero.
- The page does not feel like a hotel template.
- The page does not feel like Airbnb.
- Photography is larger and more dominant.
- Sections have varied compositions.
- There are no repetitive cards.
- Typography feels contemporary.
- Instrument Serif is used selectively.
- Manrope is used for UI/body.
- There is strong light/dark contrast.
- Gallery feels editorial.
- Pool is full bleed.
- Architecture is full bleed.
- Mobile retains the premium feel.
- There is generous whitespace.
- No unnecessary decorative UI exists.

The desired overall impression is:

**private contemporary residence**

not:

**luxury holiday rental.**