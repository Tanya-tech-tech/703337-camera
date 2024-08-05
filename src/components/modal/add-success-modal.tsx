import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSuccessModalState } from '../../store/goods-data/goods-data.selectors';
import { setIsSuccessModal } from '../../store/goods-data/goods-data.slice';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { useNavigate } from 'react-router-dom';


function AddSuccessModal(): JSX.Element {
  const navigate = useNavigate();
  const successModal = useAppSelector(getIsSuccessModalState);
  const dispatch = useAppDispatch();


  const handleButtonCloseClick = () => {
    dispatch(setIsSuccessModal(false));

  };

  const handleButtonBasketClick = () => {
    navigate(AppRoute.Basket);
    dispatch(setIsSuccessModal(false));
  };

  if(!successModal){
    return <div className="modal_addempty"></div>;
  }
  return (
    <div className={cn('modal', {'is-active modal--narrow': successModal})}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link className="btn btn--transparent modal__btn" to={AppRoute.Root} onClick={handleButtonCloseClick}>Продолжить покупки</Link>
            <button data-testid="basketButtonElement" className="btn btn--purple modal__btn modal__btn--fit-width" onClick={handleButtonBasketClick}>Перейти в корзину</button>
          </div>
          <button data-testid="closeButtonElement" className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleButtonCloseClick}>
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

}

export default AddSuccessModal;
