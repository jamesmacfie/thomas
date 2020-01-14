import express from 'express';
import db from '../db';
import logger from '../logger';

const init = (server: express.Express) => {
  server.get('/api/configs', async (_req: express.Request, res: express.Response) => {
    try {
      logger.info(`🏰 Retrieving configs`);
      const configs = await db.Config.findAll();
      return res.json(configs);
    } catch (err) {
      logger.error(`🏰 Error getting configs: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.get('/api/config/:slug', async (req: express.Request, res: express.Response) => {
    const slug = req.params.slug;
    try {
      logger.info(`🏰 Retrieving config for ${slug}`);
      const config = await db.Config.findOne({
        where: {
          slug
        }
      });
      return res.json(config);
    } catch (err) {
      logger.error(`🏰 Error getting config for id ${slug}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.patch('/api/config/:slug', async (req: express.Request, res: express.Response) => {
    const slug = req.params.slug;
    try {
      const { slug, name, value } = req.body;
      logger.info(`🏰 Updating config ${slug}`);
      const config = await db.Config.findOne({
        where: {
          slug
        }
      });
      await config.update({ slug, name, value });
      return res.json(config.dataValues);
    } catch (err) {
      console.log(err);
      logger.error(`🏰 Error updating config ${slug}: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });

  server.post('/api/config', async (req: express.Request, res: express.Response) => {
    try {
      logger.info(`🏰 Creating config`);
      const { slug, name, value } = req.body;
      const config = await db.Config.create({
        slug,
        name,
        value
      });
      return res.json(config);
    } catch (err) {
      logger.error(`🏰 Error creating config: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
