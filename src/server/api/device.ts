import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.get('/api/devices', async (_req: express.Request, res: express.Response) => {
    try {
      logger.info(`📲 Retrieving devices`);
      const devices = await db.Device.findAll();
      return res.json(devices);
    } catch (err) {
      logger.error(`📲 Error getting devices: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/device/:device_id', async (req: express.Request, res: express.Response) => {
    const deviceId = req.params.device_id;
    try {
      logger.info(`📲 Retrieving device for ${deviceId}`);
      const device = await db.Device.findByPk(deviceId);
      return res.json(device);
    } catch (err) {
      logger.error(`📲 Error getting device for id ${deviceId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/api/device/:device_id', async (req: express.Request, res: express.Response) => {
    const deviceId = req.params.device_id;
    try {
      const { name, icon, config } = req.body;
      logger.info(`📲 Updating device ${deviceId}`);
      const device = await db.Device.findByPk(deviceId);
      await device.update({ name, icon, config });
      return res.json(device.dataValues);
    } catch (err) {
      console.log(err);
      logger.error(`📲 Error updating device ${deviceId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.post('/api/device', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📲 Creating device`);
      const { name, icon } = req.body;
      const device = await db.Device.create({
        name,
        icon,
        config: {
          zoom: 1,
          columns: 20,
          rowHeight: 50,
          showHeader: true
        }
      });
      return res.json(device);
    } catch (err) {
      logger.error(`📲 Error creating device: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/device/:device_id/views', async (req: express.Request, res: express.Response) => {
    const deviceId = req.params.device_id;
    try {
      logger.info(`📲 Retrieving device views for ${deviceId}`);
      const deviceViews = await db.DeviceView.findAll({
        where: {
          deviceId
        }
      });
      return res.json(deviceViews);
    } catch (err) {
      logger.error(`📲 Error creating view for device ${deviceId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.post('/api/device/:device_id/view', async (req: express.Request, res: express.Response) => {
    const deviceId = req.params.device_id;
    const { name, icon, viewId } = req.body;
    try {
      logger.info(`📲 Creating view for device ${deviceId}`);
      let viewIdToSaveAgainst;
      let view;
      if (!viewId) {
        logger.info(`📲 Creating new view first`);
        view = await db.View.create({
          name,
          icon,
          createdBy: deviceId
        });
        viewIdToSaveAgainst = view.id;
        logger.info(`📲 Creating view with id ${viewId}`);
      } else {
        viewIdToSaveAgainst = req.body.viewId;
        view = await db.View.findByPk(viewIdToSaveAgainst);
        logger.info(`📲 Associating new device view with view ${viewId}`);
      }

      const highestDeviceView = await db.DeviceView.findAll({
        where: {
          deviceId
        }
      }).reduce((highest: number, curr: DeviceView) => (highest > curr.order ? highest : curr.order), 0);

      const deviceView = await db.DeviceView.create({
        order: highestDeviceView + 1,
        name,
        icon,
        viewId: viewIdToSaveAgainst,
        deviceId
      });

      return res.json({
        ...deviceView.toJSON(),
        view: view.toJSON()
      });
    } catch (err) {
      logger.error(`📲 Error creating view for device ${deviceId}: ${err}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/api/device/view/:device_view_id', async (req: express.Request, res: express.Response) => {
    const deviceViewId = req.params.device_view_id;
    try {
      const { order, name, icon } = req.body;
      logger.info(`📦 Updating device view ${deviceViewId} with order ${order}`);
      const deviceView = await db.DeviceView.findByPk(deviceViewId);
      await deviceView.update({ order, name, icon });
      return res.json(deviceView.dataValues);
    } catch (err) {
      console.log(err);
      logger.error(`📦 Error updating view for id ${deviceViewId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
