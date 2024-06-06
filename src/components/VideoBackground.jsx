import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import PropTypes from 'prop-types';

const VideoBackground = ({movieId}) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className=" w-screen ">
      <iframe
        className="w-screen aspect-video w=560 h=315"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
      ></iframe>
    </div>
  );
};

VideoBackground.propTypes = {
  movieId: PropTypes.oneOfType([PropTypes.number]).isRequired
};

export default VideoBackground;
