import BasketSuccessModal from './basket-success-modal';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { State } from '../../types/state';
import { makeFakeStore } from '../../utils/mocks';
import * as actions from '../../store/goods-data/goods-data.slice';

describe('Component: RemoveItemModal', () => {
  it('should render correctly', () => {
    const titleText = 'Спасибо за покупку';
    const initiaState = {isSuccessPurchase: true} as Partial<State>;
    const { withStoreComponent } = withStore(<BasketSuccessModal/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(titleText)).toBeInTheDocument();
  });

  it('closed modal when click close button', async() => {
    const setModal = vi.spyOn(actions, 'setIsSuccessPurchase');

    const initiaState = {isSuccessPurchase: true} as Partial<State>;
    const closeButton = 'closeButtonElement';

    const { withStoreComponent } = withStore(<BasketSuccessModal/>, makeFakeStore(initiaState));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(closeButton));

    expect(setModal). toHaveBeenCalledWith(false);
  });
});

