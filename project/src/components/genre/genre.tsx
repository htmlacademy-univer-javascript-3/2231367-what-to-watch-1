import React, {Dispatch, SetStateAction} from 'react';
import {useAppDispatch} from '../../hooks';
import {setGenre} from '../../store/action';

type GenreProps = {
  genre: string,
  isCurrent: boolean,
  setFilmListCount: Dispatch<SetStateAction<number>>;
};

function Genre(props: GenreProps): JSX.Element {
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(setGenre({genre: props.genre}));
    props.setFilmListCount(8);
  };

  return (
    <li className={`catalog__genres-item ${props.isCurrent ? 'catalog__genres-item--active' : ''}`}
      data-testid={`${props.isCurrent ? 'genre active' : 'genre inactive'}`}
    >
      <a href={'#catalog'} className='catalog__genres-link' onClick={clickHandler}>{props.genre}</a>
    </li>
  );
}

export default Genre;
