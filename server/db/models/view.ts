import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface ViewModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly name: string;
  readonly icon: string;
  readonly createdBy: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ViewStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ViewModel;
};

const view = (sequelize: Sequelize.Sequelize) => {
  logger.info('🌈 Creating view model');
  const View = <ViewStatic>sequelize.define('view', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING
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

  (View as any).associate = function(models: any) {
    (View as any).DeviceViews = (View as ViewStatic).belongsToMany(models.Device, {
      as: 'devices',
      through: 'deviceViews',
      foreignKey: 'viewId',
      uniqueKey: 'deviceId'
    });

    (View as any).Components = (View as ViewStatic).hasMany(models.Component, {
      foreignKey: 'viewId'
    });
  };
  return View;
};

export default view;
