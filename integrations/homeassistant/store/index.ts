import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import { keyBy } from 'lodash';
import { store as integrationsStore } from 'stores/integrations';
import logger from 'utils/logger';

interface Config {
  code: string;
  name: string;
  url: string;
  tokens?: any;
}

export default class Store {
  id: number = 1;
  @observable integrations: Integration[] = [];
  @observable integrationEntities: {
    [key: string]: {
      entities: { [key: string]: HomeAssistantEntity };
    };
  } = {};
  @observable websockets: { [key: string]: any } = {};

  @computed get loaded() {
    return this.integrations.length;
  }

  constructor() {
    this.fetchIntegrations().then(() => {
      this.integrations.map(this.setupWebsocket);
    });
  }

  @action
  fetchIntegrations = async () => {
    logger.debug('Homeassistant store fetchIntegrations');
    const integrations = await fetch(`http://localhost:3000/integrations/homeassistant`).then(res => res.json());

    logger.debug('Setting Homeassistant integrations', { integrations });
    this.integrations = integrations;
  };

  @action
  setupWebsocket = async (integration: Integration) => {
    logger.debug('Setting Homeassistant websocket', { integrationId: integration.id });
    const host = integration.config.url.replace('http', 'ws');
    const socket = new WebSocket(`${host}/api/websocket`);

    socket.addEventListener('open', () => {
      logger.debug('Websocket open', { integrationId: integration.id });
    });

    socket.addEventListener('close', () => {
      logger.debug('Websocket close', { integrationId: integration.id });
      // this.setupWebsocket(integration);
    });

    socket.addEventListener('error', () => {
      logger.debug('Websocket error', { integrationId: integration.id });
      // this.setupWebsocket(integration);
    });

    socket.addEventListener('message', async e => {
      var data = JSON.parse(e.data);
      switch (data.type) {
        case 'auth_required':
          return this.websocketAuthenticate(socket, integration);
        case 'auth_invalid':
          const hasRefreshed = await this.refreshToken(integration);
          if (hasRefreshed) {
            this.websocketAuthenticate(socket, integration);
            this.websocketSubscribe(socket);
          }
        case 'auth_ok':
          return this.websocketSubscribe(socket);
        case 'result':
          this.websocketResult(integration.id, data.result);
          break;
        case 'event':
          this.websocketEvent(integration.id, data.event);
          break;
        default:
          logger.warn('Homeassistant got unregnised event', { data });
          break;
      }
    });
  };

  websocketSubscribe = (socket: WebSocket) => {
    logger.debug('Homeassistant subscribing');
    this.websocketSend(socket, { type: 'get_states' });
    this.websocketSend(socket, { type: 'subscribe_events' });
  };

  websocketAuthenticate = (socket: WebSocket, integration: Integration) => {
    logger.debug('Homeassistant authenticate');
    const authData = {
      type: 'auth',
      access_token: integration.config.tokens.access_token
    };

    this.websocketSend(socket, authData, false);
  };

  websocketResult = (integrationId: number, data: any) => {
    logger.debug('Homeassistant result', { integrationId, data });
    if (!data) {
      return;
    }

    this.integrationEntities[integrationId] = {
      entities: keyBy(data, 'entity_id')
    };
  };

  websocketEvent = (integrationId: number, event: any) => {
    logger.debug('Homeassistant event', { integrationId, event });
    this.integrationEntities[integrationId].entities[event.data.entity_id] = event.data.new_state;
  };

  websocketSend = (socket: WebSocket, data: any, addId: boolean = true) => {
    const dataToSend = { ...data };
    if (addId) {
      (dataToSend as any).id = this.id;
      this.id++;
    }

    socket.send(JSON.stringify(dataToSend));
  };

  @action
  insert = async (config: Config) => {
    logger.debug('Homeassistant store insert', { config });
    const tokens = await this.getTokens(config);
    logger.debug('Homeassistant store insert - got tokens', { tokens });
    const configToStore = Object.assign({}, config, { tokens });
    const integration = await integrationsStore.insert('homeassistant', configToStore);
    this.integrations = this.integrations.concat(integration);
    this.setupWebsocket(integration);
  };

  @action
  getTokens = async (config: Config) => {
    logger.debug('Homeassistant store getTokens', { code: config.code });
    const clientId = encodeURIComponent(window.location.origin);
    return fetch(`${config.url}/auth/token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: `grant_type=authorization_code&code=${config.code}&client_id=${clientId}`
    }).then(res => res.json());
  };

  refreshToken = async (integration: Integration) => {
    const { url, tokens } = integration.config;
    logger.debug('Homeassistant store refreshTokens', { tokens });
    const clientId = encodeURIComponent(window.location.origin);
    const newTokens = await fetch(`${url}/auth/token`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: `grant_type=refresh_token&refresh_token=${tokens.refresh_token}&client_id=${clientId}`
    }).then(res => res.json());

    if (newTokens.error) {
      logger.error('Error getting refresh token', { error: newTokens.error });
      return false;
    }

    await this.updateIntegrationWithNewTokens(integration, newTokens);
    return true;
  };

  updateIntegrationWithNewTokens = async (integration: Integration, tokens: any) => {
    integration.config.tokens.access_token = tokens.access_token;
    await integrationsStore.update(integration.id, integration.config);
    this.integrations = this.integrations.map(i => {
      return i.id !== integration.id ? i : integration;
    });
  };
}

export let store = new Store();
export const StoreContext = createContext(store);

// await fetch("http://localhost:8123/auth/token", {
//     "credentials": "omit",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0",
//         "Accept": "*/*",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/x-www-form-urlencoded"
//     },
//     "referrer": "http://localhost:3000/p/1",
//     "body": "grant_type=authorization_code&code=fefe53c1bb984890a8b801da75f4ab8d&client_id=http%3A%2F%2Flocalhost%3A3000",
//     "method": "POST",
//     "mode": "cors"
// });

// await fetch('http://localhost:8123/auth/token', {
//   credentials: 'omit',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0',
//     Accept: '*/*',
//     'Accept-Language': 'en-US,en;q=0.5',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   referrer:
//     'http://localhost:8000/?oauth=1&code=0928216af2db48ba99b945fcd12132bf&oauth=1&code=2d90081879604fc9b4f38b9f92991be6',
//   body: 'grant_type=authorization_code&code=2d90081879604fc9b4f38b9f92991be6&client_id=http%3A%2F%2Flocalhost%3A8000',
//   method: 'POST',
//   mode: 'cors'
// });

// await fetch('http://localhost:8123/auth/token', {
//   credentials: 'omit',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0',
//     Accept: '*/*',
//     'Accept-Language': 'en-US,en;q=0.5',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   referrer: 'http://localhost:8000/p/1',
//   body: 'grant_type=authorization_code&code=2d90081879604fc9b4f38b9f92991be6&client_id=http%3A%2F%2Flocalhost%3A8000',
//   method: 'POST',
//   mode: 'cors'
// });
