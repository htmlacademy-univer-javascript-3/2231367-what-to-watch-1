import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthorization, fetchFilms, fetchPromoFilm} from './store/api-actions';
import {BrowserRouter} from 'react-router-dom';
import ErrorMessage from './components/error-message/error-message';

store.dispatch(fetchFilms());
store.dispatch(fetchPromoFilm());
store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorMessage />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
