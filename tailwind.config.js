/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'red-input': '#c05c48',
        'green-input': '#67b04b',
        'background-lightcolor':'#212a33',
        'no-select':'#9CA3A4'
      }
    },
  },
  plugins: [],
};
