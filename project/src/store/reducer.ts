import {combineReducers} from '@reduxjs/toolkit';
import { userReducer } from './auth-reducer';
import { filmReducer } from './film-reducer';
import { mainReducer } from './main-reducer';

export const reducer = combineReducers({
  filmReducer: filmReducer.reducer,
  mainReducer: mainReducer.reducer,
  userReducer: userReducer.reducer
})

