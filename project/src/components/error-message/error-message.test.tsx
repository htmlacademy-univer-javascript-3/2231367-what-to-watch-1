import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {render, screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import ErrorMessage from './error-message';
import {State} from '../../types/state';
import {ReducerType} from '../../consts';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Component: ErrorMessage', () => {
  jest.mock('../../services/error-message-handle.ts');
  const store = mockStore({
    [ReducerType.Main]: {
      error: 'It is serious error!',
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );
    expect(screen.getByText(/It is serious error!/i)).toBeInTheDocument();
  });
});
