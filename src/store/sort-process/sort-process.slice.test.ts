import { SortProcess } from '../../types/state';
import { SortOrder } from '../../const/const';
import { setSortType, setSortOrder } from './sort-process.slice';
import { sortProcess } from './sort-process.slice';

const initialState : SortProcess = {
  sortType: 'price',
  sortOrder: SortOrder.LowToHigh,
};

describe('SortProcess', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {...initialState};

    const result = sortProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { ...initialState};

    expect(sortProcess.reducer(undefined, emptyAction)).toEqual(expectedState);
  });

  it('should  set sort "rating" type with "setSortType" action', () => {

    const expectedState = {...initialState, sortType: 'rating',};

    const result = sortProcess.reducer(initialState, setSortType('rating'));

    expect(result).toEqual(expectedState);
  });

  it('should  set sort "Down" order with "setSortOrder" action', () => {

    const expectedState = {...initialState, sortOrder: 'Down',};

    const result = sortProcess.reducer(initialState, setSortOrder(SortOrder.HighToLow));

    expect(result).toEqual(expectedState);
  });
});


