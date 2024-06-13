import { useEffect } from "react";
import { useDispatch ,  useSelector} from "react-redux";
import { API_OPTION} from "../utils/constants";
import { addTopRatedMovie } from "../utils/moviesSlice";

const  useTopRatedMovie = () => {
 
  const dispatch = useDispatch();
  const RatedMovie = useSelector((store) => store.movies.popularMovies);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addTopRatedMovie(json.results));
  };

  useEffect(() => {
    !RatedMovie && getTopRatedMovie(); 
  }, []);
};

export default useTopRatedMovie;
