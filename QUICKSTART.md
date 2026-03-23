# Quick Start — Kellee Wynne Studios

## Run the Site
```bash
npm run dev        # http://localhost:4321/kwstudio/
npx astro build    # production build to dist/
npm run preview    # preview production build
```

## GitHub
- **Repo**: https://github.com/KalGuinn/kwstudio
- **Live**: https://KalGuinn.github.io/kwstudio/
- **Branches**: `main` (production, auto-deploys) / `dev` (staging)
- Push to `main` triggers GitHub Pages deploy via Actions

## Current Blockers (Proof of Concept Only)
- `src/components/ContactForm.astro` — Formspree `YOUR_FORM_ID` placeholder (no real backend)
- `src/pages/book.astro` — 2 Bookshop.org buttons have `href="#"` (no URL available)
- `src/pages/priority.astro` + `free-guide.astro` — signup forms have `onsubmit="return false;"` (visual only)
- `src/pages/index.astro` — homepage newsletter signup is visual-only

## Internal Links (IMPORTANT)
All internal links MUST use `import.meta.env.BASE_URL` for GitHub Pages subpath hosting:
```astro
---
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---
<a href={`${base}/book`}>Book</a>
```
Navigation links in `src/data/navigation.ts` handle this automatically.

## Design System TL;DR
- **Buttons**: `.cta-shine` gold solid (primary), gold outline (secondary), pink text (tertiary)
- **H1**: pink. **H2**: dark. NO multi-color spans.
- **Backgrounds**: `bg-white` / `bg-brand-warm` / `bg-brand-dark`
- **Body text**: `text-brand-dark/80` (not /70). On dark: `text-white/70` (not /60)
- **Cards**: `.polished-card` for hover effects, `.card-arrow` + `.arrow-icon` for link reveal
- **Dark mode**: Use inline `dark:` Tailwind classes for element-specific colors
- **Images**: Import from `../assets/images/`, use `<Image />` from `astro:assets`

## Animation Classes (defined globally in Layout.astro)
| Class | Effect |
|-------|--------|
| `.word` | Word-by-word headline reveal (set `animation-delay` via inline style) |
| `.portrait-entrance` | Dramatic image scale-up on load |
| `.cta-shine` | Gold button with hover shine sweep (wrap text in `<span class="relative z-10">`) |
| `.polished-card` | Card with border-glow + lift on hover |
| `.card-arrow` / `.arrow-icon` | Fade-up arrow on card hover |
| `.ambient-bg` | Breathing background animation |
| `.ambient-blob` | Floating blur blob (position via inline style) |
| `.portrait-glow` | Warm glow behind portrait |
| `.gold-line` | Extending gold line on load |
| `.gold-bar-animated` | SectionHeading bar animates width on scroll |
| `data-reveal` | Scroll reveal (variants: `left`, `right`, `scale`) |
| `data-reveal-stagger` | Staggered children scroll reveal |

## Key Commands
```bash
npx astro dev                                    # start dev server
npx astro build                                  # verify build
node pw-screenshot.mjs URL OUTPUT [W] [H]        # viewport screenshot (default 1440x900)
node pw-screenshot-full.mjs URL OUTPUT [W] [H]   # full-page screenshot
node pw-screenshot.mjs URL OUTPUT 390 844        # mobile screenshot
node pw-scrape.mjs URL TEXT_OUT IMG_OUT           # scrape page with Playwright
```

## Adding a New Page
1. Create `src/pages/name.astro`
2. Import `Layout`, `Nav`, `Footer` + components
3. Pass `currentPage="/name"` to `Nav`
4. Add entry to `src/data/navigation.ts`
5. Use `const base = import.meta.env.BASE_URL.replace(/\/$/, '');` for any hardcoded internal links
6. Import images from `../assets/images/` and use `<Image />` from `astro:assets`
7. Add `.word` spans on hero headline for word-by-word animation
8. Add `data-reveal` attributes to below-the-fold sections
9. For page-specific structured data, use `<Fragment slot="head">` with JSON-LD

## Component Reference
| Component | Import | Key Props |
|-----------|--------|-----------|
| `SectionHeading` | `../components/SectionHeading.astro` | `title, overline?, centered?` |
| `Card` | `../components/Card.astro` | `title, href, subtitle?, icon?, image? (ImageMetadata), dark?` |
| `CallToAction` | `../components/CallToAction.astro` | `headline, buttonText, buttonHref, subtitle?, variant?` |
| `Hero` | `../components/Hero.astro` | `title, variant?, overline?, subtitle?, image? ({src: ImageMetadata, alt}), cta?` |
| `TestimonialCard` | `../components/TestimonialCard.astro` | `quote, name, title, initial` |
| `ChecklistItem` | `../components/ChecklistItem.astro` | `text` |
| `GoldSeparator` | `../components/GoldSeparator.astro` | (none) |
| `BackToTop` | `../components/BackToTop.astro` | (none) — add to long pages |
| `StickyCTA` | `../components/StickyCTA.astro` | `buttonText, buttonHref, label?` — sales pages |
| `BrushDivider` | `../components/BrushDivider.astro` | `color? (pink/gold/warm), flip?` |

## Full Documentation
See `CLAUDE.md` for complete design system, brand identity, and development workflow.
See `AGENTS.md` for agent-specific guidelines.
See `README.md` for GitHub-facing project overview.
