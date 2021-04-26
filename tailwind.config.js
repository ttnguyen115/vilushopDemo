module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      '500px': '500px',
      '320px': '320px',
    },

    extend: {
      gridTemplateColumns: {
        'products': 'repeat(auto-fill, minmax(300px, 1fr))'
      },

      outline: {
        blue: '2px solid #03a5ce',
      }
    },

    minHeight: {
      '70px': '70px',
    },

    top: {
      '-5px': '-5px'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
