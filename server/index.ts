import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import next from 'next';
import { loadIntegrations } from './integration';
import db from './db';
import api from './api';
import logger from './logger';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  let integrations: (SystemIntegration | null)[] = [];

  logger.info('👩‍🍳 Preparing app');
  const server = express();
  server.use(cors());
  server.use(bodyParser.json());
  try {
    logger.info('👩‍🍳 Loading integrations');
    integrations = await loadIntegrations(server);
    logger.info('👩‍🍳 Intergrations loaded successfully');
  } catch (err) {
    logger.error(`Error loading integrations: ${err.message}`);
  }

  try {
    logger.info('🤞 Inititaling database');
    await db;
  } catch (err) {
    logger.error(`🤞 Error inititaling database: ${err.message}`);
  }

  try {
    logger.info('☔️ Inititaling API');
    await api(server);
  } catch (err) {
    logger.error(`☔️ Error inititaling api: ${err.message}`);
  }

  server.get('/system/integrations', (_req: express.Request, res: express.Response) => {
    return res.json(integrations.filter(i => i !== null));
  });

  server.get('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    logger.info(`🚀 Ready on port ${port}`);
  });
});
