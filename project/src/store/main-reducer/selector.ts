import {State} from '../../types/state';
import {Film} from '../../types/film';
import {ReducerType} from '../../consts';

export const getFilms = (state: State): Film[] => state[ReducerType.Main].films;
export const getFilteredFilms = (state: State): Film[] => state[ReducerType.Main].filteredFilms;
export const getFavoriteFilms = (state: State): Film[] => state[ReducerType.Main].favoriteFilms;
export const getFavoriteFilmsLength = (state: State): number => state[ReducerType.Main].favoriteFilmsLength;
export const getError = (state: State): string | null => state[ReducerType.Main].error;
export const getCurrentGenre = (state: State): string => state[ReducerType.Main].currentGenre;
export const getDataIsLoading = (state: State): boolean => state[ReducerType.Main].dataIsLoading;
export const getPromoFilm = (state: State): Film | null => state[ReducerType.Main].promo;
