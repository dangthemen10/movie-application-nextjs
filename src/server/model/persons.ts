import { Document, Schema, Model, model } from 'mongoose';

export interface IPersons extends Document {
  userId: string;
  personId: number;
  gender: number;
  name: string;
  popularity: number;
  profile_path: string;
  known_for_department: string;
  time: Date;
}

const personsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    personId: {
      type: Number,
      required: true
    },
    gender: Number,
    name: String,
    popularity: Number,
    profile_path: String,
    known_for_department: String,
    time: {
      type: Date,
      default: Date.now
    }
  },
  { collection: 'persons' }
);

export const Persons: Model<IPersons> = model<IPersons>(
  'Persons',
  personsSchema
);
