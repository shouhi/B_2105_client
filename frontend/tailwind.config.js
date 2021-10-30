module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'tazer-blue': '#3770bb',
        'light-blue': '#e2ecf4'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
