# Agent Guidelines — Kellee Wynne Studios

## Project Context
This is a website redesign for an artist/creative entrepreneur. The site must feel warm, handcrafted, and artistic — NOT like a generic AI template.

## Before Making Changes
1. Read `CLAUDE.md` for the full design system, component inventory, and rules
2. Check `src/data/navigation.ts` for centralized nav/social link data
3. Use existing components instead of writing inline markup:
   - `SectionHeading` for overline + title + animated gold bar patterns
   - `TestimonialCard` for quote cards (`.polished-card` hover built-in)
   - `CallToAction` for full-width CTA sections (`.cta-shine` built-in)
   - `GoldSeparator` for decorative separators
   - `ChecklistItem` for gold-checkmark list items

## Design System Rules (STRICT)
- **3 button styles only** — primary gold (`.cta-shine`), secondary gold outline, tertiary text link
- **Heading colors** — H1: pink, H2: dark. Single color, no multi-color spans.
- **4 section backgrounds** — white, warm, dark, hero gradient. No inline gradients.
- **No hardcoded hex colors** — use Tailwind brand tokens from `tailwind.config.mjs`
- **No inline `style=` for colors** — only allowed for `background-image: url(...)`
- **Body text contrast** — use `text-brand-dark/80` (not /70), `text-white/70` on dark (not /60)

## Image Handling
- Images live in `src/assets/images/` (NOT `public/`)
- Import images: `import myImage from '../assets/images/my-image.png';`
- Use `<Image src={myImage} alt="..." />` from `astro:assets`
- For CSS backgrounds: `import { getImage } from 'astro:assets';` then `const bg = await getImage({ src: myImageSrc });`

## Internal Links (CRITICAL)
All internal links MUST use `import.meta.env.BASE_URL` prefix:
```
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
href={`${base}/page-name`}
```
Links in `src/data/navigation.ts` handle this automatically.

## Animation Classes (use these, don't reinvent)
- `.word` — word-by-word headline reveal
- `.portrait-entrance` — dramatic image entrance
- `.cta-shine` — gold button hover shine (needs `<span class="relative z-10">` wrapper)
- `.polished-card` — refined card hover with border glow
- `.card-arrow` / `.arrow-icon` — hover arrow reveal
- `.ambient-blob` — floating blur blob
- `.ambient-bg` — breathing background
- `.portrait-glow` — warm glow behind portraits
- `.gold-bar-animated` — animated width on SectionHeading gold bar
- `data-reveal` / `data-reveal-stagger` — scroll reveal

## File Ownership
When modifying files, check that no other agent is working on the same file. Each agent should clearly state which files it will modify.

## After Making Changes
- Run `npx astro build` to verify
- Do NOT commit — the orchestrator handles commits
- Report: status, files changed, line counts

## Common Mistakes to Avoid
- Using emojis in cards (looks AI-generated)
- Same background texture on every page (right concept, wrong execution)
- Multi-color headline spans (user said single color)
- Making buttons pink instead of gold (gold = action, pink = brand)
- Using `text-brand-dark/70` (too faint — use /80)
- Hardcoding internal links without BASE_URL prefix
- Using `<img>` instead of `<Image>` from astro:assets
- Putting images in `public/` instead of `src/assets/images/`
- Reinventing animation patterns instead of using global classes
