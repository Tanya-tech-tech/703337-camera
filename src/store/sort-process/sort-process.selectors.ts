import { NameSpace, SortOrder } from '../../const/const';
import { State } from '../../types/state';
import { CardType, CardsType } from '../../types/card';
import { createSelector } from '@reduxjs/toolkit';
import { sortLowToHigh, sortObj } from '../../utils/utils';
import { getGoodsState } from '../goods-data/goods-data.selectors';
import { getFilteredGoodsState } from '../filter-process/filter-process.selestors';

export const getSortTypeState = (state : Pick<State, NameSpace.Sort>) : keyof CardType => state[NameSpace.Sort].sortType;
export const getSortOrderState = (state : Pick<State, NameSpace.Sort>) : SortOrder => state[NameSpace.Sort].sortOrder;

export const getInitialSortState = createSelector(
  [getGoodsState],
  (goods) : CardsType => [...goods].sort(sortLowToHigh('price'))
);

export const getSortLowToHighFilteredGoods = createSelector(
  [getFilteredGoodsState],
  (filteredGoods) : CardsType => [...filteredGoods].sort(sortLowToHigh('price'))
);

export const getSortedGoodsState = createSelector(
  [getFilteredGoodsState, getSortTypeState, getSortOrderState], (filteredGoods, sortType, sortOrder) => sortObj(sortOrder, filteredGoods, sortType)
);


