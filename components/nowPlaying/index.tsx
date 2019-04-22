import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { H3, H4 } from '../../components/text';
import ProgressLine from '../../components/progressLine';
import Modal from '../../components/modal';
import SpotifyPlayerButtons from '../../components/spotifyPlayerButtons';
import CollapseLeft from '../../svg/arrow-collapse-left.svg';
import SpotifyStore from '../../spotifyStore';
import { SpotifyStoreContext } from '../../spotifyStore';

interface ModalProps {
  spotifyStore: SpotifyStore;
  onClick: any;
}

/**
 * A bunch of this is duplicated. Can be cleaned up
 */
const NowPlayingModal = observer(({ onClick }: ModalProps) => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  const { item, progress_ms } = spotifyStore.currentlyPlaying!;
  const percentComplete = (progress_ms / item.duration_ms) * 100;

  const styles = {
    backgroundImage: `url(${item.album.images[0].url})`,
    backgroundSize: 'cover'
  };
  return (
    <Modal onClick={onClick} size="md" style={styles} padding={false} className="flex">
      <div className="self-end h-24 w-full bg-overlay-light rounded-b-sm">
        <ProgressLine className="progress-now-playing" percentComplete={percentComplete} />
        <div className="relative w-full h-full flex">
          <div className="flex flex-col justify-center w-48 ml-6">
            <H3>{item.name}</H3>
            <H4 className="text-grey-darker">{item.artists[0].name}</H4>
          </div>
          <div className="flex-grow" />
          <SpotifyPlayerButtons
            className="absolute pin-center"
            previousClassName="h-10 w-10"
            fastForwardClassName="h-10 w-10"
            playClassName="h-16 w-16"
          />
        </div>
      </div>
    </Modal>
  );
});

const NowPlayingCollapsed = observer(() => {
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;

  const { item } = spotifyStore.currentlyPlaying!;

  return (
    <img
      onClick={spotifyStore.toggleUiCollapsed}
      src={item.album.images[2].url}
      className="h-16 w-16 bg-overlay-dark absolute pin-b pin-l rounded-sm"
    />
  );
});

const NowPlaying = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const spotifyStore = useContext(SpotifyStoreContext) as SpotifyStore;
  if (spotifyStore.status !== 'AUTHENTICATED') {
    return null;
  }

  if (!spotifyStore.currentlyPlaying) {
    return null;
  }

  const { item, progress_ms } = spotifyStore.currentlyPlaying;
  if (!item) {
    // Currently playing exists but there is no item. Can happen at the end of a playlist
    return null;
  }

  if (spotifyStore.uiCollapsed) {
    return <NowPlayingCollapsed />;
  }

  if (modalOpen) {
    return <NowPlayingModal spotifyStore={spotifyStore} onClick={toggleModal} />;
  }
  const percentComplete = (progress_ms / item.duration_ms) * 100;

  return (
    <div className="h-24 w-screen bg-overlay-dark">
      <ProgressLine className="progress-now-playing" percentComplete={percentComplete} />
      <div className="relative w-full h-full flex">
        <img onClick={toggleModal} src={item.album.images[2].url} className="w-20 h-20 mr-4 rounded-sm mt-2 ml-2" />
        <div className="flex flex-col justify-center w-48">
          <H3>{item.name}</H3>
          <H4 className="text-grey-darker">{item.artists[0].name}</H4>
        </div>
        <div className="flex-grow" />
        <SpotifyPlayerButtons
          className="absolute pin-center"
          previousClassName="h-10 w-10"
          fastForwardClassName="h-10 w-10"
          playClassName="h-16 w-16"
        />
        <div
          className="w-10 pr-6 self-center current-stroke current-fill text-grey-light active:text-progress flex-no-shrink"
          onClick={spotifyStore.toggleUiCollapsed}
        >
          <CollapseLeft />
        </div>
      </div>
    </div>
  );
});

export default NowPlaying;
