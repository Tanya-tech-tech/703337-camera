import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { goodsData } from './goods-data/goods-data.slice';
import { sortProcess } from './sort-process/sort-process.slice';
import { filterProcess } from './filter-process/filter-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: goodsData.reducer,
  [NameSpace.Sort]: sortProcess.reducer,
  [NameSpace.Filter]: filterProcess.reducer,
});

