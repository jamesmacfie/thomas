const { parsed: localEnv } = require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withIntegrationComponents = require('./build/withIntegrationComponents');

module.exports = withIntegrationComponents(
  withCSS({
    webpack(config) {
      ['components', 'integrations', 'stores', 'svg', 'hooks', 'containers'].forEach(
        n => (config.resolve.alias[n] = path.join(__dirname, n))
      );

      config.resolve.alias['thomas'] = path.join(__dirname, '.thomas');

      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      config.plugins.push(new webpack.IgnorePlugin(/.thomas/));

      return config;
    }
  })
);
