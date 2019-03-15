import { observable, set } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import keyBy from 'lodash/keyBy';

interface Result {
  attributes: any;
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  state: string;
}

interface Results {
  [s: string]: Result;
}

interface Event {
  data: {
    entity_id: string;
    new_state: Result;
    old_state: Result;
  };
}

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const wsURLKey = 'ha-ws-url';
const accessTokenKey = 'ha-access-token';

const localStorageHelper = {
  getWSURL: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(wsURLKey);
  },
  setWSURL: (wsURL: string): void => {
    window.localStorage.setItem(wsURLKey, wsURL);
  },
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(accessTokenKey);
  },
  setAccessToken: (accessToken: string): void => {
    window.localStorage.setItem(accessTokenKey, accessToken);
  }
};

export default class Store {
  @observable hasData: boolean = false;
  @observable data: Results = {};
  @observable wsUrl: string | null = localStorageHelper.getWSURL();
  @observable accessToken: string | null = localStorageHelper.getAccessToken();
  @observable authenticated: boolean = false;
  id: number = 1;
  ws: WebSocket | undefined;

  constructor() {
    const isServer = typeof window === 'undefined';
    if (isServer) {
      return;
    }

    this.createWebsocket();
  }

  setWSURL = (wsURL: string) => {
    this.wsUrl = wsURL;
    localStorageHelper.setWSURL(wsURL);
    this.createWebsocket();
  };

  setAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
    localStorageHelper.setAccessToken(accessToken);
    this.authenticate();
  };

  createWebsocket = () => {
    if (!this.wsUrl) {
      console.warn('No websocket URL set - cannot create');
      return;
    }

    this.ws = new WebSocket(this.wsUrl);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
    this.ws.addEventListener('message', this.onMessage);
  };

  authenticate = () => {
    console.log('Authenticating');
    this.ws.send(
      JSON.stringify({
        type: 'auth',
        access_token: this.accessToken
      })
    );
  };

  onReady = () => {
    this.authenticated = true;
    this.send({ type: 'get_states' });
    this.send({ type: 'subscribe_events' });
  };

  send = (data: object) => {
    this.ws.send(JSON.stringify({ id: this.id, ...data }));
    this.id++;
  };

  onOpen = () => {
    console.log('Open');
  };

  onClose = () => {
    console.log('Closed');
  };

  onError = (err: any) => {
    console.error('Error raised', err);
  };

  onMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'auth_required':
        this.authenticate();
        break;
      case 'auth_invalid':
        this.onError(new Error('Authentication invalid'));
        break;
      case 'auth_ok':
        this.onReady();
        break;
      case 'result':
        this.onMessageResult(data.result);
        break;
      case 'event':
        this.onMessageEvent(data.event);
        break;
      default:
        console.log('Hmmm, something else', data);
        break;
    }
  };

  onMessageResult = (data?: Result[]): void => {
    if (!data) {
      return;
    }
    this.data = keyBy(data, 'entity_id');
    this.hasData = true;
  };

  onMessageEvent = (event: Event): void => {
    console.log('New event received', event);
    this.data[event.data.entity_id] = event.data.new_state;
  };
}

let store: Store | null = null;
export function initializeStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store();
  }
  if (store === null) {
    store = new Store();
  }
  return store;
}
