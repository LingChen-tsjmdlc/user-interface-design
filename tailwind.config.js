// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'aurora': 'aurora 60s linear infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        gradient: {
          to: {
            'background-position': 'var(--bg-size, 300%) 0',
          },
        },
      },
    },
  },
  plugins: [],
}