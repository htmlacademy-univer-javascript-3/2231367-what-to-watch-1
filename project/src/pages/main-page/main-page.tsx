import {Fragment, useEffect, useState} from 'react';
import Logo from '../../components/logo/logo';
import GenresCatalog, {
  getAllExistingGenres,
  getFilmsCurrentGenre,
} from '../../components/genres-catalog/genres-catalog';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import ShowMore from '../../components/show-more/show-more';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link} from 'react-router-dom';
import {AppRoute, LIST_STEP_COUNT, ReducerType} from '../../consts';
import {changePromoFavoriteStatus, fetchFavoriteFilms} from '../../store/api-actions';
import {setFavoriteFilmsLength} from '../../store/action';
import {AuthorizationStatus} from '../../consts';

function MainPage(): JSX.Element {
  const promoFilm = useAppSelector((state) => state[ReducerType.MAIN].promo);
  const authorizationStatus = useAppSelector((state) => state[ReducerType.USER].authorizationStatus);
  const favoriteFilmsLength = useAppSelector((state) => state[ReducerType.MAIN].favoriteFilmsLength);
  const genre = useAppSelector((state) => state[ReducerType.MAIN].currentGenre);
  const films = useAppSelector((state) => state[ReducerType.MAIN].films);
  const isLoading = useAppSelector((state) => state[ReducerType.MAIN].dataIsLoading);
  const dispatch = useAppDispatch();
  const handleAddFavorite = () => {
    dispatch(changePromoFavoriteStatus({
      filmId: promoFilm?.id || NaN,
      status: promoFilm?.isFavorite ? 0 : 1
    }));
    if (promoFilm?.isFavorite) {
      dispatch(setFavoriteFilmsLength(Number(favoriteFilmsLength) - 1));
    } else {
      dispatch(setFavoriteFilmsLength(Number(favoriteFilmsLength) + 1));
    }
  };
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [dispatch, authorizationStatus]);
  const filmsCurrentGenre = getFilmsCurrentGenre(films, genre);
  const [filmListCount, addFilmListCount] = useState(LIST_STEP_COUNT),
    showMoreClickHandler = () => {
      addFilmListCount(filmListCount + LIST_STEP_COUNT);
    };
  if (isLoading || !promoFilm) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={`${promoFilm?.name } poster`} width="218" height="327"/>
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>
              <div className="film-card__buttons">
                <Link to={`player/${promoFilm?.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <Link to={authorizationStatus === AuthorizationStatus.Authorized ? AppRoute.MyList : AppRoute.SignIn}
                  type='button' className='btn btn--list film-card__button' onClick={handleAddFavorite}
                >
                  {promoFilm?.isFavorite || (authorizationStatus === AuthorizationStatus.NonAuthorized) ? (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  )}
                  <span>My list</span>
                  <span className="film-card__count">{authorizationStatus === AuthorizationStatus.Authorized ? favoriteFilmsLength : 0}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresCatalog genres={getAllExistingGenres(films)} selectedGenre={genre} setFilmListCount={addFilmListCount}/>
          <FilmList filmList={filmsCurrentGenre.slice(0, filmListCount)} />
          {filmsCurrentGenre.length > filmListCount && <ShowMore onClick={showMoreClickHandler}/>}
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default MainPage;
