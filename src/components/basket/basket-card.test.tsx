import BasketCard from './basket-card';
import { render, screen } from '@testing-library/react';
import { makeFakeBasketCard, makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';
import * as localStorage from '../../services/order';
import * as actions from '../../store/goods-data/goods-data.slice';

describe('Component: BasketCard', () => {
  it('should render correctly', () => {
    const fakeCard = makeFakeBasketCard();
    const count = fakeCard[Number(Object.keys(fakeCard)[0])].countDevice;
    const fakeDisable = datatype.boolean();
    const handler = vi.fn();
    const fakeDiscHandler = vi.fn();
    const name = fakeCard[Number(Object.keys(fakeCard)[0])].card.name;

    const { withStoreComponent } = withStore(<BasketCard basketCard={fakeCard} onDiscountChange={fakeDiscHandler} onListItemClick={handler} isDisable={fakeDisable}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const input : HTMLInputElement = screen.getByTestId('inputElement');

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(input.value).toBe(String(count));
  });

  it('the quantity of device should increase,  when click add button', async() => {
    const addButton = 'addButtonElement';
    const fakeCard = makeFakeBasketCard();
    const count = fakeCard[Number(Object.keys(fakeCard)[0])].countDevice;

    const handler = vi.fn();
    const fakeDiscHandler = vi.fn();
    vi.spyOn(localStorage, 'changeBasket').mockReturnValue(void [fakeCard]);

    const { withStoreComponent } = withStore(<BasketCard basketCard={fakeCard} onDiscountChange={fakeDiscHandler} onListItemClick={handler} isDisable={false}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    const { rerender } = render(preparedComponent);
    const input : HTMLInputElement = screen.getByTestId('inputElement');
    await userEvent.click(screen.getByTestId(addButton));
    rerender(preparedComponent);

    expect(input.value).toBe(String(count + 1));
  });

  it(' should be changed store, when the button "Удалить товар" is clicked', async() => {
    const fakeCard = makeFakeBasketCard();
    const handler = vi.fn();
    const fakeDiscHandler = vi.fn();
    const isRemove = vi.spyOn(actions, 'setIsRemoveModal');

    const { withStoreComponent } = withStore(<BasketCard basketCard={fakeCard} onDiscountChange={fakeDiscHandler} onListItemClick={handler} isDisable={false}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const deleteButton = screen.getByTestId('deleteButtonElement');
    await userEvent.click(deleteButton);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(isRemove).toHaveBeenCalledTimes(1);
  });

  it('should render correctly when user enter count of device', async() => {
    const inputElementTestId = 'inputElement';
    const expectedValue = '8';
    const fakeCard = makeFakeBasketCard();
    fakeCard[Number(Object.keys(fakeCard)[0])].countDevice = 0;
    const handler = vi.fn();
    const fakeDiscHandler = vi.fn();
    const { withStoreComponent } = withStore(<BasketCard basketCard={fakeCard} onDiscountChange={fakeDiscHandler} onListItemClick={handler} isDisable={false}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(inputElementTestId),
      expectedValue,
    );

    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });
});

