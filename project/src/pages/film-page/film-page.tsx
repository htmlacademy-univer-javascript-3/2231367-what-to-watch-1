import {Fragment} from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import {FimlType} from '../../types/FilmType';
import {Link, useParams} from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import {getFilmById} from '../../mocks/films';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../../components/user-block/user-block';

type FilmPageProps = {
  films: FimlType[];
};

function FilmPage(props: FilmPageProps): JSX.Element {
  const currentFilmId = useParams().id;
  const currentFilm = getFilmById(Number(currentFilmId));
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
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <Link to={'/mylist'} type='button' className='btn btn--list film-card__button'>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </Link>
                <Link to={`/films/${currentFilm.id}/review`} type='button' className="btn film-card__button">Add review</Link>
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
              <Tabs film={currentFilm}></Tabs>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList
            filmList={props.films.filter((film) => film !== currentFilm && film.genre === currentFilm.genre).slice(0, 4)}
          />
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default FilmPage;
