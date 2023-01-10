import { createSlice } from '@reduxjs/toolkit';
import { dropToken, saveToken } from '../services/token';
import {UserState} from '../types/StateType';
import {AuthorizationStatus} from '../consts';
import {checkAuthAction, loginAction, logoutAction} from './api-actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NonAuthorized,
  avatar: null,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        dropToken();
        state.avatar = null;
        state.authorizationStatus = AuthorizationStatus.NonAuthorized;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NonAuthorized;
      });
  },
});
