# Kellee Wynne Studios

A modern website redesign for [Kellee Wynne Studios](https://www.kelleewynne.com/) — artist, author of *Mixed Media Color Studio*, and business mentor for creative entrepreneurs.

**Live demo:** [KalGuinn.github.io/kwstudio](https://KalGuinn.github.io/kwstudio)

## Tech Stack

- **[Astro](https://astro.build/)** 5.18 — Static site generator with zero client-side JS by default
- **[Tailwind CSS](https://tailwindcss.com/)** 3.4 — Utility-first CSS with custom brand design tokens
- **[astro-icon](https://www.astroicon.dev/)** — SVG icon components (Instagram, YouTube, Pinterest)
- **Astro Image** — Automatic WebP optimization, responsive sizing, lazy loading
- **View Transitions** — Smooth page-to-page navigation
- **Playwright** — Visual QA screenshots

## Pages

| Page | Description |
|------|-------------|
| `/` | Homepage: art-background hero with portrait, 3-way connect cards, newsletter signup |
| `/book` | *Mixed Media Color Studio*: book cover, purchase links, what's inside |
| `/podcast` | *Made Remarkable*: platform links, about the show, quote |
| `/priority` | Build It Remarkable waitlist: sales page, testimonials, checklist |
| `/free-guide` | "100 Ways" PDF lead magnet: signup forms, content breakdown |
| `/contact` | Contact form with 14-day promise |
| `/links` | Link-in-bio standalone page |
| `/terms` | Legal terms & conditions |
| `/404` | Custom error page |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321/kwstudio/

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Pink | `#f2306a` | Headings, brand accent |
| Gold | `#c9a118` | Action buttons, CTAs |
| Orange | `#f0481f` | Accent only (sparingly) |
| Dark | `#2b2b2b` | Body text, dark sections |
| Warm | `#fdf7f2` | Backgrounds |

### Typography

- **Anton** — Display headings (uppercase, bold)
- **Montserrat** — Body text (400, 500, 600, 700)
- **Cactus Classical Serif** — Accent/quotes (italic)

### Interactive Features

- **Dark mode** — Class-based toggle, warm studio palette, persists via localStorage
- **Scroll reveal** — `data-reveal` / `data-reveal-stagger` attributes with IntersectionObserver
- **Word-by-word headlines** — Hero headlines animate word-by-word on load
- **Ambient motion** — Floating blur blobs, breathing background, portrait glow
- **CTA shine** — Gold buttons with hover shine sweep effect
- **Polished cards** — Border glow + refined lift on hover with arrow reveal
- **Page transitions** — Custom fadeSlide via Astro View Transitions
- **Reduced motion** — All animations respect `prefers-reduced-motion`

## Project Structure

```
src/
├── assets/images/    # 19 optimized images (auto-converted to WebP)
├── components/       # 14 reusable Astro components
├── data/             # navigation.ts (centralized nav/social links)
├── layouts/          # Layout.astro (base HTML, animations, dark mode, SEO)
└── pages/            # 9 pages
public/
├── favicon.svg
└── robots.txt
```

## Components

| Component | Purpose |
|-----------|---------|
| `Layout` | Base HTML shell, global animations, dark mode, OG tags, JSON-LD |
| `Nav` | Fixed nav with 6 links, gold BIR pill, mobile menu, dark mode toggle |
| `Footer` | Gradient accent bar, social icons |
| `Hero` | Page hero with variant system (warm/dark/art) |
| `Card` | Flexible card with polished hover effects |
| `CallToAction` | Full-width CTA section with shine button |
| `SectionHeading` | Overline + title + animated gold bar |
| `TestimonialCard` | Quote card with avatar and border glow hover |
| `ChecklistItem` | Gold checkmark list item |
| `GoldSeparator` | Decorative gold dot-lines |
| `ContactForm` | Contact form (Formspree) |
| `BackToTop` | Floating gold scroll-to-top button |
| `StickyCTA` | Fixed bottom CTA bar with glass-morphism |
| `BrushDivider` | SVG paint-stroke section divider |

## Deployment

This site deploys automatically to GitHub Pages via the included GitHub Actions workflow (`.github/workflows/deploy.yml`). Push to `master` to trigger a deploy.

## Development Notes

- Images live in `src/assets/images/` and are optimized by Astro's image pipeline (auto WebP, width/height)
- Dark mode uses `class` strategy (`darkMode: 'class'` in Tailwind config) with both global CSS overrides and inline `dark:` utilities
- SEO includes JSON-LD structured data (Organization, Book, PodcastSeries) and OG meta tags
- The design system enforces 3 button styles, 4 background options, and consistent heading treatment

## License

This project is a redesign/proof-of-concept. All content and images are property of Kellee Wynne Studios.
