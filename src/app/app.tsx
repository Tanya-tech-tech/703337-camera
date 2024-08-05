import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/main/main';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import DevicePage from '../pages/device/device';
import BasketPage from '../pages/basket/basket-page';
import LoadingScreen from '../components/loading-screen/loading-screen';
import { AppRoute } from '../const/const';
import ScrollToTop from '../components/scroll-to-top/scroll-to-top';
import { useAppSelector } from '../hooks';
import { getIsGoodsLoadingState } from '../store/goods-data/goods-data.selectors';


function App(): JSX.Element {
  const isGoodsDataLoading = useAppSelector(getIsGoodsLoadingState);

  if (isGoodsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Camera}
          element={<DevicePage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
}

export default App;
