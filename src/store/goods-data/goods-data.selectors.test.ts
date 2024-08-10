import { NameSpace } from '../../const/const';
import { getGoodsState } from './goods-data.selectors';
import { makeFakeDeviceCard } from '../../utils/mocks';

describe('GoodsData selectors', () => {

  const mockArrayCard = Array.from({length: 5}, makeFakeDeviceCard);

  const state = {
    [NameSpace.Data]: {
      goods: mockArrayCard,
      goodsBasket: [],
      currentDevice: null,
      reviews: null,
      currentReviews: null,
      error: null,
      isModal: false,
      isSuccessModal: false,
      isRemoveModal: false,
      isGoodsDataLoading: false,
      isDeviceLoading: false,
      isReviewsLoading: false,
      isOrderSending: false,
      isSuccessPurchase: false,
    }
  };

  it('should return goods from state', () => {
    const { goods } = state[NameSpace.Data];
    const result = getGoodsState(state);
    expect(result).toEqual(goods);
  });
});

