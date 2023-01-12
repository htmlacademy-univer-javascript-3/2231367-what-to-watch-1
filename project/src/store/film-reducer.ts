import { createSlice } from '@reduxjs/toolkit';
import {changeFilmFavoriteStatus, getFilm, getFilmReviews, getSimilarFilms} from './api-actions';
import {FilmState} from '../types/StateType';
import {ReducerType} from '../consts';

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
      .addCase(getFilm.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(getFilmReviews.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getSimilarFilms.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
