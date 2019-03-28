import express from 'express';
import request from 'request';
import cors from 'cors';
import querystring from 'querystring';
import proxy from 'express-http-proxy';
import next from 'next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI, HOME_ASSISTANT_URL } = process.env;

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.use(
    '/api/history/period',
    proxy(HOME_ASSISTANT_URL as string, {
      proxyReqPathResolver: (req: express.Request) => {
        return req.originalUrl;
      }
    })
  );

  server.get('/spotify/login_url', (_req: express.Request, res: express.Response) => {
    const scopes = 'user-read-currently-playing user-read-playback-state user-modify-playback-state';

    const spotify_uri =
      'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        show_dialog: true,
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scopes,
        redirect_uri: SPOTIFY_REDIRECT_URI
      });

    res.send({ spotify_uri });
  });

  server.get('/spotify/token', (req: express.Request, res: express.Response) => {
    const code = req.query.code;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      form: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (error) {
        return res.sendStatus(500).send(error);
      }

      if (response.statusCode !== 200) {
        return res.sendStatus(response.statusCode);
      }

      return res.send(body);
    });
  });

  server.get('/spotify/refresh_token', (req: express.Request, res: express.Response) => {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: req.query.refresh_token
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (error) {
        return res.sendStatus(500).send(error);
      }

      if (response.statusCode !== 200) {
        return res.sendStatus(response.statusCode);
      }

      return res.send(body);
    });
  });

  server.get('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
