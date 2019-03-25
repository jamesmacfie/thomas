import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import keyBy from 'lodash/keyBy';

interface Entities {
  [s: string]: Entity;
}

interface Event {
  data: {
    entity_id: string;
    new_state: Entity;
    old_state: Entity;
  };
}

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const wsURLKey = 'ha-ws-url';
const accessTokenKey = 'ha-access-token';

export const localStorageHelper = {
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
  @observable data: Entities = {};
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

    this.connectWebsocket();
  }

  setWSURL = (wsURL: string) => {
    this.wsUrl = wsURL;
    localStorageHelper.setWSURL(wsURL);
    this.connectWebsocket();
  };

  setAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
    localStorageHelper.setAccessToken(accessToken);
    this.authenticate();
  };

  connectWebsocket = () => {
    if (!this.wsUrl) {
      console.warn('No websocket URL set - cannot create');
      return;
    }

    if (this.ws && this.ws.readyState < 2) {
      // Websocker exists but is loading
      return;
    }

    this.ws = new WebSocket(this.wsUrl);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
    this.ws.addEventListener('message', this.onMessage);
  };

  authenticate = () => {
    if (!this.accessToken) {
      console.warn('No access token. Cannot authenticate');
      return;
    }
    console.log('Authenticating');
    this.send(
      {
        type: 'auth',
        access_token: this.accessToken
      },
      false
    );
  };

  onReady = () => {
    this.authenticated = true;
    this.send({ type: 'get_states' });
    this.send({ type: 'subscribe_events' });
  };

  send = (data: object, addId: boolean = true) => {
    if (!this.ws) {
      console.warn('No websocket exists. Cannot send data', data);
      return;
    }

    const dataToSend = { ...data };
    if (addId) {
      (dataToSend as any).id = this.id;
      this.id++;
    }

    this.ws.send(JSON.stringify(dataToSend));
  };

  onOpen = () => {
    console.log('Websocket open');
  };

  onClose = () => {
    console.log('Websocket closed. Reconnecting');
    this.connectWebsocket();
  };

  onError = (err: any) => {
    console.warn('Error raised', err);
  };

  onMessage = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'auth_required':
        this.authenticate();
        break;
      case 'auth_invalid':
        this.onError('Authentication invalid');
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

  onMessageResult = (data?: Entity[]): void => {
    // console.log('Result received', data);
    if (!data) {
      return;
    }
    this.data = keyBy(data, 'entity_id');
    this.hasData = true;
  };

  onMessageEvent = (event: Event): void => {
    // console.log('Event received', event);
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
