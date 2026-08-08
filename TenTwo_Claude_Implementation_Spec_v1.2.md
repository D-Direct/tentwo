# TenTwo Website Implementation Specification
## Brand & Experience Manual v1.0 — Claude Code Execution Brief

You are implementing the approved TenTwo Brand & Experience Manual v1.0.

IMPORTANT:
The supplied copy is approved brand content. Do not rewrite, paraphrase, shorten, expand or creatively reinterpret it unless the instruction explicitly says to do so.

Your role is implementation, frontend engineering, UX refinement, technical SEO, accessibility and validation.

Do not make independent branding decisions.

---

# 1. Primary Objective

Transform the existing TenTwo website into the approved luxury hospitality experience while preserving the current visual identity:

- dark neutral palette
- ivory typography
- muted gold accents
- Cormorant + Jost typography
- minimal editorial aesthetic
- responsive layout
- existing image-slot functionality
- existing lightbox functionality
- existing reservation form mechanism

Do not replace the technology stack unnecessarily.

Do not introduce a framework or library unless technically required.

---

# 2. Source Files

The current project contains:

- index.html
- support.js
- image-slot.js
- assets/

Inspect the existing implementation before editing.

Do not remove working image-slot functionality.

---

# 3. Critical Brand Rules

Primary positioning:

A Contemporary Private Residence for Exclusive Stays

Brand line:

Where Architecture Meets Nature

Primary audience:

Families and groups of friends.

Primary markets:

UK, Europe, US, Australia, Japan, China, South Korea.

Entire-property model:

Every reservation includes exclusive use of the entire residence.

Exact address:

Do NOT publish it.

General location:

Near Kandy, Sri Lanka, approximately 8 km from Kandy city centre.

---

# 4. Hero — IMPLEMENT EXACTLY

Replace the current hero composition with a full-screen cinematic video layout.

Do NOT create an image carousel.

Use a video placeholder until the final video is supplied.

Required placeholder:

`TODO: HERO VIDEO — REPLACE WITH FINAL CINEMATIC VIDEO`

The hero media container must support:

- full viewport width
- full viewport height
- object-fit: cover
- autoplay
- muted
- loop
- playsinline
- poster placeholder
- graceful fallback image placeholder
- accessible fallback text

Do not add music.

Hero copy:

TEN TWO

A Contemporary Private Residence for Exclusive Stays

Where Architecture Meets Nature

Discover a refined private residence in the peaceful hills near Kandy, thoughtfully designed for families and friends seeking complete privacy, contemporary architecture and meaningful moments together. Every reservation includes exclusive use of the entire residence.

Buttons:

Book Your Stay

Discover TenTwo

Do not add extra hero copy.

---

# 5. Homepage Information Architecture

Use this order:

1. Hero
2. The Experience
3. Architecture / Residence
4. Entire Residence
5. Master Suite
6. Bedrooms
7. Living & Dining
8. Rooftop
9. Private Pool
10. A Day at TenTwo
11. Why TenTwo
12. Explore Kandy
13. Gallery
14. Guest Experiences
15. FAQ
16. Reservation
17. Footer

The sequence should feel editorial rather than like a generic hotel feature list.

---

# 6. Exact Homepage Copy

Use the following copy exactly.

## THE EXPERIENCE

Eyebrow:
THE EXPERIENCE

Heading:
A place to slow down, together.

Copy:
TenTwo is designed around the simple pleasure of having space to yourselves. Start the morning with coffee on the balcony, spend the afternoon beside the private pool, gather around the dining table as the light changes, and return to the rooftop as Kandy settles into evening.

Every space is connected to the landscape through glass, light and open views — creating a stay that feels both contemporary and deeply rooted in its surroundings.

---

## THE RESIDENCE

Heading:
Designed around light, water and landscape.

Copy:
Floor-to-ceiling glass brings the surrounding landscape into the heart of TenTwo. Reflections from the pool change with the light, while open views and carefully framed spaces create a quiet connection between the residence and nature.

The architecture is contemporary and deliberately restrained, allowing the landscape to remain part of the experience rather than simply a backdrop.

Media placeholder:
TODO: ARCHITECTURE — FUTURE IMAGE

---

## ENTIRE RESIDENCE

Heading:
The entire residence, exclusively yours.

Copy:
TenTwo is reserved as one private residence. Families and groups of friends have the entire property to themselves, including the private pool, living spaces, bedrooms and rooftop terrace.

There are no unrelated guests sharing the residence during your stay — just your own space, your own pace and time together.

---

## MASTER SUITE

Eyebrow:
THE MASTER SUITE

Heading:
Wake to a landscape that changes with the light.

Copy:
The master bedroom opens through glass doors onto a spacious private balcony. On one side, green paddy fields extend into the landscape; on the other, the private pool sits immediately below.

It is a quiet place to begin the day — with natural light, open views and the surrounding landscape close at hand.

Media placeholder:
TODO: MASTER BEDROOM + BALCONY — FUTURE IMAGE

---

## BEDROOMS

Eyebrow:
THE BEDROOMS

Heading:
Three private suites for time together — and time apart.

Intro:
Three en-suite bedrooms give families and friends the freedom to gather together while still having their own private space.

Bedroom 1:
Poolside Suite

An en-suite bedroom with floor-to-ceiling glass opening toward the pool terrace, combining privacy with a direct connection to the outdoors.

Bedroom 2:
Upper Suite

An en-suite bedroom with a private balcony and views across the surrounding landscape.

Bedroom 3:
Quiet Suite

A calm en-suite bedroom set slightly apart from the pool, offering a more secluded place to retreat.

IMPORTANT:
If the physical room configuration differs from these descriptions, stop and flag it rather than inventing a correction.

---

## LIVING & DINING

Heading:
Spaces made for being together.

Copy:
The living and dining spaces form the social heart of TenTwo. A fully equipped kitchen, six-seater dining table and comfortable living area make it easy to share slow breakfasts, long lunches and relaxed evenings together.

The design keeps the landscape present throughout the day, with glass, water and natural light shaping the atmosphere of the residence.

---

## ROOFTOP

Heading:
Above the residence, another place to pause.

Copy:
The rooftop terrace extends the living experience outdoors, offering space to sit, dine, watch the light change and enjoy the quiet of the surrounding hills.

Media placeholder:
TODO: ROOFTOP — FUTURE IMAGE

---

## PRIVATE POOL

Heading:
Your pool. Your time.

Copy:
The private pool runs alongside the residence, becoming part of the architecture through reflections, open views and changing light. It is exclusively for guests staying at TenTwo.

Media placeholder:
TODO: PRIVATE POOL — FUTURE IMAGE

---

## A DAY AT TENTWO

Eyebrow:
A DAY AT TENTWO

Heading:
The rhythm of a stay.

Morning:
Begin slowly.

Open the glass doors, step onto the balcony and watch the morning light settle across the paddy fields.

Afternoon:
Stay awhile.

Swim, read, talk and take your time beside the private pool.

Evening:
Come together.

Gather around the table as the light softens across the residence and surrounding hills.

Night:
Look up.

End the day on the rooftop, with the quiet of the hills around you.

---

## WHY TENTWO

Eyebrow:
WHY TENTWO

Heading:
More than a place to stay.

Entire Residence:
Reserved exclusively for your family or group of friends.

Contemporary Architecture:
Glass, water, natural light and clean lines shape the experience.

Private Pool:
A pool that belongs only to the guests staying at TenTwo.

Near Kandy:
Close enough to explore Kandy, while removed enough to return to quiet.

---

## EXPLORE KANDY

Eyebrow:
EXPLORE KANDY

Heading:
Your private base for discovering Kandy.

Copy:
From TenTwo, Kandy's cultural landmarks, gardens and surrounding landscapes are within easy reach. Spend the day exploring the city, discovering Sri Lanka's heritage and travelling beyond Kandy, then return to the quiet of your private residence.

Do not publish unverified attraction distances or travel times.

---

## GALLERY

Eyebrow:
THE RESIDENCE

Heading:
Where architecture meets nature.

Supporting line:
A closer look at TenTwo, from morning light to evening calm.

---

## GUEST EXPERIENCES

Eyebrow:
GUEST EXPERIENCES

Heading:
Your experience comes first.

Copy:
TenTwo is beginning its first chapter. Guest experiences and reviews will appear here as our first stays unfold.

Never fabricate testimonials.

---

# 7. FAQ — EXACT DATA

Use these exact questions and answers.

Q:
How far is TenTwo from Kandy city centre?

A:
TenTwo is approximately 8 km from Kandy city centre. The journey is typically around 20 minutes by car, depending on traffic and road conditions.

Q:
Is TenTwo rented as an entire residence?

A:
Yes. TenTwo is offered exclusively as an entire private residence. The property is not shared with unrelated guests during your stay.

Q:
Is the swimming pool private?

A:
Yes. The swimming pool is exclusively for guests staying at TenTwo.

Q:
How many guests can stay at TenTwo?

A:
TenTwo accommodates up to 6 adults across three bedrooms: one king bed in the master bedroom and one queen bed in each of the two standard bedrooms.

Q:
What facilities are available?

A:
TenTwo includes three air-conditioned en-suite bedrooms with fans, a private pool, fully equipped kitchen, six-seater dining area, living space with smart TV, rooftop terrace, high-speed Wi-Fi and secure on-site parking.

Q:
Is there a kitchen?

A:
Yes. The fully equipped kitchen is available for guests to prepare their own meals. Cereal, coffee and tea are available for guests to prepare themselves.

Q:
Is Wi-Fi available?

A:
Yes. High-speed Wi-Fi is available throughout the residence.

Q:
What are the check-in and check-out times?

A:
Standard check-in is from 2:00 PM and check-out is by 11:00 AM. Late check-out may be available when there is no subsequent booking and can be requested in advance.

Q:
Is the exact location shown on the website?

A:
We share the general location of TenTwo near Kandy, but the exact address and detailed directions are provided after a reservation is confirmed, for the privacy and security of our guests.

Q:
How do I make a reservation?

A:
Submit a reservation request with your preferred dates and number of guests. We will confirm availability and the next steps by email.

Q:
Is TenTwo suitable for families?

A:
Yes. TenTwo is designed with families and groups of friends in mind, with private bedrooms, shared living spaces and the entire residence reserved exclusively for your stay.

Q:
Can I book through a booking platform?

A:
TenTwo may also be made available through selected booking platforms. Use only verified, active booking links when these listings are live.

---

# 8. Reservation Section

Eyebrow:
RESERVE YOUR STAY

Heading:
Your private residence awaits.

Copy:
Share your preferred dates and number of guests. We will confirm availability and guide you through the next steps.

Primary button:
Request a Reservation

Form labels:
Name
Email
Phone / WhatsApp
Number of Guests
Check-in
Check-out
Message (optional)

Submit:
Send Reservation Request

Success heading:
Thank you.

Success text:
Your request has been received. We will be in touch shortly regarding your stay at TenTwo.

Do not display Airbnb / Booking.com / VRBO buttons unless real URLs are configured.

---

# 9. Footer

TEN TWO

A contemporary private residence near Kandy, Sri Lanka.

Exact directions are shared after reservation confirmation.

© 2026 TenTwo. All rights reserved.

Do not use “TenTwo Villa” in the copyright line.

---

# 10. Navigation

Use:

About
The Residence
Gallery
FAQ
Reserve

Avoid “Villa” as a navigation label.

Hero CTA:
Book Your Stay

Reservation CTA:
Request a Reservation

---

# 11. Image Placeholders

Keep the existing image-slot mechanism.

Replace media progressively with semantic placeholders.

Required IDs/placeholders:

hero-video
architecture
master-bedroom
master-balcony
bedroom-1
bedroom-2
bedroom-3
living-room
dining
kitchen
rooftop
pool
gallery-architecture
gallery-master
gallery-paddy
gallery-living
gallery-dining
gallery-rooftop
gallery-pool
gallery-evening
gallery-night

Placeholder labels should be descriptive, e.g.:

“Future image — Master bedroom and balcony overlooking paddy fields”

Do not use generic “Drop a photo” text for important slots.

---

# 12. Hero Video Implementation

Use a `<video>` element.

Required attributes:
- autoplay
- muted
- loop
- playsinline
- preload appropriate to performance
- poster placeholder

Provide a poster/fallback image slot.

Provide accessible fallback text.

Respect `prefers-reduced-motion`:
If reduced motion is enabled, show the poster image instead of continuously playing the video.

Do not download or generate a video.

---

# 13. SEO Metadata

Replace existing metadata with:

Title:
TenTwo | Luxury Private Residence Near Kandy, Sri Lanka

Description:
Stay exclusively at TenTwo, a contemporary private residence near Kandy with a private pool, three en-suite bedrooms, rooftop terrace and views across the surrounding landscape.

Canonical:
https://tentwo.lk/

Open Graph title:
TenTwo | A Contemporary Private Residence Near Kandy

Open Graph description:
A private residence for exclusive stays, where contemporary architecture, glass, water and the landscape of Kandy come together.

Twitter title:
TenTwo | A Contemporary Private Residence Near Kandy

Twitter description:
Private stays for families and friends near Kandy, Sri Lanka. Contemporary architecture, private pool and complete use of the residence.

Add:
- og:image placeholder pointing to future social-share image
- og:url
- og:type
- twitter:card
- twitter:image
- canonical
- robots
- theme-color
- language metadata where appropriate

Do not add a keyword meta tag.

---

# 14. Semantic HTML

The current page relies heavily on `<div>` elements.

Improve semantics without changing the visual design.

Use:
<header>
<nav>
<main>
<section>
<article>
<footer>

Use exactly one meaningful H1:

A Contemporary Private Residence for Exclusive Stays

TEN TWO should be a visual brand element, not a second H1.

Use logical H2/H3 hierarchy.

Do not use hidden text as a substitute for visible semantic content.

---

# 15. Remove the Existing Hidden SEO/AI Summary

The current project contains a visually hidden block labelled:

SEO / AI Summary (hidden)

Do not use this pattern as the primary AI SEO strategy.

Remove the hidden summary and replace it with real visible semantic content.

Important information should be present naturally in the page.

---

# 16. Structured Data

Implement valid JSON-LD.

Use appropriate lodging schema.

Include:
- WebSite
- Organization
- LodgingBusiness or the most appropriate Schema.org lodging type
- FAQPage
- BreadcrumbList if additional pages are introduced
- ImageObject where appropriate

Do not invent:
- ratings
- reviews
- awards
- prices
- exact address
- exact coordinates
- maximum occupancy
- star classification

Validate JSON syntax.

---

# 17. Accessibility

Implement:
- meaningful alt text
- accessible buttons
- aria-labels where necessary
- keyboard-accessible lightbox
- visible focus states
- semantic headings
- sufficient contrast
- reduced-motion support
- descriptive form labels
- useful error messages

Examples of future alt text:

“TenTwo private residence with contemporary glass architecture and private pool”

“Master bedroom opening onto balcony overlooking green paddy fields near Kandy”

“Rooftop terrace at TenTwo overlooking the surrounding hills”

Do not stuff keywords into alt text.

---

# 18. Performance

Do not reduce current performance.

Implement:
- lazy loading for below-fold images
- appropriate image dimensions
- modern formats where available
- video loading discipline
- poster image for hero video
- avoid unnecessary JavaScript
- preserve current image-slot functionality

Hero video must not block initial page rendering.

---

# 19. Conversion

The site should communicate bookability without becoming sales-heavy.

Primary conversion:
Request a Reservation

Secondary:
Discover TenTwo

Do not use:
Buy Now
Book Villa
Best Price
Limited Time
Cheap
Deal

---

# 20. Exact Location Policy

Never add the actual street address.

Never add the house number.

Never add a map pin revealing the exact property.

Use:
“near Kandy”
“approximately 8 km from Kandy city centre”

Exact directions are shared after reservation confirmation.

---

# 21. Facts That Must Be Flagged, Not Invented

Before finalizing, report these as TODO/CONFIRMATION items if not known from the project:

- maximum guest capacity
- breakfast availability
- airport transfer availability
- final check-in/check-out times
- verified booking platform URLs
- exact travel time to Kandy
- final amenity list
- final bedroom descriptions

Do not silently guess.

---

# 22. Do Not Add Yet

Do not add:
- blog
- testimonials with invented content
- pricing
- availability calendar
- booking engine
- exact location map
- additional pages unless necessary for the approved structure

The current goal is to perfect the homepage experience and technical foundation.

---

# 23. Visual Direction

Preserve:
- dark background
- ivory text
- muted gold
- Cormorant
- Jost
- generous whitespace
- editorial spacing
- minimal controls
- quiet transitions

Avoid:
- bright gradients
- oversized rounded cards
- excessive shadows
- glassmorphism UI everywhere
- loud animations
- generic hotel-card styling
- stock-photo aesthetic

---

# 24. Implementation Process

Work in this order:

PHASE 1:
Inspect existing code and identify components/sections.

PHASE 2:
Implement exact approved copy and information architecture.

PHASE 3:
Implement hero video placeholder and media placeholders.

PHASE 4:
Implement semantic HTML and accessibility.

PHASE 5:
Implement metadata and structured data.

PHASE 6:
Implement FAQ and visible AI-readable content.

PHASE 7:
Optimize performance.

PHASE 8:
Run final QA.

After each phase, verify that the page still renders correctly.

---

# 25. Final QA Checklist

Before declaring completion:

[ ] One H1 only
[ ] Hero copy matches specification exactly
[ ] No hero carousel
[ ] Hero video placeholder works
[ ] Reduced-motion fallback works
[ ] No exact address exposed
[ ] Entire-residence positioning is obvious
[ ] Private pool positioning is obvious
[ ] Master balcony/paddy-field experience is represented
[ ] All copy matches the approved manual
[ ] No fabricated reviews
[ ] No fabricated facts
[ ] No dead booking links shown
[ ] FAQ renders correctly
[ ] FAQ structured data is valid
[ ] JSON-LD is valid
[ ] Canonical is correct
[ ] Open Graph metadata exists
[ ] Twitter metadata exists
[ ] Image alt text is meaningful
[ ] Keyboard navigation works
[ ] Mobile layout works
[ ] Desktop layout works
[ ] Lightbox remains functional
[ ] Image-slot functionality remains functional
[ ] Form remains functional
[ ] Lighthouse performance is not degraded
[ ] No console errors
[ ] No broken links
[ ] No accidental exact-address disclosure

At the end, provide a concise implementation report listing:
1. Files changed
2. Sections changed
3. SEO changes
4. Accessibility changes
5. Performance changes
6. Remaining confirmation items


# 26. Confirmed Guest Services

Implement the following as current services:

Breakfast:
Do not describe TenTwo as providing hosted breakfast. Guests can prepare their own breakfast in the fully equipped kitchen. Cereal, coffee and tea are available.

Airport transfers:
Available for an additional fee. Both airport pickup and drop-off are available. Advance booking is required.

Private driver:
A private driver can be arranged for guests who want to travel around Kandy or further across Sri Lanka. Do not imply the service is included.

Future services:
Do not advertise the future professional chef/dining service until it is operational.

Future amenity:
Do not advertise the planned rooftop BBQ until installed.

# 27. Confirmed Bedroom Configuration

There are exactly three bedrooms:
- one master bedroom
- two standard bedrooms

All three:
- air conditioning
- fan
- attached bathroom

Location:
- first floor: master bedroom + one standard bedroom
- ground floor: one standard bedroom

Master bedroom:
- floor-to-ceiling glass toward the pool
- floor-to-ceiling glass toward the paddy-field outlook
- large balcony

First-floor standard bedroom:
- floor-to-ceiling glass toward the pool

Ground-floor standard bedroom:
- floor-to-ceiling glass toward the pool
- separate wardrobe area

Do not change these facts or invent additional room features.

# 28. Booking Platform Placeholders

Keep placeholders for:
- Booking.com
- Agoda

Do not expose dead URLs. Render these links only when real URLs are configured, or retain them as clearly developer-only placeholders.

# 31. Remaining Confirmation

The previously outstanding maximum guest capacity is now confirmed as 6 adults.

No further accommodation-capacity confirmation is required at this stage.


# 30. Final Accommodation Facts — LOCKED

Maximum guest occupancy:
**6 adults**

Guest bedroom configuration:
- 3 guest bedrooms
- Master bedroom: 1 king bed
- First-floor standard bedroom: 1 queen bed
- Ground-floor standard bedroom: 1 queen bed
- All three guest bedrooms have air conditioning, fans and attached bathrooms

First-floor standard bedroom:
- floor-to-ceiling glass toward the pool
- separate wardrobe area

Ground-floor standard bedroom:
- floor-to-ceiling glass toward the pool
- no separate wardrobe area should be claimed

Master bedroom:
- floor-to-ceiling glass toward the pool
- floor-to-ceiling glass toward the paddy-field outlook
- large balcony

Important:
There is an additional small room with an attached bathroom intended for a driver. Do NOT count this as a guest bedroom, do NOT include it in the advertised bedroom count, and do NOT present it as guest accommodation on the public website. It is operational/support accommodation.

The public website should consistently communicate:
**3 bedrooms · sleeps up to 6 adults**
