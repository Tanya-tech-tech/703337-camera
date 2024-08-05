import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddItemModal from './add-item-modal';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeDeviceCard } from '../../utils/mocks';
import { State } from '../../types/state';
import * as reduxHooks from 'react-redux';
import React from 'react';
import * as actions from '../../store/goods-data/goods-data.slice';
import * as localStorage from '../../services/order';

vi.mock('react-redux', async () => {
  const actual :typeof React = await vi.importActual('react-redux') ;
  return {
    ...actual,
  };
});

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Component: AddItemModal', () => {
  it('should render correctly', () => {
    const titleText = 'Добавить товар в корзину';
    const initiaState = {isModal: true} as Partial<State>;
    const card = makeFakeDeviceCard();
    const handler = vi.fn();

    const { withStoreComponent } = withStore(<AddItemModal currentCard={card} onListItemAdd={handler}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('closed modal when click close button', async() => {
    const dispatch = vi.fn();
    const handler = vi.fn();
    const setModal = vi.spyOn(actions, 'setIsModal');

    const initialState = {isModal: true} as Partial<State>;
    mockedDispatch.mockReturnValue(dispatch);

    const card = makeFakeDeviceCard();
    const closeButton = 'closeButtonElement';

    const { withStoreComponent } = withStore(<AddItemModal currentCard={card} onListItemAdd={handler}/>, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(closeButton));

    expect(dispatch). toHaveBeenCalledTimes(1);
    expect(setModal). toHaveBeenCalledWith(false);
  });

  it('closed modal "Добавить в корзину", open modal "Товар успешно добавлен в корзину", when click add button', async() => {
    const addButton = 'addButtonElement';
    const card = makeFakeDeviceCard();

    const savedCard = {
      [card.id]:{
        card: card,
        countDevice: 1,
        basket: false,
      }
    };

    const initialState = {isModal: true} as Partial<State>;
    const handler = vi.fn();
    const setModal = vi.spyOn(actions, 'setIsModal');
    const setSuccessModal = vi.spyOn(actions, 'setIsSuccessModal');
    const saveGoods = vi.spyOn(localStorage, 'saveBasket');

    const { withStoreComponent } = withStore(<AddItemModal currentCard={card} onListItemAdd={handler}/>, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(addButton));

    expect(handler).toHaveBeenCalledTimes(1);
    expect(setModal).toHaveBeenCalledWith(false);
    expect(setSuccessModal).toHaveBeenCalledWith(true);
    expect(saveGoods).toHaveBeenCalledWith([savedCard]);
  });

});
