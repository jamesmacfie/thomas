import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv-flow';
import './db';
import api from './api';
import { loadIntegrations } from './integration';
import logger from './logger';

logger.info('👩‍🍳 Preparing app');
const server = express();
const port = process.env.API_PORT || 3001;

// Load .env files for server
dotenv.config();

async function start() {
  let integrations: (SystemIntegration | null)[] = [];
  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  expressWs(server);
  try {
    logger.info('👩‍🍳 Loading integrations');
    integrations = await loadIntegrations(server);
    logger.info('👩‍🍳 Intergrations loaded successfully');
  } catch (err) {
    logger.error(`Error loading integrations: ${err.message}`);
  }

  try {
    logger.info('☔️ Inititaling API');
    await api(server);
  } catch (err) {
    logger.error(`☔️ Error inititaling api: ${err.message}`);
  }

  server.get('/api/system/integrations', (_req: express.Request, res: express.Response) => {
    return res.json(integrations.filter(i => i !== null));
  });

  // tslint:disable-next-line:no-console
  server.listen(port, () => console.log(`Listening on port ${port}`));
}

start();
