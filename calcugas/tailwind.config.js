/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flame: {
          50: '#fff8ed', 100: '#ffefd4', 200: '#ffdba8', 300: '#ffc071',
          400: '#ff9a38', 500: '#fd7d11', 600: '#ee6207', 700: '#c54908',
          800: '#9c3a0f', 900: '#7e3210', 950: '#441706',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
