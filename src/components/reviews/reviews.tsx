import { useEffect, useState} from 'react';
import cn from 'classnames';
import { STAR_COUNT } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getReviewsState, getCurrentReviewsState } from '../../store/goods-data/goods-data.selectors';
import { getArrayNextComments } from '../../utils/utils';
import { setCurrentReviews } from '../../store/goods-data/goods-data.slice';

function ReviewList(): JSX.Element {

  const reviews = useAppSelector(getReviewsState);
  const currentReviews = useAppSelector(getCurrentReviewsState);

  const dispatch = useAppDispatch();

  const initialState = getArrayNextComments(reviews);

  const options = {
    day: 'numeric',
    month: 'long',
  } as const;

  const dateConfig = (dateComment : string) => new Date(dateComment).toLocaleString('ru', options);

  const [comments, setComments] = useState(initialState);

  const commentsArray = getArrayNextComments(currentReviews, setComments);

  useEffect(() => {
    const newArray = [...reviews as []];
    newArray.splice(0, 3);
    dispatch(setCurrentReviews(newArray));

  }, [dispatch, reviews]);

  const handleButtonAddClick = () => {
    dispatch(setCurrentReviews(commentsArray()));
  };


  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
        </div>
        <ul className="review-block__list">


          {comments?.map((item) => (
            <li className="review-card" key={`${item.id}review`}>
              <div className="review-card__head">
                <p className="title title--h4">{item.userName}</p>
                <time className="review-card__data" dateTime="2022-04-13">{dateConfig(item.createAt)}</time>
              </div>
              <div className="rate review-card__rate">

                {Array.from({length: item.rating}).map((_, index) => index).map((it) => (
                  <svg key={`${it}-full-star`} width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                ))}

                {Array.from({length: STAR_COUNT - item.rating}).map((_, index) => index).map((itm) => (
                  <svg key={`${itm}-star`} width="17" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                ))}

                <p className="visually-hidden">Оценка: {item.rating}</p>
              </div>
              <ul className="review-card__list">

                <li className="item-list"><span className="item-list__title">Достоинства:</span>
                  <p className="item-list__text">{item.advantage}</p>
                </li>
                <li className="item-list"><span className="item-list__title">Недостатки:</span>
                  <p className="item-list__text">{item.disadvantage}</p>
                </li>
                <li className="item-list"><span className="item-list__title">Комментарий:</span>
                  <p className="item-list__text">{item.review}</p>
                </li>
              </ul>
            </li>
          ))}


        </ul>

        <div data-testid="buttonElement" className={cn('review-block__buttons', {'visually-hidden': !currentReviews?.length})}>
          <button onClick={handleButtonAddClick} className="btn btn--purple " type="button">Показать больше отзывов
          </button>
        </div>

      </div>
    </section>
  );
}

export default ReviewList;
