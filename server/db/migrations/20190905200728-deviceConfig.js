module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Add config to device');
    await queryInterface.addColumn('devices', 'config', {
      type: Sequelize.DataTypes.STRING
    });
  },
  down: async () => {
    await queryInterface.removeColumn('devices', 'config');
  }
};
