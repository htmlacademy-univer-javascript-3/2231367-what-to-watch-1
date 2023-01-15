import {render, screen} from '@testing-library/react';
import {films} from '../../mocks/films';
import DetailsTab from './details-tab';

const mockFilm = films[0];

describe('Component: DetailsTab', () => {
  it('should render correctly', () => {
    render(
      <DetailsTab film={mockFilm} />
    );
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.runTime)).toBeInTheDocument();
  });
});
