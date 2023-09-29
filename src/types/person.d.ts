interface IPersonData {
  adult: boolean;
  also_known_as: any[];
  biography: string;
  birthday: string;
  deathday: string | undefined;
  gender: number;
  homepage: any | undefined;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

interface IPopularTyping {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profile_path: string;
  known_for: IDetails[];
  known_for_department: string;
}
