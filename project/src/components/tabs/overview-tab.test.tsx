import {render, screen} from '@testing-library/react';
import {films} from '../../mocks/films';
import OverviewTab from './overview-tab';

const mockFilm = films[0];

describe('Component: OverviewTab', () => {
  it('should render correctly', () => {
    render(
      <OverviewTab film={mockFilm} />
    );
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${mockFilm.starring.join(', ')} and other`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.scoresCount} ratings`)).toBeInTheDocument();
  });
});
