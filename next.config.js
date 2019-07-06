const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
// const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withTypescript(
  withCSS({
    webpack(config, { isServer }) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      return config;
    }
  })
);
