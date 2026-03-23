# HISTORICAL — Kellee Wynne Studios Website Redesign — Design Spec

> **This document is from the initial planning phase and has been superseded by `CLAUDE.md` in the project root.** The project evolved through 8 rounds of iteration to 9 pages and 11 components. Use `CLAUDE.md` for the current design system and architecture. This file is kept for historical reference of the original design intent.

## Context

Kellee Wynne's website (kelleewynne.com) is a personal brand site for an artist, author, and creative business mentor. It's currently built on Simplero, a proprietary platform that produces functional but templated-looking sites. The goal is to scrape the existing content and rebuild the site with a modern, polished feel while preserving the existing brand identity (colors, fonts, energy).

This is a visual modernization — same content, same brand, better execution.

## Current Site Audit

**Pages (7 total via sitemap):**
| Page | URL | Status | Content |
|------|-----|--------|---------|
| Home | `/` | Active | Hero, welcome message, brand intro |
| Contact | `/contact` | Active | Name/email/subject form |
| Book | `/book` | Active | "Mixed Media Color Studio" thank-you page |
| Promise | `/promise-page` | Active | 14-day guarantee, customer support |
| Products | `/products` | Active | Empty catalog |
| Links | `/links` | Active | Link-in-bio (Substack, Workshop) |
| Terms | `/terms` | Active | Legal text |

**Brand Identity (preserved):**
- Primary: Hot pink `#fe3676` / `#fa0050`
- Gold accent: `#e6b81d`
- Orange accent: `#ff5031`
- Dark: `#2b2b2b`
- Warm background: `#faf5f0`
- Headlines: Anton (bold, uppercase)
- Body: Montserrat (clean, modern)
- Accent serif: Cactus Classical Serif

**External Links:**
- Podcast → maderemarkable.com/blog
- Substack → wynnewandering.substack.com
- Social: Instagram, YouTube, Pinterest

## Tech Stack

- **Astro** — Static site generator with component reuse and hot reload
- **Tailwind CSS** — Utility-first CSS for rapid styling
- **Plain HTML output** — No client-side JS framework shipped to browser
- **Local development** — `npm run dev` for preview; deployment decisions deferred

## Architecture: Restructure & Modernize

### Page Structure (new → old mapping)

| New Page | Old Pages Merged | Purpose |
|----------|-----------------|---------|
| **Home** `/` | Home + About (was 404) | Hero, about section, offerings, CTA |
| **Book** `/book` | Book | Book showcase with purchase links |
| **Podcast** `/podcast` | Nav link to external | Astro redirect to maderemarkable.com/blog (no page needed) |
| **Contact** `/contact` | Contact + Promise | Form + guarantee section |
| **Links** `/links` | Links | Standalone link-in-bio page |
| **Terms** `/terms` | Terms | Legal text |

**Removed:** Products (was empty)

**Navigation:** Home | Book | Podcast | Contact (+ social icons)

### Layout Pattern: Scroll Story

Each page unfolds as a vertical narrative with full-width sections using alternating backgrounds (white → colored → warm → dark). This creates a page-turning rhythm that feels personal and warm — matching Kellee's brand energy.

## Page Designs

### Home Page

1. **Nav** — Sticky. Logo left, nav links center, social icons right. Transparent on hero, solid on scroll.
2. **Hero** (white bg) — Centered layout. Small label "KELLEE WYNNE STUDIOS". Large serif headline "I'm so happy you're here!". Circular portrait photo. Subtitle text.
3. **About Section** (pink bg `#fe3676`) — Side-by-side: image left, bio text right. Introduces Kellee as artist/author/mentor.
4. **Offerings** (warm bg `#faf5f0`) — "Explore My World" heading. 3-card grid: Book, Podcast, Newsletter. Each card has icon, title, subtitle. Cards link to respective pages.
5. **CTA** (dark bg `#2b2b2b`) — Bold headline + gold accent button. Drives to newsletter signup or contact.
6. **Footer** — Social links, legal links (Terms, Contact), copyright.

### Book Page

1. **Hero** (white bg) — "THE BOOK" label, "Mixed Media Color Studio" title, book cover image with shadow.
2. **Purchase CTA** (pink bg) — "Get Your Copy" with purchase link buttons (Amazon, Bookshop.org).
3. **What's Inside** (warm bg) — 2x2 grid of feature cards (color theory, techniques, exercises, examples).
4. **Thank You** — Kellee's personal message about the book's success.

### Contact Page

1. **Header** (white bg) — "GET IN TOUCH" label, "Send Us a Message" title, helper text.
2. **Form** (warm bg) — Centered form: name, email, message textarea, submit button. Uses Formspree for form handling since this is a static site.
3. **Our Promise** (dark bg) — Merged from promise page. 14-day guarantee, admin email for support.

### Links Page (standalone)

- Full gradient background (pink → orange)
- Circular profile photo, name, bio line
- Stacked link buttons: Substack, Workshop, Book, Podcast
- Social icons at bottom
- No site nav (this is a standalone link-in-bio page)

### Terms Page

- Standard nav + footer
- Clean typographic layout for legal text
- White background, comfortable reading width

## Shared Components (Astro)

| Component | Used On | Purpose |
|-----------|---------|---------|
| `Layout.astro` | All pages | HTML shell, meta tags, font loading |
| `Nav.astro` | All except Links | Sticky nav with scroll behavior |
| `Footer.astro` | All except Links | Social + legal links |
| `Hero.astro` | Home, Book, Contact | Configurable hero section |
| `CTA.astro` | Home, Book | Call-to-action banner |
| `Card.astro` | Home, Book | Offering/feature card |
| `ContactForm.astro` | Contact | Form with Formspree integration |

## Scraping Plan

### Phase 1: Download all content
1. Fetch HTML for all 7 pages using curl/WebFetch
2. Extract text content, headings, and structure
3. Download all images from Simplero CDN (`simplerousercontent` URLs)
4. Save original CSS variables and color values for reference

### Phase 2: Organize assets
1. Save images to `public/images/` with descriptive names
2. Create content files with extracted text
3. Document any external links and their destinations

## Project Structure

```
kwstudio_test/
├── public/
│   ├── images/          # Scraped images + new assets
│   └── favicon.ico
├── src/
│   ├── components/      # Astro components
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CTA.astro
│   │   ├── Card.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── Layout.astro # Base HTML layout
│   └── pages/
│       ├── index.astro  # Home
│       ├── book.astro
│       ├── contact.astro
│       ├── links.astro
│       └── terms.astro
├── tailwind.config.mjs  # Brand colors, fonts
├── astro.config.mjs
├── package.json
└── docs/
    └── superpowers/specs/  # This spec
```

## Tailwind Configuration

```js
// tailwind.config.mjs (key values)
colors: {
  brand: {
    pink: '#fe3676',
    gold: '#e6b81d',
    orange: '#ff5031',
    dark: '#2b2b2b',
    warm: '#faf5f0',
  }
},
fontFamily: {
  display: ['Anton', 'sans-serif'],
  body: ['Montserrat', 'sans-serif'],
  accent: ['Cactus Classical Serif', 'serif'],
}
```

## Verification

1. **Scraping** — Confirm all images download successfully; compare text content against live site
2. **Dev server** — `npm run dev` serves the site locally with hot reload
3. **Visual check** — Compare each page wireframe (in `.superpowers/brainstorm/65119-1774206503/`) against the built page
4. **Responsive** — Test at mobile (375px), tablet (768px), and desktop (1280px) widths
5. **Links** — All internal nav links work; external links (podcast, social) open correctly
6. **Form** — Contact form submits to Formspree (or shows a placeholder in dev)
7. **Build** — `npm run build` produces a clean `dist/` folder with static HTML
