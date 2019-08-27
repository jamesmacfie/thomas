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

const load = async (dir: string, server: express.Express) => {
  try {
    logger.error(`🐔 Loading integration from dir ${dir}`);
    const config: SystemIntegration = require(`${dir}/config`).default;
    const integration: ServerIntegration = require(`${dir}/server`);
    logger.error(`🐔 Imported integration ${config.name}. Initialising.`);
    integration.init(server);
    return config;
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
