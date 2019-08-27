import path from 'path';
import express from 'express';
import logger from '../logger';

const init = (server: express.Express) => {
  server.get('/static/:integration/:file', async (req: express.Request, res: express.Response) => {
    try {
      const { file, integration } = req.params;
      logger.info(`💄 Requesting file ${file} from ${integration}`);
      const filePath = path.join(__dirname, '../../integrations', integration, 'static', file);
      logger.info(`💄 Returning ${filePath}`);
      return res.sendFile(filePath);
    } catch (err) {
      logger.error(`😘 Error creating integration: ${err.message}`);
      return res.status(500).send(err.message);
    }
  });
};

export default init;
