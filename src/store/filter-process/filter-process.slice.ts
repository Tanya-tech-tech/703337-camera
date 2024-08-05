import { NameSpace } from '../../const/const';
import { createSlice } from '@reduxjs/toolkit';
import { FilterProcess } from '../../types/state';
import { GoodsType } from '../../const/const';
import { FilterPrice } from '../../types/filter';
import { DeviceCategory } from '../../types/device';

const initialState: FilterProcess = {
  filterCategory: null,
  filterType: [],
  filterLevel: [],
  filterPrice: [],
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.filterPrice = Object.values(action.payload as FilterPrice);
    },
    setCategory: (state, action) => {
      state.filterCategory = action.payload as DeviceCategory;
    },
    setType: (state, action) => {
      state.filterType = [...state.filterType, action.payload as string];
    },
    removeType: (state, action) => {
      state.filterType = [...state.filterType].filter((it) => it !== action.payload);
    },
    removeAllType: (state) => {
      state.filterType = [...state.filterType].filter((it) => it === undefined);
    },
    removeLevel: (state, action) => {
      state.filterLevel = [...state.filterLevel].filter((it) => it !== action.payload);
    },
    removeAllLevel: (state) => {
      state.filterLevel = [...state.filterLevel].filter((it) => it === undefined);
    },
    removeFilmType: (state) => {
      state.filterType = [...state.filterType].filter((it) => it !== GoodsType.Snapshot && it !== GoodsType.Film);
    },
    setLevel: (state, action) => {
      state.filterLevel = [...state.filterLevel, action.payload as string];
    },
  }
});

export const {setCategory, setPrice, setType, setLevel, removeFilmType, removeType, removeAllType, removeLevel, removeAllLevel} = filterProcess.actions;


