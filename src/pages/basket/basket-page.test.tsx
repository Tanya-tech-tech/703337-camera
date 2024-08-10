import { render, screen } from '@testing-library/react';
import BasketPage from './basket-page';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import * as reactHooks from 'react';
import React from 'react';

vi.mock('react', async () => {
  const actual :typeof React = await vi.importActual('react') ;
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
      console.log('teszzz');
      effect();
    });

    const { withStoreComponent } = withStore(<BasketPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('all goods have been removed, when click submit button', () => {});
});
