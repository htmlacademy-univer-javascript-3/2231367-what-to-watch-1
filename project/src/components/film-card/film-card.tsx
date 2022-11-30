import {FimlType} from '../../types/FilmType';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Videoplayer from '../videoplayer/videoplayer';

const DELAY = 1000;
const PREVIEW_WIDTH = 280;
const PREVIEW_HEIGHT = 175;
const PREVIEW_MUTED = true;
const NEED_TO_LOOP = true;

type FilmCardProps = {
  film: FimlType;
  onHover: (id: number) => void;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
  const [isPlayingNow, setIsPlayingNow] = useState<boolean>(false);

  useEffect(() => {
    let stillHovered = true;
    if (isCardHovered) {
      setTimeout(() => stillHovered && setIsPlayingNow(true), DELAY);
    }
    return(() => {stillHovered = false;});
  }, [isCardHovered]);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => {
        setIsCardHovered(true);
        props.onHover(props.film.id);
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
        setIsPlayingNow(false);
        props.onHover(-1);
      }}
    >
      <div className="small-film-card__image">
        <Videoplayer
          film={props.film}
          muted={PREVIEW_MUTED}
          isPlaying={isPlayingNow}
          width={PREVIEW_WIDTH}
          height={PREVIEW_HEIGHT}
          needToLoop={NEED_TO_LOOP}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.film.id}`}>{props.film.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;

