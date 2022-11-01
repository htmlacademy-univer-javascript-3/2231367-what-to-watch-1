import {FimlType} from '../../types/FilmType';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: FimlType
  onHover: (id: number) => void
}

function FilmCard(props: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => {props.onHover(props.film.id);}}
      onMouseLeave={() => {props.onHover(-1);}}
    >
      <div className="small-film-card__image">
        <img src={props.film.img} alt={props.film.title} width='280' height='175'/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.film.id}`}>{props.film.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
