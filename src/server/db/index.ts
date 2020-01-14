import Sequelize from 'sequelize';
import logger from '../logger';
import widget, { WidgetStatic } from './models/widget';
import device, { DeviceStatic } from './models/device';
import deviceView, { DeviceViewStatic } from './models/deviceView';
import integration, { IntegrationStatic } from './models/integration';
import config, { ConfigStatic } from './models/config';
import view, { ViewStatic } from './models/view';
import dbConfig from './config';

interface DB {
  sequelize: Sequelize.Sequelize;
  Widget: WidgetStatic;
  Device: DeviceStatic;
  DeviceView: DeviceViewStatic;
  Integration: IntegrationStatic;
  View: ViewStatic;
  Config: ConfigStatic;
}

logger.info('🗣 Setting up sequelize');
let db: any = {};
const env = process.env.NODE_ENV || 'development';
const sequelizeconnection = new Sequelize.Sequelize((dbConfig as any)[env]);

logger.info('🗣 Setting up sequelize models');
db.Widget = widget(sequelizeconnection);
db.Device = device(sequelizeconnection);
db.DeviceView = deviceView(sequelizeconnection);
db.Integration = integration(sequelizeconnection);
db.View = view(sequelizeconnection);
db.Config = config(sequelizeconnection);

Object.keys(db).forEach(modelName => {
  if ((db as any)[modelName].associate) {
    logger.info(`🗣 Associations for model ${modelName}`);
    (db as any)[modelName].associate(db);
  }
});

db.sequelize = sequelizeconnection;

const database: DB = db;

export default database;
