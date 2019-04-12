import express from 'express';
import querystring from 'querystring';
import storage from '../storage';
import { createLogger } from '../logger';

/**
 * TODO - doesn't work
 */
export function init(server: express.Express) {
  const logger = createLogger({ name: 'Home Assistant', color: 'yellow' });
  logger.info('🍪 Initializing');
  const { HOME_ASSISTANT_URL, HOME_ASSISTANT_REDIRECT_URI } = process.env;
  const storageKey = 'home_assistant';
  let hasBeenConnected = false;

  logger.info('📦 Getting storage value');
  storage.get(storageKey).then(value => {
    if (!value) {
      logger.info('🙅‍ No stored token');
      return;
    }
    logger.info(`🙆‍ Got storage value`);
    hasBeenConnected = true;
  });

  server.get('/home_assistant/login_url', (_req: express.Request, res: express.Response) => {
    logger.info('💌 Getting login URL');
    const url =
      HOME_ASSISTANT_URL +
      '/auth/authorize?' +
      querystring.stringify({
        client_id: HOME_ASSISTANT_URL,
        redirect_uri: HOME_ASSISTANT_REDIRECT_URI
      });

    res.send({ url });
  });

  server.get('/google/status', (_req: express.Request, res: express.Response) => {
    if (hasBeenConnected) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  });
}
