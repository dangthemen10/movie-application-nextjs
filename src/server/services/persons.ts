import { ClientSession, startSession } from 'mongoose';
import { Persons } from '../model/persons';
import { Users } from '../model/users';

interface IFindPerson {
  userId: string;
  personId: number;
}

interface IBodyDataPerson {
  userId: string;
  personId: number;
  gender?: number;
  name?: string;
  popularity?: number;
  profile_path?: string;
  known_for_department?: string;
}

class PersonsService {
  /**
   * get person by userId
   * @param {string|number} id
   * @returns
   */
  public getPersonByUserId = async (id: string | number) => {
    try {
      const persons = await Persons.find({
        userId: String(id)
      });

      if (persons.length === 0) {
        return { status: 404, error: 'userId not found' };
      }

      const sortedPeoples = persons
        .map((person) => person)
        .sort((a, b) => b.popularity - a.popularity);

      return { status: 'ok', quote: sortedPeoples };
    } catch (error) {
      console.log(`🚀 PersonsService::getUserData::error ${error}`);
      throw error;
    }
  };

  /**
   * find Person
   * @param {IFindPerson} data
   * @returns
   */
  public findPerson = async (data: IFindPerson) => {
    try {
      const { userId, personId } = data;
      const person = await Persons.findOne({
        userId: userId,
        personId: personId
      });

      if (person) {
        return {
          status: 'exits',
          quote: person
        };
      }
      return {
        status: 'nonExits',
        error: 'Person is not exist!'
      };
    } catch (error) {
      console.log(`🚀 PersonsService::findPerson::error ${error}`);
      throw error;
    }
  };

  /**
   * Find person by personId and userId.
   * If person data is exist, delete this person data and update data for the Users model
   * Opposite, create new person and update data for the Users model
   *
   * @param {IBodyDataPerson} data
   * @returns
   */
  public handleRemoveOrCreatePerson = async (data: IBodyDataPerson) => {
    const {
      userId,
      personId,
      gender,
      name,
      popularity,
      profile_path,
      known_for_department
    } = data;
    let session: ClientSession | null = null;

    try {
      session = await startSession();
      session.startTransaction();
      const person = await Persons.findOne({
        personId: personId,
        userId: userId
      });

      if (person) {
        await Persons.deleteMany(
          {
            personId: personId,
            userId: userId
          },
          { session }
        );

        await Users.updateOne(
          { userId: userId },
          {
            $pull: {
              likePerson: personId
            }
          },
          { session }
        );

        await session.commitTransaction();
        session.endSession();
        return { status: 'disLike' };
      }

      await Persons.create({
        userId: userId,
        personId: personId,
        gender: gender,
        name: name,
        popularity: popularity,
        profile_path: profile_path,
        known_for_department: known_for_department
      });

      await Users.updateOne(
        { userId: userId },
        {
          $push: {
            likePerson: [personId]
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
        `🚀 PersonsService::handleRemoveOrCreatePerson::error ${error}`
      );
      throw error;
    }
  };
}
export const personsService: PersonsService = new PersonsService();
