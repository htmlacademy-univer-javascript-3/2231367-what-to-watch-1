import {Fragment} from 'react';
import {FimlType} from '../../types/FilmType';

type OverviewTabProps = {
  film: FimlType;
}

function OverviewTab(props: OverviewTabProps): JSX.Element {
  const {film} = props;
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingLevel(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>
          {film.description}
        </p>
        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {film.starring.join(', ')} and other</strong>
        </p>
      </div>
    </Fragment>
  );
}

export default OverviewTab;

function getRatingLevel(rating: number): string {
  if (rating < 3) {
    return 'Bad';
  }
  if (rating < 5) {
    return 'Normal';
  }
  if (rating < 8) {
    return 'Good';
  }
  if (rating < 10) {
    return 'Very good';
  }
  return 'Awesome';
}
