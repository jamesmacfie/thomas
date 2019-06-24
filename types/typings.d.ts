declare module 'react-spotify-login';
declare module 'isomorphic-unfetch';
declare module 'spotify-web-api-node';
declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface Entity {
  attributes: {
    attribution?: string;
    friendly_name?: string;
    battery_level?: number;
    icon?: string;
    unit_of_measurement: string;
  };
  context: {
    id: string;
    user_id?: string;
  };
  entity_id: string;
  last_changed: Date;
  last_updated: Date;
  state: number | string;
  [key: string]: string;
}

declare interface SpotifyTrack {
  id: string;
  href: string;
  album: SpotifyAlbum;
  name: string;
  artists: SpotifyArtist[];
  duration_ms: number;
}

declare interface SpotifyPlaylistTracks {
  items: {
    track: SpotifyTrack;
  }[];
}

declare interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

declare interface SpotifyArtist {
  id: string;
  name: string;
}
declare interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
}

declare interface SpotifyCurrentlyPlaying {
  currently_playing_type: string;
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack;
  context: {
    type: string;
    href: string;
  };
}

declare interface WSMessage {
  type: string;
  data: object | null;
}
