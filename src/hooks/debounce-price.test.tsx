import React from 'react';
import { useDebouncePrice, useDebounce } from './debounce-price';

import { act } from 'react-dom/test-utils';

vi.mock('react', async () => {
  const actual :typeof React = await vi.importActual('react') ;
  return {
    ...actual,
    useRef: () => ({current: () => setTimeout(()=> vi.fn(), 1000)}),
    useCallback: (fnc : () => void) => fnc,

  };
});

vi.useFakeTimers();
vi.spyOn(global, 'setTimeout');

describe('Hookы: useDebouncePrice, useDebounce', () => {

  it('should be defined', () => {
    expect(useDebouncePrice).toBeDefined();
  });
  it('should call hook after 1000ms after render', () => {
    const mockHook = vi.fn();

    const debounce = useDebouncePrice(mockHook, 1000);
    debounce();

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockHook).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(mockHook).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('should call hook after 500ms after render', () => {
    const mockHook = vi.fn().mockImplementation((a : string, b : string) => a + b);

    const debounce = useDebounce(mockHook, 500);
    debounce('56', 'до');

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(mockHook).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(mockHook).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
  });
});

