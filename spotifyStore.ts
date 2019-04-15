import { createContext } from 'react';
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import fetch from 'isomorphic-unfetch';

type SpotifyStatus = 'DEFAULT' | 'AUTHENTICATING' | 'POPULATING' | 'ERROR' | 'AUTHENTICATED' | 'REFRESHING';

const { API_URL } = process.env;
const { WS_URL } = process.env; // Weird, this breaks if I add it to the destructuring above
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

export default class SpotifyStore {
  @observable status: SpotifyStatus = 'DEFAULT';
  @observable currentlyPlaying?: SpotifyCurrentlyPlaying;
  @observable loginUrl: string = '';
  @observable uiCollapsed: boolean = false;

  private ws: WebSocket | null = null;

  constructor() {
    this.getAndSetLoginUrl();
    this.getCurrentStatus();
  }

  getAndSetLoginUrl = () => {
    return fetch(`${API_URL}/spotify/login_url`)
      .then((response: Response) => response.json())
      .then((json: any) => {
        this.loginUrl = json.url;
      });
  };

  getCurrentStatus = () => {
    return fetch(`${API_URL}/spotify/status`).then((response: Response) => {
      if (response.status === 200 || response.status === 304) {
        this.status = 'AUTHENTICATED';
        this.connect();
      }
    });
  };

  connect = () => {
    if (this.ws || isServer) {
      return;
    }
    this.ws = new WebSocket(WS_URL!);
    this.ws.onopen = () => {
      console.log('Spotify WS opened');
    };
    this.ws.onclose = () => {
      console.log('Spotify WS closed');
      this.ws = null;
      // Try to reconnect in a few seconds
      setTimeout(() => {
        this.connect();
      }, 5000);
    };

    this.ws.onmessage = (message: MessageEvent) => {
      const parsedMessage: WSMessage = JSON.parse(message.data);
      if (parsedMessage.type === 'spotify:currently_playing') {
        this.currentlyPlaying = parsedMessage.data as SpotifyCurrentlyPlaying;
      }
    };
  };

  getAccessToken = (code: string) => {
    this.status = 'AUTHENTICATING';
    return fetch(`${API_URL}/spotify/token?code=${code}`).then((response: Response) => {
      if (response.status != 200) {
        this.status = 'ERROR';
      } else {
        this.status = 'AUTHENTICATED';
        this.connect();
      }
    });
  };

  toggleUiCollapsed = () => {
    this.uiCollapsed = !this.uiCollapsed;
  };

  play = async () => {
    await this.request('/v1/me/player/play', 'PUT');
  };

  pause = async () => {
    await this.request('/v1/me/player/pause', 'PUT');
  };

  previous = async () => {
    await this.request('/v1/me/player/previous', 'POST');
  };

  next = async () => {
    await this.request('/v1/me/player/next', 'POST');
  };

  request = async (url: string, method: string = 'GET') => {
    const result = await fetch(`${API_URL}/spotify${url}`, {
      method
    });

    if (method === 'GET') {
      return result.json();
    }

    return result;
  };
}

let store: SpotifyStore | null = null;
export function initializeSpotifyStore() {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new SpotifyStore();
  }
  if (store === null) {
    store = new SpotifyStore();
  }
  return store;
}

export const SpotifyStoreContext = createContext(initializeSpotifyStore());
