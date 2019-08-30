const { getComponents } = require('./components');
const { getSettings } = require('./settings');

class IntegrationComponentsPlugin {
  apply(compiler) {
    // Prevent adding multi instances to the same compiler
    if (compiler.test) {
      return;
    }

    compiler.hooks.entryOption.tap('IntegrationComponents', () => {
      getComponents();
      getSettings();
    });

    compiler.test = this;
  }
}

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.plugins.push(new IntegrationComponentsPlugin());

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
