import express from 'express';
import proxy from 'express-http-proxy';
import next from 'next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    '/api/history/period',
    proxy('macfie.duckdns.org:8123', {
      proxyReqPathResolver: function(req) {
        return req.originalUrl;
      }
    })
  );

  // server.get('/api/history/period', (req: express.Request, res: express.Response) => {
  //   console.log('AAA');
  //   return app.render(req, res, '/a', req.query);
  // });

  // server.get('/b', (req: express.Request, res: express.Response) => {
  //   return app.render(req, res, '/b', req.query);
  // });

  // server.get('/posts/:id', (req: express.Request, res: express.Response) => {
  //   return app.render(req, res, '/posts', { id: req.params.id });
  // });

  server.get('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
