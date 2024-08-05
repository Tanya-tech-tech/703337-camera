import Filter from './filter-form';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import * as filterAction from '../../store/filter-process/filter-process.slice';
import { withHistory, withStore } from '../../utils/mock-component';
import * as reduxHooks from 'react-redux';
import * as sortSelectors from '../../store/sort-process/sort-process.selectors';
import * as filterSelectors from '../../store/filter-process/filter-process.selestors';
import React from 'react';
import userEvent from '@testing-library/user-event';


vi.mock('react-redux', async () => {
  const actual :typeof React = await vi.importActual('react-redux') ;
  return {
    ...actual,
  };
});

const mockedDispatch = vi.spyOn(reduxHooks, 'useDispatch');

describe('Component: Filter', () => {
  it('should render correctly', () => {
    const filterText = 'Сбросить фильтры';
    const { withStoreComponent } = withStore(<Filter />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(filterText)).toBeInTheDocument();
  });

  it('selectors\'getFilterCategoryState\', \'getSortLowToHighFilteredGoods\', \'getInitialSortState\' must be executed', () => {
    const sortUp = vi.spyOn(sortSelectors, 'getSortLowToHighFilteredGoods');
    const sortInitial = vi.spyOn(sortSelectors, 'getInitialSortState');
    const categoryFilter = vi.spyOn(filterSelectors, 'getFilterCategoryState');
    const { withStoreComponent } = withStore(<Filter />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);


    render(preparedComponent);

    expect(sortUp). toHaveBeenCalled();
    expect(sortInitial). toHaveBeenCalled();
    expect(categoryFilter). toHaveBeenCalled();
  });

  it('when the user click  \'Видеокамера\' set category and called dispatch(setCategory, removeFilmType)', async() => {

    const dispatch = vi.fn();
    const setCategoryAct = vi.spyOn(filterAction, 'setCategory');

    const inputVideoElementTestId = 'inputElement';
    const { withStoreComponent } = withStore(<Filter />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    mockedDispatch.mockReturnValue(dispatch);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId(inputVideoElementTestId));

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setCategoryAct).toBeCalled();
  });

  it('when the user click  \'Видеокамера\' input radio was checked', async() => {

    const inputVideoElementTestId = 'inputElement';
    const { withStoreComponent } = withStore(<Filter />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);
    vi.spyOn(filterSelectors, 'getFilterCategoryState').mockReturnValue('Видеокамера');

    const { rerender } = render(preparedComponent);
    await userEvent.click(screen.getByTestId(inputVideoElementTestId));

    rerender(preparedComponent);

    expect(screen.getByTestId(inputVideoElementTestId)).toBeChecked();
  });

});

