import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import {MemoryRouter} from 'react-router-dom';

describe('Not found page', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByTestId(('link to main page'))).toBeInTheDocument();
  });
});
