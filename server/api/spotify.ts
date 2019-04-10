import express from 'express';
import storage from '../storage';
import { createLogger } from '../logger';

export function init(server: express.Express) {
  const logger = createLogger({ name: 'Spotify', color: 'green' });
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  const storageKey = 'oogle';
  const googleOauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/auth_callback/google`
  );

  logger.info('🍪 Initializing');

  // TODO - check this. Do we actually get a refresh token via the `getToken` call later on?
  googleOauth2Client.on('tokens', tokens => {
    if (tokens.refresh_token) {
      logger.info('Got refresh token');
      googleOauth2Client.setCredentials({
        refresh_token: tokens.refresh_token
      });
    }
  });

  logger.info('📦 Getting storage value');
  storage.get(storageKey).then(value => {
    if (!value) {
      logger.info('🙅‍ No stored token');
      return;
    }
    logger.info(`🙆‍ Got storage value ${value}`);
    googleOauth2Client.setCredentials(JSON.parse(value));
  });

  server.get('/google/login_url', (_req: express.Request, res: express.Response) => {
    logger.info('💌 Getting login URL');
    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    logger.info(`📨 Sending ${url}`);
    res.send({ url });
  });

  server.get('/google/token', (req: express.Request, res: express.Response) => {
    logger.info(`🤑 Getting token`);
    const code = req.query.code;
    googleOauth2Client.getToken(code, (err: any, token: any) => {
      if (err) {
        logger.error(`😵 Error retrieving access token: ${err.message}`);
        return;
      }
      logger.info(`💰 Got token`);
      googleOauth2Client.setCredentials(token);
      storage
        .set(storageKey, token)
        .then(() => {
          logger.info(`🏦 Saved token`);
          return res.sendStatus(200);
        })
        .catch(err => {
          logger.error(`💸 Error setting token ${err.message}`);
          return res.sendStatus(500);
        });
    });
  });

  server.get('/google/api/calendar/events', (req: express.Request, res: express.Response) => {
    logger.info(`🗓 Getting calendar events`);
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
          logger.error(`👻 Error getting calendar events ${err.message}`);
          return res.sendStatus(500);
        }
        logger.info(`📅 Got ${events.data.items.length} calender event(s)`);
        return res.send({ events: events.data.items });
      }
    );
  });
}
