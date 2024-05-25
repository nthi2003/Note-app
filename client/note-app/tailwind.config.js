/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-mode': '#31363F',
        primary: "#2BB5FF",
        secondary:"#EF863E"
      },
    },
  },
  plugins: [],
}