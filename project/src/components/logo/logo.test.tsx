import Logo from './logo';
import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(screen.getByText(/T/i)).toBeInTheDocument();
    expect(screen.getAllByText(/W/i)[0]).toBeInTheDocument();
  });
});
