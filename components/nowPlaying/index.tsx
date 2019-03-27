import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { H1, H2, H3, H4 } from '../../components/text';
import ProgressLine from '../../components/progressLine';
import PlaylistTracks from '../../components/playlistTracks';
import Modal from '../../components/modal';
import ButtonPlay from '../../svg/button-play.svg';
import ButtonPause from '../../svg/button-pause.svg';
import ButtonFastForward from '../../svg/button-fast-forward.svg';
import ButtonRewind from '../../svg/button-rewind.svg';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

interface ModalProps {
  spotifyStore: SpotifyStore;
  onClick: any;
}

interface ModalDetailProps {
  spotifyStore: SpotifyStore;
  className?: string;
}

const NowPlayingModalDetail = ({ className, spotifyStore }: ModalDetailProps) => {
  const { context } = spotifyStore.currentlyPlaying!;
  if (context.type !== 'playlist') {
    return null;
  }

  const playlistId = context.href.substring(context.href.lastIndexOf('/') + 1);
  return <PlaylistTracks className={className} playlistId={playlistId} />;
};

const NowPlayingModal = ({ onClick, spotifyStore }: ModalProps) => {
  const { item } = spotifyStore.currentlyPlaying!;
  return (
    <Modal onClick={onClick} size="lg">
      <div className="flex h-full">
        <div className="w-128 flex-no-shrink">
          <img className="rounded" src={item.album.images[0].url} />
        </div>
        <div className="flex-grow flex flex-col ml-6">
          <div>
            <H1 className="mt-0 mb-3">{item.album.name}</H1>
            <H2 className="mt-0 text-grey-darker">{item.artists[0].name}</H2>
          </div>
          <NowPlayingModalDetail className="flex-grow" spotifyStore={spotifyStore} />
        </div>
      </div>
    </Modal>
  );
};

const NowPlaying = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  if (spotifyStore.status !== 'AUTHENTICATED') {
    return null;
  }

  if (!spotifyStore.currentlyPlaying) {
    spotifyStore.startGettingCurrentlyPlaying();
    return null;
  }

  if (modalOpen) {
    return <NowPlayingModal spotifyStore={spotifyStore} onClick={toggleModal} />;
  }

  const { item, progress_ms, is_playing } = spotifyStore.currentlyPlaying as any;
  const percentComplete = (progress_ms / item.duration_ms) * 100;
  const playPauseClick = is_playing ? spotifyStore.pause : spotifyStore.play;
  const PlayPause = is_playing ? ButtonPause : ButtonPlay;

  return (
    <div className="fixed h-24 pin-b w-screen z-10 bg-overlay-dark">
      <ProgressLine className="progress-now-playing" percentComplete={percentComplete} />
      <div className="relative w-full h-full flex">
        <img onClick={toggleModal} src={item.album.images[2].url} className="w-20 h-20 mr-4 rounded-sm mt-2 ml-2" />
        <div className="flex flex-col justify-center w-48">
          <H3>{item.name}</H3>
          <H4 className="text-grey-darker">{item.artists[0].name}</H4>
        </div>
        <div className="flex flex-grow items-center justify-center">
          <div className="h-8 w-8 current-stroke text-grey-light mr-3">
            <ButtonRewind onClick={spotifyStore.previous} />
          </div>
          <div className="h-10 w-10 current-stroke text-grey-light">
            <PlayPause onClick={playPauseClick} />
          </div>
          <div className="h-8 w-8 current-stroke text-grey-light ml-3">
            <ButtonFastForward onClick={spotifyStore.next} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default NowPlaying;
