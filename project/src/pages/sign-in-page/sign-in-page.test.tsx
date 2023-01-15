import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {films} from '../../mocks/films';
import {createAPI} from '../../services/api';
import {StateType} from '../../types/StateType';
import {AuthorizationStatus, ReducerType} from '../../consts';
import SignInPage from './sign-in-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<StateType, Action, ThunkDispatch<StateType, typeof api, Action>>(middlewares);
const mockFilms = films;

const store = mockStore({
  [ReducerType.User]: {
    authorizationStatus: AuthorizationStatus.NonAuthorized,
    avatar: null,
  },
  [ReducerType.Main]: {
    favoriteFilms: mockFilms,
  }
});

describe('Sign in page', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignInPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });
});
