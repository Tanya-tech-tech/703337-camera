import { render, screen } from '@testing-library/react';
import BasketPage from './basket-page';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, extractActionsTypes } from '../../utils/mocks';
import * as reactHooks from 'react';
import React from 'react';
import * as localStorage from '../../services/order';
import { makeFakeBasketCard } from '../../utils/mocks';
import * as actions from '../../store/goods-data/goods-data.slice';
import * as asyncAction from '../../store/api-actions';
import { orderAction } from '../../store/api-actions';
import { APIRoute } from '../../const/const';
import axios from 'axios';
import { UserData } from '../../types/user-data';
import { State, AppDispatch } from '../../types/state';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

vi.mock('react', async () => {
  const actual :typeof React = await vi.importActual('react') ;
  return {
    ...actual,
  };
});

vi.mock('axios', async () => {
  const actual :typeof axios = await vi.importActual('axios') ;
  return {
    ...actual,
  };
});

const mockedUseEffect = vi.spyOn(reactHooks, 'useEffect');

describe('Component: BasketPage', () => {
  it('should render correctly and button "Оформить заказ" disabled', () => {
    const titleText = 'Корзина';
    const disabledButton = 'Оформить заказ';
    const { withStoreComponent } = withStore(<BasketPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(disabledButton)).toBeDisabled();
  });

  it('"useEffect" was called', () => {
    const effect = vi.fn();
    mockedUseEffect.mockImplementation(() => {
      effect();
    });

    const { withStoreComponent } = withStore(<BasketPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('should action "orderAction" called, the server response type should be "user/order/rejected",  when click submit button', async() => {
    const isSending = vi.spyOn(actions, 'setIsSending');
    const submitButton = 'submitButtonElement';
    const fetchOrder = vi.spyOn(asyncAction, 'orderAction');
    const basketCard = makeFakeBasketCard();
    const arrayOrder = [Number(Object.keys(basketCard)[0])];

    const objRequest = {
      camerasIds: arrayOrder,
      coupon: 'camera-333'
    };

    vi.spyOn(localStorage, 'getBasket').mockReturnValue([basketCard]);

    const { withStoreComponent, mockStore } = withStore(<BasketPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(submitButton));

    const emittedActions = mockStore.getActions();
    const extractedActionsTypes = extractActionsTypes(emittedActions);

    expect(isSending). toHaveBeenCalledWith(false);
    expect(fetchOrder).toHaveBeenCalledWith(objRequest);
    expect(extractedActionsTypes).toEqual(expect.arrayContaining([orderAction.rejected.type]));
  });

  it('should action "orderAction" called, the server response type should be "user/order/fulfilled",  when click submit button', async() => {
    const basketCard = [makeFakeBasketCard()];
    const arrayOrder = [Number(Object.keys(basketCard)[0])];

    const { withStoreComponent, mockAxiosAdapter } = withStore(<BasketPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onPost(`${APIRoute.Order}`).reply(201);

    const isSuccessPurchase = vi.spyOn(actions, 'setIsSuccessPurchase');
    const submitButton = 'submitButtonElement';

    const fetchOrderFake = createAsyncThunk<void, UserData, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'user/order',
      async ({camerasIds: id, coupon}, {extra: api}) => {
        await api.post(APIRoute.Order, {camerasIds: id, coupon: coupon});
      },
    );

    const objRequest = {
      camerasIds: arrayOrder,
      coupon: 'camera-333'
    } as UserData;

    vi.spyOn(asyncAction, 'orderAction').mockImplementation(() => fetchOrderFake(objRequest));
    vi.spyOn(localStorage, 'getBasket').mockReturnValue(basketCard);
    const deletedAllGoods = vi.spyOn(localStorage, 'allDeleteBasket').mockReturnValue(void basketCard);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(submitButton));

    expect(deletedAllGoods). toHaveBeenCalled();
    expect(isSuccessPurchase).toHaveBeenCalled();
  });
});

