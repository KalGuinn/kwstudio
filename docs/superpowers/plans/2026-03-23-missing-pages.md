# Missing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 missing pages (/bir, /teaching, /privacy-policy, /faq) plus 1 new component (FaqItem) and navigation updates.

**Architecture:** Each page follows the existing Astro page pattern (Layout + Nav + Footer wrapper, sections with alternating backgrounds). One new reusable component (FaqItem accordion) is shared between /bir and /faq. Images are downloaded from Simplero CDN into `src/assets/images/` for Astro optimization.

**Tech Stack:** Astro 5, Tailwind CSS 3, `astro:assets` for images, `<details>`/`<summary>` for accordion (zero JS).

**Spec:** `docs/superpowers/specs/2026-03-23-missing-pages-design.md`

**Testing note:** This is a static site with no test suite. Verification is `npx astro build` (zero errors) + visual screenshot review. Each task ends with a build verification step.

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/FaqItem.astro` | Collapsible Q&A accordion component |
| `src/pages/bir.astro` | BIR sales/enrollment page (14 sections) |
| `src/pages/teaching.astro` | Teaching Artist Workshop page (6 sections) |
| `src/pages/privacy-policy.astro` | Privacy policy (prose content) |
| `src/pages/faq.astro` | FAQ page (grouped Q&A sections) |

### Modified Files
| File | Changes |
|------|---------|
| `src/components/Footer.astro` | Add /privacy-policy and /faq to legalLinks array |
| `src/pages/priority.astro` | Add CTA link to /bir |
| `src/pages/index.astro` | Add Teaching Artist Workshop card to offerings section |
| `CLAUDE.md` | Add new pages and component to documentation |

### New Images (~14 files in `src/assets/images/`)
Downloaded from Simplero CDN. Named descriptively: `bir-logo.png`, `bir-module-*.png`, `testimonial-*.png`, `teaching-workshop-logo.png`, etc.

---

## Task 1: Download Images from Simplero CDN

**Files:**
- Create: `src/assets/images/bir-logo.png` (+ ~13 more image files)

This task downloads all required images before any pages are built, so subsequent tasks can import them immediately.

- [ ] **Step 1: Download BIR images**

```bash
cd /path/to/worktree
# BIR logo
curl -sL "https://img.simplerousercontent.net/scaled_image/10688856/3c438a625aa712f1b2a6568c391b9c29ada1b5a4/NEW-Build-it-Remarkable-logo-with-Kellee-Wynne-Studios-352w-109h.png" -o src/assets/images/bir-logo.png

# Kellee studio photos
curl -sL "https://img.simplerousercontent.net/scaled_image/11325905/9836c4dd33826f818a10ff17de4da88aefbec7ea/Kellee-Wynne-Conrad-Studio-Oct-2023-173--400w-267h.jpg" -o src/assets/images/kellee-studio-1.jpg
curl -sL "https://img.simplerousercontent.net/scaled_image/11325906/da065830061add9c01d8e48ae360aaaa2276f769/Kellee-Wynne-Conrad-Studio-Oct-2023-137--400w-267h.jpg" -o src/assets/images/kellee-studio-2.jpg
curl -sL "https://img.simplerousercontent.net/scaled_image/13623355/4cc24559377e91a537c881a6f1dbe19517c60f82/Kellee-Wynne-Studios-Made-Remarkable-brand-7--400w-267h.jpg" -o src/assets/images/kellee-studio-3.jpg

# Testimonial avatars
curl -sL "https://img.simplerousercontent.net/scaled_image/13623370/900f61191a71b59fb635656c2435e5041460e68f/Dianna-Garrison-416w-416h.jpg" -o src/assets/images/testimonial-dianna.jpg
curl -sL "https://img.simplerousercontent.net/scaled_image/13623126/dac6dacba6020cd7a48bbca55df1f41d550a851f/Margarete-Miller-448w-448h.png" -o src/assets/images/testimonial-margarete.png
curl -sL "https://img.simplerousercontent.net/scaled_image/13589555/a8f0916d66309a658e1d7c027713196b75845015/Delight-Rogers-2-448w-448h.jpg" -o src/assets/images/testimonial-delight.jpg

# Cat Rains testimonial avatar (from scraped HTML)
curl -sL "https://img.simplerousercontent.net/scaled_image/8654599/ffc43d34b19a476b044b43302b035a8a191e3bff/Screenshot_20230910_163849_Instagram-416w-412h.jpg" -o src/assets/images/testimonial-cat-rains.jpg

# Brooke Henry testimonial (from scraped HTML)
curl -sL "https://img.simplerousercontent.net/scaled_image/8654646/af286643cc87bdd10b7c76bcd3ab63e658cbf328/Brooke-Henry-testimonial-Build-416w-416h.png" -o src/assets/images/testimonial-brooke.png

# Bonus graphics
curl -sL "https://img.simplerousercontent.net/scaled_image/13622118/44975e6fbd0c41a240b220981e93bdf7a051539c/Audience-Breakthrough-416w-438h.png" -o src/assets/images/bir-bonus-audience.png
curl -sL "https://img.simplerousercontent.net/scaled_image/13493701/30d497d9bd7e4363e7b6de2118c884b3c4f8d2bd/Planning-for-Profit-2--416w-408h.png" -o src/assets/images/bir-bonus-planning.png
curl -sL "https://img.simplerousercontent.net/scaled_image/11362757/8ca1835150ec6c248a1a090cb6ea5192313d87b4/Tech-Bundle-416w-234h.png" -o src/assets/images/bir-bonus-tech.png
curl -sL "https://img.simplerousercontent.net/scaled_image/13728622/542b70667b5f6ff3783da4798e293edd7fd53cd1/Bonus-4-BIR-2-416w-211h.png" -o src/assets/images/bir-bonus-salespage.png
```

- [ ] **Step 2: Download Teaching Workshop images**

```bash
curl -sL "https://img.simplerousercontent.net/scaled_image/14516038/de1e4fed7db4a01e49a5a8542276caa071b49cca/The-Teaching-Artist-Reset-3--1819w-562h.png" -o src/assets/images/teaching-workshop-logo.png
curl -sL "https://img.simplerousercontent.net/scaled_image/14516039/d48761617d51d9db827e388e1a9e92100cec1989/The-Teaching-Artist-workshop-1200w-675h.png" -o src/assets/images/teaching-workshop-image.png
curl -sL "https://img.simplerousercontent.net/scaled_image/14515997/219cc54a7bd56ee46d2a7bfec06318e898f3617a/The-Teaching-Artist-image-3--825w-545h.png" -o src/assets/images/teaching-kellee-portrait.png
```

- [ ] **Step 3: Verify all images downloaded**

```bash
ls -la src/assets/images/bir-* src/assets/images/testimonial-* src/assets/images/teaching-*
```

Expected: ~16 files, all non-zero size.

**Note on module graphics:** The original BIR page uses 6 module quote graphics (`Build-it-Remarkable-quote-Modules-*.png`) as decorative sidebars. For our redesign, the curriculum section uses text-based module blocks with gold left borders instead — no module graphics needed. If the implementer wants decorative images for the module section, the URLs are in `scraped-content/bir.txt` (lines 426-460).

- [ ] **Step 4: Build to verify images are valid**

```bash
npx astro build
```

Expected: Build succeeds (images aren't imported yet, but confirms no file corruption issues).

- [ ] **Step 5: Commit**

```bash
git add src/assets/images/bir-* src/assets/images/testimonial-dianna.jpg src/assets/images/testimonial-margarete.png src/assets/images/testimonial-delight.jpg src/assets/images/teaching-*
git commit -m "assets: download BIR and Teaching Workshop images from Simplero CDN"
```

---

## Task 2: Create FaqItem Component

**Files:**
- Create: `src/components/FaqItem.astro`

**Context:** This component is needed by both /bir (Task 5) and /faq (Task 6). It's a collapsible accordion using native `<details>`/`<summary>` — zero JavaScript. Follow the existing component patterns in the project (see `src/components/ChecklistItem.astro` for a simple component example).

- [ ] **Step 1: Create the component**

Create `src/components/FaqItem.astro`:

```astro
---
interface Props {
  question: string;
}

const { question } = Astro.props;
---

<details class="group border border-brand-gold/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-brand-gold/40 hover:shadow-md">
  <summary class="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-display text-base sm:text-lg uppercase tracking-wide text-brand-dark dark:text-white select-none">
    <span class="group-open:text-brand-gold transition-colors duration-200">{question}</span>
    <span class="text-brand-gold/60 group-open:rotate-90 transition-transform duration-200 text-lg shrink-0">&#9656;</span>
  </summary>
  <div class="px-6 pb-5 text-brand-dark/80 dark:text-white/70 leading-relaxed border-t border-brand-gold/10">
    <div class="pt-4">
      <slot />
    </div>
  </div>
</details>

<style>
  details summary::-webkit-details-marker {
    display: none;
  }
</style>
```

- [ ] **Step 2: Build to verify component compiles**

```bash
npx astro build
```

Expected: Build succeeds. Component isn't imported yet but should have no syntax errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/FaqItem.astro
git commit -m "feat: add FaqItem accordion component (zero-JS, details/summary)"
```

---

## Task 3: Build /privacy-policy Page

**Files:**
- Create: `src/pages/privacy-policy.astro`
- Modify: `src/components/Footer.astro` (lines 11-14, legalLinks array)

**Context:** Clone the structure of `src/pages/terms.astro` exactly. Same Layout + Nav + Footer wrapper, same warm background, same prose styling. Swap the content for privacy policy text. Also add `/privacy-policy` to the Footer's legal links.

**Content reference:** Generate standard privacy policy content appropriate for a creative educator site (Formspree contact form, Google Fonts, social media links). This is a demo site — the content should be realistic but doesn't need to be legally binding.

- [ ] **Step 1: Create the page**

Create `src/pages/privacy-policy.astro` following the exact pattern from `src/pages/terms.astro`:
- Import Layout, Nav, Footer
- `<Layout title="Privacy Policy" description="Privacy policy for Kellee Wynne Studios.">`
- `<Nav currentPage="/privacy-policy" />`
- Warm background section with centered article
- Header: overline "Legal", h1 "Privacy Policy", pink divider, date
- Prose content using `prose prose-gray max-w-none` classes
- Sections: Information We Collect, How We Use Information, Cookies & Tracking, Third-Party Services (Formspree, Google Fonts, YouTube embeds), Your Rights, Data Retention, Contact Us
- `<Footer />`

- [ ] **Step 2: Add to Footer legal links**

In `src/components/Footer.astro`, update the `legalLinks` array (line 11-14):

```javascript
const legalLinks = [
  { href: `${base}/terms`, label: 'Terms' },
  { href: `${base}/privacy-policy`, label: 'Privacy' },
  { href: `${base}/faq`, label: 'FAQ' },
  { href: `${base}/contact`, label: 'Contact' },
];
```

- [ ] **Step 3: Build and verify**

```bash
npx astro build
```

Expected: 10 pages built (was 9), zero errors.

- [ ] **Step 4: Visual check**

```bash
npx astro dev --port 4322 &
sleep 3
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/privacy-policy /tmp/claude/privacy-policy.png
kill %1
```

Verify: page renders with warm background, proper heading, prose content, footer links include Privacy and FAQ.

- [ ] **Step 5: Commit**

```bash
git add src/pages/privacy-policy.astro src/components/Footer.astro
git commit -m "feat: add privacy policy page, update footer legal links"
```

---

## Task 4: Build /teaching Page

**Files:**
- Create: `src/pages/teaching.astro`

**Context:** Medium complexity, 6 sections. Similar structure to `/free-guide`. Uses existing components: SectionHeading, ChecklistItem, CallToAction. Content from `scraped-content/teaching.txt`. Images downloaded in Task 1.

**Content reference:** `scraped-content/teaching.txt` contains all text content. Key sections:
1. Hero with workshop logo
2. "In this workshop, I'll walk you through:" — 5 learning outcomes
3. Session picker (2 dates) with registration CTA (placeholder `href="#"`)
4. James McCrae blockquote
5. About Kellee bio with portrait
6. Final CTA (dark variant, repeat session times)

- [ ] **Step 1: Create the page**

Create `src/pages/teaching.astro`:
- Import: Layout, Nav, Footer, Image (from astro:assets), SectionHeading, ChecklistItem, CallToAction
- Import images: teaching-workshop-logo.png, teaching-workshop-image.png, teaching-kellee-portrait.png (or reuse kellee-portrait-standing.png)
- `const base = import.meta.env.BASE_URL.replace(/\/$/, '');`
- 6 sections as specified in the spec, using alternating bg-white / bg-brand-warm / bg-brand-dark backgrounds
- All CTAs use `href="#"` (demo placeholder)
- Workshop dates displayed in polished-card styled containers
- James McCrae quote uses Cactus Classical Serif (font-accent class)
- Kellee bio: 2-column layout on desktop (text left, portrait right)

- [ ] **Step 2: Build and verify**

```bash
npx astro build
```

Expected: 11 pages built, zero errors.

- [ ] **Step 3: Visual check**

```bash
npx astro dev --port 4322 &
sleep 3
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/teaching /tmp/claude/teaching.png
kill %1
```

Verify: all 6 sections render, images load, dark mode works, responsive layout correct.

- [ ] **Step 4: Commit**

```bash
git add src/pages/teaching.astro
git commit -m "feat: add Teaching Artist Workshop page with 6 sections"
```

---

## Task 5: Build /bir Page

**Files:**
- Create: `src/pages/bir.astro`

**Context:** Most complex page — 14 sections, extensive content. Uses: SectionHeading, TestimonialCard, ChecklistItem, CallToAction, StickyCTA, GoldSeparator, FaqItem (from Task 2), polished-card class. Images from Task 1.

**Content reference:** `scraped-content/bir.txt` contains ALL text content (350 lines). `scraped-content/bir.html` has the full HTML for reference.

- [ ] **Step 1: Create the page — Sections 1-7 (Hero through Curriculum)**

Create `src/pages/bir.astro` with the first 7 sections:
- Import: Layout, Nav, Footer, Image, SectionHeading, TestimonialCard, ChecklistItem, CallToAction, StickyCTA, GoldSeparator, FaqItem
- Import all BIR images from `../assets/images/bir-*` and `../assets/images/testimonial-*`
- `const base = import.meta.env.BASE_URL.replace(/\/$/, '');`

Sections 1-7:
1. **Hero** (bg-brand-warm): BIR logo, headline, subtitle, urgency text, gold CTA (`href="#"`), payment plan note
2. **Pain Point** (bg-white): SectionHeading "STOP SPINNING YOUR WHEELS!", empathy copy, tertiary anchor link
3. **Origin Story** (bg-brand-warm): Two-part narrative with portrait, mentee names, photo grid (3 studio photos)
4. **Differentiator** (bg-brand-dark): Why BIR is different, Builder's Framework, gold CTA
5. **Features** (bg-white): SectionHeading + 3x2 grid of 6 polished-cards (Masterclasses, Q&A Coaching, Community, Behind the Scenes, Ongoing Support, Bonuses)
6. **Testimonial Spotlight** (bg-brand-warm): Dianna Garrison TestimonialCard, Cat Rains section
7. **Curriculum** (bg-white): 6 module blocks with gold left border, each with title + subtitle + bullet points

Include `<StickyCTA buttonText="Join Build It Remarkable" buttonHref="#" label="$2400 — 12 Month Program" />` at bottom.

- [ ] **Step 2: Build to verify first half compiles**

```bash
npx astro build
```

Expected: 12 pages built, zero errors.

- [ ] **Step 3: Add Sections 8-14 (Pricing through Disclaimer)**

Continue in `src/pages/bir.astro`:

8. **Pricing** (bg-brand-dark): $2400 headline, value breakdown, payment plan, urgency, gold CTA
9. **Bonus Bundles** (bg-white): 4 polished-cards with bonus images and descriptions (Audience Breakthrough, Profit Planning, Tech Bundle, Sales Page Breakthrough)
10. **More Testimonials** (bg-brand-warm): Margarete Miller + Delight Rogers TestimonialCards
11. **Qualification** (bg-white): Two-column — left "RIGHT FOR YOU IF" with ChecklistItems (gold left border), right "NOT right if" (gray left border)
12. **FAQ** (bg-brand-warm): SectionHeading + 12 FaqItem components with Q&A from scraped content
13. **Final CTA** (bg-brand-dark): Value stack list, April 7 start date, price, payment plan, gold CTA, "Schedule a call" link
14. **Disclaimer** (bg-brand-warm): Earnings disclaimer, copyright, legal links

- [ ] **Step 4: Build and verify complete page**

```bash
npx astro build
```

Expected: 12 pages built, zero errors.

- [ ] **Step 5: Visual check**

```bash
npx astro dev --port 4322 &
sleep 3
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/bir /tmp/claude/bir.png
kill %1
```

Verify: all 14 sections render, alternating backgrounds correct, images load, FAQ accordions work, dark mode works.

- [ ] **Step 6: Commit**

```bash
git add src/pages/bir.astro
git commit -m "feat: add BIR sales page with 14 sections, pricing, testimonials, FAQ"
```

---

## Task 6: Build /faq Page

**Files:**
- Create: `src/pages/faq.astro`

**Context:** Uses FaqItem component from Task 2. Content grouped by topic. BIR FAQ questions (12) reused from /bir page content. Additional general/workshop/contact questions.

**Content reference:** BIR FAQ from `scraped-content/bir.txt` (lines 274-321). General questions written fresh.

- [ ] **Step 1: Create the page**

Create `src/pages/faq.astro`:
- Import: Layout, Nav, Footer, SectionHeading, CallToAction, FaqItem
- `const base = import.meta.env.BASE_URL.replace(/\/$/, '');`
- Simple warm hero: overline "Support", h1 "Frequently Asked Questions", subtitle
- 4 FAQ groups, each with SectionHeading + stacked FaqItems:
  - **General** (bg-white): 3-4 Qs about KW Studios, what Kellee teaches, who programs are for
  - **Build It Remarkable** (bg-brand-warm): 12 Qs reused from /bir content
  - **Courses & Workshops** (bg-white): 3-4 Qs about Teaching Artist Workshop, course access, tech
  - **Contact & Support** (bg-brand-warm): 3-4 Qs about reaching out, response times, refunds
- CallToAction (warm variant): "Still have questions?" → link to /contact

- [ ] **Step 2: Build and verify**

```bash
npx astro build
```

Expected: 13 pages built, zero errors.

- [ ] **Step 3: Visual check**

```bash
npx astro dev --port 4322 &
sleep 3
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/faq /tmp/claude/faq.png
kill %1
```

Verify: all 4 groups render, accordions open/close, dark mode works, "Still have questions?" CTA links to /contact.

- [ ] **Step 4: Commit**

```bash
git add src/pages/faq.astro
git commit -m "feat: add FAQ page with 4 topic groups and accordion Q&As"
```

---

## Task 7: Navigation Updates

**Files:**
- Modify: `src/pages/priority.astro` (add CTA link to /bir)
- Modify: `src/pages/index.astro` (add Teaching Artist Workshop card)

**Context:** The Footer was already updated in Task 3. This task wires up the remaining navigation connections.

- [ ] **Step 1: Add /bir link to /priority page**

In `src/pages/priority.astro`, find the main CTA section and add a secondary link or update the primary CTA to point to `/bir`:

Add below the existing main CTA button:
```html
<a href={`${base}/bir`} class="text-brand-pink font-semibold hover:text-brand-gold transition-colors duration-200">
  Learn more about the full program &rarr;
</a>
```

- [ ] **Step 2: Add Teaching Workshop card to homepage**

In `src/pages/index.astro`, find the offerings/connect section (the 3-card grid). Add a mention or link to `/teaching`. This could be:
- A fourth card in the grid, or
- A text link below the existing cards: "Join the Teaching Artist Workshop →"

**Preferred approach:** Add a text link/banner below the existing 3-card grid rather than a 4th card (which would break the balanced 3-column layout). Use a subtle warm-background section with SectionHeading + brief description + tertiary CTA linking to `${base}/teaching`.

- [ ] **Step 3: Build and verify**

```bash
npx astro build
```

Expected: 13 pages built, zero errors.

- [ ] **Step 4: Verify links work**

```bash
npx astro dev --port 4322 &
sleep 3
# Check priority page has /bir link
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/priority /tmp/claude/priority-updated.png
# Check homepage has /teaching link
node pw-screenshot-full.mjs http://localhost:4322/kwstudio/ /tmp/claude/home-updated.png
# Check footer has all legal links
node pw-screenshot.mjs http://localhost:4322/kwstudio/contact /tmp/claude/footer-links.png
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/priority.astro src/pages/index.astro
git commit -m "feat: add navigation links — priority→bir, homepage→teaching"
```

---

## Task 8: Update CLAUDE.md Documentation

**Files:**
- Modify: `CLAUDE.md`

**Context:** Update the project documentation to reflect the 4 new pages and 1 new component.

- [ ] **Step 1: Update CLAUDE.md**

Changes needed:
1. **Reusable Components table**: Add FaqItem row:
   `| FaqItem | src/components/FaqItem.astro | Collapsible Q&A accordion (zero-JS) | question (slot for answer) |`
2. **Update component count**: `# 12 reusable components` → `# 13 reusable components`
3. **Pages table**: Add 4 new rows:
   - `| /bir | bir.astro | BUILD IT REMARKABLE enrollment: sales page, pricing, modules, testimonials, FAQ |`
   - `| /teaching | teaching.astro | Teaching Artist Workshop: free strategy workshop, session registration |`
   - `| /privacy-policy | privacy-policy.astro | Privacy policy |`
   - `| /faq | faq.astro | Frequently asked questions (grouped by topic) |`
4. **Update page count**: `# 9 pages` → `# 13 pages`
5. **Key Directories**: Update pages line to reflect 13 pages

- [ ] **Step 2: Build to verify no issues**

```bash
npx astro build
```

Expected: 13 pages built, zero errors.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with 4 new pages and FaqItem component"
```

---

## Verification Checklist (After All Tasks)

Run after all 8 tasks are complete:

- [ ] `npx astro build` — 13 pages, zero errors
- [ ] All 4 new pages render correctly in dev server
- [ ] Dark mode works on all new pages
- [ ] Mobile responsive on all new pages (390x844 screenshots)
- [ ] Footer shows: Terms, Privacy, FAQ, Contact
- [ ] /priority page links to /bir
- [ ] Homepage links to /teaching
- [ ] /bir FAQ accordions open/close
- [ ] /faq page accordions open/close
- [ ] Sitemap includes all 13 pages (check `dist/sitemap-0.xml`)
- [ ] All images load (no broken images in any section)
- [ ] CLAUDE.md accurately reflects codebase state
