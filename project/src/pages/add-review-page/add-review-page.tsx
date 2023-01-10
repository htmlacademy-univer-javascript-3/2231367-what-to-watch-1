import Logo from '../../components/logo/logo';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import UserBlock from '../../components/user-block/user-block';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {AuthorizationStatus, ReducerType} from '../../consts';
import {getFilm} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';

function AddReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector((state) => state[ReducerType.Film].film);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFilm(id.toString()));
  }, [id, dispatch]);
  const authStatus = useAppSelector(
    (state) => state.userReducer.authorizationStatus
  );
  if (authStatus === AuthorizationStatus.NonAuthorized) {
    return <Navigate to={'/'} />;
  }
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${film?.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={`${film?.name} poster`} width="218" height="327" />
        </div>
      </div>
      <div className="add-review">
        <AddReviewForm />
      </div>
    </section>
  );
}

export default AddReviewPage;
