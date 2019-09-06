module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('Creating integration table');
    await queryInterface.createTable('integrations', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      slug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      config: {
        type: Sequelize.DataTypes.STRING(2048),
        allowNull: false
      },
      createdBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'devices',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    console.log('Creating component table');
    await queryInterface.createTable('components', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      config: {
        type: Sequelize.DataTypes.STRING(2048),
        allowNull: false
      },
      componentSlug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      integrationSlug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      integrationId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'integrations',
          key: 'id'
        }
      },
      viewId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'views',
          key: 'id'
        }
      },
      createdBy: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'devices',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('components');
    await queryInterface.dropTable('integrations');
  }
};
