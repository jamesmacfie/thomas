import path from 'path';
import Sequelize from 'sequelize';
import logger from '../logger';
import component, { ComponentStatic } from './models/component';
import device, { DeviceStatic } from './models/device';
import deviceView, { DeviceViewStatic } from './models/deviceView';
import integration, { IntegrationStatic } from './models/integration';
import view, { ViewStatic } from './models/view';

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
const sequelizeconnection = new Sequelize.Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../thomas.db'),
  define: {
    timestamps: true
  }
});

logger.info('🗣 Setting up sequelize models');
db.Component = component(sequelizeconnection);
db.Device = device(sequelizeconnection);
db.DeviceView = deviceView(sequelizeconnection);
db.Integration = integration(sequelizeconnection);
db.View = view(sequelizeconnection);

Object.keys(db).forEach(modelName => {
  if ((db as any)[modelName].associate) {
    logger.info(`🗣Associations for model ${modelName}`);
    (db as any)[modelName].associate(db);
  }
});

db.sequelize = sequelizeconnection;

const database: DB = db;

export default database;
