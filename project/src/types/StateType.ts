import {store} from '../store';
import {FimlType} from './FilmType';
import {AuthorizationStatus} from '../consts';
import {Review} from './ReviewType';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppState = {
  films: FimlType[],
  dataIsLoading: boolean,
  // error: string | null,
  promo: FimlType | null,
  currentGenre: string,
  filteredFilms: FimlType[],
  favoriteFilms: FimlType[],
  favoriteFilmsLength: number,
  shownCount: number,
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  avatar: string | null
}

export type FilmState = {
  film: FimlType | null,
  comments: Review[],
  similar: FimlType[],
}
