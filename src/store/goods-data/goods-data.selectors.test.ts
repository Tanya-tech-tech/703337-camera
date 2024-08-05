import { NameSpace } from '../../const/const';
import { getGoodsState } from './goods-data.selectors';
import { makeFakeDeviceCard, makeFakeReview } from '../../utils/mocks';
import { CardType } from '../../types/card';
import { SortOrder } from '../../const/const';

describe('GoodsData selectors', () => {

  const mockArrayCard = Array.from({length: 5}, makeFakeDeviceCard);
  const mockArrayReview = Array.from({length: 6}, makeFakeReview);
  const mockArrayCurrentReview = Array.from({length: 3}, makeFakeReview);
  const mockCard = makeFakeDeviceCard();
  const state = {
    [NameSpace.Data]: {
      goods: mockArrayCard,
      sortType: 'price' as keyof CardType,
      sortOrder: SortOrder.LowToHigh,
      filterCategory: null,
      filterType: [],
      filterLevel: [],
      filterPrice: [],
      currentDevice: mockCard,
      reviews: mockArrayReview,
      currentReviews: mockArrayCurrentReview,
      error: '',
      isModal: false,
      isGoodsDataLoading: false,
      isDeviceLoading: false,
      isReviewsLoading: false,
    }
  };

  it('should return goods from state', () => {
    const { goods } = state[NameSpace.Data];
    const result = getGoodsState(state);
    expect(result).toEqual(goods);
  });
});

