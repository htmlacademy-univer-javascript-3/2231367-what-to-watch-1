import {render} from '@testing-library/react';
import Videoplayer from './videoplayer';
import {films} from '../../mocks/films';
import {
  DELAY_ON_HOVER_FILM_CARD,
  NEED_TO_LOOP_ON_HOVER_FILM_CARD,
  PREVIEW_HEIGHT_ON_HOVER_FILM_CARD,
  PREVIEW_MUTED_ON_HOVER_FILM_CARD,
  PREVIEW_WIDTH_ON_HOVER_FILM_CARD
} from '../../consts';

const mockFilm = films[0];

describe('Component: Videoplayer', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should play after delay', async () => {
    render(
      <Videoplayer
        film={mockFilm}
        muted={PREVIEW_MUTED_ON_HOVER_FILM_CARD}
        isPlaying
        width={PREVIEW_WIDTH_ON_HOVER_FILM_CARD}
        height={PREVIEW_HEIGHT_ON_HOVER_FILM_CARD}
        needToLoop={NEED_TO_LOOP_ON_HOVER_FILM_CARD}
      />,
    );
    await new Promise((r) => setTimeout(r, DELAY_ON_HOVER_FILM_CARD));
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
  });
});
