module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-simple-vars': {},
    'postcss-import': { root: file.dirname },
    'tailwindcss': 'tailwind.js',
    'autoprefixer': {},
    'cssnano': {},
  }
})