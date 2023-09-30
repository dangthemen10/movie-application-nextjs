interface IEpisode {
  air_date: string;
  crew: any[];
  episode_number: number;
  guest_stars: ICast[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: number;
  vote_average: number;
  vote_count: number;
}
