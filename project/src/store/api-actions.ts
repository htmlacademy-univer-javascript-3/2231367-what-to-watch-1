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
  'data/fetchFilms', async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Film[]>('/films');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const checkAuthorization = createAsyncThunk<User, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuthorization', async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const login = createAsyncThunk<User, AuthorizationData, {
  state: State,
  extra: AxiosInstance;
}>(
  'user/login', async ({email, password}, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.post<User>(APIRoute.Login, {email, password});
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const logout = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance;
}>(
  'user/logout', async (_arg, { extra: api, rejectWithValue }) => {
    try {
      await api.delete(APIRoute.Logout);
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const fetchPromoFilm = createAsyncThunk<Film, undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm', async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Film>(APIRoute.Promo);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const fetchFilm = createAsyncThunk<Film, string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilm', async (filmId: string, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const fetchSimilarFilms = createAsyncThunk<Film[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms', async (filmId: string, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Film[]>(
        `${APIRoute.Films}/${filmId}${APIRoute.Similar}`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const fetchFilmReviews = createAsyncThunk<Review[], string, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmReviews', async (filmId: string, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Review[]>(
        `${APIRoute.Comments}/${filmId}`
      );
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
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
  async ({ id, comment, rating }, { extra: api, rejectWithValue }) => {
    try {
      await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteFilms', async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const changeFilmFavoriteStatus = createAsyncThunk<Film, {
  filmId: number;
  status: number
}, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFilmFavoriteStatus', async ({ filmId: id, status: isFavorite }, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const changePromoFavoriteStatus = createAsyncThunk<Film, {
  filmId: number;
  status: number
}, {
  state: State;
  extra: AxiosInstance;
}>(
  'data/changePromoFavoriteStatus', async ({ filmId: id, status: isFavorite }, { extra: api, rejectWithValue }) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const clearError = createAsyncThunk< void, undefined, {
  state: State;
  dipatch: AppDispatch;
  extra: AxiosInstance
}>(
  'error/clearError',
  async (_arg, {dispatch, rejectWithValue}) => {
    try {
      setTimeout(() => {
        dispatch(setError(null));
      }, TIMEOUT_SHOW_ERROR);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
