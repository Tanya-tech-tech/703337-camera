import { FilterProcess } from '../../types/state';
import { GoodsType } from '../../const/const';
import { makeFakeCategory, makeFakeLevel, makeFakePrice, makeFakeType } from '../../utils/mocks';
import { setCategory, setLevel, setPrice, setType, removeFilmType, removeAllType, removeAllLevel, removeLevel, removeType } from './filter-process.slice';
import { filterProcess } from './filter-process.slice';

const initialState : FilterProcess = {
  filterCategory: null,
  filterType: [],
  filterLevel: [],
  filterPrice: [],
};

describe('FilterProcess', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = filterProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState};

    expect(filterProcess.reducer(undefined, emptyAction)).toEqual(expectedState);
  });

  it('should  set filter category type with "setCategory" action', () => {
    const category = makeFakeCategory();
    const expectedState = {...initialState, filterCategory: category,};

    const result = filterProcess.reducer(initialState, setCategory(category));

    expect(result).toEqual(expectedState);
  });

  it('should set filter type  with "setType" action', () => {
    const type = makeFakeType();
    const expectedState = {...initialState, filterType: [type],};

    const result = filterProcess.reducer(initialState, setType(type));

    expect(result).toEqual(expectedState);
  });

  it('should set filter price  with "setPrice" action', () => {
    const priceFrom = makeFakePrice();
    const priceTo = makeFakePrice();
    const expectedState = {...initialState, filterPrice: [priceFrom, priceTo],};

    const result = filterProcess.reducer(initialState, setPrice({from: priceFrom, to: priceTo}));

    expect(result).toEqual(expectedState);
  });

  it('should set filter level  with "setLevel" action', () => {
    const level = makeFakeLevel();
    const expectedState = {...initialState, filterLevel: [level],};

    const result = filterProcess.reducer(initialState, setLevel(level));

    expect(result).toEqual(expectedState);
  });

  it('should remove specific filter type  with "removeFilmType" action', () => {
    const type = makeFakeType();
    const anotherType = GoodsType.Film;
    const specificType = GoodsType.Snapshot;
    const primaryState = {...initialState, filterType: [type, anotherType, specificType],};
    const expectedState = {...initialState, filterType: [type],};

    const result = filterProcess.reducer(primaryState, removeFilmType());

    expect(result).toEqual(expectedState);
  });

  it('should remove filter type  with "removeType" action', () => {
    const type = makeFakeType();
    const primaryState = {...initialState, filterType: [type],};
    const expectedState = {...initialState};

    const result = filterProcess.reducer(primaryState, removeType(type));

    expect(result).toEqual(expectedState);
  });

  it('should remove all filter type  with "removeAllType" action', () => {
    const type = makeFakeType();
    const anotherType = GoodsType.Film;
    const specificType = GoodsType.Snapshot;
    const primaryState = {...initialState, filterType: [type, anotherType, specificType],};
    const expectedState = {...initialState};

    const result = filterProcess.reducer(primaryState, removeAllType());

    expect(result).toEqual(expectedState);
  });

  it('should remove filter level  with "removeLevel" action', () => {
    const level = makeFakeLevel();
    const primaryState = {...initialState, filterLevel: [level],};
    const expectedState = {...initialState};

    const result = filterProcess.reducer(primaryState, removeLevel(level));

    expect(result).toEqual(expectedState);
  });

  it('should remove all filter level  with "removeAllLevel" action', () => {
    const levels = Array.from({length:4}, makeFakeLevel);
    const primaryState = {...initialState, filterLevel: levels};
    const expectedState = {...initialState};

    const result = filterProcess.reducer(primaryState, removeAllLevel());

    expect(result).toEqual(expectedState);
  });
});

