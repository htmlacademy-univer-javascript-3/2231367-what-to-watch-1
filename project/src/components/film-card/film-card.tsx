import {FimlType} from "../../types/FilmType";
import {Link} from "react-router-dom";

type FilmCardProps = {
  film: FimlType
}

function FilmCard(props: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.film.img} alt={props.film.title}/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.film.id}`}>{props.film.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
