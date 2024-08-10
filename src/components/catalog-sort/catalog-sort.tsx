import { useAppDispatch } from '../../hooks';
import { getUpperCaseFirstLetter } from '../../utils/utils';
import { useState, ChangeEvent } from 'react';
import { setSortType, setSortOrder } from '../../store/sort-process/sort-process.slice';
import { SortOrder } from '../../const/const';

function CatalogSort(): JSX.Element {
  const [price, setPrice] = useState(true);
  const [increase, setIncrease] = useState(true);
  const dispatch = useAppDispatch();

  const handleInputPriceChange = ({target}: ChangeEvent<HTMLInputElement>) => {

    const {id} = target;
    setPrice((prev) => !prev);
    if(id === 'sortPrice'){
      dispatch(setSortType('price'));
    } else{
      dispatch(setSortType('rating'));
    }
  };

  const handleInputIncreaseChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    let {id} = target;
    id = getUpperCaseFirstLetter(id);
    setIncrease(!increase);
    if(id === SortOrder.LowToHigh){
      dispatch(setSortOrder(SortOrder.LowToHigh));
    } else{
      dispatch(setSortOrder(SortOrder.HighToLow));
    }
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title&#45;&#45;h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input data-testid="sortPriceElement" type="radio" id="sortPrice" name="sort" checked={price} onChange={handleInputPriceChange}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input data-testid="sortRatingElement" type="radio" id="sortPopular" name="sort" checked={!price} onChange={handleInputPriceChange}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>

          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
              <input type="radio" id="up" name="sort-icon" checked={increase} aria-label="По возрастанию" onChange={handleInputIncreaseChange}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
              <input data-testid="sortDownElement" type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={!increase} onChange={handleInputIncreaseChange}/>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;

