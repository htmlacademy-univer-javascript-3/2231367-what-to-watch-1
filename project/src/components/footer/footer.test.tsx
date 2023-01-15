import {MemoryRouter} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
    expect(screen.getAllByText(/W/i)[0]).toBeInTheDocument();
  });
});
