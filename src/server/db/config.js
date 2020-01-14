const path = require('path');

const config = {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../thomas.db'),
  define: {
    timestamps: true
  }
};

module.exports = {
  development: config,
  test: config,
  production: config
};
