import { Link } from 'react-router-dom';
import { getBasket } from '../../services/order';
import { AppRoute } from '../../const/const';

function BasketIcon(): JSX.Element | null{
  const goodsBasket = getBasket();
  const basketCount = goodsBasket ? goodsBasket.map((el) => Number(el[Object.keys(el)[0]].countDevice)).reduce((accum, item) => accum + item, 0) : 0;

  return (basketCount ?
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      <span data-testid="spanElement" className="header__basket-count">{basketCount}</span>
    </Link>
    : null);

}
export default BasketIcon;
