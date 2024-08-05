import { BasketCardsType } from '../types/basket';

const ORDER_NAME = 'goodsBasket';
export type Basket = string;

export const saveBasket = (basket: BasketCardsType): void => {
  localStorage.setItem(ORDER_NAME, JSON.stringify(basket));
};

export const getBasket = (): BasketCardsType => {
  const basketArray = JSON.parse(localStorage.getItem(ORDER_NAME) as string) as BasketCardsType;
  return basketArray;
};

export const deleteBasket = (idForDel : string) => {
  const array = getBasket();
  const newArr = array.filter((elem) =>{
    const idSearch = Object.keys(elem)[0];
    return idSearch !== idForDel;
  });
  saveBasket(newArr);
};

export const allDeleteBasket = () => {
  const array = getBasket();
  array.splice(0, array.length);
  saveBasket(array);
};

export const changeBasket = (idForSearch : string, countDevice: number) => {
  const array = getBasket();
  const el = array.find((elem) => {
    const id = Object.keys(elem)[0];
    return id === idForSearch;
  });
  if(el) {
    el[Object.keys(el)[0]].countDevice = countDevice;
  }
  saveBasket(array);
};
