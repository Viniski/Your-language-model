const colors = require('./src/styles/colors.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '#root[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  important: '#root-wrapper',
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontSize: {
      '2xs': ['0.625rem', 1.5],
      xs: ['0.75rem', 1.5],
      sm: ['0.875rem', 1.5],
      base: ['1rem', 1.5],
      lg: ['1.125rem', 1.5],
      xl: ['1.25rem', 1.5],
      '2xl': ['1.5rem', 1.5],
      '3xl': ['2rem', 1.2],
    },
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1920px',
    },
    extend: {
      colors: colors.base,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
