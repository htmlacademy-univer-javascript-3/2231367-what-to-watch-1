import { createSlice } from '@reduxjs/toolkit';
import {getFilm, getFilmReviews, getSimilarFilms} from "./api-actions";
import {FilmState} from "../types/StateType";

const initialState: FilmState = {
  film: null,
  comments: [],
  similar: []
}

export const filmReducer = createSlice({
  name: 'filmReducer',
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
      });
  },
});
