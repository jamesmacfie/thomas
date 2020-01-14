import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.post('/api/widget', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📦 Creating widget`);
      const { integrationSlug, widgetSlug, integrationId, config, viewId, deviceId } = req.body;
      const widget = await db.Widget.create({
        config,
        widgetSlug,
        integrationSlug,
        integrationId,
        viewId,
        createdBy: deviceId
      });
      const returnWidget = await db.Widget.findByPk(widget.id, {
        include: [db.Integration]
      });
      return res.json(returnWidget);
    } catch (err) {
      logger.error(`📦 Error creating widget: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/view/:view_id/widgets', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📦 Retrieving widgets for screen ${req.params.view_id}`);
      const widgets = await db.Widget.findAll({
        where: {
          viewId: req.params.view_id
        },
        include: [db.Integration]
      });
      return res.json(widgets);
    } catch (err) {
      logger.error(`📦 Error getting widgets for view id ${req.params.view_id}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.delete('/api/view/:view_id/widget/:widget_id', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`📦 Deleting widget for view ${req.params.view_id}`);
      await db.Widget.destroy({
        where: {
          id: req.params.widget_id
        }
      });
      return res.sendStatus(200);
    } catch (err) {
      logger.error(`📦 Error getting widgets for screen id ${req.params.view_id}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/api/widget/:widget_id', async (req: express.Request, res: express.Response) => {
    const widgetId = req.params.widget_id;
    try {
      logger.info(`📦 Updating widget  ${widgetId}`);
      const { config } = req.body;
      const deviceView = await db.Widget.update(
        { config },
        {
          where: {
            id: widgetId
          }
        }
      );
      return res.json(deviceView);
    } catch (err) {
      console.log(err);
      logger.error(`📦 Error updating widget for id ${widgetId}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
