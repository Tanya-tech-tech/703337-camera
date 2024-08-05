import { renderHook, fireEvent } from '@testing-library/react';
import { useEscListener } from './use-esc-listener';

describe('Hook: useEscListener', () => {
  it('should invoke ', () => {
    const keyEvent = 'keydown';
    const callback = vi.fn();

    const target = document.createElement('div');
    document.body.appendChild(target);

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    const view = renderHook(() => useEscListener(keyEvent, callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(outside);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.spyOn(document, 'removeEventListener');

    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
