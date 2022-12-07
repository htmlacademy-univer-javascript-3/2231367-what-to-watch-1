import { createAction } from '@reduxjs/toolkit';
import {FimlType} from '../types/FilmType';

export const Action = {
  GET_FILMS: 'getFilms',
  SET_GENRE: 'setGenre',
  SET_LOADING: 'setLoading'
};

export const getFilms = createAction<FimlType[]>(Action.GET_FILMS);
export const setGenre = createAction<{genre: string}>(Action.SET_GENRE);
export const setLoading = createAction<boolean>(Action.SET_LOADING);
