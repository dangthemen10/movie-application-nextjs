import { Document, Schema, Model, model } from 'mongoose';

export interface IUsers extends Document {
  userId: string;
  name: string;
  email: string;
  userPhotoUrl: string;
  country: string;
  likeMovies: number[];
  likePerson: number[];
  time: Date;
}

const usersSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    userPhotoUrl: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    likeMovies: [Number],
    likePerson: [Number],
    time: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'users' }
);

export const Users: Model<IUsers> = model<IUsers>('Users', usersSchema);
