import { useEffect } from 'react';

export const useEscListener = <K extends keyof HTMLElementEventMap>(
  eventName: K,
  listener: (evt: HTMLElementEventMap[K]) => void
) => {

  useEffect(() => {
    document.addEventListener(eventName, listener);

    return () => {
      document.removeEventListener(eventName, listener);
    };
  }, [eventName, listener]);
};

