interface ICast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: string;
  profile_path: string;
}

interface IMovieCastCrew {
  cast: ICast[];
  crew: any[];
}
