import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {films} from '../../mocks/films';
import FilmCard from './film-card';

const mockFilm = films[0];

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmCard film={mockFilm} />
      </MemoryRouter>
    );
    expect(screen.getByTestId(('film-link'))).toBeInTheDocument();
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path={`/films/${mockFilm.id}`} element={<h1>Film page rendered</h1>} />
          <Route path="*" element={
            <FilmCard film={mockFilm} />
          }
          />
        </Routes>
      </MemoryRouter>
    );
    const filmButton = screen.getByTestId('film-link');
    fireEvent.click(filmButton);
    expect(screen.getByText(/Film page rendered/i)).toBeInTheDocument();
  });
});
