import MainPage from './main';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeDeviceCard, makeFakeStore } from '../../utils/mocks';
import { State } from '../../types/state';


describe('Component: component MainPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const device = makeFakeDeviceCard();
    const initialState = {
      goods: [device],
      currentDevice: device,
    } as Partial<State>;

    const { withStoreComponent } = withStore(<MainPage/>, makeFakeStore(initialState));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

