import { getIsModalState } from '../../store/goods-data/goods-data.selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setIsModal } from '../../store/goods-data/goods-data.slice';
import cn from 'classnames';
import { processErrorHandle } from '../../services/process-error-handle';
import { CardType } from '../../types/card';
import { useEffect, useRef, useState } from 'react';
import { useEscListener } from '../../hooks/use-esc-listener';
import { MutableRefObject, ChangeEvent } from 'react';
import { isEscapeKey } from '../../utils/utils';
import { orderAction } from '../../store/api-actions';
import { setError } from '../../store/goods-data/goods-data.slice';
import { clearErrorAction } from '../../services/process-error-handle';
import { UserData } from '../../types/user-data';

type CallModalProps = {
  currentCard?: CardType ;
}

function CallModal({currentCard} : CallModalProps): JSX.Element {
  const modal = useAppSelector(getIsModalState);
  const telRegex = /^(\+7|8)[\s(]?9{1}\d{2}[)\s]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
  const getStandardTel = (str : string) => str.replace(/\s|\(|\)|-/g, '').replace(/^8/, '+7');
  let cameraId = 0;

  const dispatch = useAppDispatch();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const [telephone, setTel] = useState <UserData>({tel: '', camerasIds: [], coupon: 'camera-333'});
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonCloseClick = () => {
    dispatch(setIsModal(false));
    setTel({...telephone, tel: '', camerasIds: []});
  };

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    setTel({...telephone, tel: value});
    if(!telRegex.test(value)){
      processErrorHandle('Формат номера телефона +7(9XX)XXX-XX-XX.Тире не обязательны и допустимы только в указанных позициях. Вместо тире и скобок допускаются пробелы. вместо +7 можно использовать 8 в начале номера');
    }

  };

  const handleSubmitClick = async() => {
    const standardTel = telephone.tel ? getStandardTel(telephone.tel) : undefined;
    try{
      setIsLoading(true);
      const responce = await dispatch(orderAction({tel: standardTel, camerasIds: telephone.camerasIds, coupon: telephone.coupon}));
      if(responce.type === 'user/tel/rejected') {
        throw new Error();
      }
      setTel({...telephone, tel: '', camerasIds: []});
    } catch(err){
      dispatch(setError('Заказ не отправлен! Проверьте правильность заполнения.'));
    } finally{
      setIsLoading(false);
      dispatch(clearErrorAction());
    }
  };

  const onDocumentKeydown = (evt : Event) => {
    if (isEscapeKey(evt as KeyboardEvent)) {
      evt.preventDefault();
      handleButtonCloseClick();
    }
  };

  useEscListener('keydown', onDocumentKeydown);

  useEffect(() => {

    if (inputRef.current !== undefined && modal) {
      setTel((prev) => ({...prev, camerasIds: [cameraId]}));
      inputRef.current.focus();
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

  }, [modal, cameraId]);

  if(!currentCard || !modal){
    return <div className="modal_empty"></div>;
  }

  const {id, name, category, level, type, vendorCode, price, previewImg, previewImg2x, previewImgWebp} = currentCard;
  cameraId = id;

  return (
    <div data-testid="modalElement" className={cn('modal', {'is-active': modal})}>

      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleButtonCloseClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={previewImgWebp} />
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
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">Телефон
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </span>
              <input data-testid="telElement" value={telephone.tel} onChange={handleInputChange} ref={inputRef} disabled={isLoading} type="tel" name="user-tel" placeholder="Введите ваш номер" required />
            </label>
            <p className="custom-input__error">Нужно указать номер</p>
          </div>
          <div className="modal__buttons">
            <button onClick={(evt) => {
              evt.preventDefault();
              handleSubmitClick();
            }} className="btn btn--purple modal__btn modal__btn--fit-width" type="button" disabled={isLoading || !telRegex.test(telephone.tel ? telephone.tel : '')}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Заказать
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

export default CallModal;

