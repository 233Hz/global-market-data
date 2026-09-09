/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        card: 'rgba(255, 255, 255, 0.03)',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        brand: {
          DEFAULT: '#5e6ad2',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
      },
      boxShadow: {
        none: 'none',
      }
    },
  },
  plugins: [],
}
