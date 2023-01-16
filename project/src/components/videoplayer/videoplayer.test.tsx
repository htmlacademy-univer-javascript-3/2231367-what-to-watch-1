import {render} from '@testing-library/react';
import Videoplayer from './videoplayer';
import {films} from '../../mocks/films';
import {
  DELAY_ON_HOVER_FILM_CARD,
  NEED_TO_LOOP_ON_HOVER_FILM_CARD,
  PREVIEW_MUTED_ON_HOVER_FILM_CARD,
  PreviewSizeOnHoverFilmCard
} from '../../consts';

const mockFilm = films[0];

describe('Component: Videoplayer', () => {
  it('should play after delay', async () => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    render(
      <Videoplayer
        film={mockFilm}
        muted={PREVIEW_MUTED_ON_HOVER_FILM_CARD}
        isPlaying
        width={PreviewSizeOnHoverFilmCard.PREVIEW_WIDTH_ON_HOVER_FILM_CARD}
        height={PreviewSizeOnHoverFilmCard.PREVIEW_HEIGHT_ON_HOVER_FILM_CARD}
        needToLoop={NEED_TO_LOOP_ON_HOVER_FILM_CARD}
      />,
    );
    await new Promise((r) => setTimeout(r, DELAY_ON_HOVER_FILM_CARD));
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });
});
