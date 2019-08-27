import express from 'express';
import initComponent from './component';
import initDevice from './device';
import initIntegration from './integration';
import initView from './view';

// Make integration static files available;
import initStatic from './static';

const init = (server: express.Express) => {
  initComponent(server);
  initDevice(server);
  initIntegration(server);
  initView(server);
  initStatic(server);
};

export default init;
