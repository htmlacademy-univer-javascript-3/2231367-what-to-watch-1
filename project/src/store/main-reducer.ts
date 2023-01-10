import { createSlice } from '@reduxjs/toolkit';
// import { TIMEOUT_SHOW_ERROR } from '../const';
// import getFilmsByGenre from '../helpers/get-films-by-genre';
// import { AppState } from '../types/app-state.type';
// import AuthStatus from '../types/auth-status.enum';
import {
  setGenre
  // clearError,
  // resetShownFilms,
  // setError,
  // showMoreFilms,
} from './action';
import {AppState} from "../types/StateType";
import {GetFilmsCurrentGenre} from "../components/genres-catalog/genres-catalog";
import {fetchFilmsAction, getPromoFilm} from "./api-actions";

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  currentGenre: 'All genres',
  shownCount: 0,
  dataIsLoading: false,
  // error: null,
  promo: null,
};

export const mainReducer = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.currentGenre = action.payload.genre;
        state.filteredFilms = GetFilmsCurrentGenre(state.films, state.currentGenre);
      })
      // .addCase(showMoreFilms, (state) => {
      //   state.shownCount =
      //     state.shownCount + 8 < state.filteredFilms.length
      //       ? state.shownCount + 8
      //       : state.filteredFilms.length;
      // })
      // .addCase(resetShownFilms, (state) => {
      //   state.shownCount =
      //     state.filteredFilms.length > 8 ? 8 : state.filteredFilms.length;
      // })
      // .addCase(setError, (state, action) => {
      //   state.error = action.payload;
      // })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.dataIsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.shownCount = state.films.length > 8 ? 8 : state.films.length;
        state.filteredFilms = state.films;
        state.dataIsLoading = false;
      })
      .addCase(getPromoFilm.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
