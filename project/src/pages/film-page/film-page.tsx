import {Fragment, useEffect} from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import {Link, useParams} from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus, ReducerType} from '../../consts';
import {
  changeFilmFavoriteStatus,
  fetchFavoriteFilms,
  fetchFilm,
  fetchFilmReviews,
  fetchSimilarFilms
} from '../../store/api-actions';
import {setFavoriteFilmsLength} from '../../store/action';

function FilmPage(): JSX.Element {
  const currentFilmId = Number(useParams().id);
  const currentFilm = useAppSelector((state) => state[ReducerType.Film].film);
  const similarFilms = useAppSelector((state) => state[ReducerType.Film].similar);
  const authorizationStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);
  const favoriteFilmsLength = useAppSelector((state) => state[ReducerType.Main].favoriteFilmsLength);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilm(currentFilmId.toString()));
    dispatch(fetchSimilarFilms(currentFilmId.toString()));
    dispatch(fetchFilmReviews(currentFilmId.toString()));
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [currentFilmId, dispatch, authorizationStatus]);
  const handleAddFavorite = () => {
    dispatch(
      changeFilmFavoriteStatus({
        filmId: currentFilm?.id || NaN,
        status: currentFilm?.isFavorite ? 0 : 1,
      })
    );
    if (currentFilm?.isFavorite) {
      dispatch(setFavoriteFilmsLength(favoriteFilmsLength - 1));
    } else {
      dispatch(setFavoriteFilmsLength(favoriteFilmsLength + 1));
    }
  };
  if (!currentFilm) {
    return <NotFoundPage/>;
  }
  return (
    <Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <UserBlock />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link to={`/player/${currentFilmId}`} type='button' className='btn btn--play film-card__button'>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                <button type='button' className='btn btn--list film-card__button' onClick={handleAddFavorite}>
                  {currentFilm?.isFavorite && (authorizationStatus === AuthorizationStatus.Authorized) ? (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#in-list"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                  )}
                  <span>My list</span>
                  <span className="film-card__count">{authorizationStatus === AuthorizationStatus.Authorized ? favoriteFilmsLength : 0}</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Authorized &&
                  <Link to={`/films/${currentFilm.id}/review`} type='button' className="btn film-card__button">
                    Add review
                  </Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={currentFilm.name} width="218" height="327"/>
            </div>
            <div className="film-card__desc">
              <Tabs film={currentFilm}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList filmList={similarFilms} currentFilm={currentFilm}/>
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default FilmPage;
