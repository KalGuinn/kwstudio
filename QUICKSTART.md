# Quick Start — Kellee Wynne Studios

## Run the Site
```bash
npm run dev        # http://localhost:4321
npx astro build    # production build to dist/
```

## Current Blockers (Proof of Concept Only)
- `src/components/ContactForm.astro` — Formspree `YOUR_FORM_ID` placeholder (no real backend)
- `src/pages/book.astro` — 2 Bookshop.org buttons have `href="#"` (no URL available)
- `src/pages/priority.astro` + `free-guide.astro` — signup forms have `onsubmit="return false;"` (visual only)

## Design System TL;DR
- **Buttons**: gold solid (primary), gold outline (secondary), pink text (tertiary)
- **H1**: pink. **H2**: dark. NO multi-color spans.
- **Backgrounds**: `bg-white` / `bg-brand-warm` / `bg-brand-dark` / hero gradient (4 options only)
- **Body text**: `text-brand-dark/80` (not /70). On dark: `text-white/70` (not /60)
- **Cards**: All use `group-hover:text-brand-gold` — no per-card variation

## Key Commands
```bash
npx astro dev                              # start dev server
npx astro build                            # verify build
node pw-screenshot.mjs URL OUTPUT          # viewport screenshot
node pw-screenshot-full.mjs URL OUTPUT     # full-page screenshot
node pw-scrape.mjs URL TEXT_OUT IMG_OUT    # scrape page with Playwright
```

## Adding a New Page
1. Create `src/pages/name.astro`
2. Import `Layout`, `Nav`, `Footer` + components (`SectionHeading`, `Card`, `CallToAction`, etc.)
3. Pass `currentPage="/name"` to `Nav`
4. Add entry to `src/data/navigation.ts`

## Component Reference
| Component | Import | Key Props |
|-----------|--------|-----------|
| `SectionHeading` | `../components/SectionHeading.astro` | `title, overline?, centered?` |
| `Card` | `../components/Card.astro` | `title, href, subtitle?, icon?, image?, dark?` |
| `CallToAction` | `../components/CallToAction.astro` | `headline, buttonText, buttonHref, subtitle?, variant?` |
| `Hero` | `../components/Hero.astro` | `title, variant?, overline?, subtitle?, image?, cta?` |
| `TestimonialCard` | `../components/TestimonialCard.astro` | `quote, name, title, initial` |
| `ChecklistItem` | `../components/ChecklistItem.astro` | `text` |
| `GoldSeparator` | `../components/GoldSeparator.astro` | (none) |

## Full Documentation
See `CLAUDE.md` for complete design system, brand identity, and development workflow.
See `AGENTS.md` for agent-specific guidelines.
