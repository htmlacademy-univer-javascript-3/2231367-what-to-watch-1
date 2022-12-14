import {createAsyncThunk} from '@reduxjs/toolkit';
import {StateType} from '../types/StateType';
import {APIRoute} from '../consts';
import {AuthorizationData} from '../types/AuthorizationData';
import {UserType} from '../types/UserType';
import {FimlType} from '../types/FilmType';
import {api} from './index';
import {Review} from '../types/ReviewType';

export const fetchFilmsAction = createAsyncThunk<FimlType[], undefined, {
  state: StateType,
}>(
  'fetchFilms',
  async (_arg) => {
    const {data} = await api.get<FimlType[]>('/films');
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserType, undefined, {
  state: StateType;
}>(
  'checkAuth',
  async (_arg) => {
    const {data} = await api.get(APIRoute.LOGIN);
    return data;
  });

export const loginAction = createAsyncThunk<UserType, AuthorizationData, {
  state: StateType,
}>(
  'login',
  async ({email, password}) => {
    const { data} = await api.post<UserType>(APIRoute.LOGIN, {email, password});
    return data;
  });

export const logoutAction = createAsyncThunk<void, undefined, {
  state: StateType,
}>(
  'logout',
  async (_arg) => {
    await api.delete(APIRoute.LOGOUT);
  });

export const getPromoFilm = createAsyncThunk<FimlType, undefined, {
  state: StateType;
}>(
  'fetchPromoFilm',
  async (_arg) => {
    const { data } = await api.get<FimlType>(APIRoute.PROMO);
    return data;
  });

export const getFilm = createAsyncThunk<FimlType, string, {
  state: StateType;
}>(
  'fetchFilmById', async (filmId: string) => {
    const { data } = await api.get<FimlType>(`${APIRoute.FILMS}/${filmId}`);
    return data;
  });

export const getSimilarFilms = createAsyncThunk<FimlType[], string, {
  state: StateType;
}>(
  'fetchSimilarById', async (filmId: string) => {
    const { data } = await api.get<FimlType[]>(
      `${APIRoute.FILMS}/${filmId}${APIRoute.SIMILAR}`
    );
    return data;
  });

export const getFilmReviews = createAsyncThunk<Review[], string, {
  state: StateType;
}>(
  'fetchCommentsById', async (filmId: string) => {
    const { data } = await api.get<Review[]>(
      `${APIRoute.COMMENTS}/${filmId}`
    );
    return data;
  });

export const postFilmReview =
  async (id: number, review: { comment: string, rating: number }) => {
    await api.post<Review[]>(`${APIRoute.COMMENTS}/${id}`, {...review});
  };

export const fetchFavoriteFilms = createAsyncThunk<FimlType[], undefined, {
  state: StateType;
}>(
  'fetchFavoriteFilms', async (_arg) => {
    const { data } = await api.get<FimlType[]>(APIRoute.FAVORITE);
    return data;
  });

export const changeFilmFavoriteStatus = createAsyncThunk<FimlType, {
  filmId: number;
  status: number
}, {
  state: StateType;
}>(
  'changeFilmFavoriteStatus',
  async ({ filmId: id, status: isFavorite }) => {
    const { data } = await api.post<FimlType>(`${APIRoute.FAVORITE}/${id}/${isFavorite}`);
    return data;
  });

export const changePromoFavoriteStatus = createAsyncThunk<FimlType, {
  filmId: number;
  status: number
}, {
  state: StateType;
}>(
  'changePromoFavoriteStatus',
  async ({ filmId: id, status: isFavorite }) => {
    const { data } = await api.post<FimlType>(`${APIRoute.FAVORITE}/${id}/${isFavorite}`);
    return data;
  }
);
