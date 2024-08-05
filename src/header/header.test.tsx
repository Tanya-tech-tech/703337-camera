import { render, screen } from '@testing-library/react';
import { NameSpace } from '../const/const';
import Header from './header';
import { withHistory } from '../utils/mock-component';
import { withStore } from '../utils/mock-component';
import { makeFakeDeviceCard, makeFakeStore } from '../utils/mocks';
import { State } from '../types/state';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const goods = [makeFakeDeviceCard(), makeFakeDeviceCard()];
    const initiaState = {
      [NameSpace.Data]: {
        goods: goods,
      },
    } as Partial<State>;
    const expectedText = 'Каталог';

    const { withStoreComponent } = withStore(<Header/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

