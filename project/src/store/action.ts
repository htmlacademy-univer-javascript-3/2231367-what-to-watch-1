import {createAction} from '@reduxjs/toolkit';

export const Action = {
  SET_GENRE: 'setGenre',
  SET_FAVORITE_FILMS_LENGTH: 'setFavoriteFilmsLength',
};

export const setGenre = createAction<{genre: string}>(Action.SET_GENRE);
export const setFavoriteFilmsLength = createAction<number>(Action.SET_FAVORITE_FILMS_LENGTH);
