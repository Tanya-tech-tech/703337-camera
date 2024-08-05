import { useState, memo } from 'react';
import { getUpperCaseFirstLetter } from '../../utils/utils';
import { GoodsLevel } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrice, removeLevel, setLevel } from '../../store/filter-process/filter-process.slice';
import { getInitialSortState } from '../../store/sort-process/sort-process.selectors';


type LevelProps = {
  level: string;
}

function FilterLevel({level} : LevelProps): JSX.Element {
  const dispatch = useAppDispatch();

  const initialSort = useAppSelector(getInitialSortState);
  const [initialFrom] = initialSort;
  const initialTo = initialSort[initialSort.length - 1];
  const newLevel = level.replace(/-/g, '') as keyof typeof currentType;
  const newName = getUpperCaseFirstLetter(newLevel) as keyof typeof GoodsLevel;

  const [currentType, setCurrentType] = useState({
    zero: false,
    nonprofessional: false,
    professional: false,
  });

  const handleTypeChange = () => {
    setCurrentType((prev) => {

      const newValue = prev[newLevel];
      return {...prev, [newLevel]: !newValue};
    });
    const enumName = getUpperCaseFirstLetter(newName);

    for(const keyLevel in GoodsLevel){
      if(keyLevel === enumName && !currentType[newLevel]){
        dispatch(setLevel(GoodsLevel[enumName as keyof typeof GoodsLevel]));
      } else if(keyLevel === enumName && currentType[newLevel]){
        dispatch(removeLevel(GoodsLevel[enumName as keyof typeof GoodsLevel]));
      }
    }
    dispatch(setPrice({from: String(initialFrom.price), to: String(initialTo.price)}));
  };

  return (
    <div key={`level-${level}`} className="custom-checkbox catalog-filter__item">
      <label>
        <input data-testid="inputLevelElement" type="checkbox" name={level} checked={currentType[newLevel]} onChange={handleTypeChange}/>
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{GoodsLevel[newName]}</span>
      </label>
    </div>

  );
}

export default FilterLevel;
export const FilterLevelMemo = memo(FilterLevel, (prevProps, nextProps) => prevProps.level === nextProps.level);

