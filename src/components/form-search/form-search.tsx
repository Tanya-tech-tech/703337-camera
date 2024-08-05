import { useState, useRef, ChangeEvent, MutableRefObject, memo } from 'react';
import { isArrowUpKey, isArrowDownKey } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getGoodsState } from '../../store/goods-data/goods-data.selectors';
import { CardsType } from '../../types/card';
import cn from 'classnames';
import { getSimilarCard } from '../../utils/utils';
import { useElementListener } from '../../hooks/use-element-listener';


const START_SEARCH = 3;

function SearchForm(): JSX.Element {
  const [device, setDevice] = useState('');

  const goodsArray = useAppSelector(getGoodsState);
  const liRef = useRef() as MutableRefObject<HTMLLIElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const ulRef = useRef() as MutableRefObject<HTMLUListElement>;

  const similarGoods : CardsType = getSimilarCard(goodsArray, device);

  const onDocumentKeydown = (evt : Event) => {
    const elements = document.querySelector('.form-search__select-list')?.children;
    const names = similarGoods !== undefined ? Array.from(similarGoods, (it) => it.name) : null;
    const activeEl = elements ? elements[0] as HTMLElement : undefined;
    const currentActiveEl = document.activeElement;
    const index = names?.findIndex((it) => it === currentActiveEl?.id);

    if(!similarGoods || similarGoods.length === 0){
      return;
    }

    if (isArrowDownKey(evt as KeyboardEvent) && document.activeElement === inputRef.current) {
      evt.preventDefault();
      activeEl?.focus();
    } else if (isArrowDownKey(evt as KeyboardEvent) && document.activeElement !== inputRef.current){
      if(index !== undefined && names && index < names.length - 1 && elements){
        const nextEl = elements[index + 1] as HTMLElement;
        nextEl.focus();
      }
    } else if (isArrowUpKey(evt as KeyboardEvent) && document.activeElement !== inputRef.current){
      if(index !== undefined && index > 0 && elements){
        const previousEl = elements[index - 1] as HTMLElement;
        previousEl.focus();
      }
    }
  };

  useElementListener('keydown', inputRef, onDocumentKeydown);
  useElementListener('keydown', ulRef, onDocumentKeydown);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    setDevice(value);
  };

  const handleButtonClose = () => {
    setDevice('');
  };


  return (
    <div data-testid="formElement" className={cn('form-search ', {'list-opened': device.length >= START_SEARCH})}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input data-testid="inputElement" ref={inputRef} className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" value={device} onChange={handleInputChange}/>
        </label>
        <ul ref={ulRef} className="form-search__select-list">
          {similarGoods !== undefined ?
            (<>{similarGoods.map((it) => (<Link data-testid="linkElement" key={`${it.id}similar`} to={`/camera/${it.id}`} tabIndex={0} id={it.name}><li ref={liRef} className="form-search__select-item" >{it.name} </li></Link>))}</>)
            : null}


        </ul>
      </form>
      <button className="form-search__reset" type="reset" style={device.length >= 1 ? {display: 'block'} : undefined} onClick={handleButtonClose}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>

  );
}

export default SearchForm;
export const SearchFormMemo = memo(SearchForm);
