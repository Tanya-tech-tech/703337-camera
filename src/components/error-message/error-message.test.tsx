import { render, screen } from '@testing-library/react';
import { State } from '../../types/state';
import ErrorMessage from './error-message';
import { withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: ErrorMessage', () => {
  it('should render correctly', () => {
    const errorElementTestId = 'errorElement';
    const initiaState = {error: 'Error.Message'} as Partial<State>;
    const { withStoreComponent } = withStore(<ErrorMessage />, makeFakeStore(initiaState));

    render(withStoreComponent);
    const errorContainer = screen.getByTestId(errorElementTestId);
    expect(errorContainer).toBeInTheDocument();

  });
});

