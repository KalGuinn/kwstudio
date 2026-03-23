/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core palette — same family, slightly warmed/deepened
          pink: '#f2306a',        // was #fe3676 — pulled slightly deeper/more coral
          'pink-dark': '#d4004a', // was #fa0050 — richer, less electric
          'pink-light': '#fce8ef', // new: soft blush for subtle backgrounds
          gold: '#c9a118',        // was #e6b81d — richer, deeper amber-gold
          'gold-light': '#f5e9c0', // new: pale gold for backgrounds/highlights
          orange: '#f0481f',      // was #ff5031 — slightly muted, more terracotta
          dark: '#2b2b2b',        // unchanged
          warm: '#fdf7f2',        // was #faf5f0 — fractionally more peachy
          gray: '#7a7570',        // new: warm mid-gray for secondary text
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Cactus Classical Serif', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
