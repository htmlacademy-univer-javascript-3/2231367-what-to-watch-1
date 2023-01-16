import { useRef } from 'react';
import { useEffect } from 'react';
import { Film } from '../../types/film';

type VideoplayerProps = {
  film: Film;
  muted: boolean;
  isPlaying: boolean;
  width: number;
  height: number;
  needToLoop: boolean;
};

function Videoplayer(props: VideoplayerProps): JSX.Element {
  const videoplayerRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoplayerRef.current !== null) {
      if (props.isPlaying) {
        videoplayerRef.current.play();
        //TODO: videoplayerRef.current не определяется вначале при запуске походу
      }
      else {
        videoplayerRef.current.load();
      }
    }
  }, [props.isPlaying]);

  return (
    <video
      ref={videoplayerRef}
      src={props.film.videoLink}
      poster={props.film.posterImage}
      muted={props.muted}
      width={props.width}
      height={props.height}
      loop={props.needToLoop}
    />
  );
}

export default Videoplayer;
