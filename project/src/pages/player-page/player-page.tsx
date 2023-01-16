import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {getFilm} from '../../store/api-actions';

function PlayerPage(): JSX.Element {
  const id = Number(useParams().id);
  const currentFilm = useAppSelector((state) => state.filmReducer.film);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const playerElement = document.querySelector('.player');
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState( 0);
  const [progress, setProgress] = useState(0);
  const handleClickPlayButton = () => {
    setIsPlaying(!isPlaying);
  };
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerElement?.requestFullscreen();
    }
  };
  const handleProgressBar = useCallback(() => {
    const durationTime = playerRef?.current?.duration;
    const currentTime = playerRef?.current?.currentTime;
    if (durationTime && currentTime) {
      setProgress((currentTime / durationTime) * 100);
      setTimeLeft(durationTime - currentTime);
    }
  }, []);
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
      <video src={currentFilm?.videoLink} className="player__video" poster={currentFilm?.backgroundImage} ref={playerRef} onTimeUpdate={() => handleProgressBar()}></video>
      <Link to={`/films/${currentFilm?.id}`} type="button" className="player__exit">Exit</Link>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getTimeLeft()}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handleClickPlayButton} data-testid='player-play'>
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
          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
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
