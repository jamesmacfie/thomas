const { getWidgets } = require('./widgets');
const { getSettings } = require('./settings');

class IntegrationWidgetsPlugin {
  apply(compiler) {
    // Prevent adding multi instances to the same compiler
    if (compiler.test) {
      return;
    }

    compiler.hooks.entryOption.tap('IntegrationWidgets', () => {
      getWidgets();
      getSettings();
    });

    compiler.test = this;
  }
}

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.plugins.push(new IntegrationWidgetsPlugin());

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
