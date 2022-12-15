import Logo from '../../components/logo/logo';
import {FimlType} from '../../types/FilmType';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import UserBlock from '../../components/user-block/user-block';

type MyListPageProps = {
  films: FimlType[];
}

function MyListPage(props: MyListPageProps): JSX.Element {
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
          <FilmList filmList={props.films} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListPage;
