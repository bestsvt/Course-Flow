/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        body4: '12px',
        body3: '14px',
        body2: '16px',
        body1: '20px',
        headline3: '24px',
        headline2: '36px',
        headline1: '66px'
      },
      fontWeight: {
        body4: '400',
        body3: '400',
        body2: '400',
        body1: '400',
        headline3: '500',
        headline2: '500',
        headline1: '500'
      },
      lineHeight: {
        body4: '18px',
        body3: '21px',
        body2: '24px',
        body1: '30px',
        headline3: '30px',
        headline2: '45px',
        headline1: '82.5px'
      },
      colors: {
        blue: {
          900: '#020D1E',
          800: '#0C182B',
          700: '#183056',
          600: '#234781',
          500: '#2F5FAC',
          400: '#5483D0',
          300: '#8DADE0',
          200: '#C6D6EF',
          100: '#E5ECF8',
        },
      }
    },
  },
  plugins: [],
}