import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {films} from '../../mocks/films';
import reviews from '../../mocks/reviews';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {AuthorizationStatus, ReducerType} from '../../consts';
import FilmPage from './film-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockFilms = films;
const mockFilm = films[0];
const mockReviews = reviews;

describe('Page: Film page', () => {
  it('should render correctly if not authorized', () => {
    jest.mock('../../services/error-message-handle.ts');
    window.HTMLVideoElement.prototype.load = jest.fn();
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
          <FilmPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should render correctly if authorized', () => {
    jest.mock('../../services/error-message-handle.ts');
    window.HTMLVideoElement.prototype.load = jest.fn();
    const store = mockStore({
      [ReducerType.User]: {
        authorizationStatus: AuthorizationStatus.Authorized,
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
          <FilmPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });
});
