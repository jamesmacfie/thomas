/// <reference path="../../types/typings.d.ts" /> #
import fs from 'fs';
import path from 'path';
import express from 'express';
import logger from '../logger';

const getDirectories: () => string[] = () => {
  const source = path.join(__dirname, `../../integrations`);
  return fs
    .readdirSync(source)
    .map(file => path.join(source, file))
    .filter(path => fs.statSync(path).isDirectory());
};

// TODO - should be able to read from /server/index.ts also
const initServerFromFile = (filePath: string, server: express.Express) => {
  if (!fs.existsSync(filePath)) {
    logger.info(`🐔 Integration no server found at ${filePath}`);
    return;
  }

  logger.info(`🐔 Integration server found at ${filePath}`);
  const integration: ServerIntegration = require(filePath);
  integration.init(server);
};

const load = async (dir: string, server: express.Express) => {
  try {
    logger.error(`🐔 Loading integration from dir ${dir}`);
    const configFilePath = `${dir}/config.json`;
    const serverFilePath = `${dir}/server.ts`;
    const config: any = require(configFilePath);
    initServerFromFile(serverFilePath, server);
    return {
      slug: path.basename(dir),
      ...config
    };
  } catch (e) {
    logger.error(`🐔 Error with integration ${dir}: ${e}`);
    return null;
  }
};

export const loadIntegrations = async (server: express.Express) => {
  logger.info('🐔 Getting all integrations');
  const dirs = getDirectories();
  logger.info('🐔 Initialising all integrations');
  const configs: (SystemIntegration | null)[] = await Promise.all(dirs.map(dir => load(dir, server)));
  return configs;
};
