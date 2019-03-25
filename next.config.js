const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      return config;
    }
  })
);
