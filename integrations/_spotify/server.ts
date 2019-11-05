import express from 'express';
import logger from '../../server/logger';

export function init(server: express.Express) {
  logger.info('🍔 Initializing Spotify');

  server.get('/spotify', (_req: express.Request, res: express.Response) => {
    logger.info('🍔 Generating someting random');
    res.status(200).send({ random: Math.floor(Math.random() * 10000) });
  });
}
