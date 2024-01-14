/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'main': '#1C424F',
        'second': '#EE605F',
        'dark': '#181818',
        'main-shadow': '#1c424f5e',
        'second-shadow': '#ee5d5d5e',
      },
    },
    screens: {
      'full': {'max': '1919px'},
      '2xl': {'max': '1600px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1000px'},
      'md': {'max': '850px'},
      'sm': {'max': '600px'},
    }
  },
  plugins: [],
}