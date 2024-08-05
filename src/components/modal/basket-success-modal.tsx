import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { getIsSuccessPurchaseModalState } from '../../store/goods-data/goods-data.selectors';
import { setIsSuccessPurchase } from '../../store/goods-data/goods-data.slice';
import { useAppDispatch } from '../../hooks';

function BasketSuccessModal(): JSX.Element {
  const isSuccessPurchase = useAppSelector(getIsSuccessPurchaseModalState);
  const dispatch = useAppDispatch();

  const handleButtonCloseClick = () => {
    dispatch(setIsSuccessPurchase(false));

  };

  if(!isSuccessPurchase){
    return <div className="modal_empty_purchase"></div>;
  }

  return (
    <div className={cn('modal modal--narrow', {'is-active': isSuccessPurchase})}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link to={AppRoute.Root}>
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
              </button>
            </Link>
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

export default BasketSuccessModal;

