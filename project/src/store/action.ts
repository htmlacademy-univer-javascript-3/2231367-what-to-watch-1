import {createAction} from '@reduxjs/toolkit';

export const Action = {
  setGenre: 'setGenre',
  setFavoriteFilmsLength: 'setFavoriteFilmsLength',
  setDataIsLoading: 'setDataIsLoading',
  setError: 'setError',
};

export const setGenre = createAction<{genre: string}>(Action.setGenre);
export const setFavoriteFilmsLength = createAction<number>(Action.setFavoriteFilmsLength);
export const setDataIsLoading = createAction<boolean>(Action.setDataIsLoading);
export const setError = createAction<string|null>(Action.setError);
