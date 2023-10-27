import { API_KEY, BASE_MOVIE_URL } from '@/utils/baseUrl';

const requests = {
  fetchTrending: `${BASE_MOVIE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  // Trending
  fetchTrendingMovie: `${BASE_MOVIE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  // Banner
  fetchNetflixOriginals: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  // Movie list
  fetchTopRated: `${BASE_MOVIE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchNowPlaying: `${BASE_MOVIE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  fetchPopular: `${BASE_MOVIE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `${BASE_MOVIE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  // Movie genre
  fetchActionMovies: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`
};

export default requests;
