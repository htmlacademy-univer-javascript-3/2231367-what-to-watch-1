import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {films} from '../../mocks/films';
import FilmList from './film-list';

const mockFilms = films;
const mockFilm = films[0];

describe('Component: FilmList', () => {
  it('should render correctly without set current film', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={mockFilms} />
      </MemoryRouter>
    );
    expect(screen.getByTestId(('film-list'))).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(mockFilms.length);
  });
  it('should render correctly with set current film', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={mockFilms} currentFilm={mockFilm}/>
      </MemoryRouter>
    );
    expect(screen.getByTestId(('film-list'))).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(mockFilms.length - 1);
  });
});
