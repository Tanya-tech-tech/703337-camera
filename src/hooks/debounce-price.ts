import { useRef, useCallback} from 'react';

type myFunction = (a : string, b : string) => void;
type effectFunction = () => void;

export const useDebounce = (callback : myFunction, interval = 0) => {
  const prevTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (val : string, placeholder : string) => {
      clearTimeout(prevTimeoutIdRef.current);
      prevTimeoutIdRef.current = setTimeout(() => {
        callback(val, placeholder);
      }, interval);
    },
    [callback, interval]
  );
};

export const useDebouncePrice = (callback : effectFunction, interval = 0) => {
  const prevTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>();
  return useCallback(
    () => {
      clearTimeout(prevTimeoutIdRef.current);
      prevTimeoutIdRef.current = setTimeout(() => {
        callback();
      }, interval);
    },
    [callback, interval]
  );
};


