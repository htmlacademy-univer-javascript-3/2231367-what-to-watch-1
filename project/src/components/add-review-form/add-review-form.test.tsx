import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore();

describe('Component: AddReviewForm', () => {
  const store = mockStore();
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
