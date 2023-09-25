import { BASE_MOVIE_URL, API_KEY } from '@/utils/baseUrl';

const peopleRequests = {
  fetchPopular: `${BASE_MOVIE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`
};

export default peopleRequests;
