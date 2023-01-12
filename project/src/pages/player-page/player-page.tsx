import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Fragment, useEffect, useRef, useState} from "react";
import {getFilm} from "../../store/api-actions";

function PlayerPage(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector((state) => state.filmReducer.film);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const playerElement = document.querySelector('.player');
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState( 0);
  const clickPlayButtonHandler = () => {
    setIsPlaying(!isPlaying);
  };
  const fullscreenHandler = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerElement?.requestFullscreen();
    }
  }
  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
  });
  useEffect(() => {
    if (playerRef.current !== null) {
      if (isPlaying) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying]);
  useEffect(() => {
    dispatch(getFilm(id.toString()));
  }, [id, dispatch]);
  useEffect(() => {
    if (film)
    {setTimeLeft(film?.runTime * 60);}
  }, [film]);
  const getTimeLeft = () => {
    const bringTimeToFormat = (time: number) => time > 9 ? time : `0${time}`;
    const hours = bringTimeToFormat(Math.floor(timeLeft / 60 / 60));
    const minutes = bringTimeToFormat(Math.floor(timeLeft / 60 - Math.floor(timeLeft / 60 / 60) * 60));
    const seconds = bringTimeToFormat(Math.floor(timeLeft % 60));
    const timeInActualFormat = `${minutes}:${seconds}`;
    return hours > 0 ? `${hours}:${timeInActualFormat}` : timeInActualFormat;
  };
  return (
    <div className="player">
      <video src={film?.videoLink} className="player__video" poster={film?.posterImage} ref={playerRef}></video>
      <Link to={`/films/${film?.id}`} type="button" className="player__exit">Exit</Link>      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="0" max="100"></progress>
            <div className="player__toggler" style={{left: `${film ? (film?.runTime * 60 - timeLeft) / (film?.runTime * 60) * 100 : 0}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={clickPlayButtonHandler}>
            {isPlaying ? (
              <Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </Fragment>
            ) : (
              <Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Fragment>
            )}
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen" onClick={fullscreenHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
