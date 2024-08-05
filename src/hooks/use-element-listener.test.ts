import { useElementListener } from './use-element-listener';
import { renderHook, fireEvent } from '@testing-library/react';
import React from 'react';

vi.mock('react', async () => {
  const actual :typeof React = await vi.importActual('react') ;
  return {
    ...actual,
  };
});
describe('Hook: useElementListener', () => {
  it('should invoke and \'removeEventListener\' works correctly', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const keyEvent = 'keydown';
    const callback = vi.fn();
    const ref = {
      current: target,
    };

    const view = renderHook(() => useElementListener(keyEvent, ref, callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(target);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.spyOn(target, 'removeEventListener');

    view.unmount();
    expect(target.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('should do nothing after keydown on the outside target element', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    const keyEvent = 'keydown';
    const callback = vi.fn();
    const ref = {
      current: target,
    };

    renderHook(() => useElementListener(keyEvent, ref, callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(outside);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

