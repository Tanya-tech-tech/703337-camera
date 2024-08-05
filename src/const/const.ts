export const TIMEOUT_SHOW_ERROR = 4000;
export const STAR_COUNT = 5;
export const COMMENT_COUNT = 3;

export enum AppRoute {
  Root = '/',
  Camera = '/camera/:id',
  Basket = '/card',
}

export enum APIRoute {
  Goods = '/cameras',
  Order = '/orders',
  Reviews = '/reviews',
  Coupons = '/coupons',
}

export enum NameSpace {
  Data = 'DATA',
  Sort = 'SORT',
  Filter = 'FILTER'
}

export const GoodsType = {
  Collection: 'Коллекционная',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Digital: 'Цифровая',
} as const;

export enum GoodsLevel {
  Zero = 'Нулевой',
  Nonprofessional = 'Любительский',
  Professional = 'Профессиональный',
}

interface MyObject {
  [key: string]: string;
}

export const GoodsCategory : MyObject = {
  Videocamera: 'Видеокамера',
  Photocamera: 'Фотоаппарат',
} as const;

export enum SortOrder {
  LowToHigh = 'Up',
  HighToLow = 'Down',
}

