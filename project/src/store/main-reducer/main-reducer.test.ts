import {films} from '../../mocks/films';
import {mainReducer} from './main-reducer';
import {AppState} from '../../types/state';
import {fetchFavoriteFilms, fetchFilmsAction, getPromoFilm} from '../api-actions';
import {ALL_GENRES} from '../../consts';
import {setGenre} from '../action';

const testFilm = films[0];
const testFilms = films;
let state: AppState;

describe('Main reducer', () => {
  beforeEach(() => {
    state = {
      films: [],
      filteredFilms: [],
      currentGenre: ALL_GENRES,
      shownCount: 0,
      dataIsLoading: false,
      promo: null,
      favoriteFilms: [],
      favoriteFilmsLength: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });

  describe('changeGenre test', () => {
    it('should sort films by genre', () => {
      for(const genre of mainReducer
        .reducer(state, { type: setGenre.type, payload: testFilm.genre })
        .filteredFilms
        .map((film) => film.genre)
      ) {
        expect(genre).toEqual(testFilm.genre);
      }
    });
  });

  describe('fetchFilmsAction test', () => {
    it('load all films', () => {
      expect(mainReducer.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: testFilms }).films).toEqual(testFilms);
    });
  });

  describe('getPromoFilm test', () => {
    it('load promo film', () => {
      expect(mainReducer.reducer(state, { type: getPromoFilm.fulfilled.type, payload: testFilm }).promo).toEqual(testFilm);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('load promo film', () => {
      expect(mainReducer.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: testFilms }).favoriteFilms).toEqual(testFilms);
    });
  });
});
