import React from 'react';
import { inject, observer } from 'mobx-react';
import { H3, H4 } from '../../components/text';
import ProgressLine from '../../components/progressLine';
import SpotifyStore from '../../spotifyStore';

interface Props {
  spotifyStore?: SpotifyStore;
}

const NowPlaying = ({ spotifyStore }: Props) => {
  if (!spotifyStore) return null;
  console.log(spotifyStore.status);
  if (spotifyStore.status !== 'AUTHENTICATED') {
    return null;
  }

  if (!spotifyStore.currentlyPlaying) {
    console.log(spotifyStore);
    spotifyStore.startGettingCurrentlyPlaying();
    return null;
  }

  console.log('CURRENTLY PLAYING', spotifyStore.currentlyPlaying);

  const { item, progress_ms, is_playing } = spotifyStore.currentlyPlaying as any;
  const percentComplete = (progress_ms / item.duration_ms) * 100;
  const playPauseClick = is_playing ? spotifyStore.pause : spotifyStore.play;
  const playPauseText = is_playing ? 'pause' : 'play';

  return (
    <div className="fixed h-16 pin-b w-screen z-10 bg-overlay-dark">
      <ProgressLine className="progress-now-playing" percentComplete={percentComplete} />
      <div className="relative w-100 h-100 flex">
        <img src={item.album.images[2].url} className="w-16 h-16 mr-4" />
        <div className="flex flex-col justify-center">
          <H3>{item.name}</H3>
          <H4 className="text-grey-darker">{item.artists[0].name}</H4>
        </div>
        <div className="flex-grow-1">
          <button onClick={spotifyStore.previous}>Prev</button>
          <button onClick={playPauseClick}>{playPauseText}</button>
          <button onClick={spotifyStore.next}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default inject('spotifyStore')(observer(NowPlaying));
