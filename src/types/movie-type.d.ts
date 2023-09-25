interface IMovie {
  adult: boolean;
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  video: boolean;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

interface IMovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: any;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface IAuthorDetails {
  avatar_path: string;
  name: string;
  rating: number;
  username: string;
}

interface IMovieReviewData {
  author: string;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
  author_details: AuthorDetails;
}

interface IMovieTrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: string;
  type: string;
}
