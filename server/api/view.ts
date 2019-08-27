import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.post('/view', async (req: express.Request, res: express.Response) => {
    try {
      console.log((db.Device as any).DeviceViews);
      let view;
      const { deviceId, name, icon } = req.body;
      await db.sequelize.transaction(async transaction => {
        // TODO - how can we do this at once using Sequelizei instead of a bunch of queries?
        logger.info(`📺 Getting current device views`);
        const currentDeviceViews = await db.DeviceView.findAll({
          where: {
            deviceId
          },
          transaction
        });
        logger.info(`📺 New order will be ${currentDeviceViews.length}`);

        logger.info(`📺 Creating view`);
        view = await db.View.create(
          {
            name,
            icon,
            createdBy: deviceId
          },
          {
            transaction
          }
        );

        logger.info(`📺 Linking view to device`);
        await db.DeviceView.create(
          {
            deviceId,
            viewId: view.id,
            name,
            icon,
            order: currentDeviceViews.length
          },
          {
            transaction
          }
        );
      });

      // TODO - need to refetch from DB to get associated components. Or at least give an empty array

      return res.json(view);
    } catch (err) {
      console.log(err);
      logger.error(`📺 Error creating screen: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/views', async (_req: express.Request, res: express.Response) => {
    logger.info(`📺 Getting all views`);
    try {
      const views = await db.View.findAll({
        include: [db.Component]
      });
      return res.json(views);
    } catch (err) {
      logger.error(`📺 Error getting views: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
