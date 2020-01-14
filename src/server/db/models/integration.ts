import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface IntegrationModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly slug: string;
  readonly config: any;
  readonly createdBy: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type IntegrationStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IntegrationModel;
};

const integration = (sequelize: Sequelize.Sequelize) => {
  logger.info('🦷 Creating integration model');
  const Integration = <IntegrationStatic>sequelize.define('integration', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    config: {
      type: DataTypes.STRING,
      allowNull: false,
      get(this: IntegrationModel) {
        return JSON.parse(this.getDataValue('config'));
      },
      set(this: IntegrationModel, config) {
        this.setDataValue('config', JSON.stringify(config));
      }
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'devices',
        key: 'id'
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });

  (Integration as any).associate = function(models: any) {
    (Integration as any).Widgets = (Integration as IntegrationStatic).hasMany(models.Widget, {
      foreignKey: 'integrationId'
    });
  };
  return Integration;
};

export default integration;
