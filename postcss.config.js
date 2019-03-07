const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }),
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer')
  ]
};
