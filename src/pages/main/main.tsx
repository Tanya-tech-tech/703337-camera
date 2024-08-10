import Footer from '../../footer/footer';
import Header from '../../header/header';
import { getCurrentCard } from '../../utils/utils';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

import AddItemModal from '../../components/modal/add-item-modal';
import GoodsCard from '../../components/main-component/goods-сard';
import { getSortedGoodsState } from '../../store/sort-process/sort-process.selectors';
import AddSuccessModal from '../../components/modal/add-success-modal';
import { getGoodsState } from '../../store/goods-data/goods-data.selectors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useState } from 'react';
import { CardType } from '../../types/card';
import { setIsModal } from '../../store/goods-data/goods-data.slice';
import { FilterMemo } from '../../components/filter-form/filter-form';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const goodsArray = useAppSelector(getGoodsState);
  const sortedGoods = useAppSelector(getSortedGoodsState);


  const [selectedСard, setCard] = useState<CardType | undefined>(undefined);
  const [rerender, setRerender] = useState(false);

  const handleButtonClick = (listItemCardId: number) => {
    const currentCard = getCurrentCard(goodsArray, listItemCardId);
    setCard(currentCard);
    dispatch(setIsModal(true));
  };

  const handleListItemAdd = () => {
    setRerender(!rerender);
  };

  return (
    <div className="wrapper" >

      <Header />
      <main >
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x" />
            <img src="img/content/banner-bg.jpg" srcSet="img/content/banner-bg@2x.jpg 2x" width="1280" height="280" alt="баннер" />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
            <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
            <a className="btn" href="#">Подробнее</a>
          </p>
        </div>
        <div className="page-content">
          <Breadcrumbs />

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img className="visually-hidden" src="img/banner.png" />
                  <FilterMemo />
                </div>
                <div className="catalog__content">
                  <CatalogSort />

                  <div className="cards catalog__cards">
                    {sortedGoods.map((item) =>
                      (
                        <GoodsCard key={item.vendorCode} cardObj={item} onButtonClick={handleButtonClick}/>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AddItemModal currentCard={selectedСard} onListItemAdd ={handleListItemAdd}/>
      <AddSuccessModal />
      <Footer />
    </div>
  );
}

export default MainPage;
