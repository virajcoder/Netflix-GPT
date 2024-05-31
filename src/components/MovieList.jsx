import MovieCard from "./MovieCard";
import PropTypes from 'prop-types';

export const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
MovieList.propTypes = {
  title : PropTypes.number.isRequired,
  movies : PropTypes.number.isRequired
};
export default MovieList;