import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface DeviceModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly name: string;
  readonly icon: string;
  readonly config: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type DeviceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceModel;
};

const device = (sequelize: Sequelize.Sequelize) => {
  logger.info('🍌 Creating device model');
  const Device = <DeviceStatic>sequelize.define('device', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    config: {
      type: DataTypes.STRING,
      defaultValue: {},
      allowNull: false,
      get(this: DeviceModel) {
        return JSON.parse(this.getDataValue('config'));
      },
      set(this: DeviceModel, config) {
        this.setDataValue('config', JSON.stringify(config));
      }
    },
    icon: {
      type: DataTypes.STRING
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

  (Device as any).associate = function(models: any) {
    (Device as any).DeviceViews = (Device as DeviceStatic).belongsToMany(models.View, {
      as: 'views',
      through: 'deviceViews',
      foreignKey: 'deviceId',
      uniqueKey: 'viewId'
    });
  };
  return Device;
};

export default device;
