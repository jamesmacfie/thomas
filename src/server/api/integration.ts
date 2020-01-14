import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.post('/api/integration', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`😘 Creating integration`);
      const { slug, config, deviceId } = req.body;
      const integration = await db.Integration.create({
        slug,
        config,
        createdBy: deviceId
      });
      return res.json(integration);
    } catch (err) {
      logger.error(`😘 Error creating integration: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/api/integration/:integrationId', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`😘 Updating integration`);
      const integrationId = req.params.integrationId;
      const { config } = req.body;
      const integration = await db.Integration.findByPk(integrationId);
      if (!integration) {
        return res.status(400).send(`No itegration for id ${integrationId}`);
      }
      await integration.update({
        config
      });
      return res.json(integration);
    } catch (err) {
      logger.error(`😘 Error creating integration: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/integrations', async (_req: express.Request, res: express.Response) => {
    try {
      logger.info(`😘 Getting integrations`);
      const integrations = await db.Integration.findAll();
      return res.json(integrations);
    } catch (err) {
      logger.error(`😘 Error getting integrations: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/integrations/:slug', async (req: express.Request, res: express.Response) => {
    const slug = req.params.slug;
    try {
      logger.info(`😘 Getting integrations for slug '${slug}'`);
      const integrations = await db.Integration.findAll({
        where: {
          slug
        }
      });
      return res.json(integrations);
    } catch (err) {
      logger.error(`😘 Error getting integrations for slug '${slug}': ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
