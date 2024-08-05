import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useDebounce, useDebouncePrice } from '../../hooks/debounce-price';
import { getInitialSortState, getSortLowToHighFilteredGoods } from '../../store/sort-process/sort-process.selectors';

import { getFilterCategoryState } from '../../store/filter-process/filter-process.selestors';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCategory, setPrice, setType, setLevel, removeFilmType, removeType,
  removeAllType, removeLevel, removeAllLevel } from '../../store/filter-process/filter-process.slice';
import { GoodsCategory, GoodsLevel, GoodsType } from '../../const/const';
import { ChangeEvent } from 'react';
import { getUpperCaseFirstLetter } from '../../utils/utils';
import { processErrorHandle } from '../../services/process-error-handle';
import { FilterLevelMemo } from '../filter-level/filter-level';

const DELAY = 1000;

function Filter(): JSX.Element {
  const filterCategory = useAppSelector(getFilterCategoryState);
  const videocamera = GoodsCategory.Videocamera;
  const sortedGoodsForCompare = useAppSelector(getSortLowToHighFilteredGoods);
  const priceRangeTo = sortedGoodsForCompare[sortedGoodsForCompare.length - 1];
  const [priceRangeFrom] = sortedGoodsForCompare;

  const initialSort = useAppSelector(getInitialSortState);
  const [initialFrom] = initialSort;
  const initialTo = initialSort[initialSort.length - 1];

  const dispatch = useAppDispatch();

  const [toggle, setToggle] = useState(false);
  const [focus, setFocus] = useState(false);
  const [camera, setCamera] = useState(false);
  const [currentPrice, setCurrentPrice] = useState({
    from: '',
    to: ''
  });

  const [currentType, setCurrentType] = useState({
    collection: false,
    film: false,
    snapshot: false,
    digital: false,
  });

  const inputRefMin = useRef<HTMLInputElement>(null);
  const inputRefMax = useRef<HTMLInputElement>(null);

  const comparePrice = (val : string, placeholder : string) => {
    if(Number(currentPrice.from) > Number(val) && placeholder === 'до'){
      processErrorHandle('Поле \'до\' не должно принимать значение меньшее, чем указано в поле \'от\'!');
      setCurrentPrice((prev) => ({...prev, to: prev.from}));
      dispatch(setPrice({...currentPrice, to: currentPrice.from}));
    } else if(placeholder === 'от' && Number(currentPrice.to) < Number(val)){
      processErrorHandle('Поле \'от\' не должно принимать значение больше, чем указано в поле \'до\'!');
      setCurrentPrice((prev) => ({...prev, from: prev.to}));
      dispatch(setPrice({...currentPrice, from: currentPrice.to}));
    }
  };

  const getRangePrice = useCallback(() => {
    if(priceRangeFrom === undefined && priceRangeTo === undefined){
      processErrorHandle('К сожалению, товаров соответсвующих выбранным условиям, нет!');
    } else {
      setCurrentPrice({
        from: String(priceRangeFrom.price),
        to: String(priceRangeTo.price),
      });

      dispatch(setPrice({from: String(priceRangeFrom.price), to: String(priceRangeTo.price)}));
    }
  },[dispatch,priceRangeFrom, priceRangeTo]);

  const handleButtonResetClick = () => {
    setCamera(false);
    setCurrentType({
      collection: false,
      film: false,
      snapshot: false,
      digital: false,
    });
    dispatch(setCategory(null));
    dispatch(removeAllLevel());
    dispatch(removeAllType());
    dispatch(setPrice({from: String(initialFrom.price), to: String(initialTo.price)}));
  };

  const delayRangePrice = useDebouncePrice(getRangePrice, DELAY);

  useEffect(() => {
    delayRangePrice();
    if(focus){
      inputRefMin.current?.focus();
    } else{
      inputRefMax.current?.focus();
    }

  },[delayRangePrice, toggle, focus]);

  const delayLimit = useDebounce(comparePrice, DELAY);

  const handlePriceChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value, placeholder} = target;
    setToggle((prev) => !prev);
    if(placeholder === 'от'){
      setCurrentPrice((prev) => ({...prev, from: value}));
      dispatch(setPrice({...currentPrice, from: value}));
      setFocus(true);
    } else if(placeholder === 'до'){
      setCurrentPrice((prev) => ({...prev, to: value}));
      dispatch(setPrice({...currentPrice, to: value}));
      setFocus(false);
    }
    delayLimit(value, placeholder);
  };

  const handleTypeChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name} = target;
    const newName = name.replace(/-/g, '') as keyof typeof currentType;
    setCurrentType((prev) => {
      const newValue = prev[newName];
      return {...prev, [newName]: !newValue};
    });
    const enumName = getUpperCaseFirstLetter(newName);

    for(const key in GoodsType){
      if(key === enumName && !currentType[newName]){
        dispatch(setType(GoodsType[enumName as keyof typeof GoodsType]));
      } else if(key === enumName && currentType[newName]){
        dispatch(removeType(GoodsType[enumName as keyof typeof GoodsType]));
      }
    }
    for(const keyLevel in GoodsLevel){
      if(keyLevel === enumName && !currentType[newName]){
        dispatch(setLevel(GoodsLevel[enumName as keyof typeof GoodsLevel]));
      } else if(keyLevel === enumName && currentType[newName]){
        dispatch(removeLevel(GoodsLevel[enumName as keyof typeof GoodsLevel]));
      }
    }
    dispatch(setPrice({from: String(initialFrom.price), to: String(initialTo.price)}));
  };

  const handleCameraCategoryChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    let {value} = target;
    value = getUpperCaseFirstLetter(value);
    setCamera((prev) => !prev);
    dispatch(setCategory(GoodsCategory[value]));
    dispatch(setPrice({from: String(initialFrom.price), to: String(initialTo.price)}));
  };

  const handleVideocameraCategoryChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    let {value} = target;
    value = getUpperCaseFirstLetter(value);
    setCamera((prev) => prev ? !prev : prev);
    setCurrentType((prev) => ({...prev, film: false, snapshot: false}));
    dispatch(setCategory(GoodsCategory[value]));
    dispatch(removeFilmType());
  };


  return(
    <div className="catalog-filter" >
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input ref={inputRefMin} autoFocus value={currentPrice.from} type="number" name="price" placeholder="от" onChange={handlePriceChange} />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input ref={inputRefMax} value={currentPrice.to} type="number" name="priceUp" placeholder="до" onChange={handlePriceChange}/>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input type="radio" name="category" value="photocamera" checked={camera} onChange={handleCameraCategoryChange}/>
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label >
              <input data-testid="inputElement" type="radio" name="category" value="videocamera" checked={filterCategory === videocamera} onChange={handleVideocameraCategoryChange} />
              <span className="custom-radio__icon" tabIndex={0}></span>
              <span className="custom-radio__label" >Видеокамера</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title&#45;&#45;h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" checked={currentType.digital} onChange={handleTypeChange} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" disabled={filterCategory === GoodsCategory.Videocamera} checked={currentType.film && filterCategory !== GoodsCategory.Videocamera} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" disabled={filterCategory === GoodsCategory.Videocamera} checked={currentType.snapshot} onChange={handleTypeChange}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked={currentType.collection} onChange={handleTypeChange} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block" >
          <legend className="title title&#45;&#45;h5">Уровень</legend>
          {['zero', 'non-professional', 'professional'].map((it) =>
            <FilterLevelMemo key={`level-${it}`} level={it}/>
          )}

        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleButtonResetClick}>Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default Filter;
export const FilterMemo = memo(Filter);
