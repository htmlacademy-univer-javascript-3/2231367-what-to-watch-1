import {FimlType} from '../../types/FilmType';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

type FilmListProps = {
  filmList: FimlType[];
  currentFilm?: FimlType;
}

function FilmList(props: FilmListProps) {
  const list = [];
  const [, setActive] = useState<number | null>(null);
  for (const film of props.filmList) {
    if (film.id === props.currentFilm?.id) {
      continue;
    }
    list.push(
      <FilmCard key={`film-card-${film.id}`}
        film={film}
        onHover={setActive}
      />
    );
  }
  return (
    <div className="catalog__films-list">
      {list}
    </div>
  );
}

export default FilmList;
