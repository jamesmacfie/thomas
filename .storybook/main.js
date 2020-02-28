// Load in custom webpack config for aliases
const custom = require('../config/webpack.config.js')();

module.exports = {
  stories: ['../src/ui/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]]
      }
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.alias = custom.resolve.alias;
    return config;
  },
  addons: ['@storybook/addon-actions/register', '@storybook/addon-knobs/register']
};
