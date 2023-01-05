import Logo from '../../components/logo/logo';
import {FimlType} from '../../types/FilmType';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import UserBlock from '../../components/user-block/user-block';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AppRoute} from '../../types/AppRoute';
import {getFilm} from '../../store/api-actions';

function AddReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const [film, setFilm] = useState<FimlType | null>();
  const navigate = useNavigate();
  useEffect(() => {
    getFilm(id).then(({ data }) => {
      if (data) {
        setFilm(data);
      } else {
        navigate(AppRoute.NotFound);
      }
    });
  }, [id]);

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
