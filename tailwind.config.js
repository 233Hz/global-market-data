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
        'comic-paper': '#fffef0',
        'comic-ink': '#1a1a1a',
        'comic-red': '#ef4444',
        'comic-yellow': '#facc15',
        'comic-blue': '#3b82f6',
        'comic-green': '#22c55e',
        'comic-dark': '#18181b',
        'comic-dark-card': '#222226',
        'comic-dark-item': '#2c2c31',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'SimHei', 'Impact', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
      },
      boxShadow: {
        'comic-sm': '2px 2px 0px 0px rgba(26,26,26,1)',
        'comic': '4px 4px 0px 0px rgba(26,26,26,1)',
        'comic-md': '6px 6px 0px 0px rgba(26,26,26,1)',
        'comic-lg': '8px 8px 0px 0px rgba(26,26,26,1)',
        'comic-hover': '2px 2px 0px 0px rgba(26,26,26,1)',
      }
    },
  },
  plugins: [],
}
