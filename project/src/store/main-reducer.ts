import { createSlice } from '@reduxjs/toolkit';
import {setFavoriteFilmsLength, setGenre} from './action';
import {AppState} from '../types/StateType';
import {GetFilmsCurrentGenre} from '../components/genres-catalog/genres-catalog';
import {changePromoFavoriteStatus, fetchFavoriteFilms, fetchFilmsAction,
  getPromoFilm} from './api-actions';
import {ALL_GENRES, ReducerType} from '../consts';

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  favoriteFilms: [],
  favoriteFilmsLength: 0,
  currentGenre: ALL_GENRES,
  shownCount: 0,
  dataIsLoading: false,
  promo: null,
};

export const mainReducer = createSlice({
  name: ReducerType.Main,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.currentGenre = action.payload.genre;
        state.filteredFilms = GetFilmsCurrentGenre(state.films, state.currentGenre);
      })
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
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteFilmsLength = state.favoriteFilms.length;
        state.dataIsLoading = false;
      })
      .addCase(changePromoFavoriteStatus.fulfilled, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(setFavoriteFilmsLength, (state, action) => {
        state.favoriteFilmsLength = action.payload;
      });
  },
});
