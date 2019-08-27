import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface ComponentModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly integration_slug: string;
  readonly config: any;
  readonly createdBy: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type ComponentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ComponentModel;
};

const component = (sequelize: Sequelize.Sequelize) => {
  logger.info('🦷 Creating component model');
  const Component = <ComponentStatic>sequelize.define('component', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    config: {
      type: DataTypes.STRING,
      allowNull: false,
      get(this: ComponentModel) {
        return JSON.parse(this.getDataValue('config'));
      },
      set(this: ComponentModel, config) {
        this.setDataValue('config', JSON.stringify(config));
      }
    },
    componentSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    integrationSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    integrationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'integrations',
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

  (Component as any).associate = function(models: any) {
    (Component as any).Integration = (Component as ComponentStatic).belongsTo(models.Integration);
    (Component as any).View = (Component as ComponentStatic).belongsTo(models.View);
  };

  return Component;
};

export default component;
