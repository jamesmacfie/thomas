import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

type SpotifyStatus = 'DEFAULT' | 'AUTHENTICATING' | 'POPULATING' | 'ERROR' | 'AUTHENTICATED' | 'REFRESHING';

const urls = {
  profile: '/v1/me',
  currentlyPlaying: '/v1/me/player/currently-playing',
  play: '/v1/me/player/play',
  pause: '/v1/me/player/pause',
  previous: '/v1/me/player/previous',
  next: '/v1/me/player/next '
};
const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

const accessTokenKey = 'spotify-access-token';
const profileKey = 'spotify-profile';

export const localStorageHelper = {
  getProfile: (): object | null => {
    if (typeof window === 'undefined') {
      return null;
    }

    const profile = window.localStorage.getItem(profileKey);
    return profile ? JSON.parse(profile) : null;
  },
  setProfile: (profile: object): void => {
    window.localStorage.setItem(profileKey, JSON.stringify(profile));
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

export default class SpotifyStore {
  @observable status: SpotifyStatus = 'DEFAULT';
  @observable profile: object | null = localStorageHelper.getProfile();
  @observable accessToken: string | null = localStorageHelper.getAccessToken();
  @observable currentlyPlaying?: object;

  private currentlyPlayingInterval?: any;

  constructor() {
    if (this.accessToken) {
      this.onReady();
    }
  }

  setAccessToken = async (accessToken: string) => {
    this.accessToken = accessToken;
    localStorageHelper.setAccessToken(accessToken);
    await this.onReady();
  };

  onReady = async () => {
    this.status = 'POPULATING';
    await this.getProfile();
    await this.startGettingCurrentlyPlaying();
    this.status = 'AUTHENTICATED';
  };

  startGettingCurrentlyPlaying = async () => {
    clearInterval(this.currentlyPlayingInterval);

    this.currentlyPlayingInterval = setInterval(async () => {
      const currentlyPlaying = await this.request(urls.currentlyPlaying);
      console.log('Got', currentlyPlaying);
      this.currentlyPlaying = currentlyPlaying;
    }, 5000);
  };

  play = async () => {
    await this.request(urls.play, 'PUT', false);
  };

  pause = async () => {
    await this.request(urls.pause, 'PUT', false);
  };

  previous = async () => {
    await this.request(urls.previous, 'POST', false);
  };

  next = async () => {
    await this.request(urls.next, 'POST', false);
  };

  getProfile = async () => {
    const profile = await this.request(urls.profile);
    localStorageHelper.setProfile(profile);
    this.profile = profile;
  };

  request = async (url: string, method: string = 'GET', json: boolean = true) => {
    if (!this.accessToken) {
      console.warn('No access token. Cannot do a request to Spotify');
      return;
    }
    try {
      const result = await fetch(`https://api.spotify.com${url}`, {
        method,
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`
        })
      }).then((res: any) => (json ? res.json() : res));
      return result;
    } catch (err) {
      console.error('Spotify error', err);
      this.status = 'ERROR';
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
