
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        reddit: {
          orange: '#FF4500',
          red: '#F54404',
          blue: '#0079D3',
          lightgray: '#F8F9FA',
          mediumgray: '#DAE0E6',
          darkgray: '#1A1A1B',
          hovergray: '#272729',
        },
      },
    },
  },
  plugins: [],
}
