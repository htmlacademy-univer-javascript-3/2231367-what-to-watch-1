import Logo from '../../components/logo/logo';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import UserBlock from '../../components/user-block/user-block';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {fetchFilm} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setDataIsLoading} from '../../store/action';
import {getFilm} from '../../store/film-reducer/selector';
import {getAuthorizationStatus} from '../../store/user-reducer/selector';

function AddReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const currentFilm = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setDataIsLoading(true));
    dispatch(fetchFilm(id.toString()));
    dispatch(setDataIsLoading(true));
  }, [id, dispatch]);
  if (authorizationStatus === AuthorizationStatus.NonAuthorized) {
    return <Navigate to={AppRoute.SignIn} />;
  }
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm?.backgroundImage} alt={currentFilm?.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm?.id}`} className="breadcrumbs__link">{currentFilm?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm?.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <UserBlock />
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm?.posterImage} alt={`${currentFilm?.name} poster`} width="218" height="327" />
        </div>
      </div>
      <div className="add-review">
        <AddReviewForm />
      </div>
    </section>
  );
}

export default AddReviewPage;
