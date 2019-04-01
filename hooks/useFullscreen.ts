import fscreen from 'fscreen';
import { useEffect, useState } from 'react';

export const useFullscreen = (element: HTMLElement | null) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const closeOtherFullscreen = async () => {
    // If there's another element currently full screen, exit first
    if (fscreen.fullscreenElement && fscreen.fullscreenElement !== element) {
      await fscreen.exitFullscreen();
    }
  };

  const closeFullscreen = () => {
    if (isFullscreen) {
      fscreen.exitFullscreen();
    }
  };

  const openFullscreen = async () => {
    await closeOtherFullscreen();

    if (element) {
      fscreen.requestFullscreen(element);
    }
  };

  const setFullscreen = (state: boolean) => (state ? openFullscreen() : closeFullscreen());

  const toggleFullscreen = () => setFullscreen(!isFullscreen);

  const onFullscreenChange = () => setIsFullscreen(fscreen.fullscreenElement === element);

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', onFullscreenChange, false);

    return () => {
      fscreen.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [element]);

  return {
    isFullscreen,
    setFullscreen,
    toggleFullscreen
  };
};
