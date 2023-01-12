import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus, ReducerType} from '../../consts';
import {useEffect} from 'react';
import {fetchFavoriteFilms} from '../../store/api-actions';

function MyListPage(): JSX.Element {
  const films = useAppSelector((state) => state[ReducerType.Main].favoriteFilms);
  const authorizationStatus = useAppSelector((state) => state.userReducer.authorizationStatus);
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
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <UserBlock />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          <FilmList filmList={films} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
