import React, {Dispatch, SetStateAction} from 'react';
import Genre from '../genre/genre';
import {FimlType} from '../../types/FilmType';

type GenresCatalogProps = {
  genres: string[],
  selectedGenre: string,
  setFilmListCount: Dispatch<SetStateAction<number>>;
};

function GenresCatalog(props: GenresCatalogProps): JSX.Element {
  return (
    <ul className='catalog__genres-list' data-testid={'genres-catalog'}>
      {props.genres.map((genre) => (
        <Genre key={genre} genre={genre} isCurrent={props.selectedGenre === genre}
          setFilmListCount={props.setFilmListCount}
        />
      ))}
    </ul>
  );
}

export default GenresCatalog;

export function GetAllExistingGenres(films: FimlType[]): string[] {
  const genres = new Set<string>(['All genres']);
  films.map((film) => {
    genres.add(film.genre);
  });
  return [...genres];
}

export function GetFilmsCurrentGenre(films: FimlType[], genre: string): FimlType[] {
  return genre === 'All genres' ? films : films.filter((movies) => movies.genre === genre);
}
