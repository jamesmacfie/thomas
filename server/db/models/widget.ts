import Sequelize, { DataTypes, Model, BuildOptions } from 'sequelize';
import logger from '../../logger';

export interface WidgetModel extends Model {
  readonly id: number;
  readonly archived: boolean;
  readonly integration_slug: string;
  readonly config: any;
  readonly createdBy: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type WidgetStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WidgetModel;
};

const widget = (sequelize: Sequelize.Sequelize) => {
  logger.info('🦷 Creating widget model');
  const Widget = <WidgetStatic>sequelize.define('widget', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    config: {
      type: DataTypes.STRING,
      allowNull: false,
      get(this: WidgetModel) {
        return JSON.parse(this.getDataValue('config'));
      },
      set(this: WidgetModel, config) {
        this.setDataValue('config', JSON.stringify(config));
      }
    },
    widgetSlug: {
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

  (Widget as any).associate = function(models: any) {
    (Widget as any).Integration = (Widget as WidgetStatic).belongsTo(models.Integration);
    (Widget as any).View = (Widget as WidgetStatic).belongsTo(models.View);
  };

  return Widget;
};

export default widget;
