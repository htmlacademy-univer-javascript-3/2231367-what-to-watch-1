import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider } from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import thunk from 'redux-thunk';
import {films} from '../../mocks/films';
import reviews from '../../mocks/reviews';
import UserBlock from './user-block';
import {State} from '../../types/state';
import {createAPI} from '../../services/api';
import {AppRoute, AuthorizationStatus, ReducerType} from '../../consts';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockFilms = films;
const mockFilm = films[0];
const mockReviews = reviews;

describe('Component: UserBlock', () => {
  it('should render correctly if not authorized', () => {
    const store = mockStore({
      [ReducerType.User]: {
        authorizationStatus: AuthorizationStatus.NonAuthorized,
        avatar: null,
      },
      [ReducerType.Film]: {
        film: mockFilm,
        comments: mockReviews,
        similar: mockFilms,
      },
      [ReducerType.Main]: {
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
            <Route path={AppRoute.SignIn} element={<h1>Login page rendered</h1>}/>
            <Route path='*' element={<UserBlock />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(screen.getByText(/Login page rendered/i)).toBeInTheDocument();
  });

  it('should render correctly if authorized', () => {
    const store = mockStore({
      [ReducerType.User]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        avatar: null,
      },
      [ReducerType.Film]: {
        film: mockFilm,
        similar: mockFilms,
      },
      [ReducerType.Main]: {
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
            <Route path={AppRoute.MyList} element={<h1>My list page rendered</h1>}/>
            <Route path='*' element={<UserBlock />}/>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    const avatar = screen.getByTestId('avatar');
    fireEvent.click(avatar);
    expect(screen.getByText(/My list page rendered/i)).toBeInTheDocument();
  });
});
