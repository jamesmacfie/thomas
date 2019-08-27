import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.post('/component', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📦 Creating component`);
      const { integrationSlug, componentSlug, integrationId, config, viewId, deviceId } = req.body;
      const component = await db.Component.create({
        config,
        componentSlug,
        integrationSlug,
        integrationId,
        viewId,
        createdBy: deviceId
      });
      const returnComponent = await db.Component.findByPk(component.id, {
        include: [db.Integration]
      });
      return res.json(returnComponent);
    } catch (err) {
      logger.error(`📦 Error creating component: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/view/:view_id/components', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📦 Retrieving components for screen ${req.params.view_id}`);
      const components = await db.Component.findAll({
        where: {
          viewId: req.params.view_id
        },
        include: [db.Integration]
      });
      return res.json(components);
    } catch (err) {
      logger.error(`📦 Error getting components for screen id ${req.params.screen_id}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/component/:component_id', async (req: express.Request, res: express.Response) => {
    const componentId = req.params.component_id;
    try {
      logger.info(`📦 Updating component  ${componentId}`);
      const { config } = req.body;
      const deviceView = await db.Component.update(
        { config },
        {
          where: {
            id: componentId
          }
        }
      );
      return res.json(deviceView);
    } catch (err) {
      console.log(err);
      logger.error(`📦 Error updating component for id ${componentId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
