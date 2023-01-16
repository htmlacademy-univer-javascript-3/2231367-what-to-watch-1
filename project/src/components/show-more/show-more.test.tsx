import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import ShowMoreButton from './show-more';

const mockOnClick = jest.fn();
const mockStore = configureMockStore();

describe('Component: ShowMoreButton', () => {
  const store = mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ShowMoreButton onClick={mockOnClick}/>
      </Provider>
    );
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
