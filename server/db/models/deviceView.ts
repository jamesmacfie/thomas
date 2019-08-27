import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface DeviceVewModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly deviceId: number;
  readonly viewId: number;
  readonly order: number;
  readonly icon: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type DeviceViewStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DeviceVewModel;
};

const deviceView = (sequelize: Sequelize.Sequelize) => {
  logger.info('💥 Creating device view model');
  const DeviceView = <DeviceViewStatic>sequelize.define('deviceView', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    deviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'devices',
        key: 'id'
      }
    },
    viewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'views',
        key: 'id'
      }
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
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

  (DeviceView as any).associate = function(models: any) {
    (DeviceView as any).Device = (DeviceView as DeviceViewStatic).belongsTo(models.Device, {
      foreignKey: 'deviceId'
    });

    (DeviceView as any).View = (DeviceView as DeviceViewStatic).belongsTo(models.View, {
      foreignKey: 'viewId'
    });
  };
  return DeviceView;
};

export default deviceView;
