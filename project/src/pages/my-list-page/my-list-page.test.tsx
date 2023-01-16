import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {films} from '../../mocks/films';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {AuthorizationStatus, ReducerType} from '../../consts';
import MyListPage from './my-list-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockFilms = films;
const mockFilm = films[0];

describe('My list page', () => {
  it('should render correctly if not authorized', () => {
    const store = mockStore({
      [ReducerType.USER]: {
        authorizationStatus: AuthorizationStatus.NonAuthorized,
        avatar: null,
      },
      [ReducerType.FILM]: {
        film: mockFilm,
        similar: mockFilms,
      },
      [ReducerType.MAIN]: {
        films: mockFilms,
        filteredFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteFilmsLength: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route
              path={'/'}
              element={<h1>Main page rendered</h1>}
            />
            <Route
              path='*'
              element={<MyListPage />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Main page rendered/i)).toBeInTheDocument();
  });

  it('should render correctly if authorized', () => {
    const store = mockStore({
      [ReducerType.USER]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        avatar: null,
      },
      [ReducerType.FILM]: {
        film: mockFilm,
        similar: mockFilms,
      },
      [ReducerType.MAIN]: {
        films: mockFilms,
        filteredFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteFilmsLength: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyListPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
