const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../dev.db'),
    define: {
      timestamps: true
    }
  }
};
