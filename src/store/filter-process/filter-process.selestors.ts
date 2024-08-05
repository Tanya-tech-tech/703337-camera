import { State } from '../../types/state';
import { NameSpace } from '../../const/const';
import { DeviceCategory } from '../../types/device';
import { getGoodsState } from '../goods-data/goods-data.selectors';
import { CardsType } from '../../types/card';
import { createSelector } from '@reduxjs/toolkit';

export const getFilterCategoryState = (state : Pick<State, NameSpace.Filter>) : DeviceCategory | null => state[NameSpace.Filter].filterCategory;
export const getFilterType = (state : Pick<State, NameSpace.Filter>) : string[] => state[NameSpace.Filter].filterType;
export const getFilterLevel = (state : Pick<State, NameSpace.Filter>) : string[] => state[NameSpace.Filter].filterLevel;
export const getFilterPrice = (state : Pick<State, NameSpace.Filter>) : string[] => state[NameSpace.Filter].filterPrice;

export const getFilteredGoodsState = createSelector(
  [getGoodsState, getFilterCategoryState, getFilterType, getFilterLevel, getFilterPrice],
  (goods, filterCategory, filterType, filterLevel, filterPrice) : CardsType => {
    const countType = filterType.length;
    const countLevel = filterLevel.length;
    const countPrice = filterPrice.length;
    const newFilterPrice = filterPrice.map((it) => Number(it));
    let filter : CardsType = [];

    if(countPrice === 0 && countLevel === 0 && countType === 0 && filterCategory === null){
      filter = goods;
    } else if(countLevel === 0 && countType === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(newFilterPrice[1] === 0 && countType === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && filterLevel.includes(it.level)
      );
    } else if(newFilterPrice[1] === 0 && countLevel === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && filterType.includes(it.type)
      );
    } else if(newFilterPrice[1] === 0 && countLevel === 0 && countType === 0){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && it.category === filterCategory
      );
    } else if(newFilterPrice[1] === 0 && countType === 0){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && it.category === filterCategory && filterLevel.includes(it.level)
      );
    } else if(newFilterPrice[1] === 0 && countLevel === 0){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && it.category === filterCategory && filterType.includes(it.type)
      );
    } else if(newFilterPrice[1] === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => it.price >= newFilterPrice[0] && filterLevel.includes(it.level) && filterType.includes(it.type)
      );
    } else if(countType === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0] && filterLevel.includes(it.level)
      );
    } else if(countLevel === 0 && filterCategory === null){
      filter = goods.filter(
        (it) => filterType.includes(it.type) && it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(countLevel === 0 && countType === 0){
      filter = goods.filter(
        (it) => it.category === filterCategory && it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(countType === 0){
      filter = goods.filter(
        (it) => filterLevel.includes(it.level) && it.category === filterCategory && it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(countLevel === 0){
      filter = goods.filter(
        (it) => filterType.includes(it.type) && it.category === filterCategory && it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(filterCategory === null){
      filter = goods.filter(
        (it) => filterType.includes(it.type) && filterLevel.includes(it.level) && it.price <= newFilterPrice[1] && it.price >= newFilterPrice[0]
      );
    } else if(newFilterPrice[1] === 0){
      filter = goods.filter(
        (it) => filterType.includes(it.type) && filterLevel.includes(it.level) && it.category === filterCategory
      );
    } else {
      filter = goods.filter(
        (it) => filterType.includes(it.type) && filterLevel.includes(it.level) && it.category === filterCategory && newFilterPrice[0] <= it.price && newFilterPrice[1] >= it.price
      );
    }

    return filter;
  }
);

