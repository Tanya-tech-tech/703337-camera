import {datatype, finance, commerce, lorem, image, internet} from 'faker';
import { SortOrder } from '../const/const';
import { CardType } from '../types/card';
import { ReviewType } from '../types/reviews';
import { GoodsLevel } from '../const/const';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { DeviceCategory } from '../types/device';


export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeDeviceCard = (): CardType => ({
  id: datatype.number(),
  name: lorem.words(1),
  vendorCode: finance.bic(),
  type: commerce.department(),
  category: commerce.product(),
  description: lorem.paragraph(2),
  level: commerce.productAdjective() as GoodsLevel,
  price: datatype.number({ min: 1000, max: 20000 }),
  rating: datatype.number({ min: 1, max: 5}),
  reviewCount: datatype.number({ min: 0}),
  previewImg: image.imageUrl(200, 200),
  previewImg2x: image.imageUrl(200, 200),
  previewImgWebp: image.imageUrl(200, 200),
  previewImgWebp2x: image.imageUrl(200, 200),
} as CardType);

export const makeFakeReview = (): ReviewType => ({
  id: datatype.uuid(),
  createAt: String(datatype.datetime()),
  cameraId: datatype.number({ min: 1, max: 115}),
  userName: internet.userName(),
  advantage: lorem.paragraph(2),
  disadvantage: lorem.paragraph(2),
  review: lorem.paragraph(3),
  rating: datatype.number({ min: 1, max: 5}),
});

export const makeFakeCategory = (): DeviceCategory => commerce.product() as DeviceCategory;

export const makeFakeType = () => commerce.department();

export const makeFakePrice = () => datatype.number({ min: 1000, max: 200000 });

export const makeFakeLevel = () => commerce.productAdjective();

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({

  DATA: {
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
    ...initialState ?? {}
  },
  SORT:{
    sortType: 'price',
    sortOrder: SortOrder.LowToHigh,
  },
  FILTER: {
    filterCategory: null,
    filterType: [],
    filterLevel: [],
    filterPrice: [],
  }

});

export const makeFakeUser = () => ({
  camerasIds: [datatype.number({ min: 1, max: 20})],
  coupon: lorem.words(1),
});

export const makeFakeBasketCard = () =>({
  [datatype.number({ min: 1, max: 20})]: {
    card: makeFakeDeviceCard(),
    countDevice: datatype.number({ min: 2, max: 20}),
    basket: datatype.boolean(),
  }
});

