import { Document, Schema, Model, model } from 'mongoose';

export interface IMovies extends Document {
  userId: string;
  movieId: number;
  title: string;
  overview: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  original_name: string;
  vote_average: number;
  time: Date;
}

const moviesSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    movieId: {
      type: Number,
      required: true
    },
    title: String,
    overview: String,
    name: String,
    backdrop_path: String,
    poster_path: String,
    original_name: String,
    vote_average: Number,
    time: { type: Date, default: Date.now }
  },
  { collection: 'movies' }
);

export const Movies: Model<IMovies> = model<IMovies>('Movies', moviesSchema);
