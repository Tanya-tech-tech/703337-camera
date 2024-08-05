import RemoveItemModal from './remove-item-modal';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { State } from '../../types/state';
import { makeFakeStore, makeFakeBasketCard } from '../../utils/mocks';
import * as actions from '../../store/goods-data/goods-data.slice';
import * as localStorage from '../../services/order';
import React from 'react';
import * as routerHooks from 'react-router-dom';
import { AppRoute } from '../../const/const';

vi.mock('react-router-dom', async () => {
  const actual :typeof React = await vi.importActual('react-router-dom') ;
  return {
    ...actual,
  };
});

const mockedUseNavigate = vi.spyOn(routerHooks, 'useNavigate');

describe('Component: RemoveItemModal', () => {
  it('should render correctly', () => {
    const titleText = 'Удалить этот товар?';
    const handler = vi.fn();
    const basketCard = makeFakeBasketCard();
    const initiaState = {isRemoveModal: true} as Partial<State>;
    const { withStoreComponent } = withStore(<RemoveItemModal basketCard={basketCard} onDiscountChange={handler}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('closed modal when click close button', async() => {
    const handler = vi.fn();
    const setModal = vi.spyOn(actions, 'setIsRemoveModal');
    const basketCard = makeFakeBasketCard();
    const initiaState = {isRemoveModal: true} as Partial<State>;
    const closeButton = 'closeButtonElement';

    const { withStoreComponent } = withStore(<RemoveItemModal basketCard={basketCard} onDiscountChange={handler}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(closeButton));

    expect(setModal). toHaveBeenCalledWith(false);
  });

  it('closed modal, rerender basket page, redirect to catalog page, when click button "Удалить"', async() => {
    const handler = vi.fn();
    const setModal = vi.spyOn(actions, 'setIsRemoveModal');
    const basketCard = makeFakeBasketCard();
    const id = Object.keys(basketCard)[0];

    const deleteDevice = vi.spyOn(localStorage, 'deleteBasket').mockImplementation(() => {
      const newArr = [basketCard].filter((elem) =>{
        const idSearch = Object.keys(elem)[0];
        return idSearch !== id;
      });
      return newArr;
    });

    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);

    vi.spyOn(localStorage, 'getBasket').mockReturnValue([basketCard]);
    const initiaState = {isRemoveModal: true} as Partial<State>;
    const deleteButton = 'deleteButtonElement';

    const { withStoreComponent } = withStore(<RemoveItemModal basketCard={basketCard} onDiscountChange={handler}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(deleteButton));

    expect(setModal). toHaveBeenCalledWith(false);
    expect(deleteDevice).toBeCalledWith(id);
    expect(handler).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(AppRoute.Root);
  });
});

