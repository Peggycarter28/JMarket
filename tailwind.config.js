/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {backgroundImage: 
      {
        'header_image':"url('/public/header-bg.svg')"
      }},
  },
  plugins: [],
}