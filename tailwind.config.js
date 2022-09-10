/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto'],
        'ptsans': ['PT Sans']
      }
    },
  },
  plugins: [],
}
