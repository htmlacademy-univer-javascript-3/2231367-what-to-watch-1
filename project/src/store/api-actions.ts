import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken, dropToken} from '../services/token';
import {AppDispatch, StateType} from '../types/StateType';
import {APIRoute} from '../types/ApiRoute';
import {getFilms, setAuthorizationStatus, setLoading, setUserInfo} from './action';
import {AuthorizationStatus} from '../types/AuthorizationStatus';
import {AuthorizationData} from '../types/AuthorizationData';
import {UserType} from '../types/UserType';
import {FimlType} from '../types/FilmType';


export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: StateType,
  extra: AxiosInstance
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FimlType[]>('/films');
    dispatch(setLoading(true));
    dispatch(getFilms(data));
    dispatch(setLoading(false));
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
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
  extra: AxiosInstance
}>(
  'login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data: user } = await api.post<UserType>(APIRoute.LOGIN, {email, password});
    saveToken(user.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Authorized));
    dispatch(setUserInfo(user));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: StateType,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.LOGOUT);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NonAuthorized));
    dispatch(setUserInfo(null));
  },
);
