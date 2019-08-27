import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.get('/devices', async (_req: express.Request, res: express.Response) => {
    try {
      logger.info(`📲 Retrieving devices`);
      const devices = await db.Device.findAll();
      return res.json(devices);
    } catch (err) {
      logger.error(`📲 Error getting devices: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/device/:device_id', async (req: express.Request, res: express.Response) => {
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

  server.post('/device', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📲 Creating device`);
      const { name, icon } = req.body;
      const device = await db.Device.create({
        name,
        icon
      });
      return res.json(device);
    } catch (err) {
      logger.error(`📲 Error creating device: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/device/:device_id/views', async (req: express.Request, res: express.Response) => {
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
      logger.error(`📲 Error getting device for id ${deviceId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/device/view/:device_view_id', async (req: express.Request, res: express.Response) => {
    const deviceViewId = req.params.device_view_id;
    try {
      const { order } = req.body;
      logger.info(`📦 Updating device view ${deviceViewId} with order ${order}`);
      const deviceView = await db.DeviceView.update(
        { order },
        {
          where: {
            id: deviceViewId
          }
        }
      );
      return res.json(deviceView);
    } catch (err) {
      console.log(err);
      logger.error(`📦 Error updating component for id ${deviceViewId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
