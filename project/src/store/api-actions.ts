import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../consts';
import {AuthorizationData} from '../types/authorization-data';
import {User} from '../types/user';
import {Film} from '../types/film';
import {AxiosInstance} from 'axios';
import {Review} from '../types/review';
import {setError} from './action';

export const fetchFilms = createAsyncThunk<Film[], undefined, {
  state: State,
  extra: AxiosInstance;
}>(
  'data/fetchFilms', async (_arg, { extra: api }) => {
    const {data} = await api.get<Film[]>('/films');
    return data;
  });

export const checkAuthorization = createAsyncThunk<User, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthorization', async (_arg, { extra: api }) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  });

export const login = createAsyncThunk<User, AuthorizationData, {
  state: State,
  extra: AxiosInstance;
}>(
  'user/login', async ({email, password}, { extra: api }) => {
    const { data} = await api.post<User>(APIRoute.Login, {email, password});
    return data;
  });

export const logout = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance;
}>(
  'user/logout', async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
  });

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm', async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  });

export const fetchFilm = createAsyncThunk<Film, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm', async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  });

export const fetchSimilarFilms = createAsyncThunk<Film[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms', async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Film[]>(
      `${APIRoute.Films}/${filmId}${APIRoute.Similar}`
    );
    return data;
  });

export const fetchFilmReviews = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReviews', async (filmId: string, { extra: api }) => {
    const { data } = await api.get<Review[]>(
      `${APIRoute.Comments}/${filmId}`
    );
    return data;
  });

export const postFilmReview = createAsyncThunk<void, {
  id: number,
  comment: string,
  rating: number
},
{
  state: State;
  extra: AxiosInstance;
}
>(
  'data/postFilmReview',
  async ({ id, comment, rating }, { extra: api }) => {
    await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
  });

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms', async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[]>(APIRoute.Favorite);
    return data;
  });

export const changeFilmFavoriteStatus = createAsyncThunk<Film, {
  filmId: number;
  status: number
}, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFilmFavoriteStatus', async ({ filmId: id, status: isFavorite }, { extra: api }) => {
    const { data } = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
    return data;
  });

export const changePromoFavoriteStatus = createAsyncThunk<Film, {
  filmId: number;
  status: number
}, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/changePromoFavoriteStatus', async ({ filmId: id, status: isFavorite }, { extra: api }) => {
    const { data } = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
    return data;
  });

export const clearError = createAsyncThunk< void, undefined, {
  state: State;
  dipatch: AppDispatch;
  extra: AxiosInstance
}>(
  'clearError',
  async (_arg, {dispatch}) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
);
