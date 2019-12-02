import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface ConfigModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly name: string;
  readonly value: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ConfigStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ConfigModel;
};

const config = (sequelize: Sequelize.Sequelize) => {
  logger.info(' Creating config model');
  const Config = <ConfigStatic>sequelize.define(
    'config',
    {
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
      description: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    {
      tableName: 'config'
    }
  );

  return Config;
};

export default config;
