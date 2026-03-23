# Agent Guidelines — Kellee Wynne Studios

## Project Context
This is a website redesign for an artist/creative entrepreneur. The site must feel warm, handcrafted, and artistic — NOT like a generic AI template.

## Before Making Changes
1. Read `CLAUDE.md` for the full design system, component inventory, and rules
2. Check `src/data/navigation.ts` for centralized nav/social link data
3. Use existing components instead of writing inline markup:
   - `SectionHeading` for overline + title + gold bar patterns
   - `TestimonialCard` for quote cards
   - `Card` for offering/feature cards (supports image, icon, and dark variants)
   - `Hero` for page hero sections (supports warm, dark, art variants)
   - `CallToAction` for full-width CTA sections
   - `GoldSeparator` for decorative separators
   - `ChecklistItem` for gold-checkmark list items

## Design System Rules (STRICT)
- **3 button styles only** — primary gold, secondary gold outline, tertiary text link
- **Heading colors** — H1: pink, H2: dark. Single color, no multi-color spans.
- **4 section backgrounds** — white, warm, dark, hero gradient. No inline gradients.
- **No hardcoded hex colors** — use Tailwind brand tokens from `tailwind.config.mjs`
- **No inline `style=` for colors** — only allowed for `background-image: url(...)`
- **Body text contrast** — use `text-brand-dark/80` (not /70), `text-white/70` on dark (not /60)

## File Ownership
When modifying files, check that no other agent is working on the same file. Each agent should clearly state which files it will modify.

## After Making Changes
- Run `npx astro build` to verify
- Do NOT commit — the orchestrator handles commits
- Report: status, files changed, line counts

## Common Mistakes to Avoid
- Using emojis in cards (looks AI-generated)
- Same background texture on every page (right concept, wrong execution)
- Adding decorative CSS dots/blobs (user said skip for now)
- Multi-color headline spans (user said single color)
- Making buttons pink instead of gold (gold = action, pink = brand)
- Using `text-brand-dark/70` (too faint — use /80)
