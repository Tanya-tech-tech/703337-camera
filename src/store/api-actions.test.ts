import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

import { Action } from 'redux';
import { makeFakeDeviceCard, makeFakeReview, AppThunkDispatch, extractActionsTypes, makeFakeUser } from '../utils/mocks';
import { State } from '../types/state';
import { fetchDeviceAction, fetchGoodsAction, fetchReviewsAction, orderAction } from './api-actions';
import { APIRoute } from '../const/const';


describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: {
      goods: [],
      currentDevice: null,
      reviews: null,
    }});
  });

  describe('fetchGoodsAction', () => {
    it('should dispatch "fetchGoodsAction.pending", "fetchGoodsAction.fulfilled", when server response 200', async() => {
      const mockGoods = [makeFakeDeviceCard(), makeFakeDeviceCard()];
      mockAxiosAdapter.onGet(APIRoute.Goods).reply(200, mockGoods);

      await store.dispatch(fetchGoodsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchGoodsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchGoodsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchGoodsAction.pending.type,
        fetchGoodsAction.fulfilled.type,
      ]);

      expect(fetchGoodsActionFulfilled.payload)
        .toEqual(mockGoods);
    });

    it('should dispatch "fetchGoodsAction.pending", "fetchGoodsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Goods).reply(400, []);

      await store.dispatch(fetchGoodsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchGoodsAction.pending.type,
        fetchGoodsAction.rejected.type,
      ]);
    });
  });

  describe('fetchDeviceAction', () => {
    it('should dispatch "fetchDeviceAction", "fetchDeviceAction.fulfilled", when server response 200', async() => {
      const mockDevice = makeFakeDeviceCard();
      const {id} = mockDevice;
      mockAxiosAdapter.onGet(`${APIRoute.Goods}/${id}`).reply(200, mockDevice);

      await store.dispatch(fetchDeviceAction(String(id)));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchDeviceActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchDeviceAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchDeviceAction.pending.type,
        fetchDeviceAction.fulfilled.type,
      ]);

      expect(fetchDeviceActionFulfilled.payload)
        .toEqual(mockDevice);
    });
    it('should dispatch "fetchDeviceAction.pending", "fetchDeviceAction.rejected" when server response 400', async () => {
      const id = 5;
      mockAxiosAdapter.onGet(`${APIRoute.Goods}/${id}`).reply(400, []);

      await store.dispatch(fetchDeviceAction(String(id)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchDeviceAction.pending.type,
        fetchDeviceAction.rejected.type,
      ]);
    });

  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      const mockReviews = [makeFakeReview(), makeFakeReview()];
      const mockDevice = makeFakeDeviceCard();
      const {id} = mockDevice;
      mockAxiosAdapter.onGet(`${APIRoute.Goods}/${id}${APIRoute.Reviews}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(String(id)));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const id = 5;
      mockAxiosAdapter.onGet(`${APIRoute.Goods}/${id}${APIRoute.Reviews}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(String(id)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('orderAction', () => {
    it('should dispatch "orderAction", "orderAction.fulfilled", when server response 201', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Order}`).reply(201);
      const fakeUser = makeFakeUser();
      await store.dispatch(orderAction(fakeUser));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        orderAction.pending.type,
        orderAction.fulfilled.type,
      ]);
    });

    it('should dispatch "orderAction", "orderAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Order}`).reply(400);
      const fakeUser = makeFakeUser();

      await store.dispatch(orderAction(fakeUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        orderAction.pending.type,
        orderAction.rejected.type,
      ]);
    });
  });

});
