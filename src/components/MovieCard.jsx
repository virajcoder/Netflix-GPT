import { IMG_CDN_URL } from "../utils/constants";
import PropTypes from 'prop-types';

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
MovieCard.propTypes = {
    posterPath : PropTypes.number.isRequired,
  };
export default MovieCard;