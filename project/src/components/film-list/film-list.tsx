import {Film} from '../../types/film';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

type FilmListProps = {
  filmList: Film[];
  currentFilm?: Film;
}

function FilmList(props: FilmListProps) {
  const filmCards = [];
  const [, setActive] = useState<number | null>(null);
  for (const film of props.filmList) {
    if (film.id === props.currentFilm?.id) {
      continue;
    }
    filmCards.push(
      <FilmCard key={`film-card-${film.id}`}
        film={film}
        onHover={setActive}
        data-testid='film-card'
      />
    );
  }
  return (
    <div className="catalog__films-list" data-testid='film-list'>
      {filmCards}
    </div>
  );
}

export default FilmList;
