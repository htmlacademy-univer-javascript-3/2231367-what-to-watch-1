import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import AddReviewForm from './add-review-form';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/state';
import {Action} from '@reduxjs/toolkit';
import {ReducerType} from '../../consts';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Component: AddReviewForm', () => {
  const store = mockStore({
    [ReducerType.Main]: {
      error: null,
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddReviewForm />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
});
