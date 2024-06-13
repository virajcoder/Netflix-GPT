import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import MainContainer from "./MainContainer"
import SecondaryContainer from './SecondaryContainer'
import GptSearch from "./GptSearch"
import { useSelector } from "react-redux";
import Footer from "./Footer";
import ShimmerEffect from "./ShimmerEffect.jsx";
import useTopRatedMovie from "../hooks/useTopRatedMovie";




const Browse = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovie();
 

  return (
    <div className="w-screen overflow-hidden">
      <Header/>
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {movies?.length > 0 ? (
            <>
              <MainContainer />
              <SecondaryContainer />
              <Footer />
            </>
          ) : (
            <ShimmerEffect />
            
          )}
        </>
      )}
    </div>
  )
}

export default Browse
