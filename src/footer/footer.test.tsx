import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../utils/mock-component';
import { withStore } from '../utils/mock-component';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = 'Интернет-магазин фото- и видеотехники';

    const { withStoreComponent } = withStore(<Footer/>);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
