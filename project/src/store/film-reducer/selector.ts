import {State} from '../../types/state';
import {Film} from '../../types/film';
import {ReducerType} from '../../consts';
import {Review} from '../../types/review';

export const getFilm = (state: State): Film | null => state[ReducerType.Film].film;
export const getSimilarFilms = (state: State): Film[] => state[ReducerType.Film].similar;
export const getReviews = (state: State): Review[] => state[ReducerType.Film].comments;
