import { usersService } from '../services/users';

class UsersController {
  private responseHeader = {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-control-allow-origin': '*'
    }
  };

  /**
   * get User Data
   * @param id
   * @returns
   */
  public async getUserData(id: string | number) {
    try {
      const data = await usersService.getUserData(id);
      const response = {
        status: 'ok',
        quote: data
      };
      return new Response(JSON.stringify(response), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 UsersController::getUserData::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * get Users
   * @returns
   */
  public async getUsers() {
    try {
      const data = await usersService.getUsers();
      return new Response(
        JSON.stringify({
          status: 'ok',
          quote: data
        }),
        this.responseHeader
      );
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 UsersController::getUsers::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * create User
   * @param {Request} request
   * @returns
   */
  public async createUser(request: Request) {
    try {
      const body = await request.json();
      const data = await usersService.createUser(body);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 UsersController::createUser::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }

  /**
   * suggestion User
   * @param {string|number} id
   * @returns
   */
  public async suggestionUser(id: string | number) {
    try {
      const data = await usersService.suggestionUser(id);
      return new Response(JSON.stringify(data), this.responseHeader);
    } catch (error) {
      this.responseHeader.status = 500;
      console.log(`🚀 UsersController::suggestionUser::error ${error}`);
      return new Response(
        JSON.stringify({ status: 'Internal Server Error', error: error }),
        this.responseHeader
      );
    }
  }
}
export const usersController: UsersController = new UsersController();
