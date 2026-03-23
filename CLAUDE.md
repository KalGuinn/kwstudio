# Kellee Wynne Studios — Website Redesign

## Project Overview
Redesigning kelleewynne.com from Simplero to Astro + Tailwind CSS static site.
Original site: https://www.kelleewynne.com/

## Tech Stack
- Astro 5.x with Tailwind CSS 3.x
- astro-icon + @iconify-json/simple-icons for SVG icons
- @tailwindcss/typography for prose styling
- Playwright for visual QA screenshots

## Brand Identity
- **Pink**: #f2306a (headings, brand accent)
- **Gold**: #c9a118 (action buttons, CTAs)
- **Orange**: #f0481f (accent only, use sparingly)
- **Dark**: #2b2b2b (body text, dark sections)
- **Warm**: #fdf7f2 (backgrounds)
- **Fonts**: Anton (display), Montserrat (body), Cactus Classical Serif (accent/quotes)

## Design System (STRICT)

### Buttons (3 styles only)
- **Primary**: gold solid — `bg-brand-gold text-brand-dark font-display uppercase tracking-widest px-10 py-4 rounded-lg`
- **Secondary**: gold outline — `border-2 border-brand-gold text-brand-gold font-display uppercase tracking-widest px-10 py-4 rounded-lg`
- **Tertiary**: text link — `text-brand-pink font-semibold hover:text-brand-gold`

### Headings
- **H1**: `font-display uppercase text-brand-pink` — single color, no multi-color spans
- **H2**: `font-display uppercase text-brand-dark` — allow ONE gold word per page max
- **H3**: `font-display uppercase text-brand-dark tracking-wide`

### Section Backgrounds (4 options only)
1. `bg-white`
2. `bg-brand-warm` (no inline gradients)
3. `bg-brand-dark text-white`
4. Hero only: art-background.jpg or warm gradient

### Section Padding
Standard: `py-12 sm:py-16` for all content sections

### Cards
All cards use `group-hover:text-brand-gold` — no per-card color variation.

## Design Rules
- Gold is the ACTION color (buttons, CTAs). Pink is the BRAND/heading color.
- Each page needs unique visual identity BUT using the same design system
- art-background.jpg is ONLY for the homepage hero
- No generic emojis — use product images or SVG icons
- No decorative CSS scatter dots/blobs (focus on fundamentals)
- No wave-divider.svg (rendered badly)
- Portrait must be grounded at bottom edge of hero sections
- Keep information density high — minimize excessive padding
- No inline style attributes for colors (use Tailwind tokens)
- No hardcoded hex colors in markup

## Pages
- `/` — Homepage: hero with art background, portrait, BIR CTA
- `/book` — Mixed Media Color Studio showcase
- `/podcast` — Made Remarkable podcast landing
- `/priority` — BUILD IT REMARKABLE waitlist (main revenue page)
- `/free-guide` — "100 Ways" PDF lead magnet
- `/contact` — Contact form + promise
- `/links` — Link-in-bio standalone page
- `/terms` — Legal terms
- `/404` — Custom error page

## Development Workflow
- Always commit before presenting changes (enables easy revert)
- Run internal screenshot review before presenting to user
- Use Playwright screenshots: `node pw-screenshot.mjs URL OUTPUT`
- Full-page: `node pw-screenshot-full.mjs URL OUTPUT`
- Never use Edge browser (user's work browser)
- Build check: `npx astro build`
- Use parallel agents for independent tasks
- Run background research agents while implementing

## Key Files
- `src/layouts/Layout.astro` — Base HTML, global animations, ViewTransitions
- `src/components/Nav.astro` — Fixed nav with 6 links + gold BIR pill
- `src/components/Footer.astro` — Dark footer with gradient accent bar
- `src/components/CallToAction.astro` — Section CTA (was CTA.astro)
- `src/components/Card.astro` — Offering card
- `src/components/ContactForm.astro` — Contact form
- `tailwind.config.mjs` — Brand tokens, fonts, utility colors
- `public/images/` — All scraped + downloaded media assets
