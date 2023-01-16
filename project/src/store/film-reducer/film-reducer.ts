import { createSlice } from '@reduxjs/toolkit';
import {changeFilmFavoriteStatus, fetchFilm, fetchFilmReviews, fetchSimilarFilms} from '../api-actions';
import {FilmState} from '../../types/state';
import {ReducerType} from '../../consts';

const initialState: FilmState = {
  film: null,
  comments: [],
  similar: []
};

export const filmReducer = createSlice({
  name: ReducerType.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilmReviews.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
