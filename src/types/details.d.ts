interface IGenre {
  id: number;
  name: string;
}

interface ILanguages {
  english_name: string;
}

interface ICompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface IDetails {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: IGenre[];
  production_companies: ICompanies[];
  title: string;
  name: string;
  original_name: string;
  spoken_languages: ILanguages[];
  seasons: ISeasons[];
  vote_average: number;
}
