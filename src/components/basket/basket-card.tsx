import { getTotalPrice } from '../../utils/utils';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { changeBasket } from '../../services/order';
import { processErrorHandle } from '../../services/process-error-handle';
import { forwardRef } from 'react';
import { BasketCardType } from '../../types/basket';
import { CardType } from '../../types/card';
import { setIsRemoveModal } from '../../store/goods-data/goods-data.slice';
import { useAppDispatch } from '../../hooks';


type BasketCardProps = {
  basketCard?: BasketCardType;
  onDiscountChange: () => void;
  onListItemClick: (elem : string) => void;
  isDisable: boolean;
}

const MAX_COUNT = 9;
const MIN_COUNT = 1;

const BasketCard = forwardRef(({basketCard, onDiscountChange, onListItemClick, isDisable} : BasketCardProps, ref): JSX.Element => {
  const idCard = basketCard ? Object.keys(basketCard)[0] : null;
  const countDevice = idCard && basketCard ? basketCard[idCard].countDevice : 1;
  const [count, setCount] = useState(countDevice);
  const dispatch = useAppDispatch();

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    const countGoods = Number(value);
    if(countGoods > 9 || countGoods < 0){
      processErrorHandle('Количество товара не должно превышать 9 шт');
      setCount(1);
      onDiscountChange();
      if(idCard){
        changeBasket(idCard, 1);
      }
    } else{
      setCount(countGoods);
      onDiscountChange();
      if(idCard){
        changeBasket(idCard, countGoods);
      }
    }
  };

  const handleButtonAddClick = () => {
    setCount((prev) => prev < 9 ? prev + 1 : MAX_COUNT);
    onDiscountChange();
    if(idCard){
      const newCount = count < 9 ? count + 1 : MAX_COUNT;
      changeBasket(idCard, newCount);
    }
  };

  const handleButtonReduceClick = () => {
    setCount((prev) => prev >= 2 ? prev - 1 : MIN_COUNT);
    onDiscountChange();
    if(idCard){
      const newCount = count >= 2 ? count - 1 : MIN_COUNT;
      changeBasket(idCard, newCount);
    }
  };

  const handleButtonDelClick = () => {
    if(idCard) {
      dispatch(setIsRemoveModal(true));
      onListItemClick(idCard);
    }
  };

  const rangeCount = () => {
    if(count === 0 || count > 9 || count === null){
      return '';
    }
    return count;
  };

  const getMap = () => {
    if (ref && typeof ref !== 'function' && !ref.current) {
      ref.current = new Map();
      return ref.current;
    } else if(ref && typeof ref !== 'function'){
      return ref.current;
    }
  };


  if(basketCard && idCard){
    const {id, name, category, level, type, vendorCode, price, previewImg, previewImg2x, previewImgWebp} = basketCard[idCard].card as CardType;

    return (
      <li className="basket-item">
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
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
        <div className="quantity">
          <button disabled={isDisable} className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleButtonReduceClick}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>

          <label className="visually-hidden" htmlFor="counter1"></label>
          <input data-testid="inputElement" type="number" id="counter1" value={rangeCount()} min="1" max="9" aria-label="количество товара" onChange={handleInputChange}/>

          <button data-testid="addButtonElement" disabled={isDisable} className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleButtonAddClick}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div ref={(node) => {
          const map = getMap() as Map<number, string>;
          if(map){
            if (node && node.textContent) {
              map.set(id, node.textContent.replace(/[^0-9]+/g, '') as unknown as string) ;
            } else {
              map.delete(id);
            }
          }

        }} className="basket-item__total-price"
        >
          <span className="visually-hidden">Общая цена:</span>{getTotalPrice(count, price)} ₽
        </div>

        <button data-testid="deleteButtonElement" disabled={isDisable} className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleButtonDelClick}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>

      </li>
    );
  }

  return (
    <li className="basket-item"></li>
  );
});

BasketCard.displayName = 'BasketCard';

export default BasketCard;
