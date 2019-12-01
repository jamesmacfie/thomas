import express from 'express';
import uuid from 'uuid/v4';
import db from '../../server/db';
import logger from '../../server/logger';
import WebSocket from 'ws';

interface connectedWebSockets {
  [id: string]: {
    id: string;
    socket: WebSocket;
  }[];
}

export function init(server: express.Express) {
  logger.info('⛑ Initializing Notification server');
  const sockets: connectedWebSockets = {};

  (server as any).ws('/notifications/:deviceId', function(ws: WebSocket, req: express.Request) {
    logger.info('⛑ Registering notification websocket');
    const deviceId = req.params.deviceId;
    const wsId = uuid();

    if (!sockets[deviceId]) {
      sockets[deviceId] = [];
    }

    sockets[deviceId] = sockets[deviceId].concat({
      id: wsId,
      socket: ws
    });

    ws.on('close', () => {
      logger.info('⛑ On close', { uuid });
      if (sockets[deviceId]) {
        logger.info('⛑ Nothing to close');
      }
      const openConnection = sockets[deviceId].find(i => i.id === wsId);
      if (!openConnection) {
        logger.info('⛑ On close - ws id not found', { uuid });
        return;
      }
      openConnection.socket.close();
      sockets[deviceId] = sockets[deviceId].filter(i => i.id !== wsId);
    });
  });

  server.post('/notification/:deviceId', async (req: express.Request, res: express.Response) => {
    const deviceId = req.params.deviceId;
    logger.info('⛑ Sending notification', { deviceId });
    const device = await db.Device.findByPk(deviceId);
    if (!device) {
      logger.info(`⛑ No matching device for id ${deviceId}`);
      return res.status(400).send(`No matching device for id ${deviceId}`);
    }
    const deviceSockets = sockets[deviceId];
    if (!deviceSockets || !deviceSockets.length) {
      logger.info(`⛑ Device has no sockets ${deviceId}`);
      return;
    }

    deviceSockets.forEach(s => {
      logger.info(`⛑ Sending socket notification ${s.id}`);
      s.socket.send(JSON.stringify(req.body));
    });

    res.status(200).send('Ok');
  });
}
