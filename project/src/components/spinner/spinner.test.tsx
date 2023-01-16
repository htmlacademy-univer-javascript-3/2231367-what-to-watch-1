import { MemoryRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
