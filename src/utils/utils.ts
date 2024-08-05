import { Dispatch, SetStateAction } from 'react';
import { COMMENT_COUNT, SortOrder } from '../const/const';
import { ReviewsType } from '../types/reviews';
import { CardsType, CardType } from '../types/card';

type CallbackType = Dispatch<SetStateAction<ReviewsType | null>>;

export const getArrayNextComments = (arr : ReviewsType | null, cb? : CallbackType) => {
  if(arr === null){
    return () => null;
  }

  const arrayComments = [...arr];
  const nextComments : ReviewsType = [];
  const index = 0;

  return () => {

    let i = 0;
    while(i < COMMENT_COUNT && arrayComments[i] !== undefined){
      nextComments[i] = arrayComments[i] ;
      i++;
    }
    arrayComments.splice(index, COMMENT_COUNT);

    if(cb === undefined){
      return nextComments;
    } else{
      cb((prev : ReviewsType | null) => [...prev as [],...nextComments]);
      return arrayComments;
    }

  };
};

export const isEscapeKey = (evt : KeyboardEvent) => evt.key === 'Escape';

export const isEnterKey = (evt : KeyboardEvent) => evt.key === 'Enter';

export const isArrowUpKey = (evt : KeyboardEvent) => evt.key === 'ArrowUp';

export const isArrowDownKey = (evt : KeyboardEvent) => evt.key === 'ArrowDown';

export const getCurrentCard = (arr: CardsType, listItemCardId : number) => arr.find((item) => item.id === listItemCardId);

export const getSimilarCard = (arr : CardsType = [], deviceName = '') => {
  const similarCards : CardsType = [... arr].filter((it) => !!deviceName && deviceName.length ? it.name.includes(deviceName) : false);
  return similarCards;
};

export const sortLowToHigh = (c : keyof CardType) =>
  (a : CardType, b : CardType) => {
    if (a[c] > b[c]) {
      return 1;
    }

    if (a[c] < b[c]) {
      return -1;
    }

    return 0;
  };

export const sortHighToLow = (c : keyof CardType) =>
  (a : CardType, b : CardType) => {
    if (b[c] > a[c]) {
      return 1;
    }

    if (b[c] < a[c]) {
      return -1;
    }

    return 0;
  };

export const sortObj = (sortOrder: string, sortArray : CardsType, c : keyof CardType) => {

  switch (sortOrder) {
    case SortOrder.LowToHigh:
      return [...sortArray].sort(sortLowToHigh(c));
      break;
    case SortOrder.HighToLow:
      return [...sortArray].sort(sortHighToLow(c));
      break;
    default:
      return sortArray;
  }
};

export const getUpperCaseFirstLetter = (str : string) => [...str].map((char, index) =>
  index === 0 ? char.toUpperCase() : char).join('');

export const getTotalPrice = (amt: number, price: number) => amt * price;

export const getSummary = (a : number, b : number) => a - b;

export const getDiscount = (count: number, totalSumm : number) => {
  let summaryDiscount = 0;
  if(totalSumm < 10000){
    if(count === 2){
      summaryDiscount = Math.round(totalSumm / 100 * 3);
    } else if(count >= 3 && count <= 5){
      summaryDiscount = Math.round(totalSumm / 100 * 5);
    } else if(count >= 6 && count <= 10){
      summaryDiscount = Math.round(totalSumm / 100 * 10);
    } else if(count > 10){
      summaryDiscount = Math.round(totalSumm / 100 * 15);
    }
  } else if(totalSumm >= 10000 && totalSumm < 20000){
    if(count === 2){
      summaryDiscount = Math.round(totalSumm / 100 * (3 - 1));
    } else if(count >= 3 && count <= 5){
      summaryDiscount = Math.round(totalSumm / 100 * (5 - 1));
    } else if(count >= 6 && count <= 10){
      summaryDiscount = Math.round(totalSumm / 100 * (10 - 1));
    } else if(count > 10){
      summaryDiscount = Math.round(totalSumm / 100 * (15 - 1));
    }
  } else if(totalSumm >= 20000 && totalSumm <= 30000){
    if(count === 2){
      summaryDiscount = Math.round(totalSumm / 100 * (3 - 2));
    } else if(count >= 3 && count <= 5){
      summaryDiscount = Math.round(totalSumm / 100 * (5 - 2));
    } else if(count >= 6 && count <= 10){
      summaryDiscount = Math.round(totalSumm / 100 * (10 - 2));
    } else if(count > 10){
      summaryDiscount = Math.round(totalSumm / 100 * (15 - 2));
    }
  } else if(totalSumm > 30000){
    if(count === 2){
      summaryDiscount = Math.round(totalSumm / 100 * (3 - 3));
    } else if(count >= 3 && count <= 5){
      summaryDiscount = Math.round(totalSumm / 100 * (5 - 3));
    } else if(count >= 6 && count <= 10){
      summaryDiscount = Math.round(totalSumm / 100 * (10 - 3));
    } else if(count > 10){
      summaryDiscount = Math.round(totalSumm / 100 * (15 - 3));
    }
  }


  return summaryDiscount;
};
