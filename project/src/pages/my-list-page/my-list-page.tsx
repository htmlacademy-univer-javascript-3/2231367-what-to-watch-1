import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../consts';
import {useEffect} from 'react';
import {fetchFavoriteFilms} from '../../store/api-actions';
import FilmCard from '../../components/film-card/film-card';
import {getFavoriteFilms, getFavoriteFilmsLength} from '../../store/main-reducer/selector';
import {getAuthorizationStatus} from '../../store/user-reducer/selector';

function MyListPage(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilmsLength = useAppSelector(getFavoriteFilmsLength);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Authorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [authorizationStatus, dispatch]);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsLength}</span></h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteFilms.map((film) => <FilmCard key={`film-card-${film.id}`} film={film}/>)}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
