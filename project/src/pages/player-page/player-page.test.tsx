import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {films} from '../../mocks/films';
import {createAPI} from '../../services/api';
import {StateType} from '../../types/StateType';
import {AuthorizationStatus, ReducerType} from '../../consts';
import PlayerPage from './player-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<StateType, Action, ThunkDispatch<StateType, typeof api, Action>>(middlewares);
const mockFilms = films;
const mockFilm = films[0];

const store = mockStore({
  [ReducerType.User]: {
    authorizationStatus: AuthorizationStatus.NonAuthorized,
    avatar: null,
  },
  [ReducerType.Main]: {
    favoriteFilms: mockFilms,
  },
  [ReducerType.Film]: {
    film: mockFilm,
  }
});

describe('Player page', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  it('should play and stop when button clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerPage />
        </MemoryRouter>
      </Provider>
    );
    const playButton = screen.getByTestId('player-play');
    fireEvent.click(playButton);
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
    fireEvent.click(playButton);
    expect(window.HTMLVideoElement.prototype.pause).toBeCalled();
  });
});
