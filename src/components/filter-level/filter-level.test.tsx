import FilterLevel from './filter-level';
import { render, screen } from '@testing-library/react';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore, makeFakeDeviceCard } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as reactHooks from 'react';
import * as reduxHooks from 'react-redux';
import * as levelAction from '../../store/filter-process/filter-process.slice';
import * as sortSelectors from '../../store/sort-process/sort-process.selectors';

vi.mock('react-redux', async () => {
  const actual :typeof React = await vi.importActual('react-redux') ;
  return {
    ...actual,
  };
});

vi.mock('react', async () => {
  const actual :typeof React = await vi.importActual('react') ;
  return {
    ...actual,

  };
});

vi.mock('./filter-level', async () => {
  const actual :typeof React = await vi.importActual('./filter-level') ;
  return {
    ...actual,

  };
});

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');
const mockedSelector = vi.spyOn(sortSelectors, 'getInitialSortState');

describe('Component: FilterLevel', () => {
  it('should render correctly', () => {
    const level = 'zero';
    const levelText = 'Нулевой';

    const { withStoreComponent } = withStore(<FilterLevel level={level}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(levelText)).toBeInTheDocument();
  });

  it('when the user click  \'Нулевой\' set level and called dispatch(setLevel, setPrice)', async() => {
    const dispatch = vi.fn();
    const level = 'zero';
    const setLevelAct = vi.spyOn(levelAction, 'setLevel');
    const setPriceAct = vi.spyOn(levelAction, 'setPrice');

    const inputLevelElementTestId = 'inputLevelElement';
    const { withStoreComponent } = withStore(<FilterLevel level={level}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    mockedDispatch.mockReturnValue(dispatch);
    mockedSelector.mockReturnValue([makeFakeDeviceCard(), makeFakeDeviceCard()]);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(inputLevelElementTestId));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setLevelAct).toBeCalledTimes(1);
    expect(setPriceAct).toBeCalledTimes(1);
  });

  it('Changing level should change state', async() => {
    const level = 'nonprofessional';
    const levelText = 'Любительский';

    const inputLevelElementTestId = 'inputLevelElement';
    const { withStoreComponent } = withStore(<FilterLevel level={level}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    const { rerender } = render(preparedComponent);
    await userEvent.click(screen.getByTestId(inputLevelElementTestId));

    rerender(preparedComponent);

    expect(screen.getByText(levelText)).toBeInTheDocument();
    expect(screen.getByTestId(inputLevelElementTestId)).toBeChecked();

  });

  it('Changing level should call setState of react', async() => {
    const level = 'nonprofessional';
    const setData = vi.fn();
    vi.spyOn(reactHooks, 'useState').mockImplementation((state? : string) => [state, setData]);
    const inputLevelElementTestId = 'inputLevelElement';
    const { withStoreComponent } = withStore(<FilterLevel level={level}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(inputLevelElementTestId));

    expect(reactHooks.useState).toBeCalled();
    expect(setData).toBeCalledTimes(1);
  });

});

