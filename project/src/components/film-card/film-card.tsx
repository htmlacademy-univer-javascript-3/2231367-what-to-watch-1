import {FimlType} from '../../types/FilmType';
import {Link} from 'react-router-dom';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Videoplayer from '../videoplayer/videoplayer';
import {
  DELAY_ON_HOVER_FILM_CARD,
  NEED_TO_LOOP_ON_HOVER_FILM_CARD,
  PREVIEW_HEIGHT_ON_HOVER_FILM_CARD,
  PREVIEW_MUTED_ON_HOVER_FILM_CARD,
  PREVIEW_WIDTH_ON_HOVER_FILM_CARD
} from '../../consts';

type FilmCardProps = {
  film: FimlType;
  onHover?: Dispatch<SetStateAction<number | null>>;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const [isPlayingNow, setIsPlayingNow] = useState<boolean>(false);

  useEffect(() => {
    let stillHovered = true;
    if (isCardHovered) {
      setTimeout(() => stillHovered && setIsPlayingNow(true), DELAY_ON_HOVER_FILM_CARD);
    }
    return(() => {stillHovered = false;});
  }, [isCardHovered]);

  return (
    <article className="small-film-card catalog__films-card" data-testid='film-card'
      onMouseEnter={() => {
        setIsCardHovered(true);
        props.onHover?.(props.film.id);
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsPlayingNow(false);
        props.onHover?.(-1);
      }}
    >
      <div className="small-film-card__image">
        <Videoplayer
          film={props.film}
          muted={PREVIEW_MUTED_ON_HOVER_FILM_CARD}
          isPlaying={isPlayingNow}
          width={PREVIEW_WIDTH_ON_HOVER_FILM_CARD}
          height={PREVIEW_HEIGHT_ON_HOVER_FILM_CARD}
          needToLoop={NEED_TO_LOOP_ON_HOVER_FILM_CARD}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.film.id}`} data-testid='film-link'>{props.film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;

