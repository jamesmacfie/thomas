import express from 'express';
import fetch from 'isomorphic-unfetch';
import db from '../../server/db';
import logger from '../../server/logger';

export function init(server: express.Express) {
  logger.info('🍪 Initializing Dark Sky server');

  server.get('/darksky/forecast/:integrationId', async (req: express.Request, res: express.Response) => {
    logger.info('🍪 Getting latest info from DarkSky');
    const integrationId = req.params.integrationId;
    const integration = await db.Integration.findByPk(integrationId);
    if (!integration) {
      logger.info(`🍪 No matching integration for id ${integrationId}`);
      return res.status(400).send(`No matching integration for id ${integrationId}`);
    }
    const { apiKey, longitude, latitude, units } = integration.config;
    const forecast = await fetch(
      `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=${units}`
    ).then((res: any) => res.json());

    logger.info(`🍪 Got forecast`);
    res.status(200).send(forecast);
  });
}
