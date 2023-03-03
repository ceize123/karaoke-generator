/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E76F00',
        secondary: '#57476C',
        pink: '#FA4BC9',
      },
      screens: {
        '2xl': '1600px',
        '3xl': '2000px',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [],
}
