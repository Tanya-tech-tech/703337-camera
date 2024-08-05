import { render, screen } from '@testing-library/react';
import SearchForm from './form-search';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeDeviceCard } from '../../utils/mocks';
import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import userEvent from '@testing-library/user-event';
import * as reduxHooks from 'react-redux';
import { useSelector } from 'react-redux';
import * as func from '../../utils/utils';
import React from 'react';

vi.mock('react-redux', async () => {
  const actual :typeof React = await vi.importActual('react-redux') ;
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});
vi.mock('../../utils/utils');
const mockSimilar = vi.spyOn(func, 'getSimilarCard');

const mockedFunc = vi.spyOn(reduxHooks, 'useSelector');

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const expectedText = 'Сбросить поиск';
    const goods = [makeFakeDeviceCard(), makeFakeDeviceCard()];
    const initiaState = {
      [NameSpace.Data]: {
        goods: goods,
      },
    } as Partial<State>;
    const { withStoreComponent } = withStore(<SearchForm/>, makeFakeStore(initiaState));

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when user enter name of device and click \'tab\'', async() => {
    const goods = [makeFakeDeviceCard(), makeFakeDeviceCard()];
    const inputElementTestId = 'inputElement';
    const formElementTestId = 'formElement';
    const linkElementTestId = 'linkElement';
    const expectedValue = goods[0].name;
    mockedFunc.mockReturnValue(goods);
    mockSimilar.mockReturnValue([goods[0]]);

    const { withStoreComponent} = withStore(<SearchForm/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(formElementTestId)).not.toHaveClass('list-opened');

    await userEvent.type(
      screen.getByTestId(inputElementTestId),
      expectedValue,
    );
    expect(screen.getByTestId(formElementTestId)).toHaveClass('list-opened');
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
    expect(useSelector).toHaveBeenCalled();
    expect(await screen.findByText(expectedValue)).toBeVisible();

    await userEvent.tab();
    expect(screen.getByTestId(linkElementTestId)).toHaveFocus();

  });
});
