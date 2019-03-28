import React, { useContext } from 'react';
import cn from 'classnames';
import ButtonPlay from '../../svg/button-play.svg';
import ButtonPause from '../../svg/button-pause.svg';
import ButtonFastForward from '../../svg/button-fast-forward.svg';
import ButtonRewind from '../../svg/button-rewind.svg';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

interface Props {
  className?: string;
  playClassName?: string;
  fastForwardClassName?: string;
  previousClassName?: string;
}

const SpotifyPlayerButtons = ({ className, playClassName, fastForwardClassName, previousClassName }: Props) => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  const { is_playing } = spotifyStore.currentlyPlaying!;
  const playPauseClick = is_playing ? spotifyStore.pause : spotifyStore.play;
  const PlayPause = is_playing ? ButtonPause : ButtonPlay;

  return (
    <div className={cn('flex flex-grow items-center justify-center', className)}>
      <div className={cn('current-stroke text-grey-light mr-3', previousClassName)}>
        <ButtonRewind onClick={spotifyStore.previous} />
      </div>
      <div className={cn('h-10 w-10 current-stroke text-grey-light', playClassName)}>
        <PlayPause onClick={playPauseClick} />
      </div>
      <div className={cn('current-stroke text-grey-light ml-3', fastForwardClassName)}>
        <ButtonFastForward onClick={spotifyStore.next} />
      </div>
    </div>
  );
};
export default SpotifyPlayerButtons;
