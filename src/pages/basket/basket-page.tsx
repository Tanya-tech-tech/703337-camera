import Header from '../../header/header';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../footer/footer';
import BasketCard from '../../components/basket/basket-card';
import { useRef, useEffect, useState} from 'react';
import { getBasket, allDeleteBasket } from '../../services/order';
import { getSummary, getDiscount } from '../../utils/utils';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import RemoveItemModal from '../../components/modal/remove-item-modal';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsSendingState } from '../../store/goods-data/goods-data.selectors';
import { orderAction } from '../../store/api-actions';
import { setError, setIsSending, setIsSuccessPurchase } from '../../store/goods-data/goods-data.slice';
import { clearErrorAction } from '../../services/process-error-handle';
import SendingScreen from '../../components/loading-screen/sending-screen';
import BasketSuccessModal from '../../components/modal/basket-success-modal';
import { AppRoute } from '../../const/const';

function BasketPage(): JSX.Element {
  const itemsRef = useRef<Map<number, string> | null>(null);
  const isSend = useAppSelector(getIsSendingState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goodsBasket = getBasket();

  const keyObj = goodsBasket ? goodsBasket.map((elem) => Object.keys(elem)[0]) : [];
  const orderArray = goodsBasket ? keyObj.map((el) => Number(el)) : [];

  const countGoodsBasket = goodsBasket ? goodsBasket.reduce((acc, item, ind) => acc + item[keyObj[ind]].countDevice, 0) : 0;

  const [currentId, setCurrentDevice] = useState<string | undefined>();
  const [total, setTotal] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const discount = getDiscount(countGoodsBasket, total);
  const isNull = Boolean(discount);
  const currentDevice = goodsBasket ? goodsBasket.find((item) => Object.keys(item)[0] === currentId) : undefined;

  const isDisable = goodsBasket ? !goodsBasket.length : !goodsBasket;

  useEffect(() => {

    const arraySummary = itemsRef.current?.size ? [...itemsRef.current.values()].map((el : string) => parseInt(el, 10)) : [0];
    setTotal(arraySummary.reduce((accum, elem) => accum + elem));
  }, [rerender]);

  const handleListItemClick = (item : string) => {
    setCurrentDevice(item);
  };

  const handleDiscChange = () => {
    setRerender(!rerender);
  };

  const handleSubmitClick = async() => {
    try{
      setIsLoading(true);
      const responce = await dispatch(orderAction({camerasIds: orderArray, coupon: 'camera-333'}));

      if(responce.type === 'user/order/rejected') {
        dispatch(setIsSending(false));
        handleDiscChange();
        throw new Error();
      }
      allDeleteBasket();
      handleDiscChange();
      dispatch(setIsSuccessPurchase(true));
      setTimeout(() => {
        navigate(AppRoute.Root);
        dispatch(setIsSuccessPurchase(false));
      }, 2000);

    } catch(err){
      dispatch(setError('Заказ не отправлен! Попробуйте еще раз'));
    } finally{
      dispatch(clearErrorAction());
      setIsLoading(false);
    }
  };

  if (isSend) {
    return (
      <SendingScreen />
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>

              <ul className="basket__list">
                {
                  goodsBasket
                    ?
                    goodsBasket.map((item) => {
                      const idCard = Object.keys(item)[0];
                      return (
                        <BasketCard key= {item[idCard].card?.id} basketCard={item} isDisable={isLoading} onDiscountChange = {handleDiscChange} onListItemClick={handleListItemClick} ref={itemsRef} />
                      );
                    }
                    )
                    :
                    <div></div>
                }
              </ul>

              <div className="basket__summary">
                <div className="basket__promo">

                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{total} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={cn('basket__summary-value', {'basket__summary-value--bonus': isNull})}>{discount} ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{getSummary(total, discount)} ₽</span></p>
                  <button data-testid="submitButtonElement" onClick={() => void handleSubmitClick()} disabled={isDisable} className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <RemoveItemModal basketCard={currentDevice} onDiscountChange={handleDiscChange} />
      <BasketSuccessModal />
      <Footer />
    </div>
  );
}

export default BasketPage;

