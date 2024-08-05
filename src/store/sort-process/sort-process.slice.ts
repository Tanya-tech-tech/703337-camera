import { createSlice } from '@reduxjs/toolkit';
import { CardType } from '../../types/card';
import { NameSpace } from '../../const/const';
import { SortOrder } from '../../const/const';
import { SortProcess } from '../../types/state';

const initialState: SortProcess = {
  sortType: 'price',
  sortOrder: SortOrder.LowToHigh,
};

export const sortProcess = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload as keyof CardType;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload as SortOrder;
    },
  }
});

export const {setSortType, setSortOrder} = sortProcess.actions;


