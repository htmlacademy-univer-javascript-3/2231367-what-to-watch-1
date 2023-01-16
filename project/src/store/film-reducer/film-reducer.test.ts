import {filmId1, films} from '../../mocks/films';
import {filmReducer} from './film-reducer';
import reviews from '../../mocks/reviews';
import {FilmState} from '../../types/state';
import {changeFilmFavoriteStatus, fetchFilm, fetchFilmReviews, fetchSimilarFilms} from '../api-actions';

const testFilm = films[0];
const testFilms = films;
const testReviews = reviews;
let state: FilmState;

describe('film-reducer', () => {
  beforeEach(() => {
    state = {
      film: null,
      comments: [],
      similar: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        film: null,
        comments: [],
        similar: [],
      });
  });

  describe('fetchFilm test', () => {
    it('should load film on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchFilm.fulfilled.type, payload: testFilm }).film).toEqual(testFilm);
    });
  });

  describe('fetchSimilarFilms test', () => {
    it('should load similar films on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchSimilarFilms.fulfilled.type, payload: testFilms }).similar)
        .toEqual(testFilms);
    });
  });

  describe('changeFilmFavoriteStatus test', () => {
    it('should update film favorite status if changeFilmFavoriteStatus fulfilled and id is similar', () => {
      const testFilm_ = filmId1;
      testFilm_.isFavorite = true;
      state.film = testFilm;
      expect(filmReducer.reducer(state, {type: changeFilmFavoriteStatus.fulfilled.type, payload: testFilm_}).film?.isFavorite)
        .toEqual(true);
    });
  });

  describe('fetchFilmReviews test', () => {
    it('should load reviews on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchFilmReviews.fulfilled.type, payload: testReviews }))
        .toMatchObject({
          comments: testReviews,
        });
    });
  });
});
