import {createAction} from '@reduxjs/toolkit';
import {FimlType} from '../types/FilmType';
import {AuthorizationStatus} from '../types/AuthorizationStatus';
import {UserType} from '../types/UserType';

export const Action = {
  GET_FILMS: 'getFilms',
  SET_GENRE: 'setGenre',
  SET_LOADING: 'setLoading',
  SET_USER_INFO: 'setUserInfo',
  SET_AUTHORIZATION_STATUS: 'setAuthorizationStatus',
};

export const getFilms = createAction<FimlType[]>(Action.GET_FILMS);
export const setGenre = createAction<{genre: string}>(Action.SET_GENRE);
export const setLoading = createAction<boolean>(Action.SET_LOADING);
export const setUserInfo = createAction<UserType | null>(Action.SET_USER_INFO);
export const setAuthorizationStatus = createAction<AuthorizationStatus>(Action.SET_AUTHORIZATION_STATUS);
