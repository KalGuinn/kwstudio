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
