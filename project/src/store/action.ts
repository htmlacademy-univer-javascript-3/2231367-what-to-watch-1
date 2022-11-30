import { createAction } from '@reduxjs/toolkit';
import {FimlType} from '../types/FilmType';

export const Action = {
  GET_FILMS: 'getFilms',
  SET_GENRE: 'setGenre',
};

export const getFilms = createAction<{films: FimlType[]}>(Action.GET_FILMS);
export const setGenre = createAction<{genre: string}>(Action.SET_GENRE);
