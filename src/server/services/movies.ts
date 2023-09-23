import { ClientSession, startSession } from 'mongoose';
import { Movies } from '../model/movies';
import { Users } from '../model/users';

interface IFindMovies {
  userId: string;
  movieId: number;
}

interface IBodyDataMovie {
  userId: string;
  movieId: number;
  title?: string;
  overview?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  original_name?: string;
  vote_average?: number;
}

class MoviesService {
  /**
   * get movies by userId
   * @param {string|number} id
   * @returns
   */
  public getMovieByUserId = async (id: string | number) => {
    try {
      const movies = await Movies.find({
        userId: String(id)
      });

      if (movies.length === 0) {
        return { status: 404, error: 'userId not found' };
      }

      const sortedMovies = movies
        .map((movie) => movie)
        .sort((a, b) => b.vote_average - a.vote_average);

      return { status: 'ok', quote: sortedMovies };
    } catch (error) {
      console.log(`🚀 MoviesService::getUserData::error ${error}`);
      throw error;
    }
  };

  /**
   * find Movie
   * @param {IFindMovies} data
   * @returns
   */
  public findMovie = async (data: IFindMovies) => {
    try {
      const { userId, movieId } = data;
      const person = await Movies.findOne({
        userId: userId,
        movieId: movieId
      });

      if (person) {
        return {
          status: 'exits',
          quote: person
        };
      }

      return {
        status: 'nonExits',
        error: 'Movie is not exist!'
      };
    } catch (error) {
      console.log(`🚀 MoviesService::findMovies::error ${error}`);
      throw error;
    }
  };

  /**
   * Find movie by movieId and userId.
   * If movie data is exist, delete this movie data and update data for the Users model
   * Opposite, create new movie and update data for the Users model
   *
   * @param {IBodyDataMovie} data
   * @returns
   */
  public handleRemoveOrCreateMovie = async (data: IBodyDataMovie) => {
    const {
      userId,
      movieId,
      title,
      name,
      overview,
      backdrop_path,
      poster_path,
      original_name,
      vote_average
    } = data;
    let session: ClientSession | null = null;

    try {
      session = await startSession();
      session.startTransaction();

      const movie = await Movies.findOne({
        movieId: movieId,
        userId: userId
      });

      if (movie) {
        await Movies.deleteMany(
          {
            movieId: movieId,
            userId: userId
          },
          { session }
        );

        await Users.updateOne(
          { userId: userId },
          {
            $pull: {
              likeMovies: movieId
            }
          },
          { session }
        );

        await session.commitTransaction();
        session.endSession();
        return { status: 'disLike' };
      }

      await Movies.create({
        userId: userId,
        movieId: movieId,
        title: title,
        overview: overview,
        name: name,
        backdrop_path: backdrop_path,
        poster_path: poster_path,
        original_name: original_name,
        vote_average: vote_average
      });

      await Users.updateOne(
        { userId: userId },
        {
          $push: {
            likeMovies: [movieId]
          }
        },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return { status: 'like' };
    } catch (error) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      console.log(
        `🚀 MoviesService::handleRemoveOrCreateMovie::error ${error}`
      );
      throw error;
    }
  };
}
export const moviesService: MoviesService = new MoviesService();
