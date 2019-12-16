import express from 'express';
import { google } from 'googleapis';
import logger from '../../server/logger';

export function init(server: express.Express) {
  logger.info('📅 Initializing Google server');
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI } = process.env;
  const googleOauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_REDIRECT_URI);

  server.get('/google/login_url', async (_req: express.Request, res: express.Response) => {
    logger.info('☘️ Getting login url');

    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.status(200).send(url);
  });

  server.get('/google/token', (req: express.Request, res: express.Response) => {
    logger.info(`☘️ Getting token`);

    const code = req.query.code;
    googleOauth2Client.getToken(code, (err: any, token: any) => {
      if (err) {
        logger.error(`☘️ Error retrieving access token: ${err.message}`);
        return;
      }
      logger.info(`☘️ Got Google token`);
      res.status(200).send(token);
    });
  });
}
