import express from 'express';
import { google } from 'googleapis';
import db from '../../server/db';
import logger from '../../server/logger';

const generateGoogleOauthClient = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI } = process.env;
  return new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI);
};

const getUserInfo = (tokens: any) => {
  const oauth2 = google.oauth2('v2');
  const googleClient = generateGoogleOauthClient();

  googleClient.setCredentials(tokens);

  return new Promise((resolve, reject) => {
    oauth2.userinfo.get(
      {
        auth: googleClient
      },
      (err, data) => (err ? reject(err) : resolve(data))
    );
  });
};

const getGoogleTokensViaIntegrationId = async (integrationId: number) => {
  const integration = await db.Integration.findByPk(integrationId);
  return integration.config.tokens;
};

export function init(server: express.Express) {
  logger.info('📅 Initializing Google server');

  server.get('/google/login_url', async (_req: express.Request, res: express.Response) => {
    logger.info('☘️ Getting Google login url');

    const googleOauth2Client = generateGoogleOauthClient();
    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    });
    res.status(200).send(url);
  });

  server.get('/google/info', async (req: express.Request, res: express.Response) => {
    logger.info(`☘️ Getting Google token`);

    const code = req.query.code;
    const googleOauth2Client = generateGoogleOauthClient();
    const tokenResponse = await googleOauth2Client.getToken(code);
    const userInfo: any = await getUserInfo(tokenResponse.tokens);
    console.log(tokenResponse.tokens);
    res.status(200).send({
      tokens: tokenResponse.tokens,
      user: userInfo.data
    });
  });

  server.get('/google/calendar/events/:integrationId', async (req: express.Request, res: express.Response) => {
    const integrationId = parseInt(req.params.integrationId);
    logger.info(`☘️ Getting Google calendar events for integration ${integrationId}`);

    // Instead of passing through the tokens in the API call, grab them from the DB. Even though we have the
    // tokens in the UI, it's a bit much to pass through.
    // TODO - how do I deal with refresh tokens in this world where we have multiple oauth cliens? Will need
    // to also save the new tokens in the DB. Shouldn't need to pass them back to the UI if the UI is not
    // using them
    const tokens = await getGoogleTokensViaIntegrationId(integrationId);
    const googleOauth2Client = generateGoogleOauthClient();
    googleOauth2Client.setCredentials(tokens);
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
          logger.error(`☘️ Error getting Google calendar events ${err.message}`);
          return res.sendStatus(500);
        }
        logger.info(`☘️ Got ${events.data.items.length} Google calender event(s)`);
        return res.send({ events: events.data.items });
      }
    );
  });
}
