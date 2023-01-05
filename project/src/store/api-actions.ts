import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, dropToken} from '../services/token';
import {AppDispatch, StateType} from '../types/StateType';
import {getFilms, setAuthorizationStatus, setLoading, setUserInfo} from './action';
import {AuthorizationStatus} from '../types/AuthorizationStatus';
import {AuthorizationData} from '../types/AuthorizationData';
import {UserType} from '../types/UserType';
import {FimlType} from '../types/FilmType';
import {AppRoute} from '../types/AppRoute';
import {useNavigate} from 'react-router-dom';
import {api} from './index';
import {Review} from '../types/ReviewType';
import {APIRoute} from '../types/ApiRoute';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: StateType,
}>(
  'fetchFilms',
  async (_arg, {dispatch}) => {
    const {data} = await api.get<FimlType[]>('/films');
    dispatch(setLoading(true));
    dispatch(getFilms(data));
    dispatch(setLoading(false));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
}>(
  'checkAuth',
  async (_arg, {dispatch}) => {
    try {
      await api.get(APIRoute.LOGIN);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NonAuthorized));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthorizationData, {
  dispatch: AppDispatch,
  state: StateType,
}>(
  'login',
  async ({email, password}, {dispatch}) => {
    const { data: user } = await api.post<UserType>(APIRoute.LOGIN, {email, password});
    saveToken(user.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    dispatch(setUserInfo(user));
    const navigate = useNavigate();
    navigate(AppRoute.Main);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: StateType,
}>(
  'logout',
  async (_arg, {dispatch}) => {
    await api.delete(APIRoute.LOGOUT);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NonAuthorized));
    dispatch(setUserInfo(null));
    const navigate = useNavigate();
    navigate(AppRoute.Main);
  },
);

export const getPromoFilm = async () => await api.get<FimlType>(APIRoute.PROMO);

export const getFilm = async (filmId: number) => await api.get<FimlType>(`${APIRoute.FILMS}/${filmId}`);

export const getSimilarFilms = async (id: number) => await api.get<FimlType[]>(`${APIRoute.FILMS}/${id}${APIRoute.SIMILAR}`);

export const getFilmReviews = async (id: number) => await api.get<Review[]>(`${APIRoute.COMMENTS}/${id}`);

export const postFilmReview =
  async (id: number, review: { comment: string, rating: number }) => {
    await api.post<Review[]>(`${APIRoute.COMMENTS}/${id}`, {...review});
  };
