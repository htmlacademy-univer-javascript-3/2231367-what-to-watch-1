import {render, screen} from '@testing-library/react';
import reviews from '../../mocks/reviews';
import ReviewsTab from './reviews-tab';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {StateType} from '../../types/StateType';
import {Action} from '@reduxjs/toolkit';
import {ReducerType} from '../../consts';
import {Provider} from 'react-redux';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<StateType, Action, ThunkDispatch<StateType, typeof api, Action>>(middlewares);
const mockReviews = reviews;

describe('Component: ReviewsTab', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [ReducerType.Film]: {
        comments: mockReviews,
      },
    });
    render(
      <Provider store={store}>
        <ReviewsTab />
      </Provider>
    );
    const allReviews = screen.getAllByTestId('review');
    expect(allReviews.length).toBe(mockReviews.length);
    expect(screen.getByText(`${mockReviews[0].user.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews[1].user.name}`)).toBeInTheDocument();
  });
});
