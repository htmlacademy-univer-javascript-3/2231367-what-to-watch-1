import React, {Dispatch, SetStateAction} from 'react';
import {store} from '../../store';
import {setGenre} from '../../store/action';

type GenreProps = {
  genre: string,
  isCurrent: boolean,
  setFilmListCount: Dispatch<SetStateAction<number>>;
};

function Genre(props: GenreProps): JSX.Element {
  const clickHandler = () => {
    store.dispatch(setGenre({genre: props.genre}));
    props.setFilmListCount(8);
  };

  return (
    <li className={`catalog__genres-item ${props.isCurrent ? 'catalog__genres-item--active' : ''}`}>
      <a href='#' className='catalog__genres-link' onClick={clickHandler}>{props.genre}</a>
    </li>
  );
}

export default Genre;
