# Kellee Wynne Studios Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scrape kelleewynne.com and rebuild it as a modern Astro + Tailwind CSS static site with the same brand identity and content, using a "scroll story" layout pattern.

**Architecture:** Astro static site with reusable components (Nav, Footer, Hero, CTA, Card, ContactForm). Each page is an `.astro` file composing these components. Tailwind CSS configured with brand tokens. Images scraped from Simplero CDN. Contact form via Formspree.

**Tech Stack:** Astro 5.x, Tailwind CSS 3.x (via @astrojs/tailwind), Google Fonts (Anton, Montserrat, Cactus Classical Serif)

> **Note:** If `@astrojs/tailwind` has moved to Tailwind 4 by the time of implementation, the config format may differ (Tailwind 4 uses CSS-based config). Adjust accordingly — the brand tokens remain the same.

**Spec:** `docs/superpowers/specs/2026-03-22-kelleewynne-redesign-design.md`

---

## File Structure

```
kwstudio_test/
├── public/
│   ├── images/
│   │   ├── kellee-wynne-logo.png
│   │   ├── kellee-portrait-bg.webp
│   │   ├── kellee-portrait-standing.png
│   │   ├── book-cover.jpg
│   │   ├── book-banner.jpg
│   │   ├── wynne-wandering-substack.png
│   │   └── teaching-artist-workshop.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CTA.astro
│   │   ├── Card.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── book.astro
│       ├── contact.astro
│       ├── links.astro
│       └── terms.astro
├── tailwind.config.mjs
├── astro.config.mjs
└── package.json
```

---

### Task 1: Scrape Assets from Existing Site

**Files:**
- Create: `public/images/` (directory with all scraped images)
- Create: `scraped-content/` (temporary directory with raw HTML for reference)

- [ ] **Step 1: Create directories**

```bash
mkdir -p public/images scraped-content
```

- [ ] **Step 2: Download all images from Simplero CDN**

```bash
# Logo
curl -sL "https://img.simplerousercontent.net/scaled_image/13660576/9228a506565cb0cf833faf02d8907f5d331745f1/Kellee-Wynne-website-logo-1297w-172h.png" -o public/images/kellee-wynne-logo.png

# Portrait background (webp)
curl -sL "https://img.simplerousercontent.net/scaled_image/13506118/e76ff19ea1a08099c9b613fae3b49083c657c2a8/kellee-wynne-avatar-portrait-profile-background-kw-2-1600w-900h.webp" -o public/images/kellee-portrait-bg.webp

# Portrait background (png fallback)
curl -sL "https://img.simplerousercontent.net/scaled_image/13506118/a884141ca378239c0c6453dba2d2d78f7a755785/kellee-wynne-avatar-portrait-profile-background-kw-2-1600w-900h.png" -o public/images/kellee-portrait-bg.png

# Portrait standing
curl -sL "https://img.simplerousercontent.net/scaled_image/13506130/5026b60542647784a57d97c683fa593dd308fecf/kellee-wynne-avatar-portrait-profile-standing-kw-1-615w-637h.png" -o public/images/kellee-portrait-standing.png

# Book cover
curl -sL "https://img.simplerousercontent.net/scaled_image/5138923/8d3c90e87f56f1f647b61ed8e1520b8b1db16e83/Mixed-Media-Color-Studio-by-Kellee-Wynne-Conrad-Book-VAS-2021-3--4000w-3000h.jpg" -o public/images/book-cover.jpg

# Book banner
curl -sL "https://img.simplerousercontent.net/scaled_image/5142191/5be404999592ec6c3ffd9001934955cfc31025b7/Mixed-Media-Color-Studio-by-Kellee-Wynne-Conrad-Book-VAS-2021-5--3840w-977h.jpg" -o public/images/book-banner.jpg

# Substack avatar
curl -sL "https://img.simplerousercontent.net/scaled_image/13850706/45a402a2262fe2639b11d34099d33c7d398e669f/wynne-wandering-367w-367h.png" -o public/images/wynne-wandering-substack.png

# Teaching Artist Workshop banner
curl -sL "https://img.simplerousercontent.net/scaled_image/14517901/81fa179834299a7f5e1aef7dcc01839d669498ea/The-Teaching-Artist-Workshop-w-dates-375w-211h.png" -o public/images/teaching-artist-workshop.png
```

- [ ] **Step 3: Save raw HTML for all pages as reference**

```bash
curl -sL "https://www.kelleewynne.com/" -o scraped-content/home.html
curl -sL "https://www.kelleewynne.com/book" -o scraped-content/book.html
curl -sL "https://www.kelleewynne.com/contact" -o scraped-content/contact.html
curl -sL "https://www.kelleewynne.com/promise-page" -o scraped-content/promise.html
curl -sL "https://www.kelleewynne.com/links" -o scraped-content/links.html
curl -sL "https://www.kelleewynne.com/terms" -o scraped-content/terms.html
curl -sL "https://www.kelleewynne.com/products" -o scraped-content/products.html
```

- [ ] **Step 4: Verify all images downloaded**

```bash
ls -la public/images/
```

Expected: 8 image files, all with non-zero file sizes.

- [ ] **Step 5: Commit scraped assets**

```bash
git add public/images/ scraped-content/
git commit -m "feat: scrape images and HTML from existing kelleewynne.com"
```

---

### Task 2: Scaffold Astro + Tailwind Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Initialize Astro project**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strictest
```

If the interactive prompt blocks, create the files manually instead (see step 1b).

- [ ] **Step 1b (fallback): Create package.json manually if needed**

```json
{
  "name": "kwstudio",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install astro @astrojs/tailwind tailwindcss
```

- [ ] **Step 3: Create astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  redirects: {
    '/podcast': 'https://www.maderemarkable.com/blog',
  },
});
```

- [ ] **Step 4: Create tailwind.config.mjs with brand tokens**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#fe3676',
          'pink-dark': '#fa0050',
          gold: '#e6b81d',
          orange: '#ff5031',
          dark: '#2b2b2b',
          warm: '#faf5f0',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Cactus Classical Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create base Layout.astro**

Create `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Kellee Wynne Studios — Artist, Author, Mentor' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700&family=Cactus+Classical+Serif&display=swap"
      rel="stylesheet"
    />
    <title>{title} | Kellee Wynne Studios</title>
  </head>
  <body class="font-body text-brand-dark bg-white antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 6: Create a minimal index.astro to verify setup**

Create `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Home">
  <main class="flex items-center justify-center min-h-screen">
    <h1 class="font-display text-4xl text-brand-pink">Kellee Wynne Studios</h1>
  </main>
</Layout>
```

- [ ] **Step 7: Run dev server and verify**

```bash
npm run dev
```

Expected: Site loads at `http://localhost:4321` showing "Kellee Wynne Studios" in Anton font, pink color.

- [ ] **Step 8: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tailwind.config.mjs src/ tsconfig.json
git commit -m "feat: scaffold Astro + Tailwind project with brand tokens"
```

---

### Task 3: Build Nav Component

**Files:**
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create Nav.astro**

Create `src/components/Nav.astro`:

```astro
---
interface Props {
  currentPage?: string;
}

const { currentPage = '' } = Astro.props;

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/book', label: 'Book' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/kelleewynne', label: 'Instagram', icon: 'IG' },
  { href: 'https://www.youtube.com/c/kelleewynne', label: 'YouTube', icon: 'YT' },
  { href: 'https://www.pinterest.com/kelleewynne/', label: 'Pinterest', icon: 'PIN' },
];
---

<nav class="sticky top-0 z-50 bg-transparent border-transparent transition-all">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex-shrink-0">
        <img
          src="/images/kellee-wynne-logo.png"
          alt="Kellee Wynne Studios"
          class="h-8 w-auto"
        />
      </a>

      <!-- Nav Links (desktop) -->
      <div class="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            href={link.href}
            class:list={[
              'text-sm font-medium tracking-wider uppercase transition-colors',
              currentPage === link.href
                ? 'text-brand-pink'
                : 'text-brand-dark/60 hover:text-brand-pink',
            ]}
          >
            {link.label}
          </a>
        ))}
      </div>

      <!-- Social Links (desktop) -->
      <div class="hidden md:flex items-center gap-4">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-medium text-brand-dark/40 hover:text-brand-pink transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <!-- Mobile menu button -->
      <button
        id="mobile-menu-btn"
        class="md:hidden p-2 text-brand-dark/60 hover:text-brand-pink"
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      <div class="flex flex-col gap-2">
        {navLinks.map((link) => (
          <a
            href={link.href}
            class:list={[
              'px-3 py-2 text-sm font-medium tracking-wider uppercase rounded-lg transition-colors',
              currentPage === link.href
                ? 'text-brand-pink bg-brand-pink/5'
                : 'text-brand-dark/60 hover:text-brand-pink hover:bg-brand-pink/5',
            ]}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div class="flex items-center gap-4 mt-4 px-3">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-medium text-brand-dark/40 hover:text-brand-pink transition-colors"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  </div>
</nav>

<script>
  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => menu?.classList.toggle('hidden'));

  // Scroll-aware nav: transparent at top, solid on scroll
  const nav = document.querySelector('nav');
  const updateNav = () => {
    if (window.scrollY > 50) {
      nav?.classList.add('bg-white/95', 'backdrop-blur-sm', 'border-b', 'border-gray-100');
      nav?.classList.remove('bg-transparent', 'border-transparent');
    } else {
      nav?.classList.remove('bg-white/95', 'backdrop-blur-sm', 'border-b', 'border-gray-100');
      nav?.classList.add('bg-transparent', 'border-transparent');
    }
  };
  updateNav();
  window.addEventListener('scroll', updateNav);
</script>
```

- [ ] **Step 2: Add Nav to index.astro and verify**

Update `src/pages/index.astro` to import and render `<Nav currentPage="/" />` above the main content.

```bash
npm run dev
```

Expected: Sticky nav with logo, links, and social icons. Mobile hamburger menu toggles.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add Nav component with mobile menu"
```

---

### Task 4: Build Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
---
const socialLinks = [
  { href: 'https://www.instagram.com/kelleewynne', label: 'Instagram' },
  { href: 'https://www.youtube.com/c/kelleewynne', label: 'YouTube' },
  { href: 'https://www.pinterest.com/kelleewynne/', label: 'Pinterest' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];
---

<footer class="bg-brand-dark text-white/60 py-12">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <!-- Social -->
    <div class="flex items-center justify-center gap-6 mb-6">
      {socialLinks.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm hover:text-brand-gold transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Legal -->
    <div class="flex items-center justify-center gap-4 mb-6 text-xs">
      {legalLinks.map((link) => (
        <a href={link.href} class="hover:text-white transition-colors">
          {link.label}
        </a>
      ))}
    </div>

    <!-- Copyright -->
    <p class="text-xs text-white/40">
      &copy; {new Date().getFullYear()} Kellee Wynne Studios. All rights reserved.
    </p>
  </div>
</footer>
```

- [ ] **Step 2: Add Footer to index.astro and verify**

Update `src/pages/index.astro` to import and render `<Footer />` below the main content.

```bash
npm run dev
```

Expected: Dark footer with social links, legal links, and copyright.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Footer component"
```

---

### Task 5: Build Hero Component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create Hero.astro**

Create `src/components/Hero.astro`:

```astro
---
interface Props {
  label: string;
  title: string;
  subtitle?: string;
  image?: { src: string; alt: string; rounded?: boolean };
  cta?: { text: string; href: string };
}

const { label, title, subtitle, image, cta } = Astro.props;
---

<section class="bg-white py-16 sm:py-24 text-center">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="text-xs sm:text-sm font-medium tracking-[0.15em] text-brand-pink uppercase mb-3">
      {label}
    </p>
    <h1 class="font-display text-3xl sm:text-5xl lg:text-6xl text-brand-dark uppercase leading-tight mb-6">
      {title}
    </h1>
    {image && (
      <div class="mb-8">
        <img
          src={image.src}
          alt={image.alt}
          class:list={[
            'mx-auto object-cover',
            image.rounded
              ? 'w-32 h-32 sm:w-40 sm:h-40 rounded-full'
              : 'max-w-full rounded-lg shadow-lg',
          ]}
        />
      </div>
    )}
    {subtitle && (
      <p class="text-base sm:text-lg text-brand-dark/60 max-w-xl mx-auto leading-relaxed mb-8">
        {subtitle}
      </p>
    )}
    {cta && (
      <a
        href={cta.href}
        class="inline-block bg-brand-pink text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-brand-pink-dark transition-colors"
      >
        {cta.text}
      </a>
    )}
  </div>
</section>
```

- [ ] **Step 2: Verify in index.astro**

Temporarily add a `<Hero>` to the homepage to check rendering:

```astro
<Hero
  label="Kellee Wynne Studios"
  title="I'm so happy you're here!"
  subtitle="Where your wild, weird, and brilliant ideas turn into something remarkable."
  image={{ src: '/images/kellee-portrait-standing.png', alt: 'Kellee Wynne', rounded: true }}
/>
```

```bash
npm run dev
```

Expected: Centered hero with label, headline, circular portrait, and subtitle.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component"
```

---

### Task 6: Build Card and CTA Components

**Files:**
- Create: `src/components/Card.astro`
- Create: `src/components/CTA.astro`

- [ ] **Step 1: Create Card.astro**

Create `src/components/Card.astro`:

```astro
---
interface Props {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
}

const { icon, title, subtitle, href } = Astro.props;
---

<a
  href={href}
  class="block bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
>
  <div class="text-3xl mb-3">{icon}</div>
  <h3 class="font-semibold text-brand-dark group-hover:text-brand-pink transition-colors mb-1">
    {title}
  </h3>
  <p class="text-sm text-brand-dark/50">{subtitle}</p>
</a>
```

- [ ] **Step 2: Create CTA.astro**

Create `src/components/CTA.astro`:

```astro
---
interface Props {
  headline: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'dark' | 'pink';
}

const { headline, subtitle, buttonText, buttonHref, variant = 'dark' } = Astro.props;

const bgClass = variant === 'pink' ? 'bg-brand-pink' : 'bg-brand-dark';
const btnClass = variant === 'pink'
  ? 'bg-white text-brand-pink hover:bg-gray-50'
  : 'bg-brand-gold text-brand-dark hover:bg-yellow-400';
---

<section class={`${bgClass} text-white py-16 sm:py-20`}>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="font-display text-2xl sm:text-3xl uppercase mb-3">
      {headline}
    </h2>
    {subtitle && (
      <p class="text-sm sm:text-base text-white/70 mb-8">{subtitle}</p>
    )}
    <a
      href={buttonHref}
      class={`inline-block font-semibold text-sm px-8 py-3 rounded-full transition-colors ${btnClass}`}
    >
      {buttonText}
    </a>
  </div>
</section>
```

- [ ] **Step 3: Verify both in index.astro**

Add a cards section and CTA temporarily:

```astro
<section class="bg-brand-warm py-16">
  <div class="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
    <Card icon="📖" title="The Book" subtitle="Mixed Media Color Studio" href="/book" />
    <Card icon="🎙️" title="Podcast" subtitle="Made Remarkable" href="/podcast" />
    <Card icon="✨" title="Newsletter" subtitle="Wynne Wandering" href="https://wynnewandering.substack.com" />
  </div>
</section>
<CTA
  headline="Ready to Turn Your Creativity Into a Business?"
  subtitle="Join the community of artists building something remarkable."
  buttonText="Get Started →"
  buttonHref="/contact"
/>
```

```bash
npm run dev
```

Expected: 3-card grid on warm background, dark CTA section with gold button.

- [ ] **Step 4: Commit**

```bash
git add src/components/Card.astro src/components/CTA.astro src/pages/index.astro
git commit -m "feat: add Card and CTA components"
```

---

### Task 7: Build ContactForm Component

**Files:**
- Create: `src/components/ContactForm.astro`

- [ ] **Step 1: Create ContactForm.astro**

Create `src/components/ContactForm.astro`:

```astro
---
// Formspree endpoint — replace YOUR_FORM_ID with actual ID when deploying
const formAction = 'https://formspree.io/f/YOUR_FORM_ID';
---

<form action={formAction} method="POST" class="max-w-lg mx-auto space-y-4">
  <div>
    <label for="name" class="sr-only">First and Last Name</label>
    <input
      type="text"
      id="name"
      name="name"
      placeholder="First and Last Name"
      required
      class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition"
    />
  </div>
  <div>
    <label for="email" class="sr-only">Email Address</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email Address"
      required
      class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition"
    />
  </div>
  <div>
    <label for="message" class="sr-only">Your Message</label>
    <textarea
      id="message"
      name="message"
      placeholder="Your Message"
      rows="5"
      required
      class="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-brand-dark placeholder:text-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink transition resize-none"
    ></textarea>
  </div>
  <button
    type="submit"
    class="w-full bg-brand-pink text-white font-semibold py-3 rounded-full hover:bg-brand-pink-dark transition-colors"
  >
    Send Message →
  </button>
</form>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.astro
git commit -m "feat: add ContactForm component with Formspree"
```

---

### Task 8: Build Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write the complete home page**

Replace `src/pages/index.astro` with the full scroll-story homepage:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Card from '../components/Card.astro';
import CTA from '../components/CTA.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Home">
  <Nav currentPage="/" />

  <!-- Hero -->
  <Hero
    label="Kellee Wynne Studios"
    title="I'm so happy you're here!"
    subtitle="Where your wild, weird, and brilliant ideas turn into something remarkable."
    image={{ src: '/images/kellee-portrait-standing.png', alt: 'Kellee Wynne', rounded: true }}
  />

  <!-- About Section -->
  <section class="bg-brand-pink text-white py-16 sm:py-20">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
      <div class="flex-shrink-0">
        <img
          src="/images/kellee-portrait-bg.webp"
          alt="Kellee Wynne in her studio"
          class="w-40 h-52 sm:w-48 sm:h-64 object-cover rounded-lg"
        />
      </div>
      <div>
        <h2 class="font-display text-2xl sm:text-3xl uppercase mb-4">Meet Kellee</h2>
        <p class="text-white/90 leading-relaxed mb-4">
          Hey, Artists and Makers! Welcome to the place where your wild, weird and brilliant ideas come to life!
        </p>
        <p class="text-white/80 leading-relaxed">
          I want to help you turn your talent into a profitable course business. As an artist, author of
          <em>Mixed Media Color Studio</em>, and business mentor, I've helped countless creatives build
          something remarkable from their passion.
        </p>
      </div>
    </div>
  </section>

  <!-- Offerings -->
  <section class="bg-brand-warm py-16 sm:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="font-display text-2xl sm:text-3xl text-brand-dark text-center uppercase mb-10">
        Explore My World
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card icon="📖" title="The Book" subtitle="Mixed Media Color Studio" href="/book" />
        <Card icon="🎙️" title="Podcast" subtitle="Made Remarkable" href="/podcast" />
        <Card icon="✨" title="Newsletter" subtitle="Wynne Wandering" href="https://wynnewandering.substack.com" />
      </div>
    </div>
  </section>

  <!-- CTA -->
  <CTA
    headline="Turn Your Creativity Into a Business"
    subtitle="Join the community of artists building something remarkable."
    buttonText="Start Here →"
    buttonHref="/contact"
  />

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Expected: Full scroll-story homepage — white hero → pink about → warm offerings → dark CTA → dark footer. All sections render correctly, all links work.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page with scroll-story layout"
```

---

### Task 9: Build Book Page

**Files:**
- Create: `src/pages/book.astro`

- [ ] **Step 1: Create book.astro**

Create `src/pages/book.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import CTA from '../components/CTA.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="The Book" description="Mixed Media Color Studio by Kellee Wynne Conrad">
  <Nav currentPage="/book" />

  <!-- Hero -->
  <section class="bg-white py-16 sm:py-24 text-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-xs sm:text-sm font-medium tracking-[0.15em] text-brand-pink uppercase mb-3">
        The Book
      </p>
      <h1 class="font-display text-3xl sm:text-5xl text-brand-dark uppercase leading-tight mb-8">
        Mixed Media Color Studio
      </h1>
      <img
        src="/images/book-cover.jpg"
        alt="Mixed Media Color Studio by Kellee Wynne Conrad"
        class="mx-auto max-w-xs sm:max-w-sm rounded-lg shadow-xl mb-8"
      />
    </div>
  </section>

  <!-- Purchase CTA -->
  <section class="bg-brand-pink text-white py-12 sm:py-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="font-display text-2xl sm:text-3xl uppercase mb-6">Get Your Copy</h2>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          class="inline-block bg-white text-brand-pink font-semibold text-sm px-8 py-3 rounded-full hover:bg-gray-50 transition-colors"
        >
          Amazon
        </a>
        <a
          href="#"
          class="inline-block bg-white/20 text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-white/30 transition-colors"
        >
          Bookshop.org
        </a>
      </div>
    </div>
  </section>

  <!-- What's Inside -->
  <section class="bg-brand-warm py-16 sm:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="font-display text-2xl sm:text-3xl text-brand-dark text-center uppercase mb-10">
        What's Inside
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-5 flex items-center gap-3">
          <span class="text-2xl">🎨</span>
          <span class="font-medium text-brand-dark">Color theory & mixing</span>
        </div>
        <div class="bg-white rounded-lg p-5 flex items-center gap-3">
          <span class="text-2xl">🖌️</span>
          <span class="font-medium text-brand-dark">Mixed media techniques</span>
        </div>
        <div class="bg-white rounded-lg p-5 flex items-center gap-3">
          <span class="text-2xl">💡</span>
          <span class="font-medium text-brand-dark">Creative exercises</span>
        </div>
        <div class="bg-white rounded-lg p-5 flex items-center gap-3">
          <span class="text-2xl">📸</span>
          <span class="font-medium text-brand-dark">Full-color examples</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Thank You -->
  <section class="bg-white py-16 sm:py-20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="font-display text-2xl sm:text-3xl text-brand-dark uppercase mb-6">
        Thank You!
      </h2>
      <p class="text-brand-dark/70 leading-relaxed">
        Every time you buy and share the book I do a happy dance! It brings me so much joy that you are
        finding joy in what I have created for you. It makes it worth the effort and long days to create
        something valuable for artists to enjoy for years to come. Thank you from the whole of my heart!!
      </p>
    </div>
  </section>

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Navigate to `/book`. Expected: Book cover hero → pink purchase CTA → warm "What's Inside" grid → thank you section → footer.

- [ ] **Step 3: Commit**

```bash
git add src/pages/book.astro
git commit -m "feat: build book page"
```

---

### Task 10: Build Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create contact.astro**

Create `src/pages/contact.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import ContactForm from '../components/ContactForm.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Contact" description="Get in touch with Kellee Wynne Studios">
  <Nav currentPage="/contact" />

  <!-- Header -->
  <section class="bg-white py-16 sm:py-24 text-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-xs sm:text-sm font-medium tracking-[0.15em] text-brand-pink uppercase mb-3">
        Get In Touch
      </p>
      <h1 class="font-display text-3xl sm:text-5xl text-brand-dark uppercase leading-tight mb-4">
        Send Us a Message
      </h1>
      <p class="text-brand-dark/60 leading-relaxed">
        Do you have a question about a course or workshop, or have tech trouble?
        Please contact <a href="mailto:admin@kelleewynnestudios.com" class="text-brand-pink hover:underline">admin@kelleewynnestudios.com</a>
        or fill out the form below.
      </p>
    </div>
  </section>

  <!-- Form -->
  <section class="bg-brand-warm py-16 sm:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <ContactForm />
    </div>
  </section>

  <!-- Our Promise -->
  <section class="bg-brand-dark text-white py-16 sm:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="font-display text-2xl sm:text-3xl uppercase mb-4">🤝 Our Promise</h2>
      <p class="text-white/70 leading-relaxed mb-4">
        We take our art as wildly playful, but our customers seriously. All our courses are backed by a
        14 day guarantee. If you don't love it you can request a refund.
      </p>
      <p class="text-white/60 text-sm">
        Questions? Reach out to
        <a href="mailto:admin@kelleewynnestudios.com" class="text-brand-gold hover:underline">
          admin@kelleewynnestudios.com
        </a>
      </p>
    </div>
  </section>

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Navigate to `/contact`. Expected: White header → warm form section → dark promise section → footer. Form fields render with correct styling.

- [ ] **Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: build contact page with form and promise section"
```

---

### Task 11: Build Links Page

**Files:**
- Create: `src/pages/links.astro`

- [ ] **Step 1: Create links.astro**

This page is standalone (no shared Nav/Footer — it's a link-in-bio page):

Create `src/pages/links.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';

const links = [
  { label: '✨ New Substack Newsletter', href: 'https://wynnewandering.substack.com', primary: true },
  { label: '🎓 Teaching Artist Workshop', href: 'https://www.kelleewynne.com/100', primary: false },
  { label: '📖 Mixed Media Color Studio', href: '/book', primary: false },
  { label: '🎙️ Made Remarkable Podcast', href: 'https://www.maderemarkable.com/blog', primary: false },
];

const socialLinks = [
  { href: 'https://www.instagram.com/kelleewynne', label: 'Instagram' },
  { href: 'https://www.youtube.com/c/kelleewynne', label: 'YouTube' },
  { href: 'https://www.pinterest.com/kelleewynne/', label: 'Pinterest' },
];
---

<Layout title="Links">
  <div class="min-h-screen bg-gradient-to-b from-brand-pink to-brand-orange flex flex-col items-center justify-center px-4 py-12">
    <!-- Profile -->
    <img
      src="/images/kellee-portrait-standing.png"
      alt="Kellee Wynne"
      class="w-20 h-20 rounded-full object-cover border-2 border-white/30 mb-3"
    />
    <h1 class="text-white font-bold text-lg mb-1">Kellee Wynne</h1>
    <p class="text-white/80 text-sm mb-8">Artist · Author · Mentor</p>

    <!-- Links -->
    <div class="w-full max-w-sm space-y-3">
      {links.map((link) => (
        <a
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          class:list={[
            'block w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all',
            link.primary
              ? 'bg-white text-brand-dark hover:bg-gray-50 shadow-md'
              : 'bg-white/15 text-white hover:bg-white/25',
          ]}
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Social -->
    <div class="flex items-center gap-6 mt-10">
      {socialLinks.map((link) => (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="text-white/70 text-sm hover:text-white transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Navigate to `/links`. Expected: Full-screen gradient, centered profile, stacked link buttons, social icons. No nav or footer.

- [ ] **Step 3: Commit**

```bash
git add src/pages/links.astro
git commit -m "feat: build links page (link-in-bio)"
```

---

### Task 12: Build Terms Page

**Files:**
- Create: `src/pages/terms.astro`

- [ ] **Step 1: Extract terms content from scraped HTML**

Read `scraped-content/terms.html` and extract the legal text. The terms page has standard legal content about Kellee Wynne Studios' online classroom, last modified 11/2020.

- [ ] **Step 2: Create terms.astro**

Create `src/pages/terms.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Terms & Conditions">
  <Nav currentPage="/terms" />

  <article class="bg-white py-16 sm:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray">
      <p class="text-xs sm:text-sm font-medium tracking-[0.15em] text-brand-pink uppercase mb-3 not-prose text-center">
        Legal
      </p>
      <h1 class="font-display text-3xl sm:text-4xl text-brand-dark uppercase text-center mb-8">
        Terms and Conditions
      </h1>
      <p class="text-sm text-brand-dark/40 text-center mb-12">Last modified 11/2020</p>

      <!-- Terms content extracted from scraped HTML will go here -->
      <!-- Read scraped-content/terms.html and paste the legal text sections -->
      <p class="text-brand-dark/70 leading-relaxed">
        [Terms content will be extracted from scraped-content/terms.html during implementation.
        The raw HTML has the full legal text covering: Terms of use, intellectual property,
        user accounts, course access, refund policy, and liability limitations.]
      </p>
    </div>
  </article>

  <Footer />
</Layout>
```

**Note:** During implementation, read `scraped-content/terms.html` and extract the full legal text to replace the placeholder. The text is standard legal content structured in numbered sections.

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Navigate to `/terms`. Expected: Clean typographic layout with full terms text, comfortable reading width.

- [ ] **Step 4: Commit**

```bash
git add src/pages/terms.astro
git commit -m "feat: build terms page with scraped legal content"
```

---

### Task 13: Final Verification & Production Build

**Files:** None (verification only)

- [ ] **Step 1: Verify all pages render**

```bash
npm run dev
```

Check each route:
- `http://localhost:4321/` — Home page (hero → about → offerings → CTA → footer)
- `http://localhost:4321/book` — Book page
- `http://localhost:4321/contact` — Contact page with form
- `http://localhost:4321/links` — Link-in-bio page (no nav/footer)
- `http://localhost:4321/terms` — Terms page
- `http://localhost:4321/podcast` — Should redirect to maderemarkable.com/blog

- [ ] **Step 2: Verify responsive design**

In browser devtools, test at:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px width

Check: Nav collapses to hamburger on mobile, cards stack on mobile, text sizes scale appropriately.

- [ ] **Step 3: Verify all internal links**

Click through every nav link, footer link, and card link. Confirm no broken links.

- [ ] **Step 4: Verify all images load**

Check that all scraped images display correctly on their respective pages:
- Logo in nav
- Kellee portrait on home
- Book cover on book page
- Profile on links page

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: Clean build with no errors, output in `dist/` folder.

- [ ] **Step 6: Preview production build**

```bash
npm run preview
```

Verify the built site works identically to dev.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete kelleewynne.com redesign - all pages built and verified"
```

- [ ] **Step 8: Clean up scraped-content directory**

The `scraped-content/` directory was a temporary reference. It can be kept for reference or removed:

```bash
# Optional: remove if no longer needed
rm -rf scraped-content/
git add -A
git commit -m "chore: remove scraped HTML reference files"
```
