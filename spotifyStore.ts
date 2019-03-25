import { observable } from 'mobx';
import { useStaticRendering } from 'mobx-react';

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
  @observable hasProfile: boolean = false;
  @observable profile: object | null = localStorageHelper.getProfile();
  @observable accessToken: string | null = localStorageHelper.getAccessToken();
  @observable gettingProfile: boolean = false;

  setAccessToken = async (accessToken: string) => {
    console.log('Setting', accessToken);
    this.accessToken = accessToken;
    localStorageHelper.setAccessToken(accessToken);
    await this.getProfile();
  };

  getProfile = async () => {
    console.log('#getProfile');
    if (!this.accessToken) {
      console.warn('No access token. Cannot get Spotify profile');
      return;
    }
    this.hasProfile = false;
    this.gettingProfile = true;
    console.log('Getting profile', {
      Authorization: `Bearer ${this.accessToken}`
    });
    const profile = await fetch(`https://api.spotify.com/v1/me`, {
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`
      })
    }).then((res: any) => res.json());
    localStorageHelper.setProfile(profile);
    this.profile = profile;
    this.gettingProfile = false;
    this.hasProfile = true;
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
