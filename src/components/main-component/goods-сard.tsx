import { CardType } from '../../types/card';
import { Link } from 'react-router-dom';
import { AppRoute, STAR_COUNT } from '../../const/const';
import { getBasket } from '../../services/order';

type GoodsCardProps = {
  cardObj: CardType;
  onButtonClick: (idCard : number) => void;

}

function GoodsCard({cardObj, onButtonClick}: GoodsCardProps): JSX.Element {
  const {id, name, category, reviewCount, price, rating, previewImg, previewImg2x, previewImgWebp} = cardObj;
  const newPrice = new Intl.NumberFormat('ru-RU').format(price);

  const goodsBasket = getBasket();
  const currentDevice = goodsBasket ? goodsBasket.find((el) => Object.keys(el)[0] === String(id)) : null;

  const handleListItemClick = () => {
    onButtonClick(id);
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} />
          <img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt={`${category} ${name}`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">

          {Array.from({length: rating}).map((_, index) => index).map((it) => (
            <svg key={`${it}-full-star`} width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ))}

          {Array.from({length: STAR_COUNT - rating}).map((_, index) => index).map((itm) => (
            <svg key={`${itm}-star`} width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{category} {name} </p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{newPrice} ₽
        </p>
      </div>

      <div className="product-card__buttons">
        {
          currentDevice
            ?
            (
              <Link to={AppRoute.Basket}>
                <button className="btn btn--purple-border" type="button">
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-basket"></use>
                  </svg>В корзине
                </button>
              </Link>)
            :
            (
              <button className="btn btn--purple product-card__btn" type="button" onClick={() => handleListItemClick()}>Купить
              </button>)
        }

        <Link className="btn btn--transparent" to={`/camera/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default GoodsCard;
