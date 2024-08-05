import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { GoodsData } from '../../types/state';
import { fetchGoodsAction, fetchDeviceAction, fetchReviewsAction, orderAction } from '../api-actions';
import { ReviewsType } from '../../types/reviews';
import { CardType } from '../../types/card';

const initialState: GoodsData = {
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

export const goodsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload as string;
    },
    setDeviceBasket: (state, action) => {
      state.goodsBasket = [...state.goodsBasket, action.payload as CardType];
    },
    setCurrentReviews: (state, action) => {
      state.currentReviews = action.payload as ReviewsType;
    },
    setIsModal: (state, action) => {
      state.isModal = action.payload as boolean;
    },
    setIsSuccessModal: (state, action) => {
      state.isSuccessModal = action.payload as boolean;
    },
    setIsRemoveModal: (state, action) => {
      state.isRemoveModal = action.payload as boolean;
    },
    setIsDeviceLoad: (state, action) => {
      state.isDeviceLoading = action.payload as boolean;
    },
    setIsSending: (state, action) => {
      state.isOrderSending = action.payload as boolean;
    },
    setIsSuccessPurchase: (state, action) => {
      state.isSuccessPurchase = action.payload as boolean;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGoodsAction.pending, (state) => {
        state.isGoodsDataLoading = true;
      })
      .addCase(fetchGoodsAction.fulfilled, (state, action) => {
        state.isGoodsDataLoading = false;
        state.goods = action.payload;
      })
      .addCase(fetchGoodsAction.rejected, (state) => {
        state.isGoodsDataLoading = true;
        state.error = 'Что-то пошло не так))). Сервер не отвечает';
      })
      .addCase(fetchDeviceAction.pending, (state) => {
        state.isDeviceLoading = true;

      })
      .addCase(fetchDeviceAction.fulfilled, (state, action) => {
        state.currentDevice = action.payload;
        state.isDeviceLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;

      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
        state.currentReviews = action.payload;
      })
      .addCase(orderAction.pending, (state) => {
        state.isOrderSending = true;
      })
      .addCase(orderAction.fulfilled, (state) => {
        state.isOrderSending = false;
      });
  }
});

export const { setError, setCurrentReviews, setIsModal, setIsDeviceLoad, setIsSuccessModal, setDeviceBasket, setIsRemoveModal,
  setIsSending, setIsSuccessPurchase} = goodsData.actions;

