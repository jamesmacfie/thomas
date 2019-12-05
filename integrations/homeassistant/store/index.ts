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

const isServer = typeof window === 'undefined';

export default class Store {
  id: number = 1;
  @observable integrations: Integration[] = [];
  @observable integrationEntities: {
    [key: string]: {
      entities: { [key: string]: HomeAssistantEntity };
    };
  } = {};
  @observable integrationWebsockets: { [key: string]: any } = {};

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
    const integrations = await fetch(`${process.env.API_URL}/integrations/homeassistant`).then(res => res.json());

    logger.debug('Setting Homeassistant integrations', { integrations });
    this.integrations = integrations;
  };

  @action
  setupWebsocket = async (integration: Integration) => {
    if (isServer) {
      logger.debug('HomeAssistant store - not loading, server rendered');
      return;
    }

    logger.debug('Setting Homeassistant websocket', { integrationId: integration.id });

    const socket = this.createWebsocket(integration);
    this.connectWebsocket(socket, integration);
  };

  createWebsocket = (integration: Integration) => {
    const host = integration.config.url.replace('http', 'ws');
    return new WebSocket(`${host}/api/websocket`);
  };

  connectWebsocket = (socket: WebSocket, integration: Integration) => {
    this.integrationWebsockets[integration.id] = socket;

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
            const socket = this.createWebsocket(integration);
            this.connectWebsocket(socket, integration);
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

  websocketSendByIntegrationId = (integrationId: number, data: any, addId: boolean = true) => {
    logger.debug('Homeassistant websocketSendByIntegrationId', { integrationId, data });
    const socket = this.integrationWebsockets[integrationId];
    if (!socket) {
      logger.error('No socket for integration', { integrationId });
      return;
    }
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
