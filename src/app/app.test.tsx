import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../const/const';
import App from './app';
import { State } from '../types/state';
import { withHistory, withStore } from '../utils/mock-component';
import { makeFakeStore, makeFakeDeviceCard, makeFakeReview } from '../utils/mocks';

const scrollToSpy = vi.fn();
window.scrollTo = scrollToSpy;

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  let withHistoryComponent: React.ReactElement;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    withHistoryComponent = withHistory(<App />, mockHistory);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('route "/"', () => {
    it('should render the <LoadingScreen /> when the goods have not loaded yet', () => {
      const initiaState = {isGoodsDataLoading: true,} as Partial<State>;
      const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(initiaState));
      mockHistory.push(AppRoute.Root);

      render(withStoreComponent);

      expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
    });
    it('should render "MainPage" when user navigate to "/"', () => {
      const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
      mockHistory.push(AppRoute.Root);

      render(withStoreComponent);

      expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    });
  });

  describe('route "/camera/:id"', () => {
    it('should render the <LoadingScreen /> when the goods have not loaded yet', () => {
      const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
      mockHistory.push(AppRoute.Camera);

      render(withStoreComponent);

      expect(screen.getByText(/Загружаем предложение/i)).toBeInTheDocument();
    });
    it('should render "DevicePage" when user navigate to "/camera/: id"', () => {
      const device = makeFakeDeviceCard();
      const reviewArr = Array.from({length:3}, makeFakeReview);
      const initiaState = {currentDevice: device, currentReviews: reviewArr, reviews: reviewArr,} as Partial<State>;

      const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore(initiaState));
      mockHistory.push(AppRoute.Camera);

      render(withStoreComponent);

      expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
      expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
      expect(screen.getByText(/Описание/i)).toBeInTheDocument();
      expect(screen.getByText(`${device.description}`)).toBeInTheDocument();

    });
  });
});
