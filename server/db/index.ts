import Sequelize from 'sequelize';
import logger from '../logger';
import component, { ComponentStatic } from './models/component';
import device, { DeviceStatic } from './models/device';
import deviceView, { DeviceViewStatic } from './models/deviceView';
import integration, { IntegrationStatic } from './models/integration';
import view, { ViewStatic } from './models/view';
import config from './config';

interface DB {
  sequelize: Sequelize.Sequelize;
  Component: ComponentStatic;
  Device: DeviceStatic;
  DeviceView: DeviceViewStatic;
  Integration: IntegrationStatic;
  View: ViewStatic;
}

logger.info('🗣 Setting up sequelize');
let db: any = {};
const env = process.env.NODE_ENV || 'development';
const sequelizeconnection = new Sequelize.Sequelize((config as any)[env]);

logger.info('🗣 Setting up sequelize models');
db.Component = component(sequelizeconnection);
db.Device = device(sequelizeconnection);
db.DeviceView = deviceView(sequelizeconnection);
db.Integration = integration(sequelizeconnection);
db.View = view(sequelizeconnection);

Object.keys(db).forEach(modelName => {
  if ((db as any)[modelName].associate) {
    logger.info(`🗣 Associations for model ${modelName}`);
    (db as any)[modelName].associate(db);
  }
});

db.sequelize = sequelizeconnection;

const database: DB = db;

export default database;
