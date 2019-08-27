import express from 'express';
import { google } from 'googleapis';
import db from '../../server/db';
import logger from '../../server/logger';

const tokens: { [index: string]: any } = {};
const getGoogleOauthClient = () => {
  // TODO - how to handle if there are no Google env vars set?
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI } = process.env;
  const googleOauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI);
  return googleOauth2Client;
};
const setToken = (integrationId: number, code: string) => {
  return new Promise((resolve, reject) => {
    const googleOauth2Client = getGoogleOauthClient();
    googleOauth2Client.getToken(code, (err: any, token: any) => {
      if (err) {
        logger.error(`🍪 Error retrieving access token: ${err.message}`);
        reject(err.message);
      }
      logger.info(`🍪 Got token. Saving ${token}`);
      tokens[integrationId] = token;
      resolve(token);
    });
  });
};

export function init(server: express.Express) {
  logger.info('🍪 Initializing Google server');

  server.get('/google', (_req: express.Request, res: express.Response) => {
    logger.info('🍪 Generating someting random');
    res.status(200).send({ random: Math.floor(Math.random() * 10000) });
  });

  server.get('/google/login_url', (_req: express.Request, res: express.Response) => {
    logger.info('🍪 Getting Google login URL');
    const googleOauth2Client = getGoogleOauthClient();
    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.send({ url });
  });

  server.get('/google/api/calendar/events/:integrationId', async (req: express.Request, res: express.Response) => {
    logger.info(`🗓 Getting calendar events`);
    const integrationId = req.params.integrationId;
    try {
      const integration = await db.Integration.findByPk(integrationId);
      if (!integration) {
        return res.json([]);
      }
      if (!tokens[integrationId]) {
        logger.debug(`🗓 No cached token for integrationId ${integrationId}. Setting to ${integration.config.code}`);
        await setToken(integrationId, integration.config.code);
      }
      const googleOauth2Client = getGoogleOauthClient();
      logger.debug(`🗓 Setting credentials for ${tokens[integrationId]}`);
      googleOauth2Client.setCredentials(tokens[integrationId]);
      const calendar = google.calendar({ version: 'v3', auth: googleOauth2Client });
      const { timeMin, timeMax } = req.query;
      calendar.events.list(
        {
          calendarId: 'primary',
          timeMin,
          timeMax,
          singleEvents: true,
          orderBy: 'startTime'
        },
        (err: Error | null, events: any) => {
          if (err) {
            logger.error(`🍪 Error getting calendar events list ${err.message}`);
            return res.sendStatus(500);
          }
          logger.info(`🍪 Got ${events.data.items.length} calender event(s)`);
          return res.send({ events: events.data.items });
        }
      );
    } catch (err) {
      logger.info(`🍪 Error getting calendar events: ${err.message}`);
      return res.send(err.message).status(500);
    }
  });
}
