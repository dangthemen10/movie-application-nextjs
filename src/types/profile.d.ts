interface IFavoriteMovieData {
  _id: string;
  userId: string;
  movieId: number;
  overview: string;
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  original_name: string;
  vote_average: number;
}

interface IFavoritePeopleData {
  _id: string;
  userId: string;
  personId: number;
  gender: number;
  name: string;
  popularity: number;
  profile_path: string;
  known_for_department: string;
}

interface IUserData {
  _id: string;
  userId: string;
  name: string;
  email: string;
  userPhotoUrl: string;
  country: string;
  likeMovies: number[];
  likePerson: number[];
}
