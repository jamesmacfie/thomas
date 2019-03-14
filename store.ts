import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

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

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const wsURLKey = 'ha-ws-url';
const accessTokenKey = 'ha-access-token';

export default class Store {
  @observable data: Results = {};
  @observable wsUrl: string | undefined;
  @observable accessToken: string | undefined;
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
    this.createWebsocket();
  };

  setAccessToken = (accessToken: string) => {
    this.accessToken = accessToken;
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
        console.log('Result received', data.result);
        this.onMessageResult(data.result);
        break;
      case 'event':
        console.log('Change received', data);
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

    this.data = data.reduce((acc: Results, cur: Result) => {
      return Object.assign({}, acc, {
        [cur.entity_id]: cur
      });
    }, {});

    console.log('DATA IS NOW', this.data);
  };
}

let store = null;
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
