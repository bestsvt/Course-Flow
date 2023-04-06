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
        gray: {
          900: '#2A2E3F',
          800: '#424C6B',
          700: '#646D89',
          600: '#9AA1B9',
          500: '#C8CCDB',
          400: '#D6D9E4',
          300: '#E4E6ED',
          200: '#F1F2F6',
          100: '#F6F7FC',
        },
        orange: {
          100: '#FBAA1C',
          500: '#F47E20',
        },
        black: '#000000',
        white: '#FFFFFF',
        green: '#2FAC8E',
        linear1: 'linear-gradient(90deg, #95BEFF, #0040E5)',
        linear2: 'linear-gradient(90deg, #5697FF, #2558DD)'
      },
      boxShadow: {
        shadow1: "4px 4px 24px rgba(0, 0, 0, 0.08)",
        shadow2: "2px 2px 12px rgba(64, 50, 133, 0.12)",
      }      
    },
  },
  plugins: [],
}