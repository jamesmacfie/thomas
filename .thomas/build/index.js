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

module.exports = IntegrationWidgetsPlugin;
