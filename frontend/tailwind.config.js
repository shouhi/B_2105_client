module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tazer-blue': '#3770bb',
        'light-blue': '#e2ecf4',
        'result': '#242424',
        'neon': {
          'purple': '#9461fd',
          'blue': '#4003e6',
          'lightGreen': '#00fe9b',
          'green': '#02c435',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
