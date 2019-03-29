import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { H3, H4 } from '../../components/text';
import SpeakersNote from '../../svg/speakers-note.svg';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

interface Props {
  className?: string;
  playlistId: string;
}

const PlaylistTracks = observer(({ className, playlistId }: Props) => {
  const [playlistTracks, setPlaylistTracks] = useState(null);
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  useEffect(() => {
    spotifyStore.getPlaylistTracks(playlistId).then(tracks => {
      setPlaylistTracks(tracks as any);
      // Scroll to current element after it's rendered (hence the settimeout)
      setTimeout(() => {
        const currentEl = document.querySelector('.spotify-playing-track');
        if (!currentEl) {
          return;
        }
        currentEl.scrollIntoView();
      }, 0);
    });
  }, [playlistId]);

  if (!playlistTracks) {
    return null;
  }

  return (
    <ul className={cn('pl-0 mt-3 overflow-x-auto h-full', className)}>
      {(playlistTracks as SpotifyPlaylistTracks).items.map(item => {
        const { track } = item;
        let isCurrent = false;
        if (spotifyStore.currentlyPlaying!.item.id === track.id) {
          isCurrent = true;
        }
        const classes = cn('block w-24 py-3 relative double-border-bottom w-full flex items-center', {
          'spotify-playing-track': isCurrent
        });
        return (
          <li key={track.href} className={classes}>
            <div className="flex-grow">
              <H3>{track.name}</H3>
              <H4 className="mb-0 text-grey-darker">{track.album.artists[0].name}</H4>
            </div>
            <div className="h-8 w-8 ml-6 current-stroke text-progress">{isCurrent && <SpeakersNote />}</div>
          </li>
        );
      })}
    </ul>
  );
});

export default PlaylistTracks;
