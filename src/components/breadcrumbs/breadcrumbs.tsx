import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getDeviceState } from '../../store/goods-data/goods-data.selectors';

function Breadcrumbs(): JSX.Element {
  const location = useLocation().pathname === '/';
  const device = useAppSelector(getDeviceState);


  if(location){

    return(
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">

            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to="/">Главная
                <svg width="5" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini"></use>
                </svg>
              </Link>
            </li>

            <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
            </li>

          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">

          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>

          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to="/">Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>

          <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{device?.category} {device?.name}</span>
          </li>

        </ul>

      </div>
    </div>
  );
}

export default Breadcrumbs;
