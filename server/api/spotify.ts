/// <reference path="../../types/typings.d.ts" />

import express from 'express';
import querystring from 'querystring';
import WebSocket from 'ws';
import storage from '../storage';
import { createLogger } from '../logger';
import SpotifyWebApi from 'spotify-web-api-node';

export function init(server: express.Express, ws: WebSocket.Server) {
  const logger = createLogger({ name: 'Spotify', color: 'green' });
  logger.info('🍪 Initializing');
  const storageKey = 'spotify';
  const wsClients: WebSocket[] = [];
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = process.env;
  const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: SPOTIFY_REDIRECT_URI
  });

  ws.on('connection', (w: WebSocket) => {
    logger.info(`🔌 New connection`);
    wsClients.push(w);
  });

  logger.info('🎼 Setting currently-playing loop');
  setInterval(async () => {
    if (wsClients.length === 0) {
      return;
    }

    spotifyApi.getMyCurrentPlaybackState({}).then(
      function(data: any) {
        wsClients.forEach(function each(client: WebSocket) {
          if (client.readyState === WebSocket.OPEN) {
            const message: WSMessage = {
              type: 'currently_playing',
              data: data.body
            };

            client.send(JSON.stringify(message));
          }
        });
      },
      function(err: Error) {
        logger.error(`🎺 Error with currently playing ${err.message}`);
      }
    );
  }, 1000);

  logger.info('🏬 Checking storage for key');
  storage
    .get(storageKey)
    .then(storageData => {
      logger.info(storageData);
      if (!storageData) {
        throw new Error('No existing key set');
      }

      logger.info('🏛 Got storage. Refreshing');
      spotifyApi.setAccessToken(storageData['access_token']);
      spotifyApi.setRefreshToken(storageData['refresh_token']);
      return spotifyApi.refreshAccessToken();
    })
    .then(
      (data: any) => {
        logger.info('🏢The access token has been refreshed');
        return storage.updateField(storageKey, 'access_token', data.body['access_token']);
      },
      (err: Error) => {
        logger.error(`🏥 Could not refresh access token ${err.message}`);
      }
    )
    .catch((err: Error) => {
      logger.error(`🏨 Error checking for key ${err.message}`);
    });

  server.get('/spotify/status', (_req: express.Request, res: express.Response) => {
    spotifyApi.getMe().then(
      () => {
        return res.sendStatus(200);
      },
      () => {
        return res.sendStatus(500);
      }
    );
  });

  server.get('/spotify/login_url', (_req: express.Request, res: express.Response) => {
    logger.info('💌 Getting login URL');
    const scopes = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';

    const url =
      'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        show_dialog: true,
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI
      });

    res.send({ url });
  });

  server.get('/spotify/token', (req: express.Request, res: express.Response) => {
    logger.info(`🤑 Getting token`);
    const code = req.query.code;
    spotifyApi.authorizationCodeGrant(code).then(
      (data: any) => {
        logger.info(`💰 Got token`);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        storage
          .set(storageKey, data.body)
          .then(() => {
            logger.info(`🏦 Saved token`);
            return res.send(data.body);
          })
          .catch(err => {
            logger.error(`💸 Error setting token ${err.message}`);
            res.sendStatus(500);
          });
      },
      (err: Error) => {
        console.log('Something went wrong!', err);
      }
    );
  });
}
