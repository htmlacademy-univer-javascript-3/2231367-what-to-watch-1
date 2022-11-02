import {FimlType} from '../../types/FilmType';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Videoplayer from '../videoplayer/videoplayer';

const delay = 1000;
const previewWidth = 280;
const previewHeight = 175;
const previewMuted = true;
const needToLoop = true;

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
      setTimeout(() => stillHovered && setIsPlayingNow(true), delay);
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
          muted={previewMuted}
          isPlaying={isPlayingNow}
          width={previewWidth}
          height={previewHeight}
          needToLoop={needToLoop}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${props.film.id}`}>{props.film.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;

