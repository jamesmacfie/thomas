import { createContext } from 'react';
import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import fetch from 'isomorphic-unfetch';

type SpotifyStatus = 'DEFAULT' | 'AUTHENTICATING' | 'POPULATING' | 'ERROR' | 'AUTHENTICATED' | 'REFRESHING';

const { API_URL } = process.env;
const urls = {
  profile: '/v1/me',
  currentlyPlaying: '/v1/me/player/currently-playing',
  play: '/v1/me/player/play',
  pause: '/v1/me/player/pause',
  previous: '/v1/me/player/previous',
  next: '/v1/me/player/next'
};
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const accessTokenKey = 'spotify-access-token';
const refreshTokenKey = 'spotify-refresh-token';

export const localStorageHelper = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(accessTokenKey);
  },
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.localStorage.getItem(refreshTokenKey);
  },
  setRefreshToken: (refreshToken: string): void => {
    window.localStorage.setItem(refreshTokenKey, refreshToken);
  },
  setAccessToken: (accessToken: string): void => {
    window.localStorage.setItem(accessTokenKey, accessToken);
  }
};

export default class SpotifyStore {
  @observable status: SpotifyStatus = 'DEFAULT';
  @observable profile: object | null = null;
  @observable accessToken: string | null = localStorageHelper.getAccessToken();
  @observable refreshToken: string | null = localStorageHelper.getRefreshToken();
  @observable currentlyPlaying?: SpotifyCurrentlyPlaying;
  @observable loginUrl: string = '';
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
      if (response.status === 200) {
        console.log('Spotify auth Ok');
        this.status = 'AUTHENTICATED';
        this.connect();
      }
    });
  };

  connect = () => {
    if (this.ws || isServer) {
      console.log('No need to connect');
      return;
    }
    this.ws = new WebSocket(`ws://localhost:3001`);
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
      }
    });
  };

  play = async () => {
    await this.request(urls.play, 'PUT');
  };

  pause = async () => {
    await this.request(urls.pause, 'PUT');
  };

  previous = async () => {
    await this.request(urls.previous, 'POST');
  };

  next = async () => {
    await this.request(urls.next, 'POST');
  };

  getProfile = async () => {
    const profile = await this.request(urls.profile);
    this.profile = profile;
  };

  getPlaylistTracks = async (playlistId: string): Promise<SpotifyPlaylistTracks> => {
    const url = `/v1/playlists/${playlistId}/tracks`;
    const tracks = await this.request(url);
    return tracks;
  };

  request = async (url: string, method: string = 'GET') => {
    const doRequest = () => {
      return fetch(`https://api.spotify.com${url}`, {
        method,
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`
        })
      });
    };

    if (!this.accessToken) {
      console.warn('No access token. Cannot do a request to Spotify');
      return;
    }

    try {
      let result = await doRequest();
      if (result.status === 401) {
        // await this.refreshAccessToken();
        result = await doRequest();
      }

      if (result.status === 204) {
        return;
      }

      if (result.status !== 200) {
        throw new Error(JSON.stringify(result.body));
      }

      if (method === 'GET') {
        return result.json();
      }

      return result;
    } catch (err) {
      console.error('Spotify error', err);
    }
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
