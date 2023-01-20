import {Fragment, useEffect, useState} from 'react';
import Logo from '../../components/logo/logo';
import GenresCatalog, {getAllExistingGenres,} from '../../components/genres-catalog/genres-catalog';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import ShowMore from '../../components/show-more/show-more';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, LIST_STEP_COUNT} from '../../consts';
import {changePromoFavoriteStatus, fetchFavoriteFilms} from '../../store/api-actions';
import {setFavoriteFilmsLength} from '../../store/action';
import {
  getCurrentGenre,
  getFavoriteFilmsLength,
  getFilms,
  getFilteredFilms,
  getPromoFilm
} from '../../store/main-reducer/selector';
import {getAuthorizationStatus} from '../../store/user-reducer/selector';

function MainPage(): JSX.Element {
  const promoFilm = useAppSelector(getPromoFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilmsLength = useAppSelector(getFavoriteFilmsLength);
  const currentGenre = useAppSelector(getCurrentGenre);
  const films = useAppSelector(getFilms);
  const filmsCurrentGenre = useAppSelector(getFilteredFilms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const [filmListCount, addFilmListCount] = useState(LIST_STEP_COUNT),
    showMoreClickHandler = () => {
      addFilmListCount(filmListCount + LIST_STEP_COUNT);
    };
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
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                <button type='button' className='btn btn--list film-card__button' onClick={
                  authorizationStatus === AuthorizationStatus.Authorized ?
                    handleAddFavorite :
                    () => navigate(AppRoute.SignIn)
                }
                >
                  {promoFilm?.isFavorite || (authorizationStatus === AuthorizationStatus.NonAuthorized) ? (
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresCatalog genres={getAllExistingGenres(films)} selectedGenre={currentGenre} setFilmListCount={addFilmListCount}/>
          <FilmList filmList={filmsCurrentGenre.slice(0, filmListCount)} />
          {filmsCurrentGenre.length > filmListCount && <ShowMore onClick={showMoreClickHandler}/>}
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default MainPage;
