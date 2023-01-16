import {createAction} from '@reduxjs/toolkit';

export const Action = {
  setGenre: 'setGenre',
  setFavoriteFilmsLength: 'setFavoriteFilmsLength',
};

export const setGenre = createAction<{genre: string}>(Action.setGenre);
export const setFavoriteFilmsLength = createAction<number>(Action.setFavoriteFilmsLength);
