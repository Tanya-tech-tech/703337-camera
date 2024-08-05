import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{textAlign: 'center'}}>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundPage;
