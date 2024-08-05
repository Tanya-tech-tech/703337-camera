import { CardType } from '../../types/card';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsModalState } from '../../store/goods-data/goods-data.selectors';
import { setIsModal, setIsSuccessModal, setDeviceBasket } from '../../store/goods-data/goods-data.slice';
import { saveBasket, getBasket } from '../../services/order';
import { BasketCardType, BasketCardsType } from '../../types/basket';
import { useLocation } from 'react-router-dom';


type AddModalProps = {
  currentCard?: CardType ;
  onListItemAdd: () => void;
}

function AddItemModal({currentCard, onListItemAdd} : AddModalProps): JSX.Element {
  const basketArr : BasketCardsType = getBasket() ?? [];
  const idCard = String(currentCard?.id) ;
  const location = useLocation().pathname === `/camera/${idCard}`;

  const modal = useAppSelector(getIsModalState);
  const dispatch = useAppDispatch();
  const currentId = currentCard ? currentCard.id : 'undefined';

  const savedCard : BasketCardType = {
    [currentId]: {
      card: currentCard,
      countDevice: 1,
      basket: location,
    },
  };


  const handleButtonCloseClick = () => {
    dispatch(setIsModal(false));

  };

  const handleButtonAddClick = () => {
    let basketArray;
    const doubleCard = basketArr.find((el) => {
      if(Object.keys(el)[0] === String(currentId)){
        el[Object.keys(el)[0]].countDevice ++;
        return true;
      }
    });

    if(doubleCard){
      basketArray = [...basketArr] as BasketCardsType;
    } else{
      basketArray = [...basketArr, savedCard] as BasketCardsType;
    }

    onListItemAdd();
    dispatch(setIsSuccessModal(true));
    dispatch(setIsModal(false));
    dispatch(setDeviceBasket(currentCard));
    saveBasket(basketArray);

  };

  if(!currentCard || !modal){
    return <div className="modal_empty"></div>;
  }

  const {name, category, level, type, vendorCode, price, previewImg, previewImg2x, previewImgWebp} = currentCard;


  return (
    <div data-testid="modalElement" className={cn('modal', {'is-active': modal})}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`../${previewImgWebp}`} />
                <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt="Фотоаппарат «Орлёнок»" />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{category} {name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button data-testid="addButtonElement" className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleButtonAddClick}>
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
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

export default AddItemModal;
