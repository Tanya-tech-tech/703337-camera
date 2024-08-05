import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '../const/const';
import { CardType, CardsType } from '../types/card';
import { UserData } from '../types/user-data';
import { ReviewsType } from '../types/reviews';
import { AppDispatch, State } from '../types/state';

export const fetchGoodsAction = createAsyncThunk<CardsType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchGoods',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<CardsType>(APIRoute.Goods);

    return data;
  },
);

export const fetchDeviceAction = createAsyncThunk<CardType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDevice',
  async (idDevice, {extra: api}) => {
    const id = String(idDevice);
    const {data} = await api.get<CardType>(`${APIRoute.Goods}/${id}`);

    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewsType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (idDevice, {extra: api}) => {
    const {data} = await api.get<ReviewsType>(`${APIRoute.Goods}/${idDevice}${APIRoute.Reviews}`);

    return data;
  },
);

export const orderAction = createAsyncThunk<void, UserData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/order',
  async ({camerasIds: id, coupon}, {extra: api}) => {
    await api.post(APIRoute.Order, {camerasIds: id, coupon: coupon});

  },
);

