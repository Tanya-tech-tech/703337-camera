import Header from '../../header/header';
import Footer from '../../footer/footer';
import ReviewList from '../../components/reviews/reviews';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import cn from 'classnames';
import { STAR_COUNT } from '../../const/const';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { store } from '../../store';
import { fetchDeviceAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getDeviceState, getReviewsState, getIsDeviceLoadingState, getIsReviewsLoadingState } from '../../store/goods-data/goods-data.selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import AddItemModal from '../../components/modal/add-item-modal';
import AddSuccessModal from '../../components/modal/add-success-modal';
import { setIsModal } from '../../store/goods-data/goods-data.slice';

function DevicePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const param = useParams().id as string;
  const device = useAppSelector(getDeviceState);
  const reviews = useAppSelector(getReviewsState);
  const isLoad = useAppSelector(getIsDeviceLoadingState);
  const isReviewsLoad = useAppSelector(getIsReviewsLoadingState);

  const [tab, setTab] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    store.dispatch(fetchReviewsAction(param));
    store.dispatch(fetchDeviceAction(param));

  }, [param]);

  if(device === null || reviews === null || isLoad || isReviewsLoad){
    return (<div style={{textAlign: 'center'}}>{<LoadingScreen />}<p>Загружаем предложение</p></div>);
  }

  const handleButtonTabActiveClick = () => {
    setTab(true);
  };

  const handleButtonTabNotActiveClick = () => {
    setTab(false);
  };

  const handleButtonUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleItemClick = () => {
    dispatch(setIsModal(true));
  };

  const handleItemAdd = () => {
    setRerender(!rerender);
  };

  const {name, category, rating, price, reviewCount, vendorCode, level, type, description, previewImg, previewImg2x, previewImgWebp} = device;
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">

          <Breadcrumbs />

          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`../${previewImgWebp}`} />
                    <img src={`../${previewImg}`} srcSet={previewImg2x} width="560" height="480" alt={name} />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{category} {name}</h1>
                  <div className="rate product__rate">
                    {Array.from({length: rating}).map((_, index) => index).map((it) => (
                      <svg key={`${it}product-full-star`} width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                    ))}
                    {Array.from({length: STAR_COUNT - rating}).map((_, index) => index).map((itm) => (
                      <svg key={`${itm}product-star`} width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    ))}

                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>

                  <button className="btn btn--purple" type="button" onClick={handleItemClick}>
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>

                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">

                      <button className={cn('tabs__control', {'is-active': !tab})} type="button" onClick={handleButtonTabNotActiveClick}>Характеристики</button>
                      <button className={cn('tabs__control', {'is-active': tab})} type="button" onClick={handleButtonTabActiveClick}>Описание</button>

                    </div>

                    <div className="tabs__content">
                      <div className={cn('tabs__element', {'is-active': !tab})}>
                        <ul className="product__tabs-list">
                          <li className="item-list"><span className="item-list__title">Артикул:</span>
                            <p className="item-list__text"> {vendorCode}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Категория:</span>
                            <p className="item-list__text">{category}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                            <p className="item-list__text">{type}</p>
                          </li>
                          <li className="item-list"><span className="item-list__title">Уровень:</span>
                            <p className="item-list__text">{level}</p>
                          </li>
                        </ul>
                      </div>
                      <div className={cn('tabs__element', {'is-active': tab})}>
                        <div className="product__tabs-text">

                          <p>{description}</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="page-content__section">
            <ReviewList />

          </div>
        </div>
      </main>

      <a className="up-btn" onClick={handleButtonUpClick}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <AddItemModal currentCard={device} onListItemAdd={handleItemAdd}/>
      <AddSuccessModal />
      <Footer />
    </div>
  );
}

export default DevicePage;
