import {FimlType} from '../../types/FilmType';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

type FilmListProps = {
  filmList: FimlType[]
}

function FilmList(props: FilmListProps) {
  const list = [];
  const [, setActiveFilmCard] = useState(-1);
  const setActive = (id: number) => {
    setActiveFilmCard(id);
  };
  for (const film of props.filmList) {
    list.push(
      <FilmCard
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
