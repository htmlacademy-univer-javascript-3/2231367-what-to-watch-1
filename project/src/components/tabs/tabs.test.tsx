import {fireEvent, render, screen} from '@testing-library/react';
import {films} from '../../mocks/films';
import reviews from '../../mocks/reviews';
import Tabs from './tabs';
import {createAPI} from '../../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {Action} from '@reduxjs/toolkit';
import {ReducerType} from '../../consts';
import {Provider} from 'react-redux';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockFilm = films[0];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);
const mockReviews = reviews;

describe('Component: Tabs', () => {
  it('should render OverviewTab correctly', () => {
    render(<Tabs film={mockFilm} />);
    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
  });

  it('should render DetailsTab correctly', () => {
    render(<Tabs film={mockFilm} />);
    const detailsButton = screen.getByTestId('details-tab');
    fireEvent.click(detailsButton);
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('should render ReviewsTab correctly', () => {
    const store = mockStore({
      [ReducerType.FILM]: {
        comments: mockReviews,
      },
    });
    render(
      <Provider store={store}>
        <Tabs film={mockFilm} />
      </Provider>
    );
    const reviewsButton = screen.getByTestId('reviews-tab');
    fireEvent.click(reviewsButton);
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
  });
});
