import BasketIcon from './basket-icon';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import * as localStorage from '../../services/order';
import { makeFakeBasketCard } from '../../utils/mocks';

describe('Component: BasketIcon', () => {
  it('should render correctly', () => {
    const fakeCard = [makeFakeBasketCard(), makeFakeBasketCard(), makeFakeBasketCard()];
    vi.spyOn(localStorage, 'getBasket').mockReturnValue(fakeCard);
    const countGoods = fakeCard.map((el) => Number(el[Number(Object.keys(el)[0])].countDevice)).reduce((accum, item) => accum + item, 0);

    const { withStoreComponent } = withStore(<BasketIcon />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const span = screen.getByTestId('spanElement');
    expect(span.textContent).toBe(String(countGoods));
  });
});
