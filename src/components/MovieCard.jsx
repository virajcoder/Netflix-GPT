import { IMG_CDN_URL } from "../utils/constants";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, movieID}) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
       <Link to={`/watch/${movieID}`}>
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} 
      className="transition-transform transform hover:scale-110"
      />
      </Link>
    </div>
  );
};
MovieCard.propTypes = {
    posterPath : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    movieID : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
export default MovieCard;