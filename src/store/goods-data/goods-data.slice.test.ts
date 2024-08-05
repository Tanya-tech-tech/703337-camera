import { makeFakeDeviceCard, makeFakeReview } from '../../utils/mocks';
import { fetchGoodsAction, fetchDeviceAction, fetchReviewsAction } from '../api-actions';
import { goodsData, setCurrentReviews, setError, setIsModal, setIsDeviceLoad } from './goods-data.slice';
import { GoodsData } from '../../types/state';


const initialState : GoodsData = {
  goods: [],
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
};

describe('GoodsData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      goods: [makeFakeDeviceCard()],
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
    };

    const result = goodsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState };

    const result = goodsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should  set error with "setError" action', () => {

    const expectedState = {...initialState, error: 'Ошибка!!!',};

    const result = goodsData.reducer(initialState, setError('Ошибка!!!'));

    expect(result).toEqual(expectedState);
  });


  it('should set new current reviews with "setCurrentReviews" action', () => {

    const newReviews = Array.from({length: 3}, makeFakeReview);

    const expectedReviews = newReviews;

    const result = goodsData.reducer({...initialState}, setCurrentReviews(newReviews));

    expect(result.currentReviews).toBe(expectedReviews);
  });

  it('should set modal state with "setIsModal" action', () => {
    const card = makeFakeDeviceCard();

    const expectedIsModal = true;

    const result = goodsData.reducer({...initialState, goods:[card]}, setIsModal(true));

    expect(result.isModal).toBe(expectedIsModal);
  });

  it('should set modal state with "setIsDeviceLoad" action', () => {
    const card = makeFakeDeviceCard();

    const expectedIsDeviceLoad = true;

    const result = goodsData.reducer({...initialState, goods:[card]}, setIsDeviceLoad(true));

    expect(result.isDeviceLoading).toBe(expectedIsDeviceLoad);
  });

  it('should set "isGoodsDataLoading" to "true", "error" to "null" with "fetchGoodsAction.pending"', () => {
    const expectedState = {...initialState, isGoodsDataLoading: true};

    const result = goodsData.reducer(undefined, fetchGoodsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "goods" to array with devices, "isGoodsDataLoading" to "false" with "fetchGoodsAction.fulfilled"', () => {
    const mockGoods = makeFakeDeviceCard();
    const expectedState = {...initialState, goods: [mockGoods]};

    const result = goodsData.reducer(undefined, fetchGoodsAction.fulfilled(
      [mockGoods], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isGoodsDataLoading" to "true", "error" to "Что-то пошло не так))). Сервер не отвечает" with "fetchGoodsAction.rejected', () => {
    const expectedState = {...initialState, isGoodsDataLoading: true, error: 'Что-то пошло не так))). Сервер не отвечает'};

    const result = goodsData.reducer(
      undefined,
      fetchGoodsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isDeviceLoading" to "true",  with "fetchDeviceAction.pending"', () => {
    const expectedState = {
      ...initialState, isDeviceLoading: true
    };

    const result = goodsData.reducer(undefined, fetchDeviceAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "currentDevice" to object with device, isDeviceLoading: false, with "fetchDeviceAction.fulfilled"', () => {
    const mockGoods = makeFakeDeviceCard();
    const expectedState = {...initialState, goods: [mockGoods], currentDevice: mockGoods, isDeviceLoading: false};

    const result = goodsData.reducer({...initialState, goods: [mockGoods],}, {
      type: fetchDeviceAction.fulfilled.type,
      payload: mockGoods,
    }
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isDeviceLoading" to "true", with "fetchReviewsAction.pending"', () => {
    const expectedState = {
      ...initialState, isReviewsLoading: true,
    };

    const result = goodsData.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "currentReviews" and "reviews" to array with device, "isReviewsLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const mockReviews = Array.from({length: 9}, makeFakeReview);
    const expectedState = {...initialState, reviews: [mockReviews], currentReviews: [mockReviews], isReviewsLoading: false,};

    const result = goodsData.reducer({...initialState}, {
      type: fetchReviewsAction.fulfilled.type,
      payload: [mockReviews],
    }
    );

    expect(result).toEqual(expectedState);
  });

});

