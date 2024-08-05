import { CardType } from './card';

export type BasketCardType = {
  [x: string]: {
    card: CardType | undefined;
    countDevice: number;
    basket: boolean;
  };
};

export type BasketCardsType = BasketCardType[];

