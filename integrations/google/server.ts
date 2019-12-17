import express from 'express';
import { google } from 'googleapis';
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

export function init(server: express.Express) {
  logger.info('📅 Initializing Google server');

  server.get('/google/login_url', async (_req: express.Request, res: express.Response) => {
    logger.info('☘️ Getting login url');

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
    logger.info(`☘️ Getting token`);

    const code = req.query.code;
    const googleOauth2Client = generateGoogleOauthClient();
    const tokenResponse = await googleOauth2Client.getToken(code);
    const userInfo: any = await getUserInfo(tokenResponse.tokens);
    res.status(200).send({
      tokens: tokenResponse.tokens,
      user: userInfo.data
    });
  });
}
