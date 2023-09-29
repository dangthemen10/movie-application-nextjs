interface ISearchData {
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
  also_known_as: any[];
  biography: string;
  birthday: string;
  deathday: string | undefined;
  gender: number;
  homepage: any | undefined;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
