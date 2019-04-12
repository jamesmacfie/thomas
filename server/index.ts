import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import next from 'next';
import WebSocket from 'ws';
import { createLogger } from './logger';
import { init as initGoogle } from './api/google';
import { init as initSpotify } from './api/spotify';
import { init as initHomeAssistant } from './api/homeassistant';

const port = 3000;
const wsPort = 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { HOME_ASSISTANT_URL } = process.env;
const logger = createLogger({ name: 'App', color: 'red' });

app.prepare().then(() => {
  logger.info('👩‍🍳 Preparing app');
  const server = express();
  server.use(cors());

  logger.info(`🛠 Creating websocket`);
  const ws = new WebSocket.Server({ port: wsPort });

  initGoogle(server);
  initHomeAssistant(server);
  initSpotify(server, ws);

  server.use(
    '/api/history/period',
    proxy(HOME_ASSISTANT_URL as string, {
      proxyReqPathResolver: (req: express.Request) => {
        return req.originalUrl;
      }
    })
  );

  server.get('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    logger.info(`🚀 Ready on http://localhost:${port}`);
  });
});
