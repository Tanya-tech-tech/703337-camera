import { render, screen } from '@testing-library/react';
import ReviewList from './reviews';
import { makeFakeReview } from '../../utils/mocks';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { State } from '../../types/state';
import { act } from 'react-dom/test-utils';
import * as action from '../../store/goods-data/goods-data.slice';

describe('Component: ReviewList', () => {

  it('should render correctly', () => {
    const expectedText = 'Отзывы';
    const reviewArr = Array.from({length:1}, makeFakeReview);
    const initiaState = {reviews: reviewArr, currentReviews: reviewArr} as Partial<State>;

    const { withStoreComponent } = withStore(<ReviewList />, makeFakeStore(initiaState));
    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render div with button with class \'visually-hidden\' if current reviews array length is null', () => {
    const reviewArray = Array.from({length:4}, makeFakeReview);
    const initiaState = {reviews: reviewArray, currentReviews: null, } as Partial<State>;
    const expectedText = 'Показать больше отзывов';

    const buttonElementTestId = 'buttonElement';

    const { withStoreComponent } = withStore(<ReviewList />, makeFakeStore(initiaState));

    act(() => render(withStoreComponent));
    const buttonContainer = screen.getByTestId(buttonElementTestId);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(buttonContainer).toHaveClass('visually-hidden');
  });

  it('should render div with button without class \'visually-hidden\' if current reviews array have a length >0 ', () => {
    const reviewArray = Array.from({length:4}, makeFakeReview);
    const initiaState = {reviews: reviewArray, currentReviews: reviewArray, } as Partial<State>;

    const buttonElementTestId = 'buttonElement';

    const { withStoreComponent } = withStore(<ReviewList />, makeFakeStore(initiaState));

    act(() => render(withStoreComponent));
    const buttonContainer = screen.getByTestId(buttonElementTestId);

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(buttonContainer).not.toHaveClass('visually-hidden');
  });

  it('calls dispatch when after render', () => {
    const reviewArray = Array.from({length:3}, makeFakeReview);
    const initiaState = {reviews: reviewArray, currentReviews: null, } as Partial<State>;

    const { withStoreComponent } = withStore(<ReviewList />, makeFakeStore(initiaState));

    const spy = vi.spyOn(action, 'setCurrentReviews');

    act(() => render(withStoreComponent));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

