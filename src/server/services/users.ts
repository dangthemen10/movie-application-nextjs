import { Users } from '../model/users';

interface IUser {
  userId: string | number;
  name: string;
  email: string;
  userPhotoUrl: string;
  country: string;
}

class UsersService {
  /**
   * Get user by id
   * @param id
   * @returns user
   */
  public getUserData = async (id: string | number) => {
    try {
      const user = await Users.findOne({
        userId: String(id)
      });
      return user;
    } catch (error) {
      console.error(`UsersService::getUserData::error ${error}`);
      throw error;
    }
  };

  /**
   * Get user list
   * @returns
   */
  public getUsers = async () => {
    try {
      const user = await Users.find();
      return user;
    } catch (error) {
      console.error(`UsersService::getUsers::error ${error}`);
      throw error;
    }
  };

  /**
   * Create user if user exist return error
   * @param {IUser} data
   * @returns
   */
  public createUser = async (data: IUser) => {
    const { userId, name, email, userPhotoUrl, country } = data;
    try {
      const user = await this.getUserData(String(userId));

      if (user) {
        return {
          status: 'exits',
          error: 'User already exits',
          quote: user
        };
      }

      const newUser = await Users.create({
        userId: String(userId),
        name: name,
        email: email,
        userPhotoUrl: userPhotoUrl,
        country: country
      });
      return { status: 'ok', quote: newUser };
    } catch (error) {
      console.error(`UsersService::createUser::error ${error}`);
      throw error;
    }
  };

  /**
   * suggestion User
   * @param {string|number} id
   * @returns
   */
  public suggestionUser = async (id: string | number) => {
    try {
      const user = await this.getUserData(String(id));
      if (!user) {
        return { status: '404', error: 'User not found', quote: user };
      }

      const movieArr = user.likeMovies;
      const peopleArr = user.likePerson;
      const checkCondition = movieArr.length >= 5 && peopleArr.length >= 2;
      if (!checkCondition) {
        return {
          status: 'bad',
          quote: 'You have not yet enoughs like movies and peoples'
        };
      }
      let isRun = true;
      const suggestionUser = [];
      while (isRun) {
        const randomSuggestionMovie =
          movieArr[Math.floor(Math.random() * movieArr.length)];
        const randomSuggestionPeople =
          peopleArr[Math.floor(Math.random() * peopleArr.length)];

        const userLikeMovies = await Users.find({
          userId: { $ne: String(id) },
          likeMovies: { $gt: randomSuggestionMovie },
          likePerson: { $gt: randomSuggestionPeople }
        });

        if (userLikeMovies.length > 0) {
          isRun = false;
          suggestionUser.push(userLikeMovies);
        } else {
          isRun = true;
        }
      }

      if (suggestionUser.length < 1) return;

      return {
        status: '200',
        quote: suggestionUser
      };
    } catch (error) {
      console.error(`UsersService::suggestionUser::error ${error}`);
      throw error;
    }
  };
}

export const usersService: UsersService = new UsersService();
