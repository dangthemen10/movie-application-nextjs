import { BASE_MOVIE_URL, API_KEY } from '@/utils/baseUrl';

const tvSeriesRequests = {
  fetchNetflixOriginals: `${BASE_MOVIE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  // TvShow
  fetchPopular: `${BASE_MOVIE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTopRated: `${BASE_MOVIE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchOnTheAir: `${BASE_MOVIE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  fetchAiringToday: `${BASE_MOVIE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
  // Trending
  fetchTvTrending: `${BASE_MOVIE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US&page=1`
};

export default tvSeriesRequests;
