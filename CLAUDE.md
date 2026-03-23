# Kellee Wynne Studios — Website Redesign

## Project Overview
Redesigning kelleewynne.com from Simplero to Astro + Tailwind CSS static site.
Original site: https://www.kelleewynne.com/

## Tech Stack
- **Astro 5.18.1** with **Tailwind CSS 3.4.19** (`@astrojs/tailwind` integration)
- **Astro Image** (`astro:assets`) — automatic WebP optimization, responsive sizing
- **astro-icon** + `@iconify-json/simple-icons` for SVG social icons (Instagram, YouTube, Pinterest)
- **@tailwindcss/typography** for prose styling (used on terms page)
- **@astrojs/sitemap** for XML sitemap generation (pre-built for production)
- **Playwright** for visual QA — 3 scripts in project root:
  - `pw-screenshot.mjs` — viewport screenshot (1440x900)
  - `pw-screenshot-full.mjs` — full-page screenshot
  - `pw-scrape.mjs` — render JS-heavy pages, extract text + images + screenshot
- **View Transitions** enabled in Layout.astro for smooth page-to-page navigation
- **GitHub Pages** deployment via GitHub Actions (`.github/workflows/deploy.yml`)
- **TypeScript** with `astro/tsconfigs/strictest`

## GitHub
- **Repo**: https://github.com/KalGuinn/kwstudio
- **Live demo**: https://KalGuinn.github.io/kwstudio/
- **Branches**: `main` (production, auto-deploys) / `dev` (staging/experimental)
- **Base URL**: All internal links MUST use `import.meta.env.BASE_URL` prefix for subpath hosting
- **Astro config**: `site: 'https://KalGuinn.github.io'`, `base: '/kwstudio'`

## Quick Start
See `QUICKSTART.md` for fast onboarding, commands, and component reference.

## Brand Identity
- **Pink**: #f2306a (headings, brand accent)
- **Pink Light**: #fce8ef (subtle backgrounds)
- **Gold**: #c9a118 (action buttons, CTAs)
- **Gold Light**: #f5e9c0 (highlights)
- **Orange**: #f0481f (accent only, use sparingly)
- **Dark**: #2b2b2b (body text, dark sections)
- **Warm**: #fdf7f2 (backgrounds)
- **Gray**: #7a7570 (secondary text)
- **Fonts**: Anton (display), Montserrat (body), Cactus Classical Serif (accent/quotes)
- **Base font size**: 17px

## Design System (STRICT)

### Buttons (3 styles only)
- **Primary**: gold solid with shine — `cta-shine bg-brand-gold text-brand-dark font-display uppercase tracking-widest px-10 py-4 rounded-lg shadow-lg` (wrap text in `<span class="relative z-10">`)
- **Secondary**: gold outline — `border-2 border-brand-gold text-brand-gold font-display uppercase tracking-widest px-10 py-4 rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-all duration-300`
- **Tertiary**: text link — `text-brand-pink font-semibold hover:text-brand-gold transition-colors duration-200`

### Headings
- **H1**: `font-display text-5xl sm:text-6xl lg:text-7xl uppercase text-brand-pink leading-tight tracking-tight mb-6`
- **H2**: `font-display text-2xl sm:text-3xl lg:text-4xl uppercase text-brand-dark leading-tight mb-4` — allow ONE gold word per page max
- **H3**: `font-display text-xl uppercase text-brand-dark tracking-wide mb-2`
- Use `SectionHeading` component for overline + title + gold bar pattern

### Section Backgrounds (4 options only)
1. `bg-white`
2. `bg-brand-warm` (no inline gradients)
3. `bg-brand-dark text-white`
4. Hero only: art-background.jpg or warm gradient

### Section Padding
- Content sections: `py-12 sm:py-16`
- Hero sections: `pt-24 sm:pt-28 pb-12`

### Body Text
- Use `text-brand-dark/80` for body text (not /70 — too faint)
- Use `text-white/70` for text on dark backgrounds (not /60)

### Cards
All cards use `.polished-card` class for border-glow hover with refined easing.
Use `.card-arrow` + `.arrow-icon` for hover-reveal "Learn More →" links.
Card headings use `group-hover:text-brand-gold` — no per-card color variation.

## Reusable Components

| Component | File | Purpose | Props |
|-----------|------|---------|-------|
| `Layout` | `src/layouts/Layout.astro` | Base HTML shell, scroll animations, ViewTransitions, dark mode, OG tags, JSON-LD | `title, description?, ogImage?` |
| `Nav` | `src/components/Nav.astro` | Fixed nav, 6 links + gold BIR pill, mobile menu, dark mode toggle | `currentPage?` |
| `Footer` | `src/components/Footer.astro` | Warm (light) / dark (dark mode) footer, gradient accent bar, social icons | none |
| `CallToAction` | `src/components/CallToAction.astro` | Full-width CTA section (warm in light, dark in dark mode) | `headline, subtitle?, buttonText, buttonHref, variant (dark/warm)` |
| `SectionHeading` | `src/components/SectionHeading.astro` | Overline + title + gold bar | `title, overline?, centered?` |
| `TestimonialCard` | `src/components/TestimonialCard.astro` | Quote card with avatar | `quote, name, title, initial` |
| `GoldSeparator` | `src/components/GoldSeparator.astro` | Decorative gold dot-lines | none |
| `ChecklistItem` | `src/components/ChecklistItem.astro` | Gold checkmark list item | `text` |
| `ContactForm` | `src/components/ContactForm.astro` | Contact form (Formspree) | none |
| `BackToTop` | `src/components/BackToTop.astro` | Floating gold "back to top" button (appears after 500px scroll) | none |
| `StickyCTA` | `src/components/StickyCTA.astro` | Fixed bottom CTA bar with glass-morphism (sales pages) | `buttonText, buttonHref, label?` |
| `BrushDivider` | `src/components/BrushDivider.astro` | SVG paint-stroke section divider | `color? (pink/gold/warm), flip?` |

## Data Files
- `src/data/navigation.ts` — Centralized nav links and social links (edit here to add/remove nav items)

## Pages
| URL | File | Purpose |
|-----|------|---------|
| `/` | `index.astro` | Homepage: art background hero, portrait, BIR CTA, 3-way connect |
| `/book` | `book.astro` | Mixed Media Color Studio: book cover, purchase links, what's inside |
| `/podcast` | `podcast.astro` | Made Remarkable: dark hero, platform links, quote |
| `/priority` | `priority.astro` | BUILD IT REMARKABLE waitlist: sales page, testimonials, checklist |
| `/free-guide` | `free-guide.astro` | "100 Ways" PDF lead magnet: signup forms, features |
| `/contact` | `contact.astro` | Contact form + 14-day promise |
| `/links` | `links.astro` | Link-in-bio standalone page (no Nav/Footer) |
| `/terms` | `terms.astro` | Legal terms & conditions |
| `/404` | `404.astro` | Custom error page |

> **Note:** All forms on the site are non-functional placeholders (demo site). Forms use `onsubmit="return false;"` or a Formspree placeholder ID.

## Adding a New Page
1. Create `src/pages/new-page.astro`
2. Import `Layout`, `Nav`, `Footer` (+ any components needed)
3. Pass `currentPage="/new-page"` to `Nav`
4. Add entry to `src/data/navigation.ts` `navLinks` array (uses `BASE_URL` automatically)
5. For any hardcoded internal links: `const base = import.meta.env.BASE_URL.replace(/\/$/, '');` then `href={\`${base}/page\`}`
6. Import images from `../assets/images/` and use `<Image />` from `astro:assets`
7. Use `SectionHeading`, `CallToAction`, `Card` etc. for consistent design
8. Add `.word` spans on hero headline for word-by-word animation
9. Add `data-reveal` attributes to below-the-fold sections for scroll animations

## Design Rules
- Gold = ACTION color (buttons, CTAs). Pink = BRAND/heading color.
- Each page has unique visual identity but same design system
- `art-background.jpg` is ONLY for the homepage hero
- No generic emojis — use product images or SVG icons
- No decorative CSS scatter dots/blobs (focus on fundamentals)
- Portrait must be grounded at bottom edge of hero sections
- Keep information density high — minimize excessive padding
- No inline `style=` for colors (use Tailwind tokens only)
- No hardcoded hex colors in markup
- Commit before presenting changes (enables easy revert)

## Interactive Features (Round 11)
- **Dark mode**: Class-based toggle (Tailwind `darkMode: 'class'`), OS-preference aware, warm studio palette, sun/moon toggle in Nav, persists via localStorage + `astro:after-swap`
- **Word-by-word headlines**: Hero headlines animate word-by-word on load (`.word` class with staggered `animation-delay`)
- **Ambient motion**: Floating blur blobs (`.ambient-blob`), breathing art background (`.ambient-bg`), portrait glow (`.portrait-glow`)
- **Portrait entrance**: Dramatic scale-up animation (`.portrait-entrance`) on hero images
- **CTA shine**: Gold buttons with hover shine sweep (`.cta-shine` — requires `<span class="relative z-10">` wrapper)
- **Polished cards**: Border glow + refined lift on hover (`.polished-card`), arrow reveal (`.card-arrow` + `.arrow-icon`)
- **Animated gold bar**: SectionHeading separator animates width on scroll reveal (`.gold-bar-animated`)
- **Scroll reveal**: `data-reveal` / `data-reveal="left|right|scale"` / `data-reveal-stagger` with refined cubic-bezier easing
- **Page transitions**: Custom fadeSlide animations via Astro View Transitions
- **BackToTop**: Floating gold button on priority + free-guide pages
- **StickyCTA**: Fixed bottom bar on priority ("Join the Priority List") + free-guide ("Get the Free PDF")
- **BrushDivider**: SVG paint-stroke dividers between sections (book, contact)
- **SEO**: JSON-LD structured data (Organization global, Book on /book, PodcastSeries on /podcast), `<slot name="head" />` for page-specific head content
- **Reduced motion**: All animations respect `prefers-reduced-motion: reduce`

### Dark Mode Notes
- CSS overrides in Layout.astro handle broad changes (body bg, nav, inputs)
- Inline `dark:` Tailwind classes preferred for element-specific colors
- Hero sections with light bg images use `data-dark-overlay` for dark mode dimming (homepage only)
- `build-it-remarkable-logo.png` needs `bg-white/90 rounded-lg px-4 py-2` wherever on dark backgrounds
- Gradient fades (from-white, from-brand-warm) are overridden in dark mode CSS
- Footer uses inline `dark:` classes (bg-brand-warm light, bg-[#111010] dark)

## Development Workflow
- Build: `npx astro build`
- Dev: `npx astro dev`
- Screenshots: `node pw-screenshot.mjs URL OUTPUT [WIDTH] [HEIGHT]`
- Full-page: `node pw-screenshot-full.mjs URL OUTPUT [WIDTH] [HEIGHT]`
- Mobile screenshots: `node pw-screenshot.mjs URL OUTPUT 390 844`
- Scraping: `node pw-scrape.mjs URL TEXT_OUTPUT SCREENSHOT_OUTPUT`
- Never use Edge browser (user's work browser)
- Use parallel agents for independent tasks
- Run background research agents while implementing
- Internal screenshot review before presenting to user

## Key Directories
```
src/
├── assets/images/  # 19 images (auto-optimized to WebP by Astro Image pipeline)
├── components/     # 12 reusable components
├── data/           # navigation.ts (centralized nav/social data, uses BASE_URL)
├── layouts/        # Layout.astro (base HTML, global animations, dark mode, ViewTransitions, OG tags, JSON-LD)
└── pages/          # 9 pages (index, book, podcast, priority, free-guide, contact, links, terms, 404)
public/
├── favicon.svg     # Pink asterisk favicon
└── robots.txt      # SEO
.github/workflows/  # deploy.yml — GitHub Pages auto-deploy on push to main
scraped-content/    # Raw HTML from original site (7 files, reference only)
docs/
└── superpowers/    # HISTORICAL: original design spec + implementation plan (superseded by CLAUDE.md)
```

## Reference Files
- `CLAUDE.md` — This file. Comprehensive project documentation.
- `QUICKSTART.md` — Fast onboarding guide with commands and component reference.
- `AGENTS.md` — Guidelines for AI agents working on this project.
- `docs/superpowers/specs/` — HISTORICAL: original design spec from initial planning.
- `docs/superpowers/plans/` — HISTORICAL: original implementation plan (completed).

## Safety

### Deny Rules
- `rm -rf /`, `rm -rf ~`
- `git push --force`, `git reset --hard`
- `sudo`

### Sensitive Paths
Do not read or modify:
- `~/.ssh/`, `~/.aws/`, `~/.gnupg/`, `~/.netrc`
