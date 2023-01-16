import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../../services/token';
import {UserState} from '../../types/state';
import {AuthorizationError, AuthorizationStatus, ReducerType} from '../../consts';
import {checkAuthorization, login, logout} from '../api-actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NonAuthorized,
  avatar: null,
  authorizationError: AuthorizationError.NoError,
};

export const userReducer = createSlice({
  name: ReducerType.User,
  initialState,
  reducers: {
    setAuthorizationError: (state, action: PayloadAction<AuthorizationError>) => {
      state.authorizationError = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.avatar = null;
        state.authorizationStatus = AuthorizationStatus.NonAuthorized;
      })
      .addCase(login.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
        state.authorizationStatus = AuthorizationStatus.Authorized;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NonAuthorized;
      });
  },
});

export const {setAuthorizationError} = userReducer.actions;
