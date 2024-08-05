import { render, screen } from '@testing-library/react';
import DevicePage from './device';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, makeFakeDeviceCard, makeFakeReview } from '../../utils/mocks';
import { State } from '../../types/state';

describe('Component: DevicePage', () => {

  it('should render the <LoadingScreen /> when the device have not loaded yet', () => {
    const initiaState = {isReviewsLoading: true} as Partial<State>;
    const withHistoryComponent = withHistory(<DevicePage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(initiaState));

    render(withStoreComponent);

    expect(screen.getByText(/Загружаем предложение/i)).toBeInTheDocument();
  });
  it('should render correctly', () => {
    const expectedText = 'Характеристики';
    const device = makeFakeDeviceCard();
    const review = makeFakeReview();

    const initiaState = {currentDevice: device, reviews: [review]} as Partial<State>;

    const { withStoreComponent } = withStore(<DevicePage/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

