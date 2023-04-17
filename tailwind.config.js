/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'},
      colors: {
        'red-input': '#c05c48',
        'green-input': '#67b04b',
        'background-lightcolor':'#212a33',
        'no-select':'#9CA3A4',
        'color-5': '#5DA0D7',
        'color-4': '#9264A7',
        'color-3': '#E94792',
        'color-2': '#F6A240',
        'color-1': '#9CC763'
      },
      screens: {
        'tall': '768px' 
      }
    },
  },
  plugins: [],
};
