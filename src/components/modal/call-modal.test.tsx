import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore, withHistory } from '../../utils/mock-component';
import CallModal from './call-modal';
import { makeFakeStore, makeFakeDeviceCard } from '../../utils/mocks';
import { State } from '../../types/state';
import * as reduxHooks from 'react-redux';
import * as actions from '../../store/goods-data/goods-data.slice';
import React from 'react';

vi.mock('react-redux', async () => {
  const actual :typeof React = await vi.importActual('react-redux') ;
  return {
    ...actual,
  };
});

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Component: CallModal', () => {
  it('should render correctly', () => {
    const titleText = 'Свяжитесь со мной';
    const telText = 'Телефон';
    const initiaState = {isModal: true} as Partial<State>;
    const card = makeFakeDeviceCard();

    const { withStoreComponent } = withStore(<CallModal currentCard={card}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(telText)).toBeInTheDocument();

  });

  it('should render correctly when user enter telephone', async () => {
    const telElementTestId = 'telElement';
    const expectedTelValue = '+79528145621';
    const initiaState = {isModal: true} as Partial<State>;
    const card = makeFakeDeviceCard();

    const { withStoreComponent } = withStore(<CallModal currentCard={card}/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(telElementTestId),
      expectedTelValue,
    );

    expect(screen.getByDisplayValue(expectedTelValue)).toBeInTheDocument();
  });

  it('closed modal when click close button', async() => {
    const dispatch = vi.fn();
    const setModal = vi.spyOn(actions, 'setIsModal');

    const initialState = {isModal: true} as Partial<State>;
    mockedDispatch.mockReturnValue(dispatch);

    const card = makeFakeDeviceCard();
    const closeButton = 'closeButtonElement';

    const { withStoreComponent } = withStore(<CallModal currentCard={card}/>, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(closeButton));

    expect(dispatch). toHaveBeenCalledTimes(1);
    expect(setModal). toHaveBeenCalledWith(false);
  });

});
