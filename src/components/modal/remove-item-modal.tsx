import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsRemoveModalState } from '../../store/goods-data/goods-data.selectors';
import { BasketCardType } from '../../types/basket';
import { CardType } from '../../types/card';
import { setIsRemoveModal } from '../../store/goods-data/goods-data.slice';
import { deleteBasket, getBasket } from '../../services/order';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';

type RemoveModalProps = {
  basketCard: BasketCardType | undefined;
  onDiscountChange: () => void;
}

function RemoveItemModal({basketCard, onDiscountChange} : RemoveModalProps): JSX.Element {
  const goodsBasket = getBasket();
  const isRemoveItem = useAppSelector(getIsRemoveModalState);
  const idCard = basketCard ? Object.keys(basketCard)[0] : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonCloseClick = () => {
    dispatch(setIsRemoveModal(false));
  };

  const handleButtonDelClick = () => {
    if(idCard){
      deleteBasket(idCard);
      onDiscountChange();
      dispatch(setIsRemoveModal(false));
      if(goodsBasket.length === 1){
        navigate(AppRoute.Root);
      }
    }
  };

  if(basketCard && idCard){
    const {name, category, level, type, vendorCode, previewImg, previewImg2x, previewImgWebp} = basketCard[idCard].card as CardType;

    return (
      <div className={cn('modal', {'is-active': isRemoveItem})}>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Удалить этот товар?</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={previewImgWebp} />
                  <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{type} {category}</li>
                  <li className="basket-item__list-item">{level} уровень</li>
                </ul>
              </div>
            </div>
            <div className="modal__buttons">
              <button data-testid="deleteButtonElement" className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleButtonDelClick}>Удалить
              </button>
              <a className="btn btn--transparent modal__btn modal__btn--half-width" href="#">Продолжить покупки
              </a>
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


  return <div className="modal_empty_remove"></div>;

}

export default RemoveItemModal;

