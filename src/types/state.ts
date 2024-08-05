import { CardsType, CardType } from './card';
import { ReviewsType } from './reviews';
import { store } from '../store';
import { SortOrder } from '../const/const';
import { DeviceCategory } from './device';

export type GoodsData = {
  goods: CardsType;
  goodsBasket: CardsType;
  currentDevice: CardType | null;
  reviews: ReviewsType | null;
  currentReviews: ReviewsType | null;
  error: string | null;
  isModal: boolean;
  isSuccessModal: boolean;
  isRemoveModal: boolean;
  isGoodsDataLoading: boolean;
  isDeviceLoading: boolean;
  isReviewsLoading: boolean;
  isOrderSending: boolean;
  isSuccessPurchase: boolean;
};

export type SortProcess = {
  sortType: keyof CardType;
  sortOrder: SortOrder;
};

export type FilterProcess = {
  filterCategory: DeviceCategory | null;
  filterType: string[];
  filterLevel: string[];
  filterPrice: string[];
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
