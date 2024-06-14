// import openai from "../utils/openai";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTION,GEMINI_KEY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [error, setError] = useState(null); 
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);

//   search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
       "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
        API_OPTION
      );
      if (!response.ok) {
        throw new Error("TMDB API request failed");
      }
      const json = await response.json();
      return json.results;
    } catch (error) {
      throw new Error(`Failed to search TMDB for '${movie}'`);
    }
  };
    

  // const handleGptSearchClick = async () => {
  //   console.log(searchText.current.value);
  //   // Make an API call to GPT API and get Movie Results

  //   const gptQuery =
  //     "Act as a Movie Recommendation system and suggest some movies for the query : " +
  //     searchText.current.value +
  //     ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

  //   const gptResults = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: gptQuery }],
  //     model: "gpt-3.5-turbo",
  //   });

  //   if (!gptResults.choices) {
  //     // TODO: Write Error Handling
  //   }

  //   console.log(gptResults.choices?.[0]?.message?.content);

  //   // // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
  //   const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

  //   // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

  //   // For each movie I will search TMDB API

  //   const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
  //   // [Promise, Promise, Promise, Promise, Promise]

  //   const tmdbResults = await Promise.all(promiseArray);

  //   console.log(tmdbResults);

  //   dispatch(
  //     addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
  //   );
  // };

  const handleGptSearchClick = async () => {
    setLoadingBtn(true);

    const searchTextValue = searchText.current.value.trim();

    if (!searchTextValue) {
      setError("Please enter a valid movie query");
      setLoadingBtn(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt =
        "Act as a movie recommendation system and suggest some movies for the query" +
        searchTextValue +
        ".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Pathaan,3 Idiots.";
      const result = await model.generateContent(prompt);
      const gptResults = await result.response;
      const gptMovies =
        gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");

      setLoadingBtn(false);

      if (!gptMovies) {
        throw new Error("Failed to generate movie suggestions from GPT model.");
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      // Handle errors
      console.error("An error occurred:", error.message);
      setError(
        " Movie recommendations powered by Gemini are unavailable on request due to paid APIs"
      );
      setLoadingBtn(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center">
        <form
          className=" w-11/12 xl:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="  xl:text-base lg:text-base md:text-sm sm:text-sm text-xs rounded-l-full font-normal text-black border-black xl:pl-5 md:pl-4 sm:pl-4 pl-3 lg:pl-5 xl:py-3 lg:py-3 md:py-2.5 sm:py-2 py-1.5 xl:w-9/12 md:w-10/12 w-9/12 sm:w-10/12 lg:w-9/12"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="bg-red-700 xl:py-3  w-[24%] lg:py-3 md:py-4 sm:py-2 py-1.5 xl:px-8 sm:px-4 px-2 md:px-6 lg:px-8 font-semibold xl:text-base lg:text-base md:text-sm sm:text-sm text-xs  xl:w-3/12 md:w-2.5/12 sm:w-2/12 w-1.5/12 lg:w-3/12 rounded-r-full"
            onClick={handleGptSearchClick}
          >
            {loadingBtn ? (
              <div className="w-5 text-center ml-3 md:ml-12 h-5 border-t m border-gray-300 border-solid rounded-full animate-spin"></div>
            ) : (
              lang[langKey].search
            )}
               </button>
               {error && <p className="mt-2 text-sm  text-red-500">{error}</p>}
                </form>
      </div>
    </div>
  );
};
export default GptSearchBar;