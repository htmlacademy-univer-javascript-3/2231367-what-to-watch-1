import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {films} from '../../mocks/films';
import Genre from './genre';
import {Provider} from 'react-redux';
import {AuthorizationStatus, ReducerType} from '../../consts';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import reviews from '../../mocks/reviews';

const mockSetFilmListCount = jest.fn();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockFilms = films;
const mockFilm = films[0];
const mockGenres = ['genre1', 'genre2'];
const mockReviews = reviews;

describe('Component: Genre', () => {
  it('should render correctly not current genre', () => {
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
          <Genre genre={mockGenres[0]} isCurrent={false} setFilmListCount={mockSetFilmListCount}/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId(('genre inactive'))).toBeInTheDocument();
  });

  it('should render correctly current genre', () => {
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
          <Genre genre={mockGenres[0]} isCurrent setFilmListCount={mockSetFilmListCount}/>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId(('genre active'))).toBeInTheDocument();
  });
});
