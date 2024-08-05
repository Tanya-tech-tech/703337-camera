import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSuccessModal from './add-success-modal';
import { makeFakeStore } from '../../utils/mocks';
import { withStore, withHistory } from '../../utils/mock-component';
import { State } from '../../types/state';
import * as routerHooks from 'react-router-dom';
import React from 'react';
import * as actions from '../../store/goods-data/goods-data.slice';
import { AppRoute } from '../../const/const';

vi.mock('react-router-dom', async () => {
  const actual :typeof React = await vi.importActual('react-router-dom') ;
  return {
    ...actual,
  };
});

const mockedUseNavigate = vi.spyOn(routerHooks, 'useNavigate');

describe('Component: AddSuccessModal', () => {
  it('should render correctly', () => {
    const titleText = 'Товар успешно добавлен в корзину';
    const initiaState = {isSuccessModal: true} as Partial<State>;

    const { withStoreComponent } = withStore(<AddSuccessModal />, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('closed modal when click close button', async() => {
    const setSuccessModal = vi.spyOn(actions, 'setIsSuccessModal');
    const initialState = {isSuccessModal: true} as Partial<State>;
    const closeButton = 'closeButtonElement';

    const { withStoreComponent } = withStore(<AddSuccessModal />, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(closeButton));
    expect(setSuccessModal). toHaveBeenCalledWith(false);
  });

  it('closed modal, redirect to basket page, when click button "Перейти в корзину"', async() => {
    const basketButton = 'basketButtonElement';
    const setSuccessModal = vi.spyOn(actions, 'setIsSuccessModal');
    const initialState = {isSuccessModal: true} as Partial<State>;
    const navigate = vi.fn();
    mockedUseNavigate.mockReturnValue(navigate);

    const { withStoreComponent } = withStore(<AddSuccessModal />, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(basketButton));

    expect(setSuccessModal). toHaveBeenCalledWith(false);
    expect(navigate).toHaveBeenCalledWith(AppRoute.Basket);
  });
});

