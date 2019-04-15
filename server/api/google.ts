import express from 'express';
import { google } from 'googleapis';
import storage from '../storage';
import { createLogger } from '../logger';

export function init(server: express.Express) {
  const logger = createLogger({ name: 'Google', color: 'blue' });
  logger.info('🍪 Initializing');
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  const storageKey = 'google';
  const googleOauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/auth_callback/google`
  );
  let hasBeenConnected = false;

  logger.info('📦 Getting storage value');
  storage.get(storageKey).then(value => {
    if (!value) {
      logger.info('🙅‍ No stored token');
      return;
    }
    logger.info(`🙆‍ Got storage value`);
    googleOauth2Client.setCredentials(value);
    // Setup listener to deal with refresh tokens changing
    googleOauth2Client.on('tokens', tokens => {
      logger.info(`💆‍ New token received`);
      storage.set(storageKey, tokens.refresh_token);
    });
    hasBeenConnected = true;
  });

  server.get('/google/login_url', (_req: express.Request, res: express.Response) => {
    logger.info('💌 Getting login URL');
    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.send({ url });
  });

  server.get('/google/status', (_req: express.Request, res: express.Response) => {
    if (hasBeenConnected) {
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
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
          hasBeenConnected = true;
          return res.sendStatus(200);
        })
        .catch(err => {
          logger.error(`💸 Error setting token ${err.message}`);
          hasBeenConnected = false;
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
