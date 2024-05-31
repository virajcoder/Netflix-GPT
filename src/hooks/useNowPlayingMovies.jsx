import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { API_OPTION } from "../../src/utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

//   const nowPlayingMovies = useSelector(
//     (store) => store.movies.nowPlayingMovies
//   );


const getNowPlayingMovies = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?page=1",
    API_OPTION
  );
  const json = await data.json();
  console.log(json.results)
  dispatch(addNowPlayingMovies(json.results));
};

 useEffect(() => {
    getNowPlayingMovies();
   }, [])

};

export default useNowPlayingMovies;