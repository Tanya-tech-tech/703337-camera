import { State } from '../../types/state';
import { NameSpace } from '../../const/const';
import { CardsType, CardType } from '../../types/card';
import { ReviewsType } from '../../types/reviews';


export const getErrorState = (state : Pick<State, NameSpace.Data>) => state[NameSpace.Data].error;
export const getGoodsState = (state : Pick<State, NameSpace.Data>) : CardsType => state[NameSpace.Data].goods;
export const getGoodsBasketState = (state : Pick<State, NameSpace.Data>) : CardsType => state[NameSpace.Data].goodsBasket;

export const getDeviceState = (state : Pick<State, NameSpace.Data>) : CardType | null => state[NameSpace.Data].currentDevice;
export const getReviewsState = (state : State) : ReviewsType | null => state[NameSpace.Data].reviews;
export const getCurrentReviewsState = (state : State) : ReviewsType | null => state[NameSpace.Data].currentReviews;
export const getIsModalState = (state : State) : boolean => state[NameSpace.Data].isModal;
export const getIsSuccessModalState = (state : State) : boolean => state[NameSpace.Data].isSuccessModal;
export const getIsRemoveModalState = (state : State) : boolean => state[NameSpace.Data].isRemoveModal;
export const getIsDeviceLoadingState = (state : State) : boolean => state[NameSpace.Data].isDeviceLoading;
export const getIsReviewsLoadingState = (state : State) : boolean => state[NameSpace.Data].isReviewsLoading;
export const getIsGoodsLoadingState = (state : Pick<State, NameSpace.Data>) : boolean => state[NameSpace.Data].isGoodsDataLoading;
export const getIsSendingState = (state : Pick<State, NameSpace.Data>) : boolean => state[NameSpace.Data].isOrderSending;
export const getIsSuccessPurchaseModalState = (state : Pick<State, NameSpace.Data>) : boolean => state[NameSpace.Data].isSuccessPurchase;

