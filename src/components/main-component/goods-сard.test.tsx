import { render, screen, waitFor } from '@testing-library/react';
import GoodsCard from './goods-сard';
import { makeFakeDeviceCard } from '../../utils/mocks';
import { makeFakeStore } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';
import { withHistory } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';

describe('Component: GoodsCard', () => {
  it('should render correctly and callback in props was called', async() => {
    const expectedText = 'Купить';
    const card = makeFakeDeviceCard();
    const cb = vi.fn();
    const user = userEvent.setup();

    const { withStoreComponent } = withStore(<GoodsCard cardObj={card} onButtonClick={cb}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const button = screen.getByText('Купить');
    user.click(button);

    expect(screen.getByText(expectedText)).toBeInTheDocument();

    await waitFor(() => {
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});

