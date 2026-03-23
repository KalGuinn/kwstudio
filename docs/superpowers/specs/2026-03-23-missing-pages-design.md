# Missing Pages — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Scope:** 4 new pages + 1 new component + navigation updates

## Context

The original Simplero site had pages not linked in the sitemap that were missed during the initial scrape. Two were identified by the site owner (`/bir`, `/teaching`), and two more were discovered in footer links (`/privacy-policy`, `/faq`). This spec covers building all four in the current design language, plus a future Phase B proof-of-concept for `/teaching` in a new design direction.

## Decisions

- **Forms**: All form CTAs are demo placeholders (no backend). Use `onsubmit="return false;"` or link externally.
- **Images**: Download from Simplero CDN into `src/assets/images/` for Astro optimization.
- **Navigation**: `/bir` is linked from `/priority` CTA, not directly in Nav. `/teaching` is linked from homepage offerings section (new card) and cross-linked from `/priority` — NOT in the main Nav (it's a time-limited workshop, not a permanent page). `/privacy-policy` and `/faq` go in Footer.
- **Placeholder CTAs**: Buttons that would link to external services (Simplero registration, payment) use `href="#"` with no action. Same demo-site approach as forms using `onsubmit="return false;"`.
- **Phase B**: After all 4 pages ship, rebuild `/teaching` on a separate branch in the new design language as a theming proof-of-concept.

---

## Page 1: /bir — Build It Remarkable Sales Page

**File:** `src/pages/bir.astro`
**Complexity:** High (14 sections, ~350 lines of content, ~13 images)
**Reference:** `scraped-content/bir.txt`, `scraped-content/bir.html`

### Sections (top to bottom)

1. **Hero (warm variant)**
   - BIR logo image (centered)
   - Headline: "Join Kellee and be part of the 2026 Cohort of Builders!"
   - Subtitle: program description
   - Urgency banner: "First Cohort of 2026 - Last chance to enroll at the 2025 value and save $400!"
   - Primary CTA: "YES! I'M READY TO JOIN NOW!" (gold, placeholder)
   - Sub-CTA: "(payment plan now available!)"
   - StickyCTA: fixed bottom bar "Join BIR — $2400" with gold CTA

2. **Pain Point (bg-white)**
   - SectionHeading: "STOP SPINNING YOUR WHEELS!"
   - Empathy copy (4 paragraphs)
   - Tertiary CTA: "Just Jump Me to the Details Please!" (anchor link)

3. **Origin Story (bg-brand-warm)**
   - SectionHeading: "HOW IT ALL STARTED" / "HOW IT'S GOING NOW"
   - Two-part narrative with Kellee portrait
   - Mentee name list
   - Photo grid (3-4 studio photos)

4. **Differentiator (bg-brand-dark)**
   - SectionHeading: "WHY BUILD IT REMARKABLE IS DIFFERENT"
   - Copy about artist-designed program vs marketing gurus
   - Builder's Framework callout
   - Gold CTA: "OK, I'M READY TO JOIN!"

5. **Features — 6 cards (bg-white)**
   - SectionHeading: "6 WAYS BUILD IT REMARKABLE® IS MORE THAN JUST A COURSE"
   - 3x2 grid of polished-cards:
     - Masterclasses, Q&A Coaching Calls, Community
     - Behind the Scenes Look, Ongoing Support, Bonuses That Matter
   - Each card: title + description paragraph

6. **Testimonial Spotlight (bg-brand-warm)**
   - Dianna Garrison testimonial with avatar (TestimonialCard)
   - Cat Rains section with video placeholder ("Click to hear what Cat Rains has to say")
   - Additional copy about BIR vs other programs
   - Contact email for questions

7. **Curriculum — 6 Modules (bg-white)**
   - SectionHeading: "THE PROGRAM: 6 BUSINESS BUILDING MODULES"
   - Intro text about 4 core areas + live coaching
   - 6 module blocks, each containing:
     - Module number + title (h3, gold accent)
     - Subtitle (uppercase description)
     - 4-5 bullet points of content
   - Modules: Do the Groundwork, Lay the Foundation, Build Your Framework, Construct a Simple System, Wired for Growth, Cement Your Success

8. **Pricing (bg-brand-dark)**
   - Headline: "$2400 — 12 Month Program"
   - "Valued at over $6000" callout
   - Payment plan: "$220/mo"
   - Urgency: "Last Chance to get 2025 rates!"
   - Gold CTA: "JOIN BUILD IT REMARKABLE"

9. **Bonus Bundles (bg-white)**
   - SectionHeading: "4 Bonus Bundles"
   - 4 polished-cards with bonus images:
     - Audience Breakthrough ($390 value)
     - Complete Profit Planning ($390 value)
     - Maker's Tech U Bundle ($390 value)
     - Sales Page Breakthrough ($390 value)
   - Tania Ahmed quote about sales page bonus

10. **More Testimonials (bg-brand-warm)**
    - SectionHeading: "RAVING REVIEWS"
    - Margarete Miller testimonial + avatar (TestimonialCard)
    - Delight Rogers testimonial + avatar (TestimonialCard)

11. **Qualification (bg-white)**
    - Two-column layout:
      - Left (gold left border): "BIR IS RIGHT FOR YOU IF..." — 7 ChecklistItems
      - Right (muted, gray left border): "BIR might NOT be right if..." — 4 items
    - Uses ChecklistItem component for the positive list

12. **FAQ (bg-brand-warm)**
    - SectionHeading: "More Details About the Program"
    - 12 FaqItem accordion components (NEW component):
      - Will I learn to make art? / Will I learn to sell art? / Will I learn to create a course? / Not a visual artist? / Can't make calls? / How long do I keep content? / How many people accepted? / Don't know what business? / Access timing? / Investment amount? / Good time for business? / Refund policy?

13. **Final CTA + Value Stack (bg-brand-dark)**
    - Full value breakdown list (program + bonuses with dollar values)
    - "We Officially Begin April 7th"
    - Price: $2400, payment plan $220/mo
    - Gold CTA: "OK! LET'S DO THIS!"
    - "Schedule a call" link

14. **Disclaimer (bg-brand-warm)**
    - Earnings disclaimer text
    - Copyright + privacy/terms links

### Images to Download (~13)

From Simplero CDN (`img.simplerousercontent.net`):
- BIR logo (2 variants)
- Kellee portrait (standing, studio)
- Studio photos (3-4 images)
- Module quote graphics (6 images)
- Bonus graphics (4 images)
- Testimonial avatars: Dianna Garrison, Margarete Miller, Delight Rogers, Cat Rains (existing: Brooke Henry)
- "4 ways" infographic
- Credit card icons
- "We have bonuses" graphic

### Components Used
- SectionHeading, TestimonialCard, ChecklistItem, CallToAction, StickyCTA, GoldSeparator
- polished-card class for feature and bonus cards
- **NEW: FaqItem** (see New Component section below)

---

## Page 2: /teaching — The Teaching Artist Workshop

**File:** `src/pages/teaching.astro`
**Complexity:** Medium (6 sections)
**Reference:** `scraped-content/teaching.txt`, `scraped-content/teaching.html`

### Sections

1. **Hero (warm variant)**
   - Workshop logo image: "The Teaching Artist Workshop"
   - Headline: "Calling all Artists and Makers! It's time for a reset..."
   - Intro paragraph about mentoring artists for 4 years

2. **What You'll Learn (bg-white)**
   - SectionHeading: "In this workshop, I'll walk you through:"
   - 5 ChecklistItems:
     - Why doing more doesn't fix the problem
     - How being pulled in too many directions slows growth
     - What it means to work within your Zone of Genius
     - The Rule of One framework
     - Walk away with clarity and new insights
   - Closing paragraph about Big Audacious Dreams

3. **Choose Your Time (bg-brand-warm)**
   - SectionHeading: "Join Kellee Wynne for a FREE Strategy Workshop!"
   - 2 session cards (polished-card):
     - Monday, March 30 · 7–8:30pm EDT
     - Tuesday, March 31 · 12–1:30pm EDT
   - Gold CTA: "CHOOSE YOUR TIME" (placeholder, `href="#"`)
   - Note: "REPLAYS WILL BE AVAILABLE IF YOU'RE REGISTERED!"
   - Small print: email notification consent

4. **Quote (bg-white)**
   - Blockquote with accent font (Cactus Classical Serif):
   - "Now is the time for weirdos, artists, and independent thinkers. Everything that made you an outsider in the old world has prepared you to be a leader in the new one."
   - Attribution: — James McCrae

5. **About Kellee (bg-brand-warm)**
   - SectionHeading: "Hi! I'm Kellee Wynne"
   - Subtitle: "Artist, Writer and Strategy Expert for Course Creators"
   - Bio text (12 years experience, podcast, 20k students, book)
   - Portrait image (existing: kellee-portrait-standing.png or new variant)
   - Instagram link (tertiary CTA style)

6. **Final CTA (bg-brand-dark)**
   - CallToAction (dark variant)
   - Repeat session times and registration CTA
   - "REPLAYS WILL BE AVAILABLE" note

### Images to Download (~3)
- Teaching Artist Workshop logo/banner
- Teaching Artist image (workshop graphic)
- Kellee portrait variant (may reuse existing)

### Components Used
- SectionHeading, ChecklistItem, CallToAction, polished-card class

---

## Page 3: /privacy-policy — Privacy Policy

**File:** `src/pages/privacy-policy.astro`
**Complexity:** Low
**Reference:** Fetch content from `https://www.kelleewynne.com/privacy-policy`

### Structure
Clone `/terms` page structure exactly:
- Layout + Nav + Footer
- Simple warm hero: h1 "Privacy Policy"
- Prose content section using `@tailwindcss/typography` (`prose` class)
- Standard legal sections: data collection, cookies, third-party services, user rights, contact

### Content
Scrape from original site's `/privacy-policy` page. If unavailable, generate standard privacy policy content appropriate for a creative educator site using Formspree, Google Analytics, and social media integrations.

### Navigation
- Add to Footer legal links alongside /terms

---

## Page 4: /faq — Frequently Asked Questions

**File:** `src/pages/faq.astro`
**Complexity:** Low-Medium
**Reference:** BIR FAQ content from `scraped-content/bir.txt` + general site questions

### Sections

1. **Hero (warm variant)**
   - Simple warm hero
   - h1: "Frequently Asked Questions"
   - Subtitle: "Everything you need to know about Kellee Wynne Studios"

2. **FAQ Groups (bg-white, alternating bg-brand-warm)**
   - **General** — What is KW Studios, what does Kellee teach, who are her programs for
   - **Build It Remarkable** — 12 Q&As reused from /bir page content (same FaqItem component)
   - **Courses & Workshops** — Teaching Artist Workshop info, course access, tech requirements
   - **Contact & Support** — How to reach out, response times, refund policy
   - Each group: SectionHeading + stacked FaqItem components

3. **CTA (bg-brand-warm)**
   - CallToAction (warm variant)
   - "Still have questions?" → link to /contact

### Components Used
- SectionHeading, CallToAction
- **NEW: FaqItem** (shared with /bir)

---

## New Component: FaqItem.astro

**File:** `src/components/FaqItem.astro`

### Purpose
Collapsible accordion for Q&A content. Zero JavaScript — uses native `<details>`/`<summary>` HTML elements.

### Props
```typescript
interface Props {
  question: string;
}
```
Answer content passed via default slot.

### Design
- Closed state: question text + gold chevron/plus icon on right
- Open state: question highlighted, gold left border, answer revealed with smooth transition
- Uses polished-card hover treatment (border-glow on hover)
- Gold accent color on open state
- `data-reveal` for scroll animation
- Dark mode: appropriate color overrides

### HTML Structure
```html
<details class="faq-item polished-card group">
  <summary class="...">
    <span>{question}</span>
    <span class="chevron">▸</span>
  </summary>
  <div class="answer">
    <slot />
  </div>
</details>
```

### CSS
Use Astro's scoped `<style>` block within `FaqItem.astro` (consistent with how other components handle their styles). No global CSS needed.

---

## Navigation Updates

### Footer (`src/components/Footer.astro`)
Add to legal links section:
- Privacy Policy → `/privacy-policy`
- FAQ → `/faq`

### navigation.ts (`src/data/navigation.ts`)
Add footer link entries for `/privacy-policy` and `/faq`.

### /priority page (`src/pages/priority.astro`)
Update main CTA to link to `/bir` when enrollment is active. Add secondary link: "Learn more about the program →" pointing to `/bir`.

---

## Images Workflow

1. Download all needed images from Simplero CDN using curl
2. Save to `src/assets/images/` with descriptive names (e.g., `bir-logo.png`, `bir-module-1.png`, `testimonial-margarete.png`)
3. All images go through Astro's optimization pipeline automatically
4. Use `<Image>` component from `astro:assets` — never raw `<img>`

---

## Verification Plan

After each page:
1. `npx astro build` — zero errors
2. `npx astro dev` — visual check on the new page
3. Screenshot: `node pw-screenshot-full.mjs <url> /tmp/claude/<name>.png`
4. Dark mode toggle — verify no broken elements
5. Mobile check: `node pw-screenshot.mjs <url> /tmp/claude/<name>-mobile.png 390 844`

After all pages:
6. Verify Footer links work (privacy-policy, faq)
7. Verify /priority → /bir link works
8. Verify sitemap includes all new pages
9. Full build with zero errors

---

## Phase B: Design Language Proof-of-Concept (Future)

After Phase A ships, rebuild `/teaching` on a separate branch using the new design language observed on the original Simplero `/teaching` page:
- Script/handwritten title typography
- Darker tones, photo backgrounds bleeding edge-to-edge
- Editorial/magazine-like feel
- Instagram-style social proof cards

This proof-of-concept will reveal how much of the design system is swappable via Tailwind tokens vs. what needs structural component changes, informing whether a full site theme swap is feasible.
