import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {mockSelectedFilm} from './mocks/films';
import {Provider} from 'react-redux';
import {store} from './store';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {getFilms, setLoading} from './store/action';
import {FimlType} from './types/FilmType';

type AppDispatch = typeof store.dispatch;
store.dispatch( createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: ReturnType<typeof store.getState>,
  extra: AxiosInstance
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FimlType[]>('/films');
    dispatch(setLoading(true));
    dispatch(getFilms(data));
    dispatch(setLoading(false));
  },
)() );

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App selectedFilm={mockSelectedFilm}/>
    </Provider>
  </React.StrictMode>,
);
