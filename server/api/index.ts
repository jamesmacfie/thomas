import express from 'express';
import initWidget from './widget';
import initDevice from './device';
import initIntegration from './integration';
import initView from './view';
import initConfig from './config';

// Make integration static files available;
import initStatic from './static';

const init = (server: express.Express) => {
  initWidget(server);
  initDevice(server);
  initIntegration(server);
  initView(server);
  initStatic(server);
  initConfig(server);
};

export default init;
