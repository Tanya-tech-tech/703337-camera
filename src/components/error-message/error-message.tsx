import './error-message.css';
import { getErrorState } from '../../store/goods-data/goods-data.selectors';
import { useAppSelector } from '../../hooks';
import { Fragment } from 'react';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getErrorState)?.split('.');

  return (error)
    ? <div data-testid="errorElement" style={{position:'fixed', textAlign: 'center', zIndex: '1002'}} className='error-message'>{error?.map((item) => <Fragment key={item.slice(1, -1)}>{item}.<br/></Fragment>)}</div>
    : null;

}

export default ErrorMessage;
