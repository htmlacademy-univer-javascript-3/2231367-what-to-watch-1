import { createSlice } from '@reduxjs/toolkit';
import {setError, setFavoriteFilmsLength, setGenre} from '../action';
import {AppState} from '../../types/state';
import {getFilmsCurrentGenre} from '../../components/genres-catalog/genres-catalog';
import {changePromoFavoriteStatus, fetchFavoriteFilms, fetchFilms, fetchPromoFilm} from '../api-actions';
import {ALL_GENRES, ReducerType} from '../../consts';

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  favoriteFilms: [],
  error: null,
  favoriteFilmsLength: 0,
  currentGenre: ALL_GENRES,
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
        state.filteredFilms = getFilmsCurrentGenre(state.films, state.currentGenre);
      })
      .addCase(fetchFilms.pending, (state) => {
        state.dataIsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = state.films;
        state.dataIsLoading = false;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.dataIsLoading = false;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
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
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  },
});
