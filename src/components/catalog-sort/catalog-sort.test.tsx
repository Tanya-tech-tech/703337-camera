import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../utils/mock-component';
import { State } from '../../types/state';
import { makeFakeStore, makeFakeDeviceCard } from '../../utils/mocks';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const goods = Array.from({length:3}, makeFakeDeviceCard);
    const initialState = {goods: goods} as Partial<State>;

    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore(initialState));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly  when user checked \'sortPrice\'', async() => {
    const sortPrice = 'по цене';
    const goods = Array.from({length:3}, makeFakeDeviceCard);
    const initialState = {goods: goods, sortType: 'rating'} as Partial<State>;

    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore(initialState));
    render(withStoreComponent);

    await userEvent.click(
      screen.getByText(sortPrice),
    );

    expect(screen.getByLabelText(sortPrice)).toBeChecked();
  });

  it('should render correctly  when user checked \'down\'', async() => {
    const sortDown = 'sortDownElement';
    const goods = Array.from({length:3}, makeFakeDeviceCard);
    const initialState = {goods: goods, sortType: 'rating', sortOrder: 'Up'} as Partial<State>;

    const { withStoreComponent } = withStore(<CatalogSort />, makeFakeStore(initialState));
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId(sortDown),
    );

    expect(screen.getByTestId(sortDown)).toBeChecked();
  });
});


