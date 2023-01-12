import {combineReducers} from '@reduxjs/toolkit';
import { userReducer } from './auth-reducer';
import { filmReducer } from './film-reducer';
import { mainReducer } from './main-reducer';
import {ReducerType} from "../consts";

export const reducer = combineReducers({
  [ReducerType.Film]: filmReducer.reducer,
  [ReducerType.Main]: mainReducer.reducer,
  [ReducerType.User]: userReducer.reducer
});
