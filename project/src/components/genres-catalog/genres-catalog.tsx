import React, {Dispatch, SetStateAction} from 'react';
import Genre from '../genre/genre';
import {Film} from '../../types/film';

type GenresCatalogProps = {
  genres: string[],
  selectedGenre: string,
  setFilmListCount: Dispatch<SetStateAction<number>>;
};

function GenresCatalog(props: GenresCatalogProps): JSX.Element {
  return (
    <ul className='catalog__genres-list' data-testid={'genres-catalog'}>
      {props.genres.slice(0,10).map((genre) => (
        <Genre key={`genre-${genre}`} genre={genre} isCurrent={props.selectedGenre === genre}
          setFilmListCount={props.setFilmListCount}
        />
      ))}
    </ul>
  );
}

export function getAllExistingGenres(films: Film[]): string[] {
  const genres = new Set<string>(['All genres']);
  for (const film of films) {
    genres.add(film.genre);
  }
  return [...genres];
}

export function getFilmsCurrentGenre(films: Film[], genre: string): Film[] {
  return genre === 'All genres' ? films : films.filter((movies) => movies.genre === genre);
}

export default GenresCatalog;
