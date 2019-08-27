import { useState, useEffect, useCallback } from 'react';

type Callback = (event: any) => void;

export default function useLongPress(callback: Callback, ms = 300) {
  const [startLongPress, setStartLongPress] = useState<boolean>(false);
  const [stopEvent, setStopEvent] = useState<any | null>(null);

  useEffect(() => {
    let timerId: any;
    if (startLongPress) {
      timerId = setTimeout(() => callback(stopEvent), ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(event => {
    setStopEvent(event);
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop
  };
}
