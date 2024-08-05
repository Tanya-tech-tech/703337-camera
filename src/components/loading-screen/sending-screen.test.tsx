import { render, screen } from '@testing-library/react';
import SendingScreen from './sending-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const expectedText = /Спасибо за ожидание. Отправляем заказ.../i;

    render(<SendingScreen />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
