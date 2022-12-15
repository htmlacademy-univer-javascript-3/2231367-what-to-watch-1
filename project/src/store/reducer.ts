import {createReducer} from '@reduxjs/toolkit';
import {setAuthorizationStatus, getFilms, setGenre, setLoading, setUserInfo} from './action';
import {FimlType} from '../types/FilmType';
import {AuthorizationStatus} from '../types/AuthorizationStatus';
import {UserType} from '../types/UserType';

const initialState: {
  films: FimlType[];
  genre: string;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserType | null;
} = {
  genre: 'All genres',
  films: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      const films = action.payload;
      state.films = films;
    })
    .addCase(setGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.user = action.payload;
    });
});
