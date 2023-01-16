import {store} from '../store';
import {Film} from './film';
import {AuthorizationStatus} from '../consts';
import {Review} from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppState = {
  films: Film[],
  dataIsLoading: boolean,
  // error: string | null,
  promo: Film | null,
  currentGenre: string,
  filteredFilms: Film[],
  favoriteFilms: Film[],
  favoriteFilmsLength: number,
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  avatar: string | null
}

export type FilmState = {
  film: Film | null,
  comments: Review[],
  similar: Film[],
}
