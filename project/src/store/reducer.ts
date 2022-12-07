import {createReducer} from '@reduxjs/toolkit';
import {setGenre, getFilms, setLoading } from './action';
import {FimlType} from '../types/FilmType';

const f : FimlType[] = [];
const initialState = {
  films: f,
  genre: 'All genres',
  isLoading: false,
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
    });
});
