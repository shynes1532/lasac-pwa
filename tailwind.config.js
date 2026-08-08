/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fiat: {
          red: '#dc2626',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
