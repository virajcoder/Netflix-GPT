import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    upcomingMovies:null,
    TopRatedMovie: null,
    
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.TopRatedMovie = action.payload;
    },
   
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addUpcomingMovies, addTopRatedMovie } =
  moviesSlice.actions;

export default moviesSlice.reducer;