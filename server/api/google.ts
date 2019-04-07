import fs from 'fs';
import express from 'express';
import { google } from 'googleapis';

export function init(server: express.Express) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  const GOOGLE_TOKEN_PATH = 'token.json';
  const googleOauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `http://localhost:3000/auth_callback/google`
  );

  // TODO - check this. Do we actually get a refresh token via the `getToken` call later on?
  googleOauth2Client.on('tokens', tokens => {
    if (tokens.refresh_token) {
      console.log('Got Google refresh token');
      googleOauth2Client.setCredentials({
        refresh_token: tokens.refresh_token
      });
    }
  });
  fs.readFile(GOOGLE_TOKEN_PATH, 'utf8', (err, token) => {
    if (err) {
      console.log('Error getting token');
      return;
    }
    console.log('Got Google token');
    googleOauth2Client.setCredentials(JSON.parse(token));
  });

  server.get('/google/login_url', (_req: express.Request, res: express.Response) => {
    const url = googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.send({ url });
  });

  server.get('/google/token', (req: express.Request, res: express.Response) => {
    const code = req.query.code;
    googleOauth2Client.getToken(code, (err: any, token: any) => {
      if (err) return console.error('Error retrieving access token', err);
      googleOauth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(GOOGLE_TOKEN_PATH, JSON.stringify(token), err => {
        if (err) {
          console.error('Error settings Google token', err);
          return res.sendStatus(500).send(err);
        }
        console.log('Token stored to', GOOGLE_TOKEN_PATH);
        return res.sendStatus(200).send({ status: 'OK' });
      });
    });
  });

  server.get('/google/refresh_token', (_req: express.Request, _res: express.Response) => {});

  server.get('/google/api/calendar/events', (req: express.Request, res: express.Response) => {
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
          console.log('Error getting events: ', err);
          return res.sendStatus(500).send(err);
        }
        console.log('Got events', events.data.items.length);
        return res.send({ events: events.data.items });
      }
    );
  });
}
