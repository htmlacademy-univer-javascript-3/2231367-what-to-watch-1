import {mockFilms} from '../mocks/films';
import {createReducer} from '@reduxjs/toolkit';
import {getFilms, setGenre} from './action';

const initialState = {
  films: mockFilms,
  genre: 'All genres',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilms, (state, action) => {
      const { films } = action.payload;
      state.films = films;
    })
    .addCase(setGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    });
});
