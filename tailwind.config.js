/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundImage: 
      {
        'header_image':"url('/header-bg.svg')",
        'footer_image':"url('/footer-bg.svg');"
      },
    },
  },
  plugins: [],
}