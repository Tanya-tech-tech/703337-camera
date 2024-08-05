import {RefObject, useEffect} from 'react';

export const useElementListener = <K extends keyof HTMLElementEventMap, T extends HTMLElement>(
  eventName: K,
  element: RefObject<T> | null,
  listener: (evt: HTMLElementEventMap[K]) => void
) => {

  useEffect(() => {
    const domElement = element?.current;

    if (!domElement) {
      return;
    }
    domElement.focus();
    domElement.addEventListener(eventName, listener);

    return () => {
      domElement.removeEventListener(eventName, listener);
    };
  }, [eventName, element, listener]);
};

