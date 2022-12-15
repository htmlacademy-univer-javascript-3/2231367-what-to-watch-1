import {Fragment, useState} from 'react';
import {FimlType} from '../../types/FilmType';
import Logo from '../../components/logo/logo';
import GenresCatalog, {
  GetAllExistingGenres,
  GetFilmsCurrentGenre,
} from '../../components/genres-catalog/genres-catalog';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import ShowMore from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import {useAppSelector} from '../../hooks';

const LIST_STEP_COUNT = 8;

type MainPageProps = {
  selectedFilm: FimlType,
}

function MainPage(props: MainPageProps): JSX.Element {
  const [filmListCount, addFilmListCount] = useState(LIST_STEP_COUNT),
    showMoreClickHandler = () => {
      addFilmListCount(filmListCount + LIST_STEP_COUNT);
    },
    {films, genre, isLoading} = useAppSelector((selector) => selector),
    filmsCurrentGenre = GetFilmsCurrentGenre(films, genre);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={props.selectedFilm.backgroundImage} alt={props.selectedFilm.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <UserBlock />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={props.selectedFilm.posterImage} alt={`${props.selectedFilm.name } poster`} width="218"
                height="327"
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{props.selectedFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.selectedFilm.genre}</span>
                <span className="film-card__year">{props.selectedFilm.released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresCatalog genres={GetAllExistingGenres(films)} selectedGenre={genre}/>
          <FilmList filmList={filmsCurrentGenre.slice(0, filmListCount)} />
          {filmsCurrentGenre.length > filmListCount && <ShowMore onClick={showMoreClickHandler}/>}
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default MainPage;
