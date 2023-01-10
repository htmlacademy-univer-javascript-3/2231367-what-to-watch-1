import {createAction} from '@reduxjs/toolkit';

export const Action = {
  GET_FILMS: 'getFilms',
  SET_GENRE: 'setGenre',
  SET_LOADING: 'setLoading',
  SET_USER_INFO: 'setUserInfo',
  SET_AUTHORIZATION_STATUS: 'setAuthorizationStatus',
};

export const setGenre = createAction<{genre: string}>(Action.SET_GENRE);
