/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /basis-/,
    },
    {
      pattern: /self-/,
    },
    {
      pattern: /ml-/,
    },
    {
      pattern: /mr-/,
    },
    {
      pattern: /flex-/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /hidden/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    {
      pattern: /block/,
      variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#1E1E1E',
        },
      },
    },
  },
  plugins: [],
};
