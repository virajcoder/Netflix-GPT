import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
// import { useParams } from "react-router-dom";


const useMovieTrailer = (movieID) => {
  const dispatch = useDispatch();
  // const { movieID } = useParams();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
 
  const getMovieVideos = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/' +
    movieID +
    '/videos?language=en-US',
      API_OPTION
    );
    const json = await data.json();
    // console.log(json)
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0]
    dispatch(addTrailerVideo(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, [movieID]);
};

export default useMovieTrailer;