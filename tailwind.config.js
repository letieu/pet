/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./packages/sitepet/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pet: {
          fire: '#FF5722',
          grass: '#4CAF50',
          water: '#03A9F4',
          electric: '#FFD600',
          cosmic: '#AB47BC',
          dark: '#0F1017',
          card: '#181A26',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
